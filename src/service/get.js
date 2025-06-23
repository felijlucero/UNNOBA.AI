import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/unnoba";

export const getContenidoCarrera = async (endPoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endPoint}`);
    return response.data;
  } catch (error) {
    console.error("Error al extraer información del enlace:", error);
    throw error;
  }
};


