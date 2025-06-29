import { UNNOBA_URLS, SOCIAL_CONTACTS } from "../apiConstants.js";

// Respuestas generales sobre la universidad
export const GENERAL_RESPONSES = {
  "¿Dónde puedo contactar a la universidad o cuáles son sus redes sociales?": `**Redes de la Universidad**
Instagram: ${SOCIAL_CONTACTS.INSTAGRAM.ELEGI_UNNOBA} o ${SOCIAL_CONTACTS.INSTAGRAM.UNNOBA_NOTICIAS}
Facebook: ${SOCIAL_CONTACTS.FACEBOOK}
Web: ${UNNOBA_URLS.MAIN_SITE}

**Centro de estudiantes**
Vía Instagram:
Franja Morada Junín: ${SOCIAL_CONTACTS.INSTAGRAM.FRANJA_JUNIN}
Franja Morada Pergamino: ${SOCIAL_CONTACTS.INSTAGRAM.FRANJA_PERGAMINO}

**Contactos institucionales📧**
${SOCIAL_CONTACTS.EMAIL.ESTUDIANTES}
También podés acercarte a Bienestar Estudiantil en tu sede.`,

  "¿Como utilizo la plataforma virtual o campus?": `Al acceder a la **plataforma virtual** (${UNNOBA_URLS.VIRTUAL_PLATFORM}) vas a encontrar todas las materias que estés cursando actualmente o que hayas cursado previamente.

📩 Para ingresar necesitás tu cuenta institucional de la UNNOBA. Si no podés acceder, consultá con la Dirección de Alumnos o el área de soporte académico.`,

  "¿Cómo conectarse al WiFi institucional?":
    "Podés usar el WiFi público, pero para mejor conexión, ingresá con tu cuenta institucional.",

  "¿Dónde estudiar o hacer trabajos grupales?":
    "Tenés el Comedor Universitario, el Aula Parlante y otros espacios comunes.",
};

// Respuestas sobre inscripciones
export const INSCRIPTION_RESPONSES = {
  "¿Cómo y cuándo me inscribo a materias o finales?": `Las inscripciones a materias y finales se realizan desde el sistema **SIU-Guaraní** (${UNNOBA_URLS.SIU_GUARANI}), ingresando con tu cuenta institucional.

📅 Las fechas exactas para inscripciones, cursadas y finales están publicadas en el **Calendario Académico** (${UNNOBA_URLS.CALENDAR}) de la UNNOBA. Te recomendamos revisarlo con frecuencia.

⚠️ Recordá que algunas materias o finales requieren tener otras materias aprobadas (correlatividades). Para conocerlas, revisá el plan de estudios de tu carrera en el **Sitio Oficial de la UNNOBA** (${UNNOBA_URLS.MAIN_SITE}).`,

  "¿Cómo me inscribo a las materias?": `La inscripción a las materias se realiza desde **SIU-Guaraní** (${UNNOBA_URLS.SIU_GUARANI}), dentro del período establecido en el calendario académico. Allí podrás seleccionar las materias que querés cursar este cuatrimestre.

📅 Consultá las fechas exactas en el **Calendario Académico** (${UNNOBA_URLS.CALENDAR})`,

  "¿Dónde veo mi calendario académico?": `El calendario académico oficial de la UNNOBA está disponible en: **🔗 Calendario Académico UNNOBA** (${UNNOBA_URLS.CALENDAR})

Allí encontrarás todas las fechas importantes: inscripciones, inicio de clases, fechas de examen, feriados y más.`,

  "¿Necesito ser alumno regular para inscribirme a materias?": `Sí, para poder inscribirte a materias es necesario tener la condición de **alumno regular**.

📊 La regularidad se verifica a fines de marzo de cada año y requiere sumar al menos **4 puntos** durante el período anterior (combinando materias cursadas y finales aprobados).`,
};

// Respuestas sobre regularidad estudiantil
export const REGULARITY_RESPONSES = {
  "¿Cómo se suman puntos para mantener la regularidad?": `Para mantener la regularidad necesitás **4 puntos mínimo**:

📌 **Cada materia cursada y aprobada = 1 punto**
📌 **Cada examen final aprobado = 2 puntos**

**Ejemplos:**
• Cursar y aprobar 4 materias = 4 puntos ✅
• Cursar 2 materias + aprobar 1 final = 4 puntos ✅
• Aprobar 2 exámenes finales = 4 puntos ✅`,

  "¿Puedo seguir cursando si pierdo la regularidad?": `Sí, podés seguir cursando. Para eso debés **reinscribirte a la carrera**.

✅ **Buenas noticias:** Mantenés todas las materias cursadas y aprobadas anteriormente.

⚠️ **Límite:** Podés reinscribirte hasta 3 veces. Si superas ese límite, perdés todas las materias aprobadas y tenés que inscribirte nuevamente desde cero.`,
};

// Respuestas sobre el comedor
export const COMEDOR_RESPONSES = {
  "¿Cómo funciona el comedor?": `Para utilizar el comedor universitario debés ingresar a **comedor.unnoba.edu.ar** (${UNNOBA_URLS.COMEDOR}) con tu cuenta institucional y realizar la reserva.

🍽️ Cada día se ofrecen dos menús, y al acceder con tu cuenta UNNOBA obtenés un descuento especial.

📍 **Dirección del comedor:** Jorge Newbery 348, Junín, Buenos Aires (CP 6000).`,
};

// Preguntas frecuentes estructuradas
export const FREQUENT_QUESTIONS = [
  {
    pregunta: "¿Qué función cumple el centro de estudiantes?",
    respuesta:
      "Ayuda e informa sobre inscripción, calendario, distribución de aulas, becas y paros.",
  },
  {
    pregunta: "¿Dónde cursan las materias en Junín?",
    respuesta: `Podés verlo en la distribución de aulas de Junín: ${UNNOBA_URLS.CLASSROOM_DISTRIBUTION.JUNIN}`,
  },
  {
    pregunta: "¿Cómo conectarse al WiFi institucional?",
    respuesta:
      "Podés usar el WiFi público, pero para mejor conexión, ingresá con tu cuenta institucional.",
  },
  {
    pregunta: "¿Dónde estudiar o hacer trabajos grupales?",
    respuesta:
      "Tenés el Comedor Universitario, el Aula Parlante y otros espacios comunes.",
  },
  {
    pregunta: "¿Cómo me inscribo a las materias?",
    respuesta: `La inscripción a las materias se realiza desde <a href='${UNNOBA_URLS.SIU_GUARANI}' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, dentro del período establecido en el calendario académico. Allí podrás seleccionar las materias que querés cursar este cuatrimestre.`,
  },
  {
    pregunta: "¿Dónde veo mi calendario académico?",
    respuesta: `El calendario académico oficial de la UNNOBA está disponible en: <a href='${UNNOBA_URLS.CALENDAR}' target='_blank' style='color:#005B96; font-weight:bold;'>Calendario Académico UNNOBA</a>`,
  },
  {
    pregunta: "¿Necesito ser alumno regular para inscribirme a materias?",
    respuesta:
      "Sí, para poder inscribirte a materias es necesario tener la condición de alumno regular.",
  },
  {
    pregunta: "¿Cómo se suman puntos para mantener la regularidad?",
    respuesta:
      "Podés sumar puntos de las siguientes maneras:<br/>• Cada materia cursada y aprobada suma 1 punto<br/>• Cada examen final aprobado suma 2 puntos<br/>• Se pueden combinar cursadas y finales, siempre que se llegue a 4 puntos como mínimo",
  },
  {
    pregunta: "¿Puedo seguir cursando si pierdo la regularidad?",
    respuesta:
      "Sí, podés seguir cursando. Para eso debés reinscribirte a la carrera. En ese caso, mantenés todas las materias cursadas y aprobadas anteriormente.",
  },
];

// Todas las respuestas predefinidas combinadas
export const PREDEFINED_RESPONSES = {
  ...GENERAL_RESPONSES,
  ...INSCRIPTION_RESPONSES,
  ...REGULARITY_RESPONSES,
  ...COMEDOR_RESPONSES,
};
