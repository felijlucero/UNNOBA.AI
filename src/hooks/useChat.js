import { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import {
  getContenidoIngInformatica,
  getContenidoLicSistemas,
  getContenidoAnalistSistemas,
  getContenidoEnfermeria,
  getContenidoGenetica,
  getContenidoAbogacia,
  getContenidoContadorPublico,
  getContenidoAgronomia,
  getContenidoDistribucionAulas,
  getContenidoExamenesPorMes,
  getContenidoTecnicaturaDiseñoDesarrollo,
  getContenidoIngenieriaIndustrial,
  getContenidoIngenieriaMecanica,
  getContenidoTecnicaturaMantenimiento,
  getContenidoLicenciaturaAdministracion,
  getContenidoTecnicaturaGestionPymes,
  getContenidoTecnicaturaGestionPublica,
  getContenidoIngenieriaAlimentos,
  getContenidoTecnicaturaProduccionAlimentos,
  getContenidoDiseñoGrafico,
  getContenidoDiseñoIndumentaria,
  getContenidoDiseñoIndustrial,
  getContenidoInscripcionMaterias,
  getContenidoFeriados,
  getContenidoCalendarioAcademico,
  getContenidoInicioCuatrimestres,
  getContenidoFinCuatrimestres,
  getContenidoExamenesFinales,
  getContenidoVacacionesInvierno,
  getContenidoConfirmacionInscripcion,
} from "../service/get";
import { formatUrls } from "../utils/formatters";
import {
  INTERCAMBIO_PROMPT,
  PROMPT_CENTRO_ESTUDIANTES,
  PROMPT_INSCRIPCIONES,
  PROMPT_INSCRIPCION_MATERIAS,
  PPS_PROMPT,
  SYSTEM_PROMPT,
  API_CONFIG,
  RESPONSE_TYPING_SPEED,
  MAX_WORD_COUNT,
  BIBLIOTECA_RESPONSES,
  DISTRIBUCION_AULAS_RESPONSES,
  FINALES_RESPONSES,
  TESIS_RESPONSES,
  TITULO_RESPONSES,
  COMEDOR_RESPONSES,
} from "../utils/constants";

// Mapeo de carreras a sus funciones de endpoint y enlaces
const CARRERAS_ENDPOINTS = {
  "ingenieria informatica": {
    endpoint: getContenidoIngInformatica,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0456-1",
    nombre: "Ingeniería en Informática",
  },
  "ingeniería informatica": {
    endpoint: getContenidoIngInformatica,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0456-1",
    nombre: "Ingeniería en Informática",
  },
  "ingenieria en informatica": {
    endpoint: getContenidoIngInformatica,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0456-1",
    nombre: "Ingeniería en Informática",
  },
  "ingeniería en informatica": {
    endpoint: getContenidoIngInformatica,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0456-1",
    nombre: "Ingeniería en Informática",
  },
  informatica: {
    endpoint: getContenidoIngInformatica,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0456-1",
    nombre: "Ingeniería en Informática",
  },
  informática: {
    endpoint: getContenidoIngInformatica,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0456-1",
    nombre: "Ingeniería en Informática",
  },
  "analista sistemas": {
    endpoint: getContenidoAnalistSistemas,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0435-1",
    nombre: "Analista de Sistemas",
  },
  "analista de sistemas": {
    endpoint: getContenidoAnalistSistemas,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0435-1",
    nombre: "Analista de Sistemas",
  },
  "analista en sistemas": {
    endpoint: getContenidoAnalistSistemas,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0435-1",
    nombre: "Analista de Sistemas",
  },
  "licenciatura sistemas": {
    endpoint: getContenidoLicSistemas,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0416-1",
    nombre: "Licenciatura en Sistemas",
  },
  "licenciatura en sistemas": {
    endpoint: getContenidoLicSistemas,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0416-1",
    nombre: "Licenciatura en Sistemas",
  },
  "lic sistemas": {
    endpoint: getContenidoLicSistemas,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0416-1",
    nombre: "Licenciatura en Sistemas",
  },
  sistemas: {
    endpoint: getContenidoLicSistemas,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0416-1",
    nombre: "Licenciatura en Sistemas",
  },
  "tecnicatura diseño desarrollo aplicaciones": {
    endpoint: getContenidoTecnicaturaDiseñoDesarrollo,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0041-1",
    nombre:
      "Tecnicatura en Diseño y Desarrollo de Aplicaciones Multiplataforma",
  },
  "tecnicatura aplicaciones multiplataforma": {
    endpoint: getContenidoTecnicaturaDiseñoDesarrollo,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0041-1",
    nombre:
      "Tecnicatura en Diseño y Desarrollo de Aplicaciones Multiplataforma",
  },
  "diseño gráfico": {
    endpoint: getContenidoDiseñoGrafico,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0355-2",
    nombre: "Licenciatura en Diseño Gráfico",
  },
  "diseño grafico": {
    endpoint: getContenidoDiseñoGrafico,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0355-2",
    nombre: "Licenciatura en Diseño Gráfico",
  },
  "licenciatura diseño gráfico": {
    endpoint: getContenidoDiseñoGrafico,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0355-2",
    nombre: "Licenciatura en Diseño Gráfico",
  },
  "diseño indumentaria": {
    endpoint: getContenidoDiseñoIndumentaria,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0345-2",
    nombre: "Licenciatura en Diseño de Indumentaria y Textil",
  },
  "diseño indumentaria y textil": {
    endpoint: getContenidoDiseñoIndumentaria,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0345-2",
    nombre: "Licenciatura en Diseño de Indumentaria y Textil",
  },
  "licenciatura diseño indumentaria": {
    endpoint: getContenidoDiseñoIndumentaria,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0345-2",
    nombre: "Licenciatura en Diseño de Indumentaria y Textil",
  },
  "diseño industrial": {
    endpoint: getContenidoDiseñoIndustrial,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0653-2",
    nombre: "Licenciatura en Diseño Industrial",
  },
  "licenciatura diseño industrial": {
    endpoint: getContenidoDiseñoIndustrial,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0653-2",
    nombre: "Licenciatura en Diseño Industrial",
  },
  "ingenieria industrial": {
    endpoint: getContenidoIngenieriaIndustrial,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0409-2",
    nombre: "Ingeniería Industrial",
  },
  "ingeniería industrial": {
    endpoint: getContenidoIngenieriaIndustrial,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0409-2",
    nombre: "Ingeniería Industrial",
  },
  "ingenieria mecanica": {
    endpoint: getContenidoIngenieriaMecanica,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0368-2",
    nombre: "Ingeniería Mecánica",
  },
  "ingeniería mecánica": {
    endpoint: getContenidoIngenieriaMecanica,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0368-2",
    nombre: "Ingeniería Mecánica",
  },
  "tecnicatura mantenimiento industrial": {
    endpoint: getContenidoTecnicaturaMantenimiento,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0375-3",
    nombre: "Tecnicatura en Mantenimiento Industrial",
  },
  "contador publico": {
    endpoint: getContenidoContadorPublico,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0297-4",
    nombre: "Contador Público",
  },
  "contador público": {
    endpoint: getContenidoContadorPublico,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0297-4",
    nombre: "Contador Público",
  },
  "licenciatura administracion": {
    endpoint: getContenidoLicenciaturaAdministracion,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0307-3",
    nombre: "Licenciatura en Administración",
  },
  "licenciatura en administración": {
    endpoint: getContenidoLicenciaturaAdministracion,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0307-3",
    nombre: "Licenciatura en Administración",
  },
  administracion: {
    endpoint: getContenidoLicenciaturaAdministracion,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0307-3",
    nombre: "Licenciatura en Administración",
  },
  administración: {
    endpoint: getContenidoLicenciaturaAdministracion,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0307-3",
    nombre: "Licenciatura en Administración",
  },
  "tecnicatura gestion pymes": {
    endpoint: getContenidoTecnicaturaGestionPymes,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0476-3",
    nombre: "Tecnicatura en Gestión de PYMES",
  },
  "tecnicatura gestión pymes": {
    endpoint: getContenidoTecnicaturaGestionPymes,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0476-3",
    nombre: "Tecnicatura en Gestión de PYMES",
  },
  "gestion pymes": {
    endpoint: getContenidoTecnicaturaGestionPymes,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0476-3",
    nombre: "Tecnicatura en Gestión de PYMES",
  },
  "gestión pymes": {
    endpoint: getContenidoTecnicaturaGestionPymes,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0476-3",
    nombre: "Tecnicatura en Gestión de PYMES",
  },
  "tecnicatura gestion publica": {
    endpoint: getContenidoTecnicaturaGestionPublica,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0486-3",
    nombre: "Tecnicatura en Gestión Pública",
  },
  "tecnicatura gestión pública": {
    endpoint: getContenidoTecnicaturaGestionPublica,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0486-3",
    nombre: "Tecnicatura en Gestión Pública",
  },
  "gestion publica": {
    endpoint: getContenidoTecnicaturaGestionPublica,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0486-3",
    nombre: "Tecnicatura en Gestión Pública",
  },
  "gestión pública": {
    endpoint: getContenidoTecnicaturaGestionPublica,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0486-3",
    nombre: "Tecnicatura en Gestión Pública",
  },
  abogacia: {
    endpoint: getContenidoAbogacia,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0334-2",
    nombre: "Abogacía",
  },
  abogacía: {
    endpoint: getContenidoAbogacia,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0334-2",
    nombre: "Abogacía",
  },
  agronomia: {
    endpoint: getContenidoAgronomia,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0016-2",
    nombre: "Ingeniería Agronómica",
  },
  agronomía: {
    endpoint: getContenidoAgronomia,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0016-2",
    nombre: "Ingeniería Agronómica",
  },
  "ingenieria agronómica": {
    endpoint: getContenidoAgronomia,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0016-2",
    nombre: "Ingeniería Agronómica",
  },
  "ingeniería agronómica": {
    endpoint: getContenidoAgronomia,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0016-2",
    nombre: "Ingeniería Agronómica",
  },
  "ingenieria alimentos": {
    endpoint: getContenidoIngenieriaAlimentos,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0107-2",
    nombre: "Ingeniería en Alimentos",
  },
  "ingeniería en alimentos": {
    endpoint: getContenidoIngenieriaAlimentos,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0107-2",
    nombre: "Ingeniería en Alimentos",
  },
  "tecnicatura produccion alimentos": {
    endpoint: getContenidoTecnicaturaProduccionAlimentos,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0097-1",
    nombre: "Tecnicatura Universitaria en Producción de Alimentos",
  },
  "tecnicatura producción de alimentos": {
    endpoint: getContenidoTecnicaturaProduccionAlimentos,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0097-1",
    nombre: "Tecnicatura Universitaria en Producción de Alimentos",
  },
  enfermeria: {
    endpoint: getContenidoEnfermeria,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0286-2",
    nombre: "Licenciatura en Enfermería",
  },
  enfermería: {
    endpoint: getContenidoEnfermeria,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0286-2",
    nombre: "Licenciatura en Enfermería",
  },
  "licenciatura enfermeria": {
    endpoint: getContenidoEnfermeria,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0286-2",
    nombre: "Licenciatura en Enfermería",
  },
  "licenciatura en enfermería": {
    endpoint: getContenidoEnfermeria,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0286-2",
    nombre: "Licenciatura en Enfermería",
  },
  "enfermería universitaria": {
    endpoint: getContenidoEnfermeria,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0286-2",
    nombre: "Enfermería Universitaria",
  },
  genetica: {
    endpoint: getContenidoGenetica,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0466-4",
    nombre: "Licenciatura en Genética",
  },
  genética: {
    endpoint: getContenidoGenetica,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0466-4",
    nombre: "Licenciatura en Genética",
  },
  "licenciatura genetica": {
    endpoint: getContenidoGenetica,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0466-4",
    nombre: "Licenciatura en Genética",
  },
  "licenciatura en genética": {
    endpoint: getContenidoGenetica,
    enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0466-4",
    nombre: "Licenciatura en Genética",
  },
};

// Función para parsear materias del contenido del endpoint
const parsearMaterias = (contenido, carreraInfo) => {
  if (!contenido) return null;

  try {
    let resultado = `📚 **MATERIAS DE ${carreraInfo.nombre.toUpperCase()} - UNNOBA**\n\n`;

    // Normalizar el texto
    const textoCompleto = contenido.replace(/\s+/g, " ").trim();

    // Buscar la sección del plan de estudios
    let inicioSeccion = textoCompleto.indexOf("Plan-Versión");
    if (inicioSeccion === -1) {
      inicioSeccion = textoCompleto.indexOf("Planes de Estudio");
    }
    if (inicioSeccion === -1) {
      inicioSeccion = 0;
    }

    // Encontrar el final (antes de la práctica profesional supervisada)
    let finSeccion = textoCompleto.indexOf("Práctica Profesional Supervisada");
    if (finSeccion !== -1) {
      finSeccion = textoCompleto.indexOf(")", finSeccion) + 1;
    } else {
      finSeccion = textoCompleto.length;
    }

    const seccionPlan = textoCompleto.substring(inicioSeccion, finSeccion);

    // Detectar años usando un patrón más preciso
    const regexAño = /(\d+)º\s+Año/g;
    const años = [];
    let matchAño;

    while ((matchAño = regexAño.exec(seccionPlan)) !== null) {
      años.push({
        numero: matchAño[1],
        texto: matchAño[0],
        posicion: matchAño.index,
      });
    }

    if (años.length === 0) {
      // Si no encontramos años, usar fallback
      return parsearMateriasSimple(contenido, carreraInfo);
    }

    // Procesar cada año
    for (let i = 0; i < años.length; i++) {
      const añoActual = años[i];
      const proximoAño = años[i + 1];

      // Extraer texto de este año
      const inicioAño = añoActual.posicion;
      const finAño = proximoAño ? proximoAño.posicion : seccionPlan.length;
      const textoAño = seccionPlan.substring(inicioAño, finAño);

      resultado += `🎓 **${añoActual.numero}º Año**\n\n`;

      // Detectar cuatrimestres
      const regexCuatrimestre = /(1er|2do)\s+Cuatrimestre/g;
      const cuatrimestres = [];
      let matchCuatrimestre;

      while ((matchCuatrimestre = regexCuatrimestre.exec(textoAño)) !== null) {
        cuatrimestres.push({
          texto: matchCuatrimestre[0],
          posicion: matchCuatrimestre.index,
        });
      }

      // Si no hay cuatrimestres, procesar todo como un bloque
      if (cuatrimestres.length === 0) {
        const materias = extraerMateriasTexto(textoAño);
        if (materias.length > 0) {
          resultado += `📋 **Materias del año:**\n`;
          materias.forEach((materia) => {
            resultado += `• ${materia}\n`;
          });
          resultado += "\n";
        }
        continue;
      }

      // Procesar cada cuatrimestre
      for (let j = 0; j < cuatrimestres.length; j++) {
        const cuatrimestreActual = cuatrimestres[j];
        const proximoCuatrimestre = cuatrimestres[j + 1];

        resultado += `📋 **${cuatrimestreActual.texto}:**\n`;

        // Extraer texto de este cuatrimestre
        const inicioCuatrimestre =
          cuatrimestreActual.posicion + cuatrimestreActual.texto.length;
        const finCuatrimestre = proximoCuatrimestre
          ? proximoCuatrimestre.posicion
          : textoAño.length;
        let textoCuatrimestre = textoAño.substring(
          inicioCuatrimestre,
          finCuatrimestre
        );

        // Buscar materias en este cuatrimestre
        const materias = extraerMateriasTexto(textoCuatrimestre);

        if (materias.length > 0) {
          materias.forEach((materia) => {
            resultado += `• ${materia}\n`;
          });
        } else {
          resultado += `• (Consultar plan de estudios oficial)\n`;
        }

        resultado += "\n";
      }
    }

    // Agregar enlaces específicos
    resultado += `🔗 **Enlaces oficiales:**\n`;
    resultado += `• **Plan de estudios oficial:** ${carreraInfo.enlace}\n`;
    resultado += `• **Sitio UNNOBA:** https://unnoba.edu.ar/\n\n`;

    resultado += `💡 **Para información detallada y actualizada, consultá el plan de estudios oficial.**`;

    return resultado;
  } catch (error) {
    console.error("Error parseando materias:", error);
    return parsearMateriasSimple(contenido, carreraInfo);
  }
};

// Función mejorada para extraer materias del texto
const extraerMateriasTexto = (texto) => {
  const materias = [];
  const materiasUnicas = new Set(); // Para evitar duplicados

  // Patrón para buscar materias con códigos más preciso
  const regexMateria =
    /([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[a-záéíóúñ]+)*(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]*)*(?:\s+I{1,3}|IV|V)?)\s*\(([0-9GE]+)\)/g;

  let match;
  while ((match = regexMateria.exec(texto)) !== null) {
    let nombreMateria = match[1].trim();

    // Limpiar el nombre
    nombreMateria = nombreMateria
      .replace(/\s{2,}/g, " ")
      .replace(/^\s+|\s+$/g, "")
      .replace(
        /^(a\s+|de\s+|la\s+|el\s+|los\s+|las\s+|en\s+|para\s+|con\s+)/i,
        ""
      );

    // Verificar que el nombre tenga sentido y no sea una optativa específica
    if (
      nombreMateria.length > 3 &&
      !nombreMateria.match(/^(º|er|do|Año|Cuatrimestre)$/) &&
      !materiasUnicas.has(nombreMateria)
    ) {
      materiasUnicas.add(nombreMateria);
      materias.push(nombreMateria);
    }
  }

  // Buscar optativas de forma más específica
  const regexOptativa = /Optativa\s+(I{1,3}|IV|V|\d+)\s*\(([0-9GE]+)\)/gi;
  let matchOptativa;

  while ((matchOptativa = regexOptativa.exec(texto)) !== null) {
    const nombreOptativa = `Optativa ${matchOptativa[1]}`;
    if (!materiasUnicas.has(nombreOptativa)) {
      materiasUnicas.add(nombreOptativa);
      materias.push(nombreOptativa);
    }
  }

  // Si no encontramos materias con el patrón anterior, intentar otro enfoque
  if (materias.length === 0) {
    const lineas = texto.split(/[.!?]|\n/);

    for (const linea of lineas) {
      const lineaLimpia = linea.trim();

      // Buscar líneas que contengan códigos de materias
      if (
        lineaLimpia.includes("(") &&
        lineaLimpia.includes(")") &&
        lineaLimpia.length > 10
      ) {
        const partes = lineaLimpia.split("(");
        if (partes.length >= 2) {
          let nombreMateria = partes[0].trim();

          // Limpiar y validar
          nombreMateria = nombreMateria
            .replace(/^\d+\.\s*/, "") // Remover numeración
            .replace(/\s{2,}/g, " ")
            .trim();

          // Verificar si es una optativa
          if (nombreMateria.match(/^Optativa\s+(I{1,3}|IV|V|\d+)/i)) {
            const matchOpt = nombreMateria.match(
              /^Optativa\s+(I{1,3}|IV|V|\d+)/i
            );
            if (matchOpt) {
              const nombreOptativaLimpio = `Optativa ${matchOpt[1]}`;
              if (!materiasUnicas.has(nombreOptativaLimpio)) {
                materiasUnicas.add(nombreOptativaLimpio);
                materias.push(nombreOptativaLimpio);
              }
            }
          } else if (
            nombreMateria.length > 5 &&
            !nombreMateria.match(/^(Plan|Carrera|Versión|Posibles)/i) &&
            !materiasUnicas.has(nombreMateria)
          ) {
            materiasUnicas.add(nombreMateria);
            materias.push(nombreMateria);
          }
        }
      }
    }
  }

  // Procesar y limpiar materias para evitar duplicados y versiones específicas
  const materiasProcesadas = [];
  const materiasBase = new Set();

  for (const materia of materias) {
    // Manejar casos especiales como "Lengua Extranjera"
    if (materia.includes("Lengua Extranjera")) {
      const materiaBase = "Lengua Extranjera";
      if (!materiasBase.has(materiaBase)) {
        materiasBase.add(materiaBase);
        materiasProcesadas.push(materiaBase);
      }
      continue;
    }

    // Manejar optativas - solo agregar si no existe ya una optativa del mismo nivel
    if (materia.match(/^Optativa\s+(I{1,3}|IV|V|\d+)/i)) {
      const matchOpt = materia.match(/^Optativa\s+(I{1,3}|IV|V|\d+)/i);
      if (matchOpt) {
        const optativaBase = `Optativa ${matchOpt[1]}`;
        if (!materiasBase.has(optativaBase)) {
          materiasBase.add(optativaBase);
          materiasProcesadas.push(optativaBase);
        }
      }
      continue;
    }

    // Verificar si es una materia que es claramente opción de optativa
    const esOpcionOptativa = materia.match(
      /^(Arquitectura\s+I|Calidad de Software|Sistemas de Representación|Química General e Inorgánica|General e Inorgánica|Complementos de cálculo|Antropología de la Comunicación|Comunicación|Construcción de Prototipos|Administración Avanzada de Redes|Redes y Servidores|Procesamiento de Señales|Serigrafía|Marketing|Introducción a la Comercialización|Métodos|Legislación|Seminario|Fotografía|Historia del Textil|Estética)/i
    );

    // Si ya tenemos optativas definidas, no agregar sus opciones específicas
    const tieneOptativas = materiasProcesadas.some((m) =>
      m.match(/^Optativa\s+(I{1,3}|IV|V|\d+)$/i)
    );

    if (esOpcionOptativa && tieneOptativas) {
      continue;
    }

    // Evitar materias que son fragmentos de nombres más largos
    let esFragmento = false;
    for (const materiaExistente of materiasProcesadas) {
      if (materiaExistente.includes(materia) && materiaExistente !== materia) {
        esFragmento = true;
        break;
      }
    }

    if (!esFragmento && !materiasBase.has(materia)) {
      materiasBase.add(materia);
      materiasProcesadas.push(materia);
    }
  }

  return materiasProcesadas;
};

// Función de fallback simplificada
const parsearMateriasSimple = (contenido, carreraInfo) => {
  let resultado = `📚 **MATERIAS DE ${carreraInfo.nombre.toUpperCase()} - UNNOBA**\n\n`;

  resultado += `📋 **Plan de Estudios:**\n`;
  resultado += `La carrera ${carreraInfo.nombre} está disponible en UNNOBA con una duración aproximada de 5 años.\n\n`;
  resultado += `🔗 **Enlaces oficiales:**\n`;
  resultado += `• **Plan de estudios oficial:** ${carreraInfo.enlace}\n`;
  resultado += `• **Sitio UNNOBA:** https://unnoba.edu.ar/\n\n`;
  resultado += `💡 **Para información detallada y actualizada, consultá el plan de estudios oficial.**`;

  return resultado;
};

// Función para detectar carrera en el mensaje
const detectarCarrera = (mensaje) => {
  const mensajeLower = mensaje.toLowerCase();

  // Recopilar todas las coincidencias con su longitud
  const coincidencias = [];

  for (const [carrera, info] of Object.entries(CARRERAS_ENDPOINTS)) {
    if (mensajeLower.includes(carrera)) {
      coincidencias.push({
        carrera,
        info,
        longitud: carrera.length,
      });
    }
  }

  // Si no hay coincidencias, retornar null
  if (coincidencias.length === 0) {
    return null;
  }

  // Ordenar por longitud descendente (más específicas primero)
  coincidencias.sort((a, b) => b.longitud - a.longitud);

  // Retornar la coincidencia más específica
  return coincidencias[0].info;
};

export const useChat = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState("");
  const [error, setError] = useState(null);

  const pausarUnnobaAi = useRef(false);
  const saltosDeLinea = useRef(false);
  const genAI = useRef(new GoogleGenerativeAI(API_CONFIG.apiKey));
  const chat = useRef(null);
  const errorTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);

  const showError = (message) => {
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }

    setError(message);

    errorTimeoutRef.current = setTimeout(() => {
      setError(null);
    }, 2000);
  };

  const generateResponse = async (msg) => {
    if (!msg) return;

    setIsGenerating(true);
    setStreamedResponse("");

    const updatedMessages = [...messages, { type: "userMsg", text: msg }];
    setMessages(updatedMessages);
    setMessage("");
    setIsResponseScreen(true);

    // Detección específica para consultas de biblioteca
    const lowerMessage = msg.toLowerCase();

    // Detección específica para consultas sobre materias de carreras
    const palabrasMateria = [
      "materias",
      "materia",
      "plan de estudios",
      "asignaturas",
      "asignatura",
    ];
    const esPreguntaMateria = palabrasMateria.some((palabra) =>
      lowerMessage.includes(palabra)
    );

    if (esPreguntaMateria) {
      const carreraDetectada = detectarCarrera(msg);

      if (carreraDetectada) {
        try {
          const contenidoCarrera = await carreraDetectada.endpoint();
          const materiasParseadas = parsearMaterias(
            contenidoCarrera,
            carreraDetectada
          );

          if (materiasParseadas) {
            const formattedResponse = formatUrls(materiasParseadas);

            // Simular efecto de tipeo para la respuesta directa
            let i = 0;
            const typingInterval = setInterval(() => {
              if (i < formattedResponse.length) {
                setStreamedResponse(formattedResponse.substring(0, i + 1));
                i++;
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
              } else {
                clearInterval(typingInterval);
                setMessages((prev) => [
                  ...prev,
                  { type: "responseMsg", text: formattedResponse },
                ]);
                setStreamedResponse("");
                setIsGenerating(false);
              }
            }, RESPONSE_TYPING_SPEED);

            return; // Salir temprano, no usar la IA
          }
        } catch (error) {
          console.error("Error obteniendo materias de carrera:", error);
          // Continuar con la IA si hay error en el endpoint específico
        }
      }
    }

    // Verificar si es una pregunta sobre biblioteca
    for (const [pregunta, respuesta] of Object.entries(BIBLIOTECA_RESPONSES)) {
      const preguntaLower = pregunta.toLowerCase();
      const palabrasClaveGenerales = [
        "biblioteca",
        "libros",
        "prestamo",
        "préstamo",
      ];

      // Verificar si el mensaje contiene palabras clave de biblioteca
      const esPreguntaBiblioteca = palabrasClaveGenerales.some((palabra) =>
        lowerMessage.includes(palabra)
      );

      if (esPreguntaBiblioteca) {
        // Buscar coincidencias específicas para cada pregunta
        let esCoincidencia = false;

        if (
          preguntaLower.includes("dónde") &&
          preguntaLower.includes("biblioteca") &&
          (lowerMessage.includes("donde") ||
            lowerMessage.includes("ubicacion") ||
            lowerMessage.includes("direccion"))
        ) {
          esCoincidencia = pregunta === "¿Dónde está la biblioteca?";
        } else if (
          preguntaLower.includes("horario") &&
          (lowerMessage.includes("horario") ||
            lowerMessage.includes("hora") ||
            lowerMessage.includes("abre"))
        ) {
          esCoincidencia = pregunta === "¿Qué horario tiene la biblioteca?";
        } else if (
          preguntaLower.includes("digital") &&
          (lowerMessage.includes("digital") ||
            lowerMessage.includes("online") ||
            lowerMessage.includes("virtual"))
        ) {
          esCoincidencia = pregunta === "¿Cómo accedo a la biblioteca digital?";
        } else if (
          preguntaLower.includes("pedir") &&
          preguntaLower.includes("libro") &&
          (lowerMessage.includes("pedir") ||
            lowerMessage.includes("solicitar") ||
            lowerMessage.includes("sacar"))
        ) {
          esCoincidencia =
            pregunta === "¿Cómo hago para pedir un libro prestado?";
        } else if (
          preguntaLower.includes("tiempo") &&
          preguntaLower.includes("préstamo") &&
          (lowerMessage.includes("tiempo") ||
            lowerMessage.includes("cuanto") ||
            lowerMessage.includes("duracion"))
        ) {
          esCoincidencia =
            pregunta === "¿Cuánto tiempo puedo tener un libro en préstamo?";
        } else if (
          preguntaLower.includes("renovar") &&
          (lowerMessage.includes("renovar") ||
            lowerMessage.includes("extender") ||
            lowerMessage.includes("ampliar"))
        ) {
          esCoincidencia =
            pregunta === "¿Puedo renovar el préstamo de un libro?";
        } else if (
          (preguntaLower.includes("atraso") ||
            preguntaLower.includes("devolucion")) &&
          (lowerMessage.includes("atraso") ||
            lowerMessage.includes("tarde") ||
            lowerMessage.includes("demora") ||
            lowerMessage.includes("devolucion"))
        ) {
          esCoincidencia =
            pregunta === "¿Qué pasa si me atraso en la devolución?";
        } else if (
          preguntaLower.includes("registrarme") &&
          (lowerMessage.includes("registro") ||
            lowerMessage.includes("registrar") ||
            lowerMessage.includes("inscribir"))
        ) {
          esCoincidencia =
            pregunta === "¿Necesito registrarme para acceder a la biblioteca?";
        }

        if (esCoincidencia) {
          const formattedResponse = formatUrls(respuesta);

          // Simular efecto de tipeo para la respuesta directa
          let i = 0;
          const typingInterval = setInterval(() => {
            if (i < formattedResponse.length) {
              setStreamedResponse(formattedResponse.substring(0, i + 1));
              i++;
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            } else {
              clearInterval(typingInterval);
              setMessages((prev) => [
                ...prev,
                { type: "responseMsg", text: formattedResponse },
              ]);
              setStreamedResponse("");
              setIsGenerating(false);
            }
          }, RESPONSE_TYPING_SPEED);

          return; // Salir temprano, no usar la IA
        }
      }
    }

    // Detección específica para consultas de finales
    for (const [pregunta, respuesta] of Object.entries(FINALES_RESPONSES)) {
      const preguntaLower = pregunta.toLowerCase();
      const palabrasClaveFinales = [
        "final",
        "finales",
        "examen",
        "mesa",
        "inscripcion",
        "inscripción",
        "revalida",
        "reválida",
        "correlativa",
        "correlativas",
        "libre",
        "regular",
        "regularidad",
        "baja",
        "inasistencia",
        "oportunidades",
      ];

      // Verificar si el mensaje contiene palabras clave de finales
      const esPreguntaFinales = palabrasClaveFinales.some((palabra) =>
        lowerMessage.includes(palabra)
      );

      if (esPreguntaFinales) {
        // Buscar coincidencias específicas para cada pregunta
        let esCoincidencia = false;

        if (
          preguntaLower.includes("cuándo") &&
          preguntaLower.includes("mesas") &&
          (lowerMessage.includes("cuando") ||
            lowerMessage.includes("cuándo") ||
            lowerMessage.includes("mesas") ||
            lowerMessage.includes("fechas"))
        ) {
          esCoincidencia = pregunta === "¿Cuándo son las mesas de finales?";
        } else if (
          preguntaLower.includes("qué es") &&
          preguntaLower.includes("exámen") &&
          (lowerMessage.includes("que es") ||
            lowerMessage.includes("qué es") ||
            lowerMessage.includes("definicion") ||
            lowerMessage.includes("significa"))
        ) {
          esCoincidencia = pregunta === "¿Qué es un exámen final?";
        } else if (
          preguntaLower.includes("cómo") &&
          preguntaLower.includes("inscribo") &&
          (lowerMessage.includes("como") ||
            lowerMessage.includes("cómo") ||
            lowerMessage.includes("inscribir") ||
            lowerMessage.includes("inscripcion"))
        ) {
          esCoincidencia = pregunta === "¿Cómo me inscribo a un examen?";
        } else if (
          preguntaLower.includes("falto") &&
          (lowerMessage.includes("falto") ||
            lowerMessage.includes("ausente") ||
            lowerMessage.includes("no voy") ||
            lowerMessage.includes("inasistencia"))
        ) {
          esCoincidencia = pregunta === "¿Qué pasa si falto a un final?";
        } else if (
          preguntaLower.includes("baja") &&
          (lowerMessage.includes("baja") ||
            lowerMessage.includes("cancelar") ||
            lowerMessage.includes("desinscribo") ||
            lowerMessage.includes("plazo"))
        ) {
          esCoincidencia =
            pregunta ===
            "¿Hasta cuándo tengo tiempo de darme de baja a un final?";
        } else if (
          preguntaLower.includes("no apruebo") &&
          (lowerMessage.includes("desapruebo") ||
            lowerMessage.includes("no apruebo") ||
            lowerMessage.includes("repruebo") ||
            lowerMessage.includes("no paso"))
        ) {
          esCoincidencia =
            pregunta === "¿Qué pasa si no apruebo un examen final?";
        } else if (
          preguntaLower.includes("cuántas veces") &&
          (lowerMessage.includes("cuantas") ||
            lowerMessage.includes("cuántas") ||
            lowerMessage.includes("oportunidades") ||
            lowerMessage.includes("intentos"))
        ) {
          esCoincidencia =
            pregunta === "¿Cuántas veces puedo rendir un examen final?";
        } else if (
          preguntaLower.includes("correlativas") &&
          (lowerMessage.includes("correlativa") ||
            lowerMessage.includes("correlativas") ||
            lowerMessage.includes("prerequisito") ||
            lowerMessage.includes("dependencia"))
        ) {
          esCoincidencia = pregunta === "¿Qué son las materias correlativas?";
        } else if (
          preguntaLower.includes("reviso") &&
          preguntaLower.includes("correlativas") &&
          (lowerMessage.includes("donde") ||
            lowerMessage.includes("dónde") ||
            lowerMessage.includes("consulto") ||
            lowerMessage.includes("veo"))
        ) {
          esCoincidencia = pregunta === "¿Dónde reviso las correlativas?";
        } else if (
          preguntaLower.includes("reválidas") &&
          (lowerMessage.includes("revalida") ||
            lowerMessage.includes("reválida") ||
            lowerMessage.includes("prorroga") ||
            lowerMessage.includes("prórroga"))
        ) {
          esCoincidencia = pregunta === "¿Qué son las reválidas?";
        } else if (
          preguntaLower.includes("solicito") &&
          preguntaLower.includes("reválida") &&
          (lowerMessage.includes("solicito") ||
            lowerMessage.includes("pido") ||
            lowerMessage.includes("tramito") ||
            lowerMessage.includes("proceso"))
        ) {
          esCoincidencia = pregunta === "¿Cómo solicito una reválida?";
        } else if (
          preguntaLower.includes("no soy regular") &&
          (lowerMessage.includes("no soy regular") ||
            lowerMessage.includes("sin regularidad") ||
            lowerMessage.includes("irregular") ||
            lowerMessage.includes("perdí regularidad"))
        ) {
          esCoincidencia =
            pregunta ===
            "¿Qué pasa si no soy regular?¿Puedo inscribirme a un final?";
        } else if (
          preguntaLower.includes("libre") &&
          (lowerMessage.includes("libre") ||
            lowerMessage.includes("sin cursar") ||
            lowerMessage.includes("directo") ||
            lowerMessage.includes("sin regularidad"))
        ) {
          esCoincidencia = pregunta === "¿Puedo rendir un final libre?";
        }

        if (esCoincidencia) {
          const formattedResponse = formatUrls(respuesta);

          // Simular efecto de tipeo para la respuesta directa
          let i = 0;
          const typingInterval = setInterval(() => {
            if (i < formattedResponse.length) {
              setStreamedResponse(formattedResponse.substring(0, i + 1));
              i++;
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            } else {
              clearInterval(typingInterval);
              setMessages((prev) => [
                ...prev,
                { type: "responseMsg", text: formattedResponse },
              ]);
              setStreamedResponse("");
              setIsGenerating(false);
            }
          }, RESPONSE_TYPING_SPEED);

          return; // Salir temprano, no usar la IA
        }
      }
    }

    // Detección específica para consultas de distribución de aulas
    for (const [, respuesta] of Object.entries(DISTRIBUCION_AULAS_RESPONSES)) {
      const palabrasClaveAulas = [
        "distribucion",
        "distribución",
        "aulas",
        "aula",
        "donde se cursa",
        "dónde se cursa",
      ];

      // Detección más específica para distribución de aulas
      const esPreguntaDistribucion =
        palabrasClaveAulas.some((palabra) => lowerMessage.includes(palabra)) ||
        ((lowerMessage.includes("donde") || lowerMessage.includes("dónde")) &&
          (lowerMessage.includes("materia") ||
            lowerMessage.includes("materias")) &&
          (lowerMessage.includes("cursa") || lowerMessage.includes("cursado")));

      if (esPreguntaDistribucion) {
        // Verificar si es una consulta específica (por sede, campus, etc.)
        const consultasEspecificas = [
          "sede",
          "edificio",
          "campus",
          "junin",
          "junín",
          "pergamino",
          "sarmiento",
          "eva peron",
          "rawson",
          "belgrano",
          "argenlac",
          "monteagudo",
          "agrarias",
          "hoy",
          "hoy en",
          "de hoy",
        ];

        const esConsultaEspecifica = consultasEspecificas.some((palabra) =>
          lowerMessage.includes(palabra)
        );

        if (esConsultaEspecifica) {
          try {
            const distribucionData = await getContenidoDistribucionAulas(msg);
            const formattedData = formatUrls(distribucionData);

            // Simular efecto de tipeo para la respuesta específica
            let i = 0;
            const typingInterval = setInterval(() => {
              if (i < formattedData.length) {
                setStreamedResponse(formattedData.substring(0, i + 1));
                i++;
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
              } else {
                clearInterval(typingInterval);
                setMessages((prev) => [
                  ...prev,
                  { type: "responseMsg", text: formattedData },
                ]);
                setStreamedResponse("");
                setIsGenerating(false);
              }
            }, RESPONSE_TYPING_SPEED);

            return; // Salir temprano, no usar la IA
          } catch (error) {
            console.error("Error obteniendo distribución específica:", error);
            // Continuar con respuesta genérica si hay error
          }
        }

        // Respuesta genérica si no es consulta específica
        const formattedResponse = formatUrls(respuesta);

        // Simular efecto de tipeo para la respuesta directa
        let i = 0;
        const typingInterval = setInterval(() => {
          if (i < formattedResponse.length) {
            setStreamedResponse(formattedResponse.substring(0, i + 1));
            i++;
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
          } else {
            clearInterval(typingInterval);
            setMessages((prev) => [
              ...prev,
              { type: "responseMsg", text: formattedResponse },
            ]);
            setStreamedResponse("");
            setIsGenerating(false);
          }
        }, RESPONSE_TYPING_SPEED);

        return; // Salir temprano, no usar la IA
      }
    }

    // Detección específica para consultas de TESIS
    for (const [pregunta, respuesta] of Object.entries(TESIS_RESPONSES)) {
      const preguntaLower = pregunta.toLowerCase();
      const palabrasClavesTesis = [
        "tesis",
        "trabajo final",
        "investigacion",
        "investigación",
        "director",
        "codirector",
        "reglamento",
        "requisitos",
        "inscripcion tesis",
        "inscripción tesis",
        "orientacion",
        "orientación",
      ];

      // Verificar si el mensaje contiene palabras clave de tesis
      const esPreguntaTesis = palabrasClavesTesis.some((palabra) =>
        lowerMessage.includes(palabra)
      );

      if (esPreguntaTesis) {
        // Buscar coincidencias específicas para cada pregunta
        let esCoincidencia = false;

        if (
          preguntaLower.includes("qué es") &&
          preguntaLower.includes("tesis") &&
          (lowerMessage.includes("que es") ||
            lowerMessage.includes("qué es") ||
            lowerMessage.includes("definicion") ||
            lowerMessage.includes("significa"))
        ) {
          esCoincidencia = pregunta === "¿Qué es la tesis de grado?";
        } else if (
          (preguntaLower.includes("obligatoria") ||
            preguntaLower.includes("obligatorio")) &&
          (lowerMessage.includes("obligatoria") ||
            lowerMessage.includes("obligatorio") ||
            lowerMessage.includes("necesaria") ||
            lowerMessage.includes("requisito"))
        ) {
          esCoincidencia =
            pregunta === "¿La tesis es obligatoria para recibirme?";
        } else if (
          preguntaLower.includes("año") &&
          preguntaLower.includes("tesis") &&
          (lowerMessage.includes("año") ||
            lowerMessage.includes("cuando") ||
            lowerMessage.includes("cuándo") ||
            lowerMessage.includes("etapa"))
        ) {
          esCoincidencia = pregunta === "¿En qué año se hace la tesis?";
        } else if (
          preguntaLower.includes("inscribe") &&
          (lowerMessage.includes("inscrib") ||
            lowerMessage.includes("como") ||
            lowerMessage.includes("cómo") ||
            lowerMessage.includes("proceso"))
        ) {
          esCoincidencia = pregunta === "¿Cómo se inscribe uno a la tesis?";
        } else if (
          preguntaLower.includes("requisitos") &&
          (lowerMessage.includes("requisitos") ||
            lowerMessage.includes("necesito") ||
            lowerMessage.includes("condiciones") ||
            lowerMessage.includes("empezar"))
        ) {
          esCoincidencia =
            pregunta === "¿Cuáles son los requisitos para comenzar la tesis?";
        } else if (
          preguntaLower.includes("tiempo") &&
          (lowerMessage.includes("tiempo") ||
            lowerMessage.includes("plazo") ||
            lowerMessage.includes("duración") ||
            lowerMessage.includes("cuanto"))
        ) {
          esCoincidencia =
            pregunta === "¿Cuánto tiempo tengo para hacer la tesis?";
        } else if (
          preguntaLower.includes("reglamento") &&
          (lowerMessage.includes("reglamento") ||
            lowerMessage.includes("donde encuentro") ||
            lowerMessage.includes("dónde encuentro") ||
            lowerMessage.includes("normativa"))
        ) {
          esCoincidencia =
            pregunta ===
            "¿Dónde encuentro el reglamento de tesis de mi carrera?";
        } else if (
          preguntaLower.includes("entrega") &&
          preguntaLower.includes("informe") &&
          (lowerMessage.includes("entrega") ||
            lowerMessage.includes("presento") ||
            lowerMessage.includes("donde") ||
            lowerMessage.includes("dónde"))
        ) {
          esCoincidencia =
            pregunta === "¿Dónde se entrega el informe final de tesis?";
        } else if (
          preguntaLower.includes("orientar") &&
          (lowerMessage.includes("orientar") ||
            lowerMessage.includes("ayuda") ||
            lowerMessage.includes("consulto") ||
            lowerMessage.includes("iniciar"))
        ) {
          esCoincidencia =
            pregunta ===
            "¿Quién me puede orientar sobre cómo iniciar una tesis?";
        }

        if (esCoincidencia) {
          const formattedResponse = formatUrls(respuesta);

          // Simular efecto de tipeo para la respuesta directa
          let i = 0;
          const typingInterval = setInterval(() => {
            if (i < formattedResponse.length) {
              setStreamedResponse(formattedResponse.substring(0, i + 1));
              i++;
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            } else {
              clearInterval(typingInterval);
              setMessages((prev) => [
                ...prev,
                { type: "responseMsg", text: formattedResponse },
              ]);
              setStreamedResponse("");
              setIsGenerating(false);
            }
          }, RESPONSE_TYPING_SPEED);

          return; // Salir temprano, no usar la IA
        }
      }
    }

    // Detección específica para consultas de TÍTULOS
    for (const [pregunta, respuesta] of Object.entries(TITULO_RESPONSES)) {
      const preguntaLower = pregunta.toLowerCase();
      const palabrasClavesTitulo = [
        "titulo",
        "título",
        "tramite",
        "trámite",
        "diploma",
        "expedicion",
        "expedición",
        "graduacion",
        "graduación",
        "retiro",
        "pregrado",
        "grado",
        "posgrado",
      ];

      // Verificar si el mensaje contiene palabras clave de título
      const esPreguntaTitulo = palabrasClavesTitulo.some((palabra) =>
        lowerMessage.includes(palabra)
      );

      if (esPreguntaTitulo) {
        // Buscar coincidencias específicas para cada pregunta
        let esCoincidencia = false;

        if (
          preguntaLower.includes("necesita") &&
          preguntaLower.includes("tramitar") &&
          (lowerMessage.includes("necesito") ||
            lowerMessage.includes("tramitar") ||
            lowerMessage.includes("empezar") ||
            lowerMessage.includes("inicio"))
        ) {
          esCoincidencia =
            pregunta ===
            "¿Qué se necesita para empezar a tramitar el título universitario?";
        } else if (
          preguntaLower.includes("cómo tramito") &&
          (lowerMessage.includes("como") ||
            lowerMessage.includes("cómo") ||
            lowerMessage.includes("proceso") ||
            lowerMessage.includes("procedimiento"))
        ) {
          esCoincidencia =
            pregunta === "¿Cómo tramito mi título universitario?";
        } else if (
          preguntaLower.includes("tipo") &&
          preguntaLower.includes("títulos") &&
          (lowerMessage.includes("tipos") ||
            lowerMessage.includes("tipo") ||
            lowerMessage.includes("ofrece") ||
            lowerMessage.includes("clases"))
        ) {
          esCoincidencia =
            pregunta === "¿Qué tipo de títulos ofrece la UNNOBA?";
        } else if (
          preguntaLower.includes("demora") &&
          (lowerMessage.includes("demora") ||
            lowerMessage.includes("tarda") ||
            lowerMessage.includes("tiempo") ||
            lowerMessage.includes("cuanto"))
        ) {
          esCoincidencia = pregunta === "¿Cuánto demora obtener el título?";
        } else if (
          preguntaLower.includes("retiro") &&
          (lowerMessage.includes("retiro") ||
            lowerMessage.includes("recojo") ||
            lowerMessage.includes("donde") ||
            lowerMessage.includes("dónde"))
        ) {
          esCoincidencia = pregunta === "¿Dónde retiro el título?";
        } else if (
          preguntaLower.includes("plazo") &&
          preguntaLower.includes("retirar") &&
          (lowerMessage.includes("plazo") ||
            lowerMessage.includes("tiempo limite") ||
            lowerMessage.includes("vencimiento") ||
            lowerMessage.includes("expira"))
        ) {
          esCoincidencia = pregunta === "¿Hay plazo para retirar el título?";
        }

        if (esCoincidencia) {
          const formattedResponse = formatUrls(respuesta);

          // Simular efecto de tipeo para la respuesta directa
          let i = 0;
          const typingInterval = setInterval(() => {
            if (i < formattedResponse.length) {
              setStreamedResponse(formattedResponse.substring(0, i + 1));
              i++;
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            } else {
              clearInterval(typingInterval);
              setMessages((prev) => [
                ...prev,
                { type: "responseMsg", text: formattedResponse },
              ]);
              setStreamedResponse("");
              setIsGenerating(false);
            }
          }, RESPONSE_TYPING_SPEED);

          return; // Salir temprano, no usar la IA
        }
      }
    }

    // Detección específica para consultas del COMEDOR
    for (const [pregunta, respuesta] of Object.entries(COMEDOR_RESPONSES)) {
      const preguntaLower = pregunta.toLowerCase();
      const palabrasClaveComedor = [
        "comedor",
        "almuerzo",
        "almorzar",
        "reserva",
        "reservar",
        "cancelar",
        "taller comedor",
        "contacto comedor",
        "horario comedor",
        "donde queda",
        "ubicacion",
        "ubicación",
      ];

      // Verificar si el mensaje contiene palabras clave del comedor
      const esPreguntaComedor = palabrasClaveComedor.some((palabra) =>
        lowerMessage.includes(palabra)
      );

      if (esPreguntaComedor) {
        // Buscar coincidencias específicas para cada pregunta
        let esCoincidencia = false;

        if (
          preguntaLower.includes("dónde queda") &&
          (lowerMessage.includes("donde") ||
            lowerMessage.includes("dónde") ||
            lowerMessage.includes("ubicacion") ||
            lowerMessage.includes("ubicación") ||
            lowerMessage.includes("queda"))
        ) {
          esCoincidencia = pregunta === "¿Dónde queda el comedor?";
        } else if (
          preguntaLower.includes("cuándo abre") &&
          (lowerMessage.includes("cuando") ||
            lowerMessage.includes("cuándo") ||
            lowerMessage.includes("abre") ||
            lowerMessage.includes("horario") ||
            lowerMessage.includes("horarios"))
        ) {
          esCoincidencia =
            pregunta === "¿Cuándo abre el comedor universitario?";
        } else if (
          preguntaLower.includes("cómo reservar") &&
          (lowerMessage.includes("como") ||
            lowerMessage.includes("cómo") ||
            lowerMessage.includes("reservar") ||
            lowerMessage.includes("reserva"))
        ) {
          esCoincidencia = pregunta === "¿Cómo reservar el almuerzo?";
        } else if (
          preguntaLower.includes("hasta qué hora") &&
          preguntaLower.includes("reservar") &&
          (lowerMessage.includes("hasta") ||
            lowerMessage.includes("hora") ||
            lowerMessage.includes("limite") ||
            lowerMessage.includes("límite"))
        ) {
          esCoincidencia =
            pregunta === "¿Hasta qué hora puedo reservar el almuerzo?";
        } else if (
          preguntaLower.includes("cancelar") &&
          (lowerMessage.includes("cancelar") ||
            lowerMessage.includes("eliminar") ||
            lowerMessage.includes("anular") ||
            lowerMessage.includes("borrar"))
        ) {
          esCoincidencia = pregunta === "¿Puedo cancelar una reserva ya hecha?";
        } else if (
          preguntaLower.includes("contacto") &&
          (lowerMessage.includes("contacto") ||
            lowerMessage.includes("telefono") ||
            lowerMessage.includes("teléfono") ||
            lowerMessage.includes("whatsapp") ||
            lowerMessage.includes("comunicar"))
        ) {
          esCoincidencia = pregunta === "¿Cuál es el contacto del comedor?";
        }

        if (esCoincidencia) {
          const formattedResponse = formatUrls(respuesta);

          // Simular efecto de tipeo para la respuesta directa
          let i = 0;
          const typingInterval = setInterval(() => {
            if (i < formattedResponse.length) {
              setStreamedResponse(formattedResponse.substring(0, i + 1));
              i++;
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            } else {
              clearInterval(typingInterval);
              setMessages((prev) => [
                ...prev,
                { type: "responseMsg", text: formattedResponse },
              ]);
              setStreamedResponse("");
              setIsGenerating(false);
            }
          }, RESPONSE_TYPING_SPEED);

          return; // Salir temprano, no usar la IA
        }
      }
    }

    // Detección específica para consultas de exámenes por mes
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    for (const mes of meses) {
      if (
        lowerMessage.includes(mes) &&
        (lowerMessage.includes("mesa") ||
          lowerMessage.includes("examen") ||
          lowerMessage.includes("final") ||
          lowerMessage.includes("turno"))
      ) {
        try {
          const examenesData = await getContenidoExamenesPorMes(mes);
          const formattedData = formatUrls(examenesData);

          // Simular efecto de tipeo para la respuesta directa
          let i = 0;
          const typingInterval = setInterval(() => {
            if (i < formattedData.length) {
              setStreamedResponse(formattedData.substring(0, i + 1));
              i++;
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            } else {
              clearInterval(typingInterval);
              setMessages((prev) => [
                ...prev,
                { type: "responseMsg", text: formattedData },
              ]);
              setStreamedResponse("");
              setIsGenerating(false);
            }
          }, RESPONSE_TYPING_SPEED);

          return; // Salir temprano, no usar la IA
        } catch (error) {
          console.error(`Error obteniendo exámenes de ${mes}:`, error);
          // Continuar con la IA si hay error en el endpoint específico
        }
      }
    }

    try {
      if (!chat.current) {
        const model = genAI.current.getGenerativeModel({
          model: API_CONFIG.model,
        });
        const PROMPT_INGINFORMATICA = await getContenidoIngInformatica();
        const PROMPT_ANALISTASISTEMAS = await getContenidoAnalistSistemas();
        const PROMPT_LICSISTEMAS = await getContenidoLicSistemas();
        const PROMPT_ENFERMERIA = await getContenidoEnfermeria();
        const PROMPT_GENETICA = await getContenidoGenetica();
        const PROMPT_INSCRIPCION_MATERIAS_DINAMICO =
          await getContenidoInscripcionMaterias();
        const PROMPT_FERIADOS_DINAMICO = await getContenidoFeriados();
        const PROMPT_CALENDARIO_DINAMICO =
          await getContenidoCalendarioAcademico();
        const PROMPT_INICIO_CUATRIMESTRES =
          await getContenidoInicioCuatrimestres();
        const PROMPT_FIN_CUATRIMESTRES = await getContenidoFinCuatrimestres();
        const PROMPT_EXAMENES_FINALES = await getContenidoExamenesFinales();
        const PROMPT_VACACIONES_INVIERNO =
          await getContenidoVacacionesInvierno();
        const PROMPT_CONFIRMACION_INSCRIPCION =
          await getContenidoConfirmacionInscripcion();
        const chatHistory = [
          { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
          { role: "user", parts: [{ text: PROMPT_INGINFORMATICA }] },
          { role: "user", parts: [{ text: PROMPT_ANALISTASISTEMAS }] },
          { role: "user", parts: [{ text: PROMPT_LICSISTEMAS }] },
          { role: "user", parts: [{ text: PPS_PROMPT }] },
          { role: "user", parts: [{ text: PROMPT_GENETICA }] },
          { role: "user", parts: [{ text: PROMPT_ENFERMERIA }] },
          { role: "user", parts: [{ text: PROMPT_INSCRIPCION_MATERIAS }] },
          {
            role: "user",
            parts: [{ text: PROMPT_INSCRIPCION_MATERIAS_DINAMICO }],
          },
          { role: "user", parts: [{ text: PROMPT_FERIADOS_DINAMICO }] },
          { role: "user", parts: [{ text: PROMPT_CALENDARIO_DINAMICO }] },
          { role: "user", parts: [{ text: PROMPT_INICIO_CUATRIMESTRES }] },
          { role: "user", parts: [{ text: PROMPT_FIN_CUATRIMESTRES }] },
          { role: "user", parts: [{ text: PROMPT_EXAMENES_FINALES }] },
          { role: "user", parts: [{ text: PROMPT_VACACIONES_INVIERNO }] },
          { role: "user", parts: [{ text: PROMPT_CONFIRMACION_INSCRIPCION }] },
          { role: "user", parts: [{ text: INTERCAMBIO_PROMPT }] },
          { role: "user", parts: [{ text: PROMPT_CENTRO_ESTUDIANTES }] },
          { role: "user", parts: [{ text: PROMPT_INSCRIPCIONES }] },
          ...updatedMessages.map((m) => ({
            role: m.type === "userMsg" ? "user" : "model",
            parts: [{ text: m.text }],
          })),
        ];
        chat.current = await model.startChat({
          history: chatHistory,
        });
      }

      const result = await chat.current.sendMessage(msg);
      const responseText = result.response.text();
      const wordCount = responseText.trim().split(/\s+/).length;

      let fullText =
        wordCount > MAX_WORD_COUNT
          ? "Lo siento, ese último mensaje conlleva una respuesta demasiado larga..."
          : responseText;

      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setStreamedResponse(fullText.substring(0, i + 1));
          if (pausarUnnobaAi.current) {
            clearInterval(typingInterval);
            const interruptedText =
              fullText.substring(0, i) + ". Se ha interrumpido la respuesta.";
            setMessages((prev) => [
              ...prev,
              { type: "responseMsg", text: interruptedText },
            ]);
            setIsGenerating(false);
            pausarUnnobaAi.current = false;
          }
          if (saltosDeLinea.current) {
            fullText = fullText.slice(0, i) + "\n" + fullText.slice(i);
            saltosDeLinea.current = false;
          }
          i++;
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        } else {
          clearInterval(typingInterval);
          setMessages((prev) => [
            ...prev,
            { type: "responseMsg", text: fullText },
          ]);
          setStreamedResponse("");
          setIsGenerating(false);
        }
      }, RESPONSE_TYPING_SPEED);
    } catch (error) {
      console.error("Error generating response:", error);
      setIsGenerating(false);
    }
  };

  const hitRequest = () => {
    if (!message.trim()) {
      showError("Debes escribir un mensaje");
      return;
    }
    setError(null);
    generateResponse(message);
  };

  const newChat = () => {
    setIsResponseScreen(false);
    setMessages([]);
    chat.current = null;
  };

  const addPredefinedResponse = (question, response) => {
    setMessages((prev) => [
      ...prev,
      { type: "userMsg", text: question },
      { type: "responseMsg", text: response },
    ]);
    setIsResponseScreen(true);
  };

  return {
    message,
    setMessage,
    isResponseScreen,
    messages,
    isGenerating,
    streamedResponse,
    error,
    messagesEndRef,
    pausarUnnobaAi,
    saltosDeLinea,
    hitRequest,
    newChat,
    generateResponse,
    addPredefinedResponse,
    showError,
  };
};
