import { apiService } from "./baseApiService.js";

/**
 * Servicio API específico para carreras
 */
export class CareerApiService {
  // Carreras de Informática
  async getIngenieriaInformatica() {
    return apiService.get("/ingenieria-informatica");
  }

  async getLicenciaturaSistemas() {
    return apiService.get("/licenciatura-sistemas");
  }

  async getAnalistaSistemas() {
    return apiService.get("/analista-sistemas");
  }

  async getTecnicaturaDiseñoDesarrollo() {
    return apiService.get(
      "/tecnicatura-diseño-desarrollo-aplicaciones-multiplataforma"
    );
  }

  // Carreras de Diseño
  async getDiseñoGrafico() {
    return apiService.get("/diseño-grafico");
  }

  async getDiseñoIndumentaria() {
    return apiService.get("/diseño-indumentaria-y-textil");
  }

  async getDiseñoIndustrial() {
    return apiService.get("/diseño-industrial");
  }

  // Carreras de Salud
  async getMedicina() {
    return apiService.get("/medicina");
  }

  async getEnfermeria() {
    return apiService.get("/enfermeria");
  }

  async getGenetica() {
    return apiService.get("/genetica");
  }

  // Carreras de Derecho y Económicas
  async getAbogacia() {
    return apiService.get("/abogacia");
  }

  async getContadorPublico() {
    return apiService.get("/contador-publico");
  }

  async getLicenciaturaAdministracion() {
    return apiService.get("/licenciatura-administracion");
  }

  // Carreras de Ingeniería
  async getAgronomia() {
    return apiService.get("/agronomia");
  }

  async getIngenieriaMecatronica() {
    return apiService.get("/ingenieria-mecatronica");
  }

  async getIngenieriaIndustrial() {
    return apiService.get("/ingenieria-industrial");
  }

  async getIngenieriaMecanica() {
    return apiService.get("/ingenieria-mecanica");
  }

  async getIngenieriaAlimentos() {
    return apiService.get("/ingenieria-alimentos");
  }

  // Tecnicaturas
  async getTecnicaturaMantenimiento() {
    return apiService.get("/tecnicatura-mantenimiento-industrial");
  }

  async getTecnicaturaGestionPymes() {
    return apiService.get("/tecnicatura-gestion-pymes");
  }

  async getTecnicaturaGestionPublica() {
    return apiService.get("/tecnicatura-gestion-publica");
  }

  async getTecnicaturaProduccionAlimentos() {
    return apiService.get("/tecnicatura-produccion-alimentos");
  }

  // Método genérico para obtener carrera por endpoint
  async getCareerByEndpoint(endpointName) {
    const methodMap = {
      getContenidoIngInformatica: this.getIngenieriaInformatica,
      getContenidoLicSistemas: this.getLicenciaturaSistemas,
      getContenidoAnalistSistemas: this.getAnalistaSistemas,
      getContenidoTecnicaturaDiseñoDesarrollo:
        this.getTecnicaturaDiseñoDesarrollo,
      getContenidoDiseñoGrafico: this.getDiseñoGrafico,
      getContenidoDiseñoIndumentaria: this.getDiseñoIndumentaria,
      getContenidoDiseñoIndustrial: this.getDiseñoIndustrial,
      getContenidoEnfermeria: this.getEnfermeria,
      getContenidoGenetica: this.getGenetica,
      getContenidoAbogacia: this.getAbogacia,
      getContenidoContadorPublico: this.getContadorPublico,
      getContenidoLicenciaturaAdministracion:
        this.getLicenciaturaAdministracion,
      getContenidoAgronomia: this.getAgronomia,
      getContenidoIngenieriaIndustrial: this.getIngenieriaIndustrial,
      getContenidoIngenieriaMecanica: this.getIngenieriaMecanica,
      getContenidoTecnicaturaMantenimiento: this.getTecnicaturaMantenimiento,
      getContenidoTecnicaturaGestionPymes: this.getTecnicaturaGestionPymes,
      getContenidoTecnicaturaGestionPublica: this.getTecnicaturaGestionPublica,
      getContenidoIngenieriaAlimentos: this.getIngenieriaAlimentos,
      getContenidoTecnicaturaProduccionAlimentos:
        this.getTecnicaturaProduccionAlimentos,
    };

    const method = methodMap[endpointName];
    if (method) {
      return method.call(this);
    }

    throw new Error(`Endpoint desconocido: ${endpointName}`);
  }
}

// Instancia singleton
export const careerApiService = new CareerApiService();
