import { useState, useCallback } from "react";
import { examApiService } from "../../services/api/examApiService.js";

/**
 * Hook especializado para búsqueda de fechas de exámenes
 */
export const useExamSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Detecta si un mensaje contiene una consulta sobre fechas específicas de exámenes
   * @param {string} mensaje - Mensaje a analizar
   * @returns {object|null} - Información del mes detectado o null
   */
  const detectExamDateQuery = useCallback((mensaje) => {
    return examApiService.detectExamDateQuery(mensaje);
  }, []);

  /**
   * Obtiene información de exámenes para un mes específico
   * @param {string} mes - Mes a consultar
   * @returns {Promise<string>} - Información de exámenes del mes
   */
  const getExamInfo = useCallback(async (mes) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await examApiService.getExamenesPorMes(mes);
      return response;
    } catch (err) {
      const errorMessage = `Error al obtener información de exámenes de ${mes}: ${err.message}`;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Busca información de exámenes basada en un mensaje
   * @param {string} mensaje - Mensaje con la consulta
   * @returns {Promise<string|null>} - Resultado de la búsqueda o null
   */
  const findExamInMessage = useCallback(
    async (mensaje) => {
      const examQuery = detectExamDateQuery(mensaje);

      if (!examQuery) {
        return null;
      }

      try {
        const examInfo = await getExamInfo(examQuery.mes);
        return examInfo;
      } catch (error) {
        console.error("Error finding exam info in message:", error);
        // Devolver una respuesta de fallback
        return generateFallbackResponse(examQuery);
      }
    },
    [detectExamDateQuery, getExamInfo, generateFallbackResponse]
  );

  /**
   * Genera una respuesta de fallback cuando hay error en la API
   * @param {object} examQuery - Información del mes consultado
   * @returns {string} - Respuesta de fallback
   */
  const generateFallbackResponse = useCallback((examQuery) => {
    const { mesCapitalizado, tieneMesas } = examQuery;

    if (!tieneMesas) {
      return `📅 **EXÁMENES FINALES - ${mesCapitalizado.toUpperCase()}**

⚠️ **Información importante:**
• En ${mesCapitalizado} generalmente **no hay mesas de exámenes finales**
• Los turnos principales suelen ser: **Febrero-Marzo, Julio y Diciembre**
• Consultá el calendario académico para confirmar fechas específicas

🔗 **Enlaces útiles:**
• **Calendario académico:** https://elegi.unnoba.edu.ar/calendario/
• **SIU-Guaraní:** https://g3w3.unnoba.edu.ar/g3w3/`;
    }

    return `📅 **EXÁMENES FINALES - ${mesCapitalizado.toUpperCase()}**

🔄 **Información temporalmente no disponible**

• Las fechas específicas están en el calendario académico oficial
• Las inscripciones se realizan a través del SIU-Guaraní
• Recordá que las inscripciones abren con anticipación

🔗 **Enlaces importantes:**
• **Calendario académico:** https://elegi.unnoba.edu.ar/calendario/
• **SIU-Guaraní:** https://g3w3.unnoba.edu.ar/g3w3/

💡 **Tip:** El calendario académico siempre tiene la información más actualizada.`;
  }, []);

  /**
   * Verifica si un mensaje es sobre fechas de exámenes (pero no necesariamente específico por mes)
   * @param {string} mensaje - Mensaje a verificar
   * @returns {boolean} - True si es sobre fechas de exámenes
   */
  const isExamDateQuery = useCallback((mensaje) => {
    const mensajeLower = mensaje.toLowerCase();

    const palabrasExamenes = [
      "examen",
      "examenes",
      "final",
      "finales",
      "mesa",
      "mesas",
    ];

    const palabrasFecha = [
      "fecha",
      "fechas",
      "cuando",
      "cuándo",
      "día",
      "días",
      "turno",
      "turnos",
    ];

    const tieneKeywordExamen = palabrasExamenes.some((palabra) =>
      mensajeLower.includes(palabra)
    );

    const tieneKeywordFecha = palabrasFecha.some((palabra) =>
      mensajeLower.includes(palabra)
    );

    return tieneKeywordExamen && tieneKeywordFecha;
  }, []);

  /**
   * Obtiene información general de exámenes finales
   * @returns {Promise<string>} - Información general
   */
  const getGeneralExamInfo = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await examApiService.getExamenesFinales();
      return response;
    } catch (err) {
      const errorMessage = `Error al obtener información general de exámenes: ${err.message}`;
      setError(errorMessage);

      // Respuesta de fallback
      return `📝 **EXÁMENES FINALES - UNNOBA**

🔄 **Información temporalmente no disponible**

**📋 Información general:**
• Los turnos principales son: Febrero-Marzo, Julio y Diciembre
• Las inscripciones se realizan a través del SIU-Guaraní
• Consultá siempre el calendario académico para fechas exactas

🔗 **Enlaces importantes:**
• **Calendario académico:** https://elegi.unnoba.edu.ar/calendario/
• **SIU-Guaraní:** https://g3w3.unnoba.edu.ar/g3w3/`;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    detectExamDateQuery,
    getExamInfo,
    findExamInMessage,
    isExamDateQuery,
    getGeneralExamInfo,
    generateFallbackResponse,
    isLoading,
    error,
  };
};
