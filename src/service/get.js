import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/unnoba";

export const getContenidoIngInformatica = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ingenieria-informatica`);
    return response.data;
  } catch (error) {
    console.error("Error al extraer información del enlace:", error);
    throw error;
  }
};

export const getContenidoLicSistemas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/licenciatura-sistemas`);
    return response.data;
  } catch (error) {
    console.error("Error al extraer información del enlace:", error);
    throw error;
  }
};

export const getContenidoAnalistSistemas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/analista-sistemas`);
    return response.data;
  } catch (error) {
    console.error("Error al extraer información del enlace:", error);
    throw error;
  }
};

export const getContenidoTecDesarrolloAps = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/licenciatura-sistemas`);
    return response.data;
  } catch (error) {
    console.error("Error al extraer información del enlace:", error);
    throw error;
  }
};

export const getContenidoEnfermeria = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/enfermeria`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener Enfermería:", error);
    throw error;
  }
};

export const getContenidoAbogacia = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/abogacia`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener Abogacía:", error);
    throw error;
  }
};

export const getContenidoContadorPublico = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contador-publico`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener Contador Público:", error);
    throw error;
  }
};

export const getContenidoGenetica = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/genetica`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener Genética:", error);
    throw error;
  }
};

// Funciones para consultar información de inscripciones (siguiendo el patrón del back-end)
export const getContenidoInscripcionMaterias = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inscripcion-materias`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener información de inscripción a materias:",
      error
    );
    throw error;
  }
};

export const getContenidoFeriados = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/feriados`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener información de feriados:", error);
    throw error;
  }
};

export const getContenidoCalendarioAcademico = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/calendario-academico`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener información del calendario académico:",
      error
    );
    throw error;
  }
};

// Funciones específicas para consultas del calendario
export const getContenidoInicioCuatrimestres = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inicio-cuatrimestres`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener fechas de inicio de cuatrimestres:", error);
    throw error;
  }
};

export const getContenidoFinCuatrimestres = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fin-cuatrimestres`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener fechas de fin de cuatrimestres:", error);
    throw error;
  }
};

export const getContenidoExamenesFinales = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/examenes-finales`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener fechas de exámenes finales:", error);
    throw error;
  }
};

export const getContenidoVacacionesInvierno = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/vacaciones-invierno`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener fechas de vacaciones de invierno:", error);
    throw error;
  }
};

export const getContenidoConfirmacionInscripcion = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/confirmacion-inscripcion`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener fechas de confirmación de inscripción:",
      error
    );
    throw error;
  }
};

// Función para obtener información de exámenes por mes específico
export const getContenidoExamenesPorMes = async (mes) => {
  try {
    // Primero intentar con el endpoint específico del mes
    const response = await axios.get(`${API_BASE_URL}/examenes-${mes}`);
    return response.data;
  } catch {
    // Si falla, intentar con el endpoint genérico
    try {
      const response = await axios.get(`${API_BASE_URL}/examenes-mes/${mes}`);
      return response.data;
    } catch (fallbackError) {
      console.error(`Error al obtener exámenes de ${mes}:`, fallbackError);
      throw fallbackError;
    }
  }
};

// Función para obtener información de distribución de aulas
export const getContenidoDistribucionAulas = async (consulta = "") => {
  try {
    const url = consulta
      ? `${API_BASE_URL}/distribucion-aulas?consulta=${encodeURIComponent(
          consulta
        )}`
      : `${API_BASE_URL}/distribucion-aulas`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener distribución de aulas:", error);
    throw error;
  }
};

// Nuevos servicios para todas las carreras faltantes

export const getContenidoTecnicaturaDiseñoDesarrollo = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/tecnicatura-diseño-desarrollo-aplicaciones-multiplataforma`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener Tecnicatura en Diseño y Desarrollo de Aplicaciones Multiplataforma:",
      error
    );
    throw error;
  }
};

export const getContenidoIngenieriaIndustrial = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ingenieria-industrial`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener Ingeniería Industrial:", error);
    throw error;
  }
};

export const getContenidoIngenieriaMecanica = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ingenieria-mecanica`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener Ingeniería Mecánica:", error);
    throw error;
  }
};

export const getContenidoTecnicaturaMantenimiento = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/tecnicatura-mantenimiento-industrial`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener Tecnicatura en Mantenimiento Industrial:",
      error
    );
    throw error;
  }
};

export const getContenidoLicenciaturaAdministracion = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/licenciatura-administracion`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener Licenciatura en Administración:", error);
    throw error;
  }
};

export const getContenidoTecnicaturaGestionPymes = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/tecnicatura-gestion-pymes`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener Tecnicatura en Gestión de PYMES:", error);
    throw error;
  }
};

export const getContenidoTecnicaturaGestionPublica = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/tecnicatura-gestion-publica`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener Tecnicatura en Gestión Pública:", error);
    throw error;
  }
};

export const getContenidoIngenieriaAlimentos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ingenieria-alimentos`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener Ingeniería en Alimentos:", error);
    throw error;
  }
};

export const getContenidoTecnicaturaProduccionAlimentos = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/tecnicatura-produccion-alimentos`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener Tecnicatura Universitaria en Producción de Alimentos:",
      error
    );
    throw error;
  }
};

export const getContenidoDiseñoGrafico = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/diseño-grafico`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener Licenciatura en Diseño Gráfico:", error);
    throw error;
  }
};

export const getContenidoDiseñoIndumentaria = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/diseño-indumentaria-y-textil`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener Licenciatura en Diseño de Indumentaria y Textil:",
      error
    );
    throw error;
  }
};

export const getContenidoDiseñoIndustrial = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/diseño-industrial`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener Licenciatura en Diseño Industrial:", error);
    throw error;
  }
};

export const getContenidoAgronomia = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/agronomia`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener Ingeniería Agronómica:", error);
    throw error;
  }
};
