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
