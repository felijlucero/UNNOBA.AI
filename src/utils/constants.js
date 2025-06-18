export const SYSTEM_PROMPT = `Eres un asistente de chatbot para la Universidad Nacional del Noroeste de la Provincia de Buenos Aires (UNNOBA). Tu función es proporcionar información precisa y relevante únicamente sobre temas relacionados con la UNNOBA.

IMPORTANTE: Cuando alguien te pregunta sobre cualquier tema que esté relacionado con la universidad (comedor, biblioteca, inscripciones, etc.), debes asumir que se refieren específicamente a la UNNOBA. NO necesitas que el usuario especifique "de la UNNOBA" en cada pregunta.

TEMAS QUE DEBES MANEJAR (siempre en el contexto de UNNOBA):

INSCRIPCIÓN A MATERIAS:
- Proceso de inscripción a través de SIU-Guaraní
- Fechas del calendario académico
- Requisitos de regularidad (4 puntos anuales)
- Sistema de puntos: materias cursadas (1 punto), finales aprobados (2 puntos)
- Pérdida de regularidad y reinscripción (hasta 3 veces)

BIBLIOTECA:
- Ubicaciones: Junín (Jorge Newbery 375), Pergamino (Monteagudo 2772)
- Horarios: lunes a viernes 08:00-19:00
- Préstamo de libros (2 semanas, renovable)
- Acceso a biblioteca digital
- Sistema de registro y sanciones por atrasos

DISTRIBUCIÓN DE AULAS:
- Enlaces dinámicos para consulta diaria
- Junín: https://unnoba.edu.ar/distribucion-aulas/junin
- Pergamino: https://unnoba.edu.ar/distribucion-aulas/pergamino
- Para fechas específicas agregar ?date=DD-MM-YYYY
- Los domingos y feriados no tienen distribución disponible

COMEDOR UNIVERSITARIO:
- Reserva online en comedor.unnoba.edu.ar
- Dos menús diarios con descuento para estudiantes
- Ubicación: Jorge Newbery 348, Junín

PLATAFORMA VIRTUAL:
- Acceso en plataformaed.unnoba.edu.ar
- Materias actuales y anteriores
- Requiere cuenta institucional UNNOBA

CALENDARIO ACADÉMICO:
- Todas las fechas importantes de la universidad
- Inscripciones, finales, cuatrimestres, vacaciones
- Disponible en elegi.unnoba.edu.ar/calendarioacademico/

EJEMPLOS DE CÓMO DEBES RESPONDER:
- Si preguntan "¿Cómo funciona el comedor?" → Responder sobre el comedor de UNNOBA
- Si preguntan "¿Cuándo son los finales?" → Referir al calendario académico de UNNOBA
- Si preguntan "¿Dónde está la biblioteca?" → Dar ubicaciones de las bibliotecas de UNNOBA

Solo si la pregunta NO está relacionada con ninguno de estos temas universitarios, entonces puedes responder que no puedes ayudar.`;

// Función para obtener la fecha actual en formato DD-MM-YYYY
export const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
};

// Función para obtener la fecha de mañana en formato DD-MM-YYYY
export const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const day = String(tomorrow.getDate()).padStart(2, "0");
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const year = tomorrow.getFullYear();
  return `${day}-${month}-${year}`;
};

// Función para verificar si es domingo o día de semana donde no hay clases
export const isWeekendOrHoliday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Domingo, 6 = Sábado
  return dayOfWeek === 0; // Solo domingo para este caso
};

// Función para verificar si mañana es domingo o día de semana donde no hay clases
export const isTomorrowWeekendOrHoliday = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayOfWeek = tomorrow.getDay(); // 0 = Domingo, 6 = Sábado
  return dayOfWeek === 0; // Solo domingo para este caso
};

// Función para generar URL de distribución de aulas
export const getAulaDistributionURL = (
  location,
  includeToday = false,
  includeTomorrow = false
) => {
  const baseURL = `https://unnoba.edu.ar/distribucion-aulas/${location.toLowerCase()}`;

  if (includeToday && !isWeekendOrHoliday()) {
    return `${baseURL}?date=${getCurrentDate()}`;
  }

  if (includeTomorrow && !isTomorrowWeekendOrHoliday()) {
    return `${baseURL}?date=${getTomorrowDate()}`;
  }

  return baseURL;
};

export const PREDEFINED_RESPONSES = {
  "¿Dónde puedo contactar a la universidad o cuáles son sus redes sociales?":
    "<strong style='color: #007bbf;'>Redes de la Universidad</strong><br />Instagram: @elegiunnoba o @unnobanoticias<br />Facebook: NoticiasUNNOBA<br />Web: www.unnoba.edu.ar<br /><br /><strong style='color:rgb(150, 0, 137);'>Centro de estudiantes</strong><br />Vía Instagram:<br />Franja Morada Junín: @franjaunnobajunin<br />Franja Morada Pergamino: @franjamoradaunnoba<br /><br /><strong style='color:gray;'>Contactos institucionales📧</strong><br /> estudiantes@unnoba.edu.ar<br />También podés acercarte a Bienestar Estudiantil en tu sede.",

  "¿Cómo y cuándo me inscribo a materias o finales?":
    "Las inscripciones a materias y finales se realizan desde el sistema <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, ingresando con tu cuenta institucional.<br /><br />📅 Las fechas exactas para inscripciones, cursadas y finales están publicadas en el <a href='https://elegi.unnoba.edu.ar/calendarioacademico/' target='_blank' style='color:#005B96; font-weight:bold;'>Calendario Académico</a> de la UNNOBA. Te recomendamos revisarlo con frecuencia.<br /><br />⚠️ Recordá que algunas materias o finales requieren tener otras materias aprobadas (correlatividades). Para conocerlas, revisá el plan de estudios de tu carrera en el<a href='https://unnoba.edu.ar/' target='_blank' style='color:#005B96; font-weight:bold;'> sitio oficial de la UNNOBA</a>.",

  "¿Como utilizo la plataforma virtual?":
    "Al acceder a la plataforma virtual <a href='https://plataformaed.unnoba.edu.ar' target='_blank' style='color:#005B96; font-weight:bold;'>plataformaed.unnoba.edu.ar</a> vas a encontrar todas las materias que estés cursando actualmente o que hayas cursado previamente.<br /><br />📩 Para ingresar necesitás tu cuenta institucional de la UNNOBA. Si no podés acceder, consultá con la Dirección de Alumnos o el área de soporte académico.",

  "¿Cómo funciona el comedor?":
    "Para utilizar el comedor universitario debés ingresar a <a href='https://comedor.unnoba.edu.ar/' target='_blank' style='color:#005B96; font-weight:bold;'>comedor.unnoba.edu.ar</a> con tu cuenta institucional y realizar la reserva.<br /><br />🍽️ Cada día se ofrecen dos menús, y al acceder con tu cuenta UNNOBA obtenés un descuento especial.<br /><br />📍 Dirección del comedor: Jorge Newbery 348, Junín, Buenos Aires (CP 6000).",

  // Variaciones adicionales de preguntas frecuentes
  "¿Como funciona el comedor?":
    "Para utilizar el comedor universitario debés ingresar a <a href='https://comedor.unnoba.edu.ar/' target='_blank' style='color:#005B96; font-weight:bold;'>comedor.unnoba.edu.ar</a> con tu cuenta institucional y realizar la reserva.<br /><br />🍽️ Cada día se ofrecen dos menús, y al acceder con tu cuenta UNNOBA obtenés un descuento especial.<br /><br />📍 Dirección del comedor: Jorge Newbery 348, Junín, Buenos Aires (CP 6000).",

  "Como funciona el comedor":
    "Para utilizar el comedor universitario debés ingresar a <a href='https://comedor.unnoba.edu.ar/' target='_blank' style='color:#005B96; font-weight:bold;'>comedor.unnoba.edu.ar</a> con tu cuenta institucional y realizar la reserva.<br /><br />🍽️ Cada día se ofrecen dos menús, y al acceder con tu cuenta UNNOBA obtenés un descuento especial.<br /><br />📍 Dirección del comedor: Jorge Newbery 348, Junín, Buenos Aires (CP 6000).",

  // NUEVAS RESPUESTAS - INSCRIPCIÓN A MATERIAS
  "¿Cómo me inscribo a las materias?":
    "📝 <strong style='color: #005B96;'>Inscripción a Materias</strong><br /><br />La inscripción a las materias se realiza desde <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, dentro del período establecido en el calendario académico.<br /><br />En el sistema podrás seleccionar las materias que querés cursar este cuatrimestre, siempre respetando las correlatividades de tu plan de estudios.",

  "¿Dónde veo mi calendario académico?":
    "📅 <strong style='color: #005B96;'>Calendario Académico</strong><br /><br />Podés consultar el calendario académico oficial en: <a href='https://elegi.unnoba.edu.ar/calendarioacademico/' target='_blank' style='color:#005B96; font-weight:bold;'>elegi.unnoba.edu.ar/calendarioacademico/</a><br /><br />Ahí encontrarás todas las fechas importantes como:<br />• Inscripciones a materias y finales<br />• Inicio y fin de cuatrimestres<br />• Fechas de exámenes<br />• Vacaciones y feriados",

  "¿Necesito ser alumno regular para inscribirme a materias?":
    "✅ <strong style='color: #005B96;'>Regularidad Estudiantil</strong><br /><br />Sí, para poder inscribirte a materias es necesario tener la condición de <strong>alumno regular</strong>.<br /><br />La regularidad se verifica a fines de marzo de cada año y requiere sumar al menos <strong>4 puntos</strong> durante el período anterior.",

  "¿Cómo se suman puntos para mantener la regularidad?":
    "📊 <strong style='color: #005B96;'>Sistema de Puntos para Regularidad</strong><br /><br />Podés sumar puntos de las siguientes maneras:<br /><br />• <strong>Cada materia cursada y aprobada = 1 punto</strong><br />• <strong>Cada examen final aprobado = 2 puntos</strong><br /><br />💡 <strong>Ejemplos para llegar a 4 puntos:</strong><br />• Cursar y aprobar 4 materias<br />• Cursar 2 materias + aprobar 1 final<br />• Aprobar 2 exámenes finales<br /><br />Se pueden combinar cursadas y finales, siempre llegando a 4 puntos mínimo.",

  "¿Qué pasa si no llego a los 4 puntos?":
    "⚠️ <strong style='color: #d63384;'>Pérdida de Regularidad</strong><br /><br />Si no alcanzás los 4 puntos requeridos en el período correspondiente, <strong>perdés la condición de alumno regular</strong>.<br /><br />Sin embargo, podés seguir cursando. Para eso debés <strong>reinscribirte a la carrera</strong> y mantenés todas las materias cursadas y aprobadas anteriormente.<br /><br />⚠️ <strong>Importante:</strong> Podés reinscribirte hasta <strong>3 veces</strong>. Si superás ese límite, perdés todas las materias aprobadas.",

  // NUEVAS RESPUESTAS - BIBLIOTECA
  "¿Dónde está la biblioteca?":
    "📚 <strong style='color: #005B96;'>Ubicación de Bibliotecas</strong><br /><br /><strong>📍 Junín:</strong><br />Biblioteca UNNOBA - Jorge Newbery 375<br /><br /><strong>📍 Pergamino:</strong><br />Edificio del Rectorado - Monteagudo 2772",

  "¿Qué horario tiene la biblioteca?":
    "🕐 <strong style='color: #005B96;'>Horarios de Biblioteca</strong><br /><br />La biblioteca funciona de <strong>lunes a viernes, de 08:00 a 19:00 horas</strong>, en horario corrido.<br /><br />⚠️ Durante el receso invernal o de verano, los horarios pueden modificarse. Se recomienda consultar directamente con el personal bibliotecario.",

  "¿Cómo accedo a la biblioteca digital?":
    "💻 <strong style='color: #005B96;'>Biblioteca Digital</strong><br /><br />Para acceder a la biblioteca digital, podés ingresar desde el <a href='https://unnoba.edu.ar/' target='_blank' style='color:#005B96; font-weight:bold;'>sitio oficial de la UNNOBA</a>.<br /><br />Si necesitás ayuda con el proceso de acceso, el personal de biblioteca puede asistirte presencialmente.",

  "¿Cómo pido un libro prestado?":
    "📖 <strong style='color: #005B96;'>Préstamo de Libros</strong><br /><br />Para solicitar un libro prestado:<br /><br />1. Acercate a cualquiera de las sedes de la biblioteca<br />2. El bibliotecario te solicitará algunos datos para registrarte en el sistema<br />3. Una vez registrado, podrás solicitar libros en préstamo<br /><br />⚠️ Algunos títulos muy demandados pueden no estar disponibles de forma inmediata.",

  "¿Cuánto tiempo puedo tener un libro en préstamo?":
    "⏰ <strong style='color: #005B96;'>Tiempo de Préstamo</strong><br /><br />El préstamo habitual es por <strong>dos semanas</strong>.<br /><br />Sin embargo, este plazo puede variar según el tipo de material, por lo que es recomendable confirmar con el bibliotecario en cada caso.<br /><br />💡 Podés renovar el préstamo siempre que el libro no tenga demasiada demanda o esté reservado por otro estudiante.",

  "¿Qué pasa si me atraso en la devolución?":
    "⚠️ <strong style='color: #d63384;'>Atraso en Devolución</strong><br /><br />En caso de no devolver el libro a tiempo:<br /><br />• Se aplicará una <strong>sanción que impedirá realizar nuevos préstamos</strong> por un período determinado<br />• El personal de biblioteca se pondrá en contacto para conocer los motivos del retraso<br />• Podrán trabajar contigo para resolver la situación<br /><br />💡 Te recomendamos devolver los libros a tiempo o renovar el préstamo antes del vencimiento.",

  // NUEVAS RESPUESTAS - DISTRIBUCIÓN DE AULAS
  "¿Dónde se cursa cada materia?":
    "🏫 <strong style='color: #005B96;'>Distribución de Aulas</strong><br /><br />Podés consultar dónde se cursa cada materia en los siguientes enlaces:<br /><br />📍 <strong>Junín:</strong><br /><a href='https://unnoba.edu.ar/distribucion-aulas/junin' target='_blank' style='color:#005B96; font-weight:bold;'>Distribución de aulas - Junín</a><br /><br />📍 <strong>Pergamino:</strong><br /><a href='https://unnoba.edu.ar/distribucion-aulas/pergamino' target='_blank' style='color:#005B96; font-weight:bold;'>Distribución de aulas - Pergamino</a>",

  // RESPUESTAS ESPECÍFICAS PARA CONTEXTOS DETECTADOS
  "¿Puedo hablar con los profesores en la plataforma virtual?":
    "💬 <strong style='color: #005B96;'>Comunicación con Profesores en la Plataforma</strong><br /><br />Sí, en la plataforma virtual <a href='https://plataformaed.unnoba.edu.ar' target='_blank' style='color:#005B96; font-weight:bold;'>plataformaed.unnoba.edu.ar</a> podés comunicarte con tus profesores a través de:<br /><br />• <strong>Foros de consulta</strong> habilitados en cada materia<br />• <strong>Mensajería interna</strong> del sistema<br />• <strong>Anuncios y avisos</strong> que publican los docentes<br /><br />💡 La disponibilidad de estas funciones depende de cómo cada profesor configure su curso.",

  "¿Cuándo abren las inscripciones a cursadas?":
    "📅 <strong style='color: #005B96;'>Períodos de Inscripción</strong><br /><br />Las fechas específicas de inscripción a cursadas varían cada cuatrimestre y están publicadas en el <a href='https://elegi.unnoba.edu.ar/calendarioacademico/' target='_blank' style='color:#005B96; font-weight:bold;'>calendario académico oficial</a> de la UNNOBA.<br /><br />📋 <strong>Información importante:</strong><br />• Los períodos se publican con antelación<br />• Las fechas pueden variar por carrera<br />• Se realizan desde <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a><br /><br />💡 Te recomendamos revisar el calendario regularmente para no perder las fechas.",
};

// Respuestas dinámicas para distribución de aulas con fechas
export const DYNAMIC_RESPONSES = {
  aulaDistributionToday: (location) => {
    const today = getCurrentDate();
    const isWeekend = isWeekendOrHoliday();

    if (isWeekend) {
      return `🏫 <strong style='color: #005B96;'>Distribución de Aulas - ${location}</strong><br /><br />Los domingos no hay actividad académica, por lo que no hay distribución de aulas disponible.<br /><br />Podés consultar la distribución general en: <a href='${getAulaDistributionURL(
        location,
        false,
        false
      )}' target='_blank' style='color:#005B96; font-weight:bold;'>Distribución de aulas - ${location}</a>`;
    }

    return `🏫 <strong style='color: #005B96;'>Distribución de Aulas - ${location} (Hoy)</strong><br /><br />Podés ver la distribución de aulas para el día de hoy (${today}) en:<br /><br /><a href='${getAulaDistributionURL(
      location,
      true,
      false
    )}' target='_blank' style='color:#005B96; font-weight:bold;'>Ver distribución de hoy - ${location}</a><br /><br />También podés consultar la distribución general en: <a href='${getAulaDistributionURL(
      location,
      false,
      false
    )}' target='_blank' style='color:#005B96; font-weight:bold;'>Distribución general - ${location}</a>`;
  },

  aulaDistributionTodayBoth: () => {
    const today = getCurrentDate();
    const isWeekend = isWeekendOrHoliday();

    if (isWeekend) {
      return `🏫 <strong style='color: #005B96;'>Distribución de Aulas - Hoy (${today})</strong><br /><br />Los domingos no hay actividad académica, por lo que no hay distribución de aulas disponible.<br /><br />📍 <strong>Junín:</strong><br /><a href='${getAulaDistributionURL(
        "junin",
        false,
        false
      )}' target='_blank' style='color:#005B96; font-weight:bold;'>Distribución general - Junín</a><br /><br />📍 <strong>Pergamino:</strong><br /><a href='${getAulaDistributionURL(
        "pergamino",
        false,
        false
      )}' target='_blank' style='color:#005B96; font-weight:bold;'>Distribución general - Pergamino</a>`;
    }

    return `🏫 <strong style='color: #005B96;'>Distribución de Aulas - Hoy (${today})</strong><br /><br />📍 <strong>Junín:</strong><br /><a href='${getAulaDistributionURL(
      "junin",
      true,
      false
    )}' target='_blank' style='color:#005B96; font-weight:bold;'>Ver distribución de hoy - Junín</a><br /><br />📍 <strong>Pergamino:</strong><br /><a href='${getAulaDistributionURL(
      "pergamino",
      true,
      false
    )}' target='_blank' style='color:#005B96; font-weight:bold;'>Ver distribución de hoy - Pergamino</a><br /><br />💡 Los enlaces te llevan directamente a la distribución del día de hoy.`;
  },

  aulaDistributionTomorrow: (location) => {
    const tomorrow = getTomorrowDate();
    const isTomorrowWeekend = isTomorrowWeekendOrHoliday();

    if (isTomorrowWeekend) {
      return `🏫 <strong style='color: #005B96;'>Distribución de Aulas - ${location} (Mañana)</strong><br /><br />Mañana es domingo, por lo que no hay actividad académica y no hay distribución de aulas disponible.<br /><br />Podés consultar la distribución general en: <a href='${getAulaDistributionURL(
        location,
        false,
        false
      )}' target='_blank' style='color:#005B96; font-weight:bold;'>Distribución de aulas - ${location}</a>`;
    }

    return `🏫 <strong style='color: #005B96;'>Distribución de Aulas - ${location} (Mañana)</strong><br /><br />Podés ver la distribución de aulas para mañana (${tomorrow}) en:<br /><br /><a href='${getAulaDistributionURL(
      location,
      false,
      true
    )}' target='_blank' style='color:#005B96; font-weight:bold;'>Ver distribución de mañana - ${location}</a><br /><br />También podés consultar la distribución general en: <a href='${getAulaDistributionURL(
      location,
      false,
      false
    )}' target='_blank' style='color:#005B96; font-weight:bold;'>Distribución general - ${location}</a>`;
  },

  aulaDistributionTomorrowBoth: () => {
    const tomorrow = getTomorrowDate();
    const isTomorrowWeekend = isTomorrowWeekendOrHoliday();

    if (isTomorrowWeekend) {
      return `🏫 <strong style='color: #005B96;'>Distribución de Aulas - Mañana (${tomorrow})</strong><br /><br />Mañana es domingo, por lo que no hay actividad académica y no hay distribución de aulas disponible.<br /><br />📍 <strong>Junín:</strong><br /><a href='${getAulaDistributionURL(
        "junin",
        false,
        false
      )}' target='_blank' style='color:#005B96; font-weight:bold;'>Distribución general - Junín</a><br /><br />📍 <strong>Pergamino:</strong><br /><a href='${getAulaDistributionURL(
        "pergamino",
        false,
        false
      )}' target='_blank' style='color:#005B96; font-weight:bold;'>Distribución general - Pergamino</a>`;
    }

    return `🏫 <strong style='color: #005B96;'>Distribución de Aulas - Mañana (${tomorrow})</strong><br /><br />📍 <strong>Junín:</strong><br /><a href='${getAulaDistributionURL(
      "junin",
      false,
      true
    )}' target='_blank' style='color:#005B96; font-weight:bold;'>Ver distribución de mañana - Junín</a><br /><br />📍 <strong>Pergamino:</strong><br /><a href='${getAulaDistributionURL(
      "pergamino",
      false,
      true
    )}' target='_blank' style='color:#005B96; font-weight:bold;'>Ver distribución de mañana - Pergamino</a><br /><br />💡 Los enlaces te llevan directamente a la distribución de mañana.`;
  },
};

export const WELCOME_MESSAGE =
  "¡Hola! soy el asistente virtual de la unnoba, ¿En que puedo ayudarte?";

export const API_CONFIG = {
  apiKey: "AIzaSyC7AN2LSQqJijBR4IpPsp5ZGN_uk-C2UQA",
  model: "gemini-1.5-flash",
};

export const TYPING_SPEED = 75;
export const RESPONSE_TYPING_SPEED = 20;
export const MAX_WORD_COUNT = 200;
