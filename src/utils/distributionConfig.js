// Configuración para el sistema de distribución de aulas

export const DISTRIBUTION_CONFIG = {
  // URLs base
  BASE_URL: '/api/distribucion-aulas',
  
  // Campus disponibles
  CAMPUS: {
    JUNIN: 'junin',
    PERGAMINO: 'pergamino'
  },
  
  // Edificios por campus
  BUILDINGS: {
    junin: {
      'maria_eva_duarte': {
        name: 'Edificio María Eva Duarte de Perón',
        address: 'Newbery 355 y Sarmiento',
        googleMaps: 'https://maps.google.com/?q=Newbery+355+y+Sarmiento+Junin',
        slug: 'evaperon'
      },
      'elvira_rawson': {
        name: 'Edificio Elvira Rawson de Dellepiane',
        address: 'Rivadavia 453 y Newbery',
        googleMaps: 'https://maps.google.com/?q=Rivadavia+453+y+Newbery+Junin',
        slug: 'anexo'
      },
      'argenlac': {
        name: 'Edificio Argenlac',
        address: 'Gaucho Argentino y Ruta Nacional Nº7',
        googleMaps: 'https://maps.google.com/?q=Gaucho+Argentino+y+Ruta+Nacional+N7+Junin',
        slug: 'argenlac'
      },
    },
    pergamino: {
      // Agregar edificios de Pergamino cuando estén disponibles
    }
  },
  
  // Patrones para extraer información de los PDFs
  PATTERNS: {
    // Horarios: 08:00 - 12:00, 14:00-18:00, etc.
    TIME_SLOT: /(\d{1,2}:\d{2})\s*[-–]\s*(\d{1,2}:\d{2})/g,
    
    // Aulas: Aula 101, Aula A, Sala 1, Laboratorio 2, etc.
    CLASSROOM: /(?:Aula|Sala|Laboratorio|Lab)\s*([A-Z0-9\-]+)/gi,
    
    // Materias: Programación I, Matemática, etc. - Ajustado para mayúsculas
    SUBJECT: /([A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑa-záéíóúñ\s\.]+(?: I| II| III| IV| V| VI| VII| VIII| IX| X)?)/g,
    
    // Profesores: Prof., Dr., Lic., etc.
    PROFESSOR: /(?:Prof\.|Dr\.|Lic\.|Mg\.)\s*([A-Z][a-záéíóúñ\s]+)/g,
    
    // Códigos de materia: MAT101, PROG201, etc.
    SUBJECT_CODE: /([A-Z]{3,4}\d{3})/g
  },
  
  // Palabras comunes que no son materias
  COMMON_WORDS: [
    'UNNOBA', 'Distribución', 'Aulas', 'Fecha', 'Edificio', 'Horario',
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo',
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
    'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  
  // Configuración de timeouts
  TIMEOUTS: {
    PDF_DOWNLOAD: 10000, // 10 segundos
    PDF_PROCESSING: 30000 // 30 segundos
  },
  
  // Configuración de caché
  CACHE: {
    ENABLED: true,
    DURATION: 5 * 60 * 1000 // 5 minutos
  }
};

// Función para construir URLs de distribución
export const buildDistributionUrl = (campus, date) => {
  return `${DISTRIBUTION_CONFIG.BASE_URL}/${campus}?date=${date}`;
};

// Función para construir URLs de PDFs
export const buildPdfUrl = (campus, buildingSlug, date) => {
  return `${DISTRIBUTION_CONFIG.BASE_URL}/download?campus=${campus}&building=${buildingSlug}&date=${date}`;
};

// Función para obtener todos los edificios de un campus
export const getBuildingsForCampus = (campus) => {
  return DISTRIBUTION_CONFIG.BUILDINGS[campus] || {};
};

// Función para obtener información de un edificio específico
export const getBuildingInfo = (campus, buildingKey) => {
  const buildings = getBuildingsForCampus(campus);
  return buildings[buildingKey] || null;
};

// Función para obtener todas las URLs de PDFs de un campus
export const getAllPdfUrlsForCampus = (campus, date) => {
  const buildings = getBuildingsForCampus(campus);
  const pdfUrls = [];
  
  // Convertir el objeto de edificios a un array para poder ordenarlo
  const buildingsArray = Object.entries(buildings).map(([key, value]) => ({
    key, ...value
  }));
  
  // Ordenar para que 'maria_eva_duarte' (evaperon) esté siempre primero
  buildingsArray.sort((a, b) => {
    if (a.key === 'maria_eva_duarte') return -1;
    if (b.key === 'maria_eva_duarte') return 1;
    return 0;
  });

  buildingsArray.forEach(building => {
    const pdfUrl = buildPdfUrl(campus, building.slug, date);
    pdfUrls.push({
      url: pdfUrl,
      buildingName: building.name,
      buildingSlug: building.slug
    });
  });
  
  return pdfUrls;
};

export default DISTRIBUTION_CONFIG; 