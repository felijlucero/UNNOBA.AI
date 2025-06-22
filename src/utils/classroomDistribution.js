// Utilidades para manejar la distribución de aulas de la UNNOBA
// Accede a la página web y analiza los PDFs de distribución
import { 
  extractTextFromPdf, 
  parseDistributionPdf, 
  findSubjectInParsedContent, 
  formatSubjectResults,
  searchSubjectInMultiplePdfs 
} from './pdfExtractor.js';
import { 
  DISTRIBUTION_CONFIG, 
  buildDistributionUrl, 
  buildPdfUrl, 
  getBuildingsForCampus, 
  getAllPdfUrlsForCampus
} from './distributionConfig.js';

// Mover los patrones a una constante para poder reusarlos
const DATE_PATTERNS = [
    // "lunes 23", "martes 24", etc.
    /(lunes|martes|miércoles|jueves|viernes|sábado|domingo)\s+(\d{1,2})/i,
    // "23 de junio", "24 de julio", etc.
    /(\d{1,2})\s+de\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
    // "23/06", "24/07", etc.
    /(\d{1,2})\/(\d{1,2})/,
    // "23-06", "24-07", etc.
    /(\d{1,2})-(\d{1,2})/,
    // "23 de junio de 2025", etc.
    /(\d{1,2})\s+de\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+de\s+(\d{4})/i,
    // Solo un número (día del mes actual) - debe estar al final o seguido de espacio/puntuación
    /^(\d{1,2})(?:\s|$|[^\d])/
];

/**
 * Obtiene la URL de distribución para una fecha específica
 * @param {string} date - Fecha en formato DD-MM-YYYY
 * @param {string} campus - 'junin' o 'pergamino'
 * @returns {string} URL completa
 */
export const getDistributionUrl = (date, campus = 'junin') => {
  return buildDistributionUrl(campus, date);
};

/**
 * Obtiene la fecha actual en formato DD-MM-YYYY
 * @returns {string} Fecha formateada
 */
export const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
};

/**
 * Obtiene la fecha de mañana en formato DD-MM-YYYY
 * @returns {string} Fecha formateada
 */
export const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const day = String(tomorrow.getDate()).padStart(2, '0');
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const year = tomorrow.getFullYear();
  return `${day}-${month}-${year}`;
};

/**
 * Extrae una fecha específica de una consulta del usuario
 * @param {string} query - Consulta del usuario
 * @returns {string|null} Fecha en formato DD-MM-YYYY o null si no se encuentra
 */
export const extractDateFromQuery = (query) => {
  const lowerQuery = query.toLowerCase();
  
  for (const pattern of DATE_PATTERNS) {
    const match = query.match(pattern);
    if (match) {
      return parseDateMatch(match, pattern);
    }
  }
  
  return null;
};

/**
 * Parsea una coincidencia de fecha y la convierte a formato DD-MM-YYYY
 * @param {Array} match - Coincidencia del regex
 * @param {RegExp} pattern - Patrón usado
 * @returns {string} Fecha en formato DD-MM-YYYY
 */
const parseDateMatch = (match, pattern) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  
  // Patrón: "lunes 23", "martes 24", etc.
  if (pattern.source.includes('lunes|martes')) {
    // Asume el día N del MES ACTUAL
    const day   = parseInt(match[2]);
    const today = new Date();
    const month = today.getMonth() + 1;
    const year  = today.getFullYear();
    return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
  }
  
  // Patrón: "23 de junio", "24 de julio", etc.
  if (pattern.source.includes('de\\s+(enero|febrero')) {
    const day = parseInt(match[1]);
    const monthName = match[2].toLowerCase();
    const month = getMonthNumber(monthName);
    const year = currentYear;
    
    return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
  }
  
  // Patrón: "23/06", "24/07", etc.
  if (pattern.source.includes('\\/')) {
    const day = parseInt(match[1]);
    const month = parseInt(match[2]);
    const year = currentYear;
    
    return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
  }
  
  // Patrón: "23-06", "24-07", etc.
  if (pattern.source.includes('-')) {
    const day = parseInt(match[1]);
    const month = parseInt(match[2]);
    const year = currentYear;
    
    return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
  }
  
  // Patrón: "23 de junio de 2025", etc.
  if (pattern.source.includes('de\\s+\\d{4}')) {
    const day = parseInt(match[1]);
    const monthName = match[2].toLowerCase();
    const month = getMonthNumber(monthName);
    const year = parseInt(match[3]);
    
    return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
  }
  
  // Patrón: solo un número (día del mes actual)
  if (pattern.source.includes('^\\d{1,2}')) {
    const day = parseInt(match[1]);
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    
    return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
  }
  
  return null;
};

/**
 * Obtiene el número del mes a partir del nombre
 * @param {string} monthName - Nombre del mes
 * @returns {number} Número del mes (1-12)
 */
const getMonthNumber = (monthName) => {
  const months = {
    'enero': 1, 'febrero': 2, 'marzo': 3, 'abril': 4, 'mayo': 5, 'junio': 6,
    'julio': 7, 'agosto': 8, 'septiembre': 9, 'octubre': 10, 'noviembre': 11, 'diciembre': 12
  };
  return months[monthName] || 1;
};

/**
 * Calcula la fecha para un día de la semana específico
 * @param {string} weekday - Día de la semana
 * @param {number} day - Día del mes
 * @param {number} year - Año
 * @param {number} month - Mes actual
 * @returns {string|null} Fecha en formato DD-MM-YYYY o null
 */
const getDateForWeekday = (weekday, day, year, month) => {
  const weekdays = {
    'lunes': 1, 'martes': 2, 'miércoles': 3, 'jueves': 4, 
    'viernes': 5, 'sábado': 6, 'domingo': 0
  };
  
  const targetWeekday = weekdays[weekday];
  if (targetWeekday === undefined) return null;
  
  // Buscar la fecha en el mes actual o el siguiente
  for (let m = month; m <= month + 2; m++) {
    const adjustedMonth = m > 12 ? m - 12 : m;
    const adjustedYear = m > 12 ? year + 1 : year;
    
    const testDate = new Date(adjustedYear, adjustedMonth - 1, day);

    if (testDate.getDay() === targetWeekday) {
      return `${String(day).padStart(2, '0')}-${String(adjustedMonth).padStart(2, '0')}-${adjustedYear}`;
    }
  }
  
  return null;
};

/**
 * Construye la URL del PDF para un edificio específico
 * @param {string} buildingKey - Clave del edificio
 * @param {string} date - Fecha en formato DD-MM-YYYY
 * @param {string} campus - 'junin' o 'pergamino'
 * @returns {string} URL del PDF
 */
export const getBuildingPdfUrl = (buildingKey, date, campus = 'junin') => {
  const buildings = getBuildingsForCampus(campus);
  const building = buildings[buildingKey];
  
  if (!building) return null;
  
  return buildPdfUrl(campus, building.slug, date);
};

/**
 * Obtiene todas las URLs de PDFs para una fecha específica
 * @param {string} date - Fecha en formato DD-MM-YYYY
 * @param {string} campus - 'junin' o 'pergamino'
 * @returns {Array} Array de URLs de PDFs
 */
export const getAllPdfUrls = (date, campus = 'junin') => {
  const pdfUrls = getAllPdfUrlsForCampus(campus, date);
  return pdfUrls;
};

/**
 * Formatea un objeto Date a DD-MM-YYYY. Si recibe un string, lo devuelve tal cual.
 * @param {Date|string} date - La fecha a formatear.
 * @returns {string} - Fecha en formato DD-MM-YYYY.
 */
function formatDate(date) {
  if (typeof date === 'string') return date;
  if (!(date instanceof Date) || isNaN(date)) {
    // Si no es una fecha válida, devuelve la fecha de hoy por seguridad.
    date = new Date();
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

const normalizeText = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize("NFD") // Separa los acentos de las letras
    .replace(/[\u0300-\u036f]/g, "") // Elimina los caracteres de acento
    .replace(/[.,()]/g, '') // Elimina puntuación común
    .replace(/\s+/g, ' ').trim(); // Normaliza los espacios en blanco
};

/**
 * Busca una materia específica en la distribución
 * @param {string} subjectName - Nombre de la materia
 * @param {string} date - Fecha en formato DD-MM-YYYY
 * @param {string} campus - 'junin' o 'pergamino'
 * @returns {Promise<Object>} Información de la materia encontrada
 */
export const findSubjectInDistribution = async (subjectName, date, campus = 'junin') => {
  const formattedDate = formatDate(date); // Usar la función de formato

  const pdfsInfo = getAllPdfUrls(formattedDate, campus);
  console.log('[DEBUG] Fecha consultada:', formattedDate);
  console.log('[DEBUG] PDFs a procesar:', pdfsInfo);
  if (pdfsInfo.length === 0) {
    const distributionUrl = getDistributionUrl(formattedDate, campus);
    return {
      found: false,
      message: `No se encontró un cronograma para la fecha ${formattedDate}. Puedes consultar en: <a href="${distributionUrl}" target="_blank" style="color:#005B96; font-weight:bold;">Distribución de aulas</a>`
    };
  }

  const allResults = [];
  const normalizedQuery = normalizeText(subjectName);

  try {
    for (const pdfInfo of pdfsInfo) {
      try {
        const text = await extractTextFromPdf(pdfInfo.url);
        if (!text) continue;

        // Log para ver el contenido crudo del PDF
        console.log(`[DEBUG] Contenido crudo de ${pdfInfo.buildingName}:`, text);

        // 1) Encontrar todos los encabezados de aula (hasta "(Capacidad ...)")
        const classroomRegex = /((?:\d{1,3}\s+)?(?:Planta\s+Baja|\d{1,3}\s*(?:1er|2do|3er)\.?\s*Piso|AULA\s+MAGNA|LADIMI|Litic|Laboratorio|Sala[^\n(]*?))\s*\(Capacidad\s*(?:p\/)?\d+/gi;
        const classroomHeaders = [];
        let headerMatch;
        while ((headerMatch = classroomRegex.exec(text)) !== null) {
            classroomHeaders.push({
                name: headerMatch[1].trim(),
                startIndex: headerMatch.index,
                endIndex: headerMatch.index + headerMatch[0].length
            });
        }

        if (classroomHeaders.length === 0) continue;

        const scheduleRegex = /(\d{1,2}:\d{2}(?:\s*(?:a|A|h?asta)?\s*\d{1,2}:\d{2})?)/g;

        // 2) Procesar cada bloque de aula individualmente
        for (let c = 0; c < classroomHeaders.length; c++) {
            const current = classroomHeaders[c];
            const next = classroomHeaders[c + 1];

            const blockStart = current.endIndex;
            const blockEnd = next ? next.startIndex : text.length;
            const blockText = text.substring(blockStart, blockEnd);

            // Encontrar horarios dentro del bloque
            const schedules = [];
            let schMatch;
            while ((schMatch = scheduleRegex.exec(blockText)) !== null) {
                schedules.push({
                    time: schMatch[0],
                    start: schMatch.index,
                    end: schMatch.index + schMatch[0].length
                });
            }

            if (schedules.length === 0) {
                if (normalizeText(blockText).includes(normalizedQuery)) {
                    allResults.push({
                        subjects: blockText.trim(),
                        classroom: current.name,
                        schedule: 'No especificado',
                        building: pdfInfo.buildingName
                    });
                }
                continue;
            }

            // Extraer materias entre horarios sucesivos
            let prevEnd = 0;
            const spacelessQuery = normalizedQuery.replace(/\s+/g, '');

            for (const sch of schedules) {
                const subjText = blockText.substring(prevEnd, sch.start).trim();
                prevEnd = sch.end;

                if (subjText) {
                    const normSubj = normalizeText(subjText);
                    const spacelessSubj = normSubj.replace(/\s+/g, '');
                    const locationPattern = /^(planta\s*baja|\d+\s*(?:1er|2do|3er)?\s*piso|sala\s*\d+)/i;
                    
                    if (!locationPattern.test(normSubj) && spacelessSubj.includes(spacelessQuery)) {
                        allResults.push({
                            subjects: subjText.replace(/[()]/g, '').trim(),
                            classroom: current.name,
                            schedule: sch.time,
                            building: pdfInfo.buildingName
                        });
                    }
                }
            }
        }
      } catch (pdfError) {
        console.error(`Error procesando el PDF de ${pdfInfo.buildingName}:`, pdfError);
      }
    }

    if (allResults.length > 0) {
      const uniqueResults = [...new Map(allResults.map(item => [item.building + item.classroom + item.subjects, item])).values()];
      const formattedResponse = uniqueResults.map(r => `• <b>Materia(s):</b> ${r.subjects}<br />• <b>Sede:</b> ${r.building}<br />• <b>Aula:</b> ${r.classroom}<br />• <b>Horario:</b> ${r.schedule}`).join('<br /><br />');
      return {
        found: true,
        message: `Se encontró la siguiente información:<br /><br />${formattedResponse}`
      };
    } else {
      const distributionUrl = getDistributionUrl(formattedDate, campus);
      return {
        found: false,
        message: `No se encontró información sobre "${subjectName}" en la distribución del ${formattedDate}. Te recomiendo consultar directamente en: <a href="${distributionUrl}" target="_blank" style="color:#005B96; font-weight:bold;">Distribución de aulas</a>`      };
    }
  } catch (error) {
    console.error('Error en findSubjectInDistribution:', error);
    return {
      found: false,
      message: 'Ocurrió un error al procesar el archivo de distribución de aulas. Por favor, intenta de nuevo más tarde.'
    };
  }
};

/**
 * Obtiene información general sobre los edificios
 * @param {string} campus - 'junin' o 'pergamino'
 * @returns {Object} Información de los edificios
 */
export const getBuildingsInfo = (campus = 'junin') => {
  const buildings = getBuildingsForCampus(campus);
  const buildingsList = Object.values(buildings).map(building => ({
    name: building.name,
    address: building.address,
    googleMaps: building.googleMaps
  }));
  
  return {
    campus: campus === 'junin' ? 'Junín' : 'Pergamino',
    buildings: buildingsList,
    distributionUrl: getDistributionUrl(getCurrentDate(), campus)
  };
};

/**
 * Extrae la fecha y el nombre de la materia de la consulta del usuario.
 * @param {string} query - La consulta del usuario.
 * @returns {{date: Date, subject: string, dateFound: boolean}}
 */
function extractDateAndSubject(query) {
    const today = new Date();
    let date = new Date(today);
    let subject = '';
    let dateFound = false;

    // Primero intentar extraer la fecha usando la función existente
    const extractedDate = extractDateFromQuery(query);
    if (extractedDate) {
        // Si se encontró una fecha, convertirla a objeto Date
        const [day, month, year] = extractedDate.split('-').map(Number);
        date = new Date(year, month - 1, day);
        dateFound = true;
        
        let cleanQuery = query;
        let dateTextInQuery = '';
        
        // Encontrar el texto exacto que coincidió con la fecha
        for (const pattern of DATE_PATTERNS) {
            const match = cleanQuery.match(pattern);
            if (match) {
                dateTextInQuery = match[0];
                break;
            }
        }
        
        // Remover el texto de la fecha y las palabras residuales
        if (dateTextInQuery) {
            cleanQuery = cleanQuery.replace(dateTextInQuery, '').trim();
            // Quitar artículos/preposiciones que quedaron al final (ej: "el", "del")
            cleanQuery = cleanQuery.replace(/\s+(el|la|los|las|del|en|a|de)\s*(\?*)$/i, '$2').trim();
        }

        // Extraer la materia de la consulta limpia
        subject = extractSubjectFromQuery(cleanQuery);
        console.log('[DEBUG] Query original:', query);
        console.log('[DEBUG] Fecha extraída:', extractedDate);
        console.log('[DEBUG] Query limpio (sin fecha):', cleanQuery);
        console.log('[DEBUG] Materia extraída:', subject);
    } else {
        // Si no se encontró fecha específica, extraer solo la materia
        subject = extractSubjectFromQuery(query);
    }

    return { date, subject, dateFound };
}

/**
 * Extrae el nombre de la materia de una consulta
 * @param {string} query - La consulta del usuario
 * @returns {string} Nombre de la materia
 */
function extractSubjectFromQuery(query) {
    const cleanQuery = query.replace(/\?$/, '').trim();

    // Expresión para detectar frases de continuación y extraer la materia
    const followUpRegex = /^(?:y|o|qué tal con|qué hay de|y sobre|dime sobre|y para)\s+(.+)/i;
    const followUpMatch = cleanQuery.match(followUpRegex);

    if (followUpMatch && followUpMatch[1]) {
        // Si es una continuación, la materia es lo que sigue
        return followUpMatch[1].trim();
    }

    // Expresiones para buscar la materia en frases completas
    const subjectRegexes = [
        /dónde se cursa (.+?)(?: el |$)/i,
        /dónde cursar (.+?)(?: el |$)/i,
        /en qué aula se cursa (.+?)(?: el |$)/i,
        /(?:de|para|sobre) (.+?)(?: el |$)/i
    ];

    for (const regex of subjectRegexes) {
        const match = cleanQuery.match(regex);
        if (match && match[1]) {
            return match[1].trim();
        }
    }
    
    // Si no es una frase de consulta ni de continuación,
    // asumimos que toda la consulta es el nombre de la materia.
    return cleanQuery;
}

/**
 * Maneja la lógica completa para una consulta sobre distribución de aulas.
 * @param {string} query - La consulta del usuario.
 * @param {object} previousContext - El contexto de la consulta anterior.
 * @param {Date} previousContext.date - La fecha de la consulta anterior.
 * @param {string} previousContext.subject - La materia de la consulta anterior.
 * @returns {Promise<object>} - Un objeto con el resultado de la consulta.
 */
export const handleClassroomDistributionQuery = async (query, previousContext) => {
  const { date: previousDate, subject: previousSubject } = previousContext || {};
  
  const { date, subject: newSubject, dateFound } = extractDateAndSubject(query);
  let subject = newSubject; // Usamos una variable mutable para poder sobreescribirla

  // Si no se extrajo una materia nueva, o si es un pronombre/frase de continuación,
  // usamos la materia del contexto anterior si es que existe.
  const isPlaceholderSubject = /^(esa materia|la misma|aquella|esa)$/i.test(subject.trim());
  if ((!subject || isPlaceholderSubject) && previousSubject) {
    subject = previousSubject;
  }
  
  // Asegura que la fecha a usar sea siempre un objeto Date válido
  let finalDate;
  if (dateFound) {
    finalDate = new Date(date);
  } else if (previousDate) {
    finalDate = new Date(previousDate);
  } else {
    finalDate = new Date();
  }

  // Si después de todos los intentos no tenemos una materia, no es una consulta de distribución.
  if (!subject) {
    return { isDistributionQuery: false };
  }

  // Lógica principal: buscar la materia en la fecha correspondiente.
  const results = await findSubjectInDistribution(subject, finalDate);
  
  // Devolvemos el nuevo estado del contexto para la próxima vuelta.
  return {
    isDistributionQuery: true,
    ...results,
    date: finalDate,    // La fecha que se usó
    subject: subject    // La materia que se usó
  };
};

export default {
  getDistributionUrl,
  getCurrentDate,
  getTomorrowDate,
  extractDateFromQuery,
  getBuildingPdfUrl,
  getAllPdfUrls,
  findSubjectInDistribution,
  getBuildingsInfo,
  handleClassroomDistributionQuery
}; 
