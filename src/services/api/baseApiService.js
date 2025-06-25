import { API_CONFIG } from "../../constants/apiConstants.js";

/**
 * Servicio base para manejar todas las llamadas a la API
 */
class BaseApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
    this.retryAttempts = API_CONFIG.RETRY_ATTEMPTS;
  }

  /**
   * Realiza una petición HTTP con reintentos automáticos
   * @param {string} endpoint - Endpoint a consultar
   * @param {object} options - Opciones de la petición
   * @returns {Promise<string>} - Respuesta de la API
   */
  async fetchWithRetry(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.text();
      } catch (error) {
        console.warn(
          `Intento ${attempt} falló para ${endpoint}:`,
          error.message
        );

        if (attempt === this.retryAttempts) {
          throw new Error(
            `Error después de ${this.retryAttempts} intentos: ${error.message}`
          );
        }

        // Esperar antes del siguiente intento
        await this.delay(1000 * attempt);
      }
    }
  }

  /**
   * Utilitario para delay entre reintentos
   * @param {number} ms - Milisegundos a esperar
   */
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * GET request
   * @param {string} endpoint - Endpoint a consultar
   * @returns {Promise<string>} - Respuesta de la API
   */
  async get(endpoint) {
    return this.fetchWithRetry(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * POST request
   * @param {string} endpoint - Endpoint a consultar
   * @param {object} data - Datos a enviar
   * @returns {Promise<string>} - Respuesta de la API
   */
  async post(endpoint, data) {
    return this.fetchWithRetry(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
}

// Instancia singleton
export const apiService = new BaseApiService();
