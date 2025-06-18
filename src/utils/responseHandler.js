import { DYNAMIC_RESPONSES, PREDEFINED_RESPONSES } from "./constants";

// Función para normalizar texto (quitar acentos, signos, mayúsculas)
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Quitar acentos
    .replace(/[¿?¡!]/g, "") // Quitar signos de interrogación/exclamación
    .trim();
};

// Función para detectar contexto específico
const detectSpecificContext = (message) => {
  const normalizedMessage = normalizeText(message);

  // Detección específica para biblioteca + reserva/libro/horario
  if (
    (normalizedMessage.includes("biblioteca") ||
      normalizedMessage.includes("bibliote") ||
      normalizedMessage.includes("reservo") ||
      normalizedMessage.includes("reservar") ||
      normalizedMessage.includes("prestado") ||
      normalizedMessage.includes("horario tiene")) &&
    (normalizedMessage.includes("reservar") ||
      normalizedMessage.includes("reservo") ||
      normalizedMessage.includes("libro") ||
      normalizedMessage.includes("prestamo") ||
      normalizedMessage.includes("prestado") ||
      normalizedMessage.includes("horario"))
  ) {
    // Determinar qué aspecto específico de biblioteca
    if (normalizedMessage.includes("horario")) {
      return "biblioteca_horario";
    } else if (
      normalizedMessage.includes("reservar") ||
      normalizedMessage.includes("reservo") ||
      normalizedMessage.includes("prestamo") ||
      normalizedMessage.includes("prestado")
    ) {
      return "biblioteca_libros";
    }
    return "biblioteca_libros";
  }

  // Detección para preguntas de seguimiento sobre horarios (cuando solo dice "que horario tiene")
  if (
    (normalizedMessage.includes("horario") ||
      normalizedMessage.includes("horarios")) &&
    (normalizedMessage.includes("tiene") ||
      normalizedMessage.includes("abre") ||
      normalizedMessage.includes("cierra"))
  ) {
    return "biblioteca_horario";
  }

  // Detección específica para comedor + reserva
  if (
    (normalizedMessage.includes("comedor") ||
      normalizedMessage.includes("almuerzo")) &&
    (normalizedMessage.includes("reservar") ||
      normalizedMessage.includes("reserva"))
  ) {
    return "comedor_reserva";
  }

  // Detección específica para plataforma + profesores/hablar
  if (
    (normalizedMessage.includes("plataforma") ||
      normalizedMessage.includes("ed")) &&
    (normalizedMessage.includes("profe") ||
      normalizedMessage.includes("hablar") ||
      normalizedMessage.includes("contactar"))
  ) {
    return "plataforma_profesores";
  }

  // Detección específica para inscripción + período/fecha
  if (
    (normalizedMessage.includes("inscripcion") ||
      normalizedMessage.includes("inscribir")) &&
    (normalizedMessage.includes("periodo") ||
      normalizedMessage.includes("fecha") ||
      normalizedMessage.includes("cuando"))
  ) {
    return "inscripcion_fechas";
  }

  return null;
};

// Mapeo de temas UNNOBA con palabras clave y respuestas asociadas
const UNNOBA_TOPICS = {
  // Contextos específicos primero
  plataforma_profesores: {
    keywords: ["dummy"], // No necesitamos keywords aquí, se detecta por contexto
    responses: ["¿Puedo hablar con los profesores en la plataforma virtual?"],
  },
  inscripcion_fechas: {
    keywords: ["dummy"], // No necesitamos keywords aquí, se detecta por contexto
    responses: ["¿Cuándo abren las inscripciones a cursadas?"],
  },
  biblioteca_libros: {
    keywords: ["dummy"], // No necesitamos keywords aquí, se detecta por contexto
    responses: ["¿Cómo pido un libro prestado?"],
  },
  biblioteca_horario: {
    keywords: ["dummy"], // No necesitamos keywords aquí, se detecta por contexto
    responses: ["¿Qué horario tiene la biblioteca?"],
  },
  comedor_reserva: {
    keywords: ["dummy"], // No necesitamos keywords aquí, se detecta por contexto
    responses: ["¿Cómo funciona el comedor?"],
  },

  // Temas generales
  comedor: {
    keywords: [
      "comedor",
      "come",
      "almuerzo",
      "menu",
      "comida",
      "comer",
      "almorzar",
      "almuerza",
    ],
    responses: [
      "¿Cómo funciona el comedor?",
      "¿Como funciona el comedor?",
      "Como funciona el comedor",
    ],
  },
  inscripcion_materias: {
    keywords: [
      "inscripcion",
      "inscribir",
      "materia",
      "cursada",
      "cursar",
      "siu",
      "guarani",
    ],
    responses: [
      "¿Cómo me inscribo a las materias?",
      "¿Cómo y cuándo me inscribo a materias o finales?",
    ],
  },
  calendario: {
    keywords: [
      "calendario",
      "fecha",
      "cuatrimestre",
      "finales",
      "examenes",
      "vacaciones",
    ],
    responses: ["¿Dónde veo mi calendario académico?"],
  },
  biblioteca: {
    keywords: [
      "biblioteca",
      "libro",
      "prestamo",
      "horario biblioteca",
      "bibliote",
    ],
    responses: [
      "¿Dónde está la biblioteca?",
      "¿Qué horario tiene la biblioteca?",
      "¿Cómo pido un libro prestado?",
    ],
  },
  plataforma: {
    keywords: [
      "plataforma",
      "virtual",
      "campus",
      "moodle",
      "aula virtual",
      "ed",
    ],
    responses: ["¿Como utilizo la plataforma virtual?"],
  },
  aulas: {
    keywords: ["aula", "distribucion", "cursa", "salon", "donde se da"],
    responses: ["¿Dónde se cursa cada materia?"],
  },
  contacto: {
    keywords: [
      "contacto",
      "telefono",
      "mail",
      "email",
      "redes",
      "instagram",
      "facebook",
    ],
    responses: [
      "¿Dónde puedo contactar a la universidad o cuáles son sus redes sociales?",
    ],
  },
  regularidad: {
    keywords: [
      "regular",
      "regularidad",
      "puntos",
      "alumno regular",
      "4 puntos",
    ],
    responses: [
      "¿Necesito ser alumno regular para inscribirme a materias?",
      "¿Cómo se suman puntos para mantener la regularidad?",
      "¿Qué pasa si no llego a los 4 puntos?",
    ],
  },
};

// Función para detectar temas relacionados con UNNOBA
const detectUnnobaTopics = (message) => {
  const normalizedMessage = normalizeText(message);

  // Primero verificar contextos específicos
  const specificContext = detectSpecificContext(message);
  if (specificContext) {
    const topicData = UNNOBA_TOPICS[specificContext];
    if (topicData) {
      return {
        topic: specificContext,
        possibleResponses: topicData.responses,
      };
    }
  }

  // Luego buscar por keywords generales
  for (const [topic, data] of Object.entries(UNNOBA_TOPICS)) {
    // Saltar los contextos específicos ya procesados
    if (
      [
        "plataforma_profesores",
        "inscripcion_fechas",
        "biblioteca_libros",
        "biblioteca_horario",
        "comedor_reserva",
      ].includes(topic)
    ) {
      continue;
    }

    for (const keyword of data.keywords) {
      if (normalizedMessage.includes(normalizeText(keyword))) {
        return {
          topic: topic,
          possibleResponses: data.responses,
        };
      }
    }
  }

  return null;
};

// Función para encontrar la mejor respuesta predefinida
const findBestPredefinedResponse = (possibleResponses) => {
  for (const response of possibleResponses) {
    if (PREDEFINED_RESPONSES[response]) {
      return PREDEFINED_RESPONSES[response];
    }
  }
  return null;
};

// Función para detectar preguntas sobre distribución de aulas
export const detectAulaDistributionQuery = (message) => {
  const lowerMessage = message.toLowerCase();

  // Patrones para detectar consultas sobre distribución de aulas
  const patterns = {
    today:
      /\b(hoy|día de hoy|distribución de hoy|de hoy|del día|distribucion hoy)\b/,
    tomorrow:
      /\b(mañana|día de mañana|distribución de mañana|de mañana|mañana en)\b/,
    junin: /\b(junín|junin)\b/,
    pergamino: /\b(pergamino)\b/,
    aulas:
      /\b(aulas?|distribución|distribucion|cursa|materia|clase|salon|donde se da|ver aulas|quiero ver|saber.*aulas|cual.*distribucion)\b/,
  };

  // Verificar si es una consulta sobre distribución de aulas
  if (patterns.aulas.test(lowerMessage)) {
    let location = null;

    // Determinar la ubicación
    if (patterns.junin.test(lowerMessage)) {
      location = "Junín";
    } else if (patterns.pergamino.test(lowerMessage)) {
      location = "Pergamino";
    }

    // Verificar si es sobre "hoy"
    if (patterns.today.test(lowerMessage)) {
      if (location) {
        // Si especifica ubicación, dar solo esa ubicación
        return {
          type: "aula_distribution_today",
          location: location,
        };
      } else {
        // Si no especifica ubicación, dar ambas
        return {
          type: "aula_distribution_today_both",
          location: null,
        };
      }
    }

    // Verificar si es sobre "mañana"
    if (patterns.tomorrow.test(lowerMessage)) {
      if (location) {
        // Si especifica ubicación, dar solo esa ubicación
        return {
          type: "aula_distribution_tomorrow",
          location: location,
        };
      } else {
        // Si no especifica ubicación, dar ambas
        return {
          type: "aula_distribution_tomorrow_both",
          location: null,
        };
      }
    }
  }

  return null;
};

// Función para generar respuestas dinámicas
export const generateDynamicResponse = (queryType, params) => {
  switch (queryType) {
    case "aula_distribution_today":
      return DYNAMIC_RESPONSES.aulaDistributionToday(params.location);
    case "aula_distribution_today_both":
      return DYNAMIC_RESPONSES.aulaDistributionTodayBoth();
    case "aula_distribution_tomorrow":
      return DYNAMIC_RESPONSES.aulaDistributionTomorrow(params.location);
    case "aula_distribution_tomorrow_both":
      return DYNAMIC_RESPONSES.aulaDistributionTomorrowBoth();
    default:
      return null;
  }
};

// Función principal para manejar respuestas
export const handleResponse = (message) => {
  // Primero verificar si es una respuesta predefinida exacta
  if (PREDEFINED_RESPONSES[message]) {
    return {
      type: "predefined",
      response: PREDEFINED_RESPONSES[message],
    };
  }

  // Verificar si es una consulta dinámica (distribución de aulas)
  const dynamicQuery = detectAulaDistributionQuery(message);
  if (dynamicQuery) {
    const response = generateDynamicResponse(dynamicQuery.type, dynamicQuery);
    if (response) {
      return {
        type: "dynamic",
        response: response,
      };
    }
  }

  // Verificar si es un tema relacionado con UNNOBA
  const unnobaTopicDetected = detectUnnobaTopics(message);
  if (unnobaTopicDetected) {
    const response = findBestPredefinedResponse(
      unnobaTopicDetected.possibleResponses
    );
    if (response) {
      return {
        type: "unnoba_topic",
        response: response,
      };
    }
  }

  // Si no es ninguna de las anteriores, debe ir por IA
  return {
    type: "ai",
    response: null,
  };
};

// Función para detectar si una pregunta necesita procesamiento especial
export const needsSpecialProcessing = (message) => {
  const result = handleResponse(message);
  return result.type !== "ai";
};
