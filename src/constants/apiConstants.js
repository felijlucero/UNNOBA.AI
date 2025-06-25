// Configuración de API y aplicación
export const API_CONFIG = {
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
  BASE_URL: "http://localhost:8080/api/unnoba",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
};

// Configuración de respuesta y typing
export const RESPONSE_CONFIG = {
  TYPING_SPEED: 30, // milisegundos entre caracteres
  MAX_WORD_COUNT: 150, // máximo de palabras para respuestas automáticas
  PAUSE_AFTER_SENTENCES: 100, // pausa después de puntos
  PAUSE_AFTER_PARAGRAPHS: 200, // pausa después de saltos de línea
};

// Configuración de la interfaz
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  SCROLL_BEHAVIOR: "smooth",
  MAX_MESSAGE_LENGTH: 1000,
  WELCOME_SCREEN_DELAY: 500,
};

// URLs de la universidad
export const UNNOBA_URLS = {
  MAIN_SITE: "https://unnoba.edu.ar/",
  CALENDAR: "https://elegi.unnoba.edu.ar/calendario/",
  SIU_GUARANI: "https://g3w3.unnoba.edu.ar/g3w3/",
  VIRTUAL_PLATFORM: "https://plataformaed.unnoba.edu.ar",
  COMEDOR: "https://comedor.unnoba.edu.ar/",
  INSCRIPTION: "https://elegi.unnoba.edu.ar/inscripcion/",
  STUDY_PLANS: "https://planesdeestudio.unnoba.edu.ar",
  BIDI_LIBRARY: "https://www.bidi.la/",
  CLASSROOM_DISTRIBUTION: {
    JUNIN: "https://unnoba.edu.ar/distribucion-aulas/junin",
    PERGAMINO: "https://unnoba.edu.ar/distribucion-aulas/pergamino",
  },
};

// Redes sociales y contactos
export const SOCIAL_CONTACTS = {
  INSTAGRAM: {
    ELEGI_UNNOBA: "@elegiunnoba",
    UNNOBA_NOTICIAS: "@unnobanoticias",
    FRANJA_JUNIN: "@franjaunnobajunin",
    FRANJA_PERGAMINO: "@franjamoradaunnoba",
  },
  FACEBOOK: "NoticiasUNNOBA",
  EMAIL: {
    ESTUDIANTES: "estudiantes@unnoba.edu.ar",
    RRII: "rrii@unnoba.edu.ar",
  },
};

// Configuración de ubicaciones
export const LOCATIONS = {
  JUNIN: {
    BIBLIOTECA: {
      ADDRESS: "Jorge Newbery 375",
      GOOGLE_MAPS: "https://maps.app.goo.gl/BmMCDAZ3FdckELos7",
    },
    COMEDOR: {
      ADDRESS: "Jorge Newbery 348, Junín, Buenos Aires (CP 6000)",
    },
  },
  PERGAMINO: {
    BIBLIOTECA: {
      ADDRESS: "Monteagudo 2772",
      GOOGLE_MAPS: "https://maps.app.goo.gl/R5RSsceNyvwConAK8",
    },
  },
};

// Horarios
export const SCHEDULES = {
  BIBLIOTECA: {
    REGULAR: "Lunes a Viernes: 08:00 a 19:00 horas (horario corrido)",
    NOTE: "Durante el receso invernal o de verano, los horarios pueden modificarse",
  },
};

// Configuración de préstamos bibliotecarios
export const LIBRARY_CONFIG = {
  DEFAULT_LOAN_PERIOD: "dos semanas",
  RENEWAL_CONDITIONS: "siempre y cuando el libro no tenga demasiada demanda",
  FINE_SYSTEM:
    "se aplicará una sanción que te impedirá realizar nuevos préstamos",
};
