import { useState, useCallback, useMemo } from "react";
import { careerApiService } from "../../services/api/careerApiService.js";
import { careerParsingService } from "../../services/parsing/careerParsingService.js";

/**
 * Hook especializado para búsqueda y manejo de carreras
 */
export const useCareerSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mapeo de carreras básico (se puede expandir)
  const careerMappings = useMemo(
    () => ({
      "ingenieria informatica": {
        endpoint: "getContenidoIngInformatica",
        enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0456-1",
        nombre: "Ingeniería en Informática",
      },
      sistemas: {
        endpoint: "getContenidoLicSistemas",
        enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0416-1",
        nombre: "Licenciatura en Sistemas",
      },
      "analista sistemas": {
        endpoint: "getContenidoAnalistSistemas",
        enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0435-1",
        nombre: "Analista de Sistemas",
      },
      "diseño grafico": {
        endpoint: "getContenidoDiseñoGrafico",
        enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0355-2",
        nombre: "Licenciatura en Diseño Gráfico",
      },
      enfermeria: {
        endpoint: "getContenidoEnfermeria",
        enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0286-2",
        nombre: "Licenciatura en Enfermería",
      },
      abogacia: {
        endpoint: "getContenidoAbogacia",
        enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0334-2",
        nombre: "Abogacía",
      },
      agronomia: {
        endpoint: "getContenidoAgronomia",
        enlace: "https://planesdeestudio.unnoba.edu.ar/?planversion=P0016-2",
        nombre: "Ingeniería Agronómica",
      },
    }),
    []
  );

  /**
   * Detecta si un mensaje menciona alguna carrera
   * @param {string} mensaje - Mensaje a analizar
   * @returns {object|null} - Información de la carrera o null
   */
  const detectCareer = useCallback(
    (mensaje) => {
      const mensajeLimpio = mensaje
        .toLowerCase()
        .replace(/[áéíóúñü]/g, (char) => {
          const map = {
            á: "a",
            é: "e",
            í: "i",
            ó: "o",
            ú: "u",
            ñ: "n",
            ü: "u",
          };
          return map[char] || char;
        })
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      // Buscar coincidencias exactas primero
      for (const [key, carrera] of Object.entries(careerMappings)) {
        if (mensajeLimpio.includes(key)) {
          return carrera;
        }
      }

      // Buscar coincidencias parciales
      for (const [key, carrera] of Object.entries(careerMappings)) {
        const palabrasKey = key.split(" ");
        const todosPresentesEnMensaje = palabrasKey.every((palabra) =>
          mensajeLimpio.includes(palabra)
        );

        if (todosPresentesEnMensaje && palabrasKey.length > 1) {
          return carrera;
        }
      }

      return null;
    },
    [careerMappings]
  );

  /**
   * Obtiene información de una carrera específica
   * @param {object} careerInfo - Información de la carrera
   * @returns {Promise<string>} - Contenido formateado
   */
  const getCareerInfo = useCallback(async (careerInfo) => {
    setIsLoading(true);
    setError(null);

    try {
      const contenido = await careerApiService.getCareerByEndpoint(
        careerInfo.endpoint
      );

      // Detectar si es una consulta sobre materias
      const esMaterias = contenido && contenido.includes("Plan-Versión");

      if (esMaterias) {
        return careerParsingService.parsearMaterias(contenido, careerInfo);
      }

      // Si no es materias, devolver el contenido tal como viene
      return (
        contenido ||
        `Información sobre ${careerInfo.nombre} no disponible en este momento.`
      );
    } catch (err) {
      const errorMessage = `Error al obtener información de ${careerInfo.nombre}: ${err.message}`;
      setError(errorMessage);
      return errorMessage;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Busca información de carrera basada en un mensaje
   * @param {string} mensaje - Mensaje con la consulta
   * @returns {Promise<string|null>} - Resultado de la búsqueda o null
   */
  const findCareerInMessage = useCallback(
    async (mensaje) => {
      const careerInfo = detectCareer(mensaje);

      if (!careerInfo) {
        return null;
      }

      return await getCareerInfo(careerInfo);
    },
    [detectCareer, getCareerInfo]
  );

  /**
   * Verifica si un mensaje contiene una consulta sobre materias
   * @param {string} mensaje - Mensaje a verificar
   * @returns {boolean} - True si es sobre materias
   */
  const isMateriasQuery = useCallback((mensaje) => {
    const keywords = [
      "materias",
      "materia",
      "plan de estudios",
      "plan de estudio",
      "cuatrimestre",
      "año",
      "asignaturas",
      "asignatura",
      "curricula",
      "que materias",
      "que materias hay",
      "cuales son las materias",
    ];

    const mensajeLower = mensaje.toLowerCase();
    return keywords.some((keyword) => mensajeLower.includes(keyword));
  }, []);

  return {
    detectCareer,
    getCareerInfo,
    findCareerInMessage,
    isMateriasQuery,
    isLoading,
    error,
    careerMappings,
  };
};
