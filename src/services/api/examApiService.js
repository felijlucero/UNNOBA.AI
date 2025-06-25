import { apiService } from "./baseApiService.js";

/**
 * Servicio API específico para consultas de exámenes
 */
export class ExamApiService {
  /**
   * Obtiene información de exámenes por mes específico
   * @param {string} mes - Mes a consultar (enero, febrero, etc.)
   * @returns {Promise<string>} - Información de exámenes del mes
   */
  async getExamenesPorMes(mes) {
    const mesLower = mes.toLowerCase();

    try {
      // Primero intentar con el endpoint específico del mes
      const response = await apiService.get(`/examenes-${mesLower}`);
      return response;
    } catch {
      // Si falla, intentar con el endpoint genérico
      try {
        const response = await apiService.get(`/examenes-mes/${mesLower}`);
        return response;
      } catch (fallbackError) {
        console.error(`Error al obtener exámenes de ${mes}:`, fallbackError);
        throw fallbackError;
      }
    }
  }

  /**
   * Obtiene información general de exámenes finales
   * @returns {Promise<string>} - Información general de exámenes
   */
  async getExamenesFinales() {
    return apiService.get("/examenes-finales");
  }

  /**
   * Métodos específicos por mes (para mayor claridad)
   */
  async getExamenesEnero() {
    return this.getExamenesPorMes("enero");
  }

  async getExamenesFebrero() {
    return this.getExamenesPorMes("febrero");
  }

  async getExamenesMarzo() {
    return this.getExamenesPorMes("marzo");
  }

  async getExamenesAbril() {
    return this.getExamenesPorMes("abril");
  }

  async getExamenesMayo() {
    return this.getExamenesPorMes("mayo");
  }

  async getExamenesJunio() {
    return this.getExamenesPorMes("junio");
  }

  async getExamenesJulio() {
    return this.getExamenesPorMes("julio");
  }

  async getExamenesAgosto() {
    return this.getExamenesPorMes("agosto");
  }

  async getExamenesSeptiembre() {
    return this.getExamenesPorMes("septiembre");
  }

  async getExamenesOctubre() {
    return this.getExamenesPorMes("octubre");
  }

  async getExamenesNoviembre() {
    return this.getExamenesPorMes("noviembre");
  }

  async getExamenesDiciembre() {
    return this.getExamenesPorMes("diciembre");
  }

  /**
   * Verifica si un mes tiene mesas de examen
   * @param {string} mes - Mes a verificar
   * @returns {boolean} - True si tiene mesas de examen
   */
  hasMesasDeExamen(mes) {
    const mesLower = mes.toLowerCase();
    const mesesConMesas = [
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "noviembre",
      "diciembre",
    ];
    return mesesConMesas.includes(mesLower);
  }

  /**
   * Detecta si un mensaje contiene una consulta sobre fechas de exámenes
   * @param {string} mensaje - Mensaje a analizar
   * @returns {object|null} - Información del mes detectado o null
   */
  detectExamDateQuery(mensaje) {
    const mensajeLower = mensaje.toLowerCase();

    // Palabras clave para exámenes
    const palabrasExamenes = [
      "examen",
      "examenes",
      "final",
      "finales",
      "mesa",
      "mesas",
      "fecha",
      "fechas",
      "turno",
      "cuando",
      "cuándo",
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

    // Verificar si hay palabras clave de exámenes
    const tieneKeywordExamen = palabrasExamenes.some((palabra) =>
      mensajeLower.includes(palabra)
    );

    if (!tieneKeywordExamen) {
      return null;
    }

    // Buscar mes mencionado
    for (const mes of meses) {
      if (mensajeLower.includes(mes)) {
        // Verificar patrones específicos como "finales de julio", "fechas de exámenes en julio"
        const patronFinales = new RegExp(
          `(finales|final|mesa|examen|turno|fecha|fechas).*${mes}|${mes}.*(finales|final|mesa|examen|turno|fecha|fechas)`,
          "i"
        );

        if (patronFinales.test(mensajeLower)) {
          return {
            mes: mes,
            mesCapitalizado: mes.charAt(0).toUpperCase() + mes.slice(1),
            tieneMesas: this.hasMesasDeExamen(mes),
            patron: patronFinales.source,
          };
        }
      }
    }

    return null;
  }
}

// Instancia singleton
export const examApiService = new ExamApiService();
