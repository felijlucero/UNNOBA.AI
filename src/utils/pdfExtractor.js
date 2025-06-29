// Utilidades para extraer y analizar PDFs de distribución de aulas
// Esta es una implementación base para futuras mejoras

import * as pdfjsLib from 'pdfjs-dist/build/pdf.mjs';
import workerSrc from 'pdfjs-dist/build/pdf.worker.mjs?url';
import axios from 'axios';
import { DISTRIBUTION_CONFIG } from './distributionConfig.js';

// Configurar el worker de PDF.js de forma robusta para Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

/**
 * Descarga un PDF desde una URL
 * @param {string} pdfUrl - URL del PDF
 * @returns {Promise<ArrayBuffer>} Contenido del PDF como ArrayBuffer
 */
export const downloadPdf = async (pdfUrl) => {
  try {
    const response = await axios.get(pdfUrl, {
      responseType: 'arraybuffer',
      timeout: DISTRIBUTION_CONFIG.TIMEOUTS.PDF_DOWNLOAD
    });
    return response.data;
  } catch (error) {
    console.error('Error al descargar PDF:', error);
    throw new Error(`No se pudo descargar el PDF desde ${pdfUrl}`);
  }
};

/**
 * Extrae texto de un PDF usando PDF.js
 * @param {ArrayBuffer} pdfBuffer - Contenido del PDF como ArrayBuffer
 * @returns {Promise<string>} Texto extraído del PDF
 */
export const extractTextFromPdfBuffer = async (pdfBuffer) => {
  try {
    const loadingTask = pdfjsLib.getDocument({ data: pdfBuffer });
    const pdf = await loadingTask.promise;
    let fullText = '';

    // Extraer texto de todas las páginas
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  } catch (error) {
    console.error('Error al extraer texto del PDF:', error);
    throw new Error('No se pudo extraer el contenido del PDF');
  }
};

/**
 * Extrae texto de un PDF desde una URL
 * @param {string} pdfUrl - URL del PDF
 * @returns {Promise<string>} Texto extraído del PDF
 */
export const extractTextFromPdf = async (pdfUrl) => {
  try {
    console.log(`Descargando PDF desde: ${pdfUrl}`);
    const pdfBuffer = await downloadPdf(pdfUrl);
    console.log(`Extrayendo texto del PDF...`);
    const text = await extractTextFromPdfBuffer(pdfBuffer);
    console.log(`Texto extraído exitosamente (${text.length} caracteres)`);
    return text;
  } catch (error) {
    console.error('Error en extractTextFromPdf:', error);
    throw error;
  }
};

/**
 * Analiza el contenido de un PDF de distribución de aulas
 * @param {string} pdfContent - Contenido extraído del PDF
 * @param {string} buildingName - Nombre del edificio
 * @returns {Object} Información estructurada
 */
export const parseDistributionPdf = (pdfContent, buildingName = '') => {
  const lines = pdfContent.split('\n').filter(line => line.trim());
  const schedule = {};
  const subjects = [];
  
  let currentTimeSlot = '';
  let currentClassroom = '';
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    // Buscar horarios usando patrones de configuración
    const timeMatches = [...trimmedLine.matchAll(DISTRIBUTION_CONFIG.PATTERNS.TIME_SLOT)];
    if (timeMatches.length > 0) {
      currentTimeSlot = `${timeMatches[0][1]}-${timeMatches[0][2]}`;
      if (!schedule[currentTimeSlot]) {
        schedule[currentTimeSlot] = {};
      }
    }
    
    // Buscar aulas usando patrones de configuración
    const classroomMatches = [...trimmedLine.matchAll(DISTRIBUTION_CONFIG.PATTERNS.CLASSROOM)];
    if (classroomMatches.length > 0) {
      currentClassroom = classroomMatches[0][1];
    }
    
    // Buscar materias usando patrones de configuración
    const subjectMatches = [...trimmedLine.matchAll(DISTRIBUTION_CONFIG.PATTERNS.SUBJECT)];
    if (subjectMatches.length > 0 && currentTimeSlot && currentClassroom) {
      let subjectName = subjectMatches[0][1].trim();

      // Limpiar el nombre de la materia de información extra
      subjectName = subjectName.replace(/\s*\(.*?\)/g, '').trim(); // Elimina (CS. ECONÓMICAS)
      subjectName = subjectName.replace(/Parcial|Recuperatorio|Com\.\s*\d/gi, '').trim(); // Elimina Parcial, etc.

      if (subjectName && !DISTRIBUTION_CONFIG.COMMON_WORDS.some(word => 
        subjectName.toUpperCase().includes(word.toUpperCase())
      )) {
        schedule[currentTimeSlot][currentClassroom] = subjectName;
        subjects.push({
          name: subjectName,
          timeSlot: currentTimeSlot,
          classroom: currentClassroom,
          building: buildingName
        });
      }
    }
    
    // Buscar códigos de materia
    const codeMatches = [...trimmedLine.matchAll(DISTRIBUTION_CONFIG.PATTERNS.SUBJECT_CODE)];
    if (codeMatches.length > 0 && currentTimeSlot && currentClassroom) {
      const subjectCode = codeMatches[0][1];
      // Agregar código como información adicional
      const existingSubject = subjects.find(s => 
        s.timeSlot === currentTimeSlot && s.classroom === currentClassroom
      );
      if (existingSubject) {
        existingSubject.code = subjectCode;
      }
    }
  });
  
  return {
    schedule,
    subjects,
    building: buildingName,
    rawContent: pdfContent,
    parsedAt: new Date().toISOString(),
    totalSubjects: subjects.length
  };
};

/**
 * Busca una materia específica en el contenido parseado
 * @param {Object} parsedContent - Contenido parseado del PDF
 * @param {string} subjectName - Nombre de la materia a buscar
 * @returns {Array} Lista de horarios y aulas donde se cursa la materia
 */
export const findSubjectInParsedContent = (parsedContent, subjectName) => {
  const results = [];
  const lowerSubjectName = subjectName.toLowerCase();
  
  // Buscar en la lista de materias
  parsedContent.subjects.forEach(subject => {
    if (subject.name.toLowerCase().includes(lowerSubjectName)) {
      results.push({
        timeSlot: subject.timeSlot,
        classroom: subject.classroom,
        subject: subject.name,
        building: subject.building,
        code: subject.code
      });
    }
  });
  
  // También buscar en el horario estructurado
  Object.entries(parsedContent.schedule).forEach(([timeSlot, classrooms]) => {
    Object.entries(classrooms).forEach(([classroom, subject]) => {
      if (subject.toLowerCase().includes(lowerSubjectName)) {
        // Evitar duplicados
        const exists = results.some(r => 
          r.timeSlot === timeSlot && 
          r.classroom === classroom && 
          r.subject === subject
        );
        
        if (!exists) {
          results.push({
            timeSlot,
            classroom,
            subject,
            building: parsedContent.building
          });
        }
      }
    });
  });
  
  return results;
};

/**
 * Genera una respuesta formateada para una materia encontrada
 * @param {Array} results - Resultados de la búsqueda
 * @param {string} subjectName - Nombre de la materia
 * @returns {string} Respuesta formateada
 */
export const formatSubjectResults = (results, subjectName) => {
  if (results.length === 0) {
    return `No se encontró información sobre "${subjectName}" en la distribución actual. Te recomiendo consultar directamente en la página de distribución de aulas.`;
  }
  
  let response = `<strong>Información sobre "${subjectName}":</strong><br/><br/>`;
  
  // Agrupar por edificio
  const groupedByBuilding = {};
  results.forEach(result => {
    if (!groupedByBuilding[result.building]) {
      groupedByBuilding[result.building] = [];
    }
    groupedByBuilding[result.building].push(result);
  });
  
  Object.entries(groupedByBuilding).forEach(([building, buildingResults]) => {
    response += `<strong>📍 ${building}:</strong><br/>`;
    
    buildingResults.forEach((result, index) => {
      response += `  • <strong>Horario:</strong> ${result.timeSlot}<br/>`;
      response += `  • <strong>Aula:</strong> ${result.classroom}<br/>`;
      if (result.code) {
        response += `  • <strong>Código:</strong> ${result.code}<br/>`;
      }
      if (index < buildingResults.length - 1) response += `<br/>`;
    });
    
    response += `<br/>`;
  });
  
  response += `<em>Esta información puede cambiar. Te recomendamos verificar en la página oficial de distribución de aulas.</em>`;
  
  return response;
};

/**
 * Procesa múltiples PDFs de edificios para buscar una materia
 * @param {Array} pdfUrls - Array de URLs de PDFs
 * @param {string} subjectName - Nombre de la materia a buscar
 * @returns {Promise<Array>} Resultados combinados de todos los edificios
 */
export const searchSubjectInMultiplePdfs = async (pdfUrls, subjectName) => {
  const allResults = [];
  
  for (const pdfUrl of pdfUrls) {
    try {
      const pdfText = await extractTextFromPdf(pdfUrl);
      const parsedContent = parseDistributionPdf(pdfText, getBuildingNameFromUrl(pdfUrl));
      const results = findSubjectInParsedContent(parsedContent, subjectName);
      allResults.push(...results);
    } catch (error) {
      console.error(`Error procesando PDF ${pdfUrl}:`, error);
      // Continuar con el siguiente PDF
    }
  }
  
  return allResults;
};

/**
 * Extrae el nombre del edificio de la URL del PDF
 * @param {string} pdfUrl - URL del PDF
 * @returns {string} Nombre del edificio
 */
const getBuildingNameFromUrl = (pdfUrl) => {
  const buildingMap = {
    'maria-eva-duarte': 'Edificio María Eva Duarte de Perón',
    'elvira-rawson': 'Edificio Elvira Rawson de Dellepiane',
    'manuel-belgrano': 'Predio Manuel Belgrano',
    'las-magnolias': 'Campo Experimental Las Magnolias'
  };
  
  for (const [slug, name] of Object.entries(buildingMap)) {
    if (pdfUrl.includes(slug)) {
      return name;
    }
  }
  
  return 'Edificio no identificado';
};

export default {
  downloadPdf,
  extractTextFromPdfBuffer,
  extractTextFromPdf,
  parseDistributionPdf,
  findSubjectInParsedContent,
  formatSubjectResults,
  searchSubjectInMultiplePdfs
}; 