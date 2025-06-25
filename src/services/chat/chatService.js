import { PREDEFINED_RESPONSES } from "../../constants/responses/predefinedResponses.js";
import { BIBLIOTECA_RESPONSES } from "../../constants/responses/libraryResponses.js";

/**
 * Servicio principal de chat que orquesta todas las funcionalidades
 */
export class ChatService {
  /**
   * Verifica si hay una respuesta predefinida para la pregunta
   * @param {string} question - Pregunta del usuario
   * @returns {string|null} - Respuesta predefinida o null
   */
  findPredefinedResponse(question) {
    // IMPORTANTE: Primero verificar si es una consulta específica de fechas de exámenes
    // Si lo es, NO usar respuestas predefinidas y dejar que examSearch lo maneje
    const questionLower = question.toLowerCase();
    const mesesEspañol = [
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
    const palabrasExamenes = [
      "finales",
      "final",
      "examen",
      "examenes",
      "mesa",
      "mesas",
    ];
    const palabrasFechas = ["fecha", "fechas", "cuando", "son"];

    const esConsultaEspecificaExamen =
      palabrasExamenes.some((palabra) => questionLower.includes(palabra)) &&
      (palabrasFechas.some((palabra) => questionLower.includes(palabra)) ||
        mesesEspañol.some((mes) => questionLower.includes(mes)));

    if (esConsultaEspecificaExamen) {
      console.log(
        "🎯 Consulta específica de examen detectada, saltando respuestas predefinidas"
      );
      return null; // Dejar que examSearch lo maneje
    }

    // Buscar en respuestas predefinidas generales
    if (PREDEFINED_RESPONSES[question]) {
      return PREDEFINED_RESPONSES[question];
    }

    // Buscar en respuestas de biblioteca
    if (BIBLIOTECA_RESPONSES[question]) {
      return BIBLIOTECA_RESPONSES[question];
    }

    // Búsqueda fuzzy para preguntas similares (solo si no es consulta específica)
    return this.findSimilarResponse(question);
  }

  /**
   * Busca respuestas similares usando coincidencias parciales
   * @param {string} question - Pregunta del usuario
   * @returns {string|null} - Respuesta similar o null
   */
  findSimilarResponse(question) {
    const questionLower = question.toLowerCase();

    // IMPORTANTE: No capturar consultas específicas de fechas de exámenes
    // Estas deben ser manejadas por examSearch
    const mesesEspañol = [
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

    const palabrasExamenes = [
      "finales",
      "final",
      "examen",
      "examenes",
      "mesa",
      "mesas",
    ];
    const palabrasFechas = ["fecha", "fechas", "cuando", "son"];

    // Si es una consulta específica de fechas de exámenes, no capturar aquí
    const esConsultaFechaExamen =
      palabrasExamenes.some((palabra) => questionLower.includes(palabra)) &&
      (palabrasFechas.some((palabra) => questionLower.includes(palabra)) ||
        mesesEspañol.some((mes) => questionLower.includes(mes)));

    if (esConsultaFechaExamen) {
      return null; // Dejar que examSearch lo maneje
    }

    // Combinar todas las respuestas
    const allResponses = {
      ...PREDEFINED_RESPONSES,
      ...BIBLIOTECA_RESPONSES,
    };

    // Buscar coincidencias por palabras clave
    for (const [key, response] of Object.entries(allResponses)) {
      const keyWords = key.toLowerCase().split(" ");
      const questionWords = questionLower.split(" ");

      // Calcular coincidencias
      const matches = keyWords.filter((word) =>
        questionWords.some(
          (qWord) => qWord.includes(word) || word.includes(qWord)
        )
      );

      // Si hay suficientes coincidencias (más del 60% para ser más estricto), devolver respuesta
      if (matches.length >= Math.ceil(keyWords.length * 0.6)) {
        return response;
      }
    }

    return null;
  }

  /**
   * Analiza el tipo de consulta del usuario
   * @param {string} message - Mensaje del usuario
   * @returns {object} - Información sobre el tipo de consulta
   */
  analyzeQuery(message) {
    const messageLower = message.toLowerCase();

    const queryTypes = {
      careerInfo: this.detectCareerQuery(messageLower),
      calendar: this.detectCalendarQuery(messageLower),
      exams: this.detectExamQuery(messageLower),
      library: this.detectLibraryQuery(messageLower),
      enrollment: this.detectEnrollmentQuery(messageLower),
      general: this.detectGeneralQuery(messageLower),
    };

    // Encontrar el tipo de consulta más probable
    const detectedType = Object.entries(queryTypes).find(
      ([, detected]) => detected
    );

    return {
      type: detectedType ? detectedType[0] : "unknown",
      confidence: detectedType ? 1 : 0,
      keywords: this.extractKeywords(messageLower),
    };
  }

  /**
   * Detecta consultas sobre carreras
   * @param {string} message - Mensaje en minúsculas
   * @returns {boolean} - True si es sobre carreras
   */
  detectCareerQuery(message) {
    const careerKeywords = [
      "carrera",
      "carreras",
      "informatica",
      "sistemas",
      "enfermeria",
      "diseño",
      "abogacia",
      "agronomia",
      "ingenieria",
      "licenciatura",
      "tecnicatura",
      "materias",
      "plan de estudios",
    ];

    return careerKeywords.some((keyword) => message.includes(keyword));
  }

  /**
   * Detecta consultas sobre calendario
   * @param {string} message - Mensaje en minúsculas
   * @returns {boolean} - True si es sobre calendario
   */
  detectCalendarQuery(message) {
    const calendarKeywords = [
      "calendario",
      "fecha",
      "fechas",
      "cuando",
      "cuatrimestre",
      "inicio",
      "fin",
      "vacaciones",
      "feriado",
      "feriados",
    ];

    return calendarKeywords.some((keyword) => message.includes(keyword));
  }

  /**
   * Detecta consultas sobre exámenes (pero no específicas por mes)
   * @param {string} message - Mensaje en minúsculas
   * @returns {boolean} - True si es sobre exámenes generales
   */
  detectExamQuery(message) {
    const examKeywords = [
      "examen",
      "examenes",
      "final",
      "finales",
      "mesa",
      "mesas",
      "rendir",
      "inscripcion a finales",
    ];

    // Meses en español
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

    // Palabras que indican consultas específicas de fechas
    const palabrasFechas = ["fecha", "fechas", "cuando", "son"];

    const tieneKeywordExamen = examKeywords.some((keyword) =>
      message.includes(keyword)
    );

    if (!tieneKeywordExamen) {
      return false;
    }

    // Si menciona un mes específico O palabras de fechas junto con exámenes, no capturar aquí
    const mencionaMes = meses.some((mes) => message.includes(mes));
    const mencionaFechas = palabrasFechas.some((palabra) =>
      message.includes(palabra)
    );

    if (mencionaMes || mencionaFechas) {
      // Es una consulta específica por mes o fechas, no manejar aquí
      return false;
    }

    return true; // Solo consultas generales sobre exámenes
  }

  /**
   * Detecta consultas sobre biblioteca
   * @param {string} message - Mensaje en minúsculas
   * @returns {boolean} - True si es sobre biblioteca
   */
  detectLibraryQuery(message) {
    const libraryKeywords = [
      "biblioteca",
      "libro",
      "libros",
      "prestamo",
      "prestamos",
      "horario biblioteca",
      "donde esta la biblioteca",
    ];

    return libraryKeywords.some((keyword) => message.includes(keyword));
  }

  /**
   * Detecta consultas sobre inscripciones
   * @param {string} message - Mensaje en minúsculas
   * @returns {boolean} - True si es sobre inscripciones
   */
  detectEnrollmentQuery(message) {
    const enrollmentKeywords = [
      "inscripcion",
      "inscripciones",
      "como me inscribo",
      "inscribirme",
      "materias",
      "regularidad",
    ];

    return enrollmentKeywords.some((keyword) => message.includes(keyword));
  }

  /**
   * Detecta consultas generales
   * @param {string} message - Mensaje en minúsculas
   * @returns {boolean} - True si es consulta general
   */
  detectGeneralQuery(message) {
    const generalKeywords = [
      "unnoba",
      "universidad",
      "contacto",
      "redes sociales",
      "comedor",
      "wifi",
      "campus",
      "sede",
    ];

    return generalKeywords.some((keyword) => message.includes(keyword));
  }

  /**
   * Extrae palabras clave del mensaje
   * @param {string} message - Mensaje a analizar
   * @returns {Array} - Array de palabras clave
   */
  extractKeywords(message) {
    // Palabras irrelevantes a filtrar
    const stopWords = [
      "el",
      "la",
      "de",
      "que",
      "y",
      "en",
      "un",
      "es",
      "se",
      "no",
      "te",
      "lo",
      "le",
      "da",
      "su",
      "por",
      "son",
      "con",
      "para",
      "como",
      "pero",
      "sus",
      "del",
      "está",
      "fue",
      "todo",
      "tiene",
      "son",
      "dos",
      "puede",
      "ser",
      "hacer",
      "muy",
      "más",
      "dónde",
    ];

    return message
      .split(" ")
      .filter((word) => word.length > 2 && !stopWords.includes(word))
      .slice(0, 10); // Limitar a 10 palabras clave
  }

  /**
   * Genera una respuesta contextual basada en el análisis
   * @param {string} message - Mensaje del usuario
   * @param {object} queryAnalysis - Análisis de la consulta
   * @returns {string} - Respuesta contextual
   */
  generateContextualResponse(message, queryAnalysis) {
    const { type, keywords } = queryAnalysis;

    switch (type) {
      case "careerInfo":
        return this.generateCareerResponse(keywords);
      case "calendar":
        return this.generateCalendarResponse(keywords);
      case "exams":
        return this.generateExamResponse(keywords);
      case "library":
        return this.generateLibraryResponse(keywords);
      case "enrollment":
        return this.generateEnrollmentResponse(keywords);
      case "general":
        return this.generateGeneralResponse(keywords);
      default:
        return this.generateUnknownResponse(message);
    }
  }

  /**
   * Genera respuesta para consultas de carreras
   */
  generateCareerResponse() {
    return `📚 **INFORMACIÓN DE CARRERAS - UNNOBA**

Para obtener información detallada sobre las carreras de la UNNOBA, podés:

• **Planes de estudio:** https://planesdeestudio.unnoba.edu.ar
• **Sitio oficial:** https://unnoba.edu.ar
• **Contacto:** estudiantes@unnoba.edu.ar

Si tenés una carrera específica en mente, mencionala y te ayudo con información más detallada.`;
  }

  /**
   * Genera respuesta para consultas de calendario
   */
  generateCalendarResponse() {
    return `📅 **CALENDARIO ACADÉMICO - UNNOBA**

Para consultar fechas importantes del calendario académico:

• **Calendario oficial:** https://elegi.unnoba.edu.ar/calendario
• **SIU-Guaraní:** https://g3w3.unnoba.edu.ar/g3w3

¿Necesitás alguna fecha específica? Podés preguntarme por:
• Inicio de cuatrimestres
• Inscripciones a materias
• Mesas de finales
• Vacaciones`;
  }

  /**
   * Genera respuesta para consultas de exámenes
   */
  generateExamResponse() {
    return `📝 **EXÁMENES FINALES - UNNOBA**

• **Inscripción:** SIU-Guaraní (https://g3w3.unnoba.edu.ar/g3w3)
• **Calendario:** https://elegi.unnoba.edu.ar/calendario
• **Plazo:** Hasta 48hs antes del examen

¿Necesitás saber sobre algún mes específico o tienes dudas sobre el proceso?`;
  }

  /**
   * Genera respuesta para consultas de biblioteca
   */
  generateLibraryResponse() {
    return BIBLIOTECA_RESPONSES["¿Dónde está la biblioteca?"];
  }

  /**
   * Genera respuesta para consultas de inscripciones
   */
  generateEnrollmentResponse() {
    return `✅ **INSCRIPCIONES - UNNOBA**

• **A materias:** SIU-Guaraní (https://g3w3.unnoba.edu.ar/g3w3)
• **A carreras:** https://elegi.unnoba.edu.ar/inscripcion
• **Calendario:** https://elegi.unnoba.edu.ar/calendario

¿Necesitás ayuda con algún tipo específico de inscripción?`;
  }

  /**
   * Genera respuesta para consultas generales
   */
  generateGeneralResponse() {
    return PREDEFINED_RESPONSES[
      "¿Dónde puedo contactar a la universidad o cuáles son sus redes sociales?"
    ];
  }

  /**
   * Genera respuesta para consultas desconocidas
   */
  generateUnknownResponse() {
    return `🤔 **NO ENTENDÍ TU CONSULTA**

Lo siento, no pude encontrar información específica sobre tu consulta. 

**Podés preguntarme sobre:**
• Carreras y materias
• Inscripciones 
• Calendario académico
• Exámenes finales
• Biblioteca
• Contactos y redes sociales

**También podés contactar directamente:**
• 📧 estudiantes@unnoba.edu.ar
• 🌐 https://unnoba.edu.ar

¿Podrías reformular tu pregunta de manera más específica?`;
  }
}

// Instancia singleton
export const chatService = new ChatService();
