import {
  UNNOBA_URLS,
  LOCATIONS,
  SCHEDULES,
  LIBRARY_CONFIG,
} from "../apiConstants.js";

// Respuestas sobre la biblioteca
export const BIBLIOTECA_RESPONSES = {
  "¿Dónde está la biblioteca?": `📍 **UBICACIÓN DE LA BIBLIOTECA - UNNOBA**

🏢 **Junín:**
• **Biblioteca UNNOBA:** ${LOCATIONS.JUNIN.BIBLIOTECA.ADDRESS}
• **Google Maps:** ${LOCATIONS.JUNIN.BIBLIOTECA.GOOGLE_MAPS}

🏢 **Pergamino:**
• **Edificio del Rectorado:** ${LOCATIONS.PERGAMINO.BIBLIOTECA.ADDRESS}
• **Google Maps:** ${LOCATIONS.PERGAMINO.BIBLIOTECA.GOOGLE_MAPS}`,

  "¿Qué horario tiene la biblioteca?": `🕐 **HORARIOS DE LA BIBLIOTECA - UNNOBA**

📅 **Horario regular:**
• **${SCHEDULES.BIBLIOTECA.REGULAR}**

⚠️ **Horarios especiales:**
• ${SCHEDULES.BIBLIOTECA.NOTE}
• Se recomienda consultar directamente con el personal bibliotecario para confirmar horarios durante períodos especiales`,

  "¿Cómo accedo a la biblioteca digital?": `💻 **BIBLIOTECA DIGITAL - UNNOBA**

• Para acceder a la biblioteca digital, podés ingresar desde el sitio oficial de la UNNOBA
• En caso de necesitar ayuda, el personal de biblioteca puede asistirte en el proceso

🔗 **Acceso directo:**
• **BiDi - Biblioteca Digital:** ${UNNOBA_URLS.BIDI_LIBRARY}`,

  "¿Cómo hago para pedir un libro prestado?": `📚 **PRÉSTAMO DE LIBROS - BIBLIOTECA UNNOBA**

• Debés acercarte a alguna de las sedes de la biblioteca
• El bibliotecario te solicitará algunos datos para registrarte en el sistema
• A partir de ahí podrás solicitar libros en préstamo
• Algunos títulos muy demandados pueden no estar disponibles de forma inmediata`,

  "¿Cuánto tiempo puedo tener un libro en préstamo?": `⏰ **TIEMPO DE PRÉSTAMO - BIBLIOTECA UNNOBA**

• El préstamo habitual es por **${LIBRARY_CONFIG.DEFAULT_LOAN_PERIOD}**
• Este plazo puede variar según el tipo de material
• Es recomendable confirmar con el bibliotecario en cada caso`,

  "¿Puedo renovar el préstamo de un libro?": `🔄 **RENOVACIÓN DE PRÉSTAMOS - BIBLIOTECA UNNOBA**

• Sí, ${LIBRARY_CONFIG.RENEWAL_CONDITIONS}
• No debe estar reservado por otro estudiante
• La renovación debe gestionarse con antelación
• Puede hacerse directamente en la biblioteca`,

  "¿Qué pasa si me atraso en la devolución?": `⚠️ **ATRASO EN DEVOLUCIÓN - BIBLIOTECA UNNOBA**

• ${LIBRARY_CONFIG.FINE_SYSTEM} por un período determinado
• El personal de biblioteca se pondrá en contacto para conocer los motivos del retraso
• La situación debe resolverse para poder acceder a nuevos préstamos`,

  "¿Necesito registrarme para acceder a la biblioteca?": `📝 **REGISTRO EN BIBLIOTECA - UNNOBA**

• **No es necesario** realizar un registro previo para ingresar
• Si sos estudiante o docente de la UNNOBA, podés utilizar las instalaciones libremente
• Solo se pide completar un registro de asistencia al ingresar
• Este registro es para fines de control interno de la biblioteca`,
};

// Respuestas sobre distribución de aulas
export const DISTRIBUCION_AULAS_RESPONSES = {
  "¿Dónde se cursa cada materia?": `🏢 **DISTRIBUCIÓN DE AULAS - UNNOBA**

La distribución de aulas puede consultarse a través de los siguientes enlaces:

**📚 Junín:**
• **Distribución de aulas - Junín:** ${UNNOBA_URLS.CLASSROOM_DISTRIBUTION.JUNIN}

**📚 Pergamino:**
• **Distribución de aulas - Pergamino:** ${UNNOBA_URLS.CLASSROOM_DISTRIBUTION.PERGAMINO}`,
};

// Respuestas sobre finales y exámenes
export const FINALES_RESPONSES = {
  "¿Cuándo son las mesas de finales?": `📝 **MESAS DE FINALES - UNNOBA**

Las mesas de exámenes finales están programadas según las fechas establecidas en el calendario académico oficial de la UNNOBA. Generalmente, se realizan durante la segunda semana de cada mes. Sin embargo, es importante tener en cuenta que en los meses de enero y octubre no se habilita la inscripción a mesas de finales. Para conocer las fechas exactas y actualizadas, se recomienda consultar el calendario académico disponible en el sitio web de la universidad.

**📋 Para fechas exactas consultá:**
• **Calendario académico:** ${UNNOBA_URLS.CALENDAR}
• **SIU-Guaraní:** ${UNNOBA_URLS.SIU_GUARANI}`,

  "¿Qué es un exámen final?": `Un examen final es la evaluación que se realiza al concluir el cursado de una materia para acreditar los conocimientos adquiridos y obtener la **aprobación definitiva** de la asignatura.

**📋 Características importantes:**
• **Requisito:** Debes tener la materia **regular** para rendir
• **Modalidad:** Puede ser oral, escrito o mixto según la cátedra
• **Nota mínima:** Generalmente 4 (cuatro) para aprobar
• **Validez:** Una vez aprobado, queda registrado definitivamente

**🎯 Importancia:**
• **Avance académico:** Permite continuar con materias correlativas
• **Título:** Es requisito para la obtención del título de grado
• **Promedio:** Influye en tu promedio general de la carrera

💡 **Tip:** Consultá con la cátedra sobre el formato y contenidos del examen.`,

  "¿Cómo me inscribo a un examen?": `📝 **INSCRIPCIÓN A EXÁMENES FINALES - UNNOBA**

**¿Cómo me inscribo a un final?**

**🖥️ Sistema de inscripción:**
• **Plataforma:** SIU-Guaraní 3W
• **Enlace:** ${UNNOBA_URLS.SIU_GUARANI}

**📅 Plazos importantes:**
• **Inscripción:** Hasta **48 horas antes** del examen
• **Horario:** Respetá los horarios de inscripción establecidos
• **Confirmación:** Verificá que la inscripción se haya registrado correctamente

**✅ Requisitos:**
• Tener la materia **regular**
• Estar dentro del período de inscripción
• No tener materias correlativas pendientes (si aplica)

**⚠️ Importante:**
• Si no te inscribís en tiempo y forma, **no podrás rendir**
• Verificá siempre la fecha, hora y aula del examen

💡 **Recomendación:** Inscribite con anticipación para evitar inconvenientes.`,

  "¿Qué pasa si falto a un final?": `**📋 Consecuencias:**
• **Ausente:** Quedarás registrado como "ausente" en el acta
• **Sin calificación:** No obtenés calificación en esa oportunidad
• **Pérdida de turno:** Perdés esa oportunidad de examen
• **Nueva inscripción:** Deberás inscribirte nuevamente en otro turno

**🔄 ¿Puedo recuperar la oportunidad?**
• **No hay recuperación automática** de la oportunidad perdida
• Deberás esperar al **próximo turno disponible**
• **Conservás** las oportunidades restantes para rendir

**⚠️ Excepciones:**
• **Causas justificadas** pueden ser evaluadas por la coordinación
• Consultá con **Departamento de Alumnos** si tenés una situación especial

💡 **Recomendación:** Si sabés que no podrás asistir, **date de baja** antes del examen.`,

  "¿Hasta cuándo tengo tiempo de darme de baja a un final?": `⏰ **BAJA DE EXAMEN FINAL - UNNOBA**

**¿Hasta cuándo puedo cancelar mi inscripción?**

**📅 Plazo para darse de baja:**
• **Hasta 48 horas antes** del examen
• Mismo plazo que para inscribirse
• **No se permiten bajas** el día del examen

**🖥️ ¿Cómo me doy de baja?**
• **SIU-Guaraní 3W:** ${UNNOBA_URLS.SIU_GUARANI}
• Accedé a "Exámenes Finales"
• Seleccioná la opción "Dar de baja"

**✅ Ventajas de darse de baja:**
• **No figurás como ausente** en el acta
• **Conservás todas** las oportunidades de examen
• **No afecta** tu registro académico

**⚠️ Importante:**
• Una vez vencido el plazo, **no podrás darte de baja**
• Si faltás sin darte de baja, quedarás como "ausente"

💡 **Recomendación:** Si tenés dudas sobre rendir, es mejor darse de baja a tiempo.`,

  "¿Qué pasa si no apruebo un examen final?": `📚 **DESAPROBACIÓN DE EXAMEN FINAL - UNNOBA**

**¿Qué sucede si no apruebo el final?**

**📋 Consecuencias:**
• **Nota menor a 4:** El examen queda **desaprobado**
• **Oportunidad utilizada:** Se consume una de tus oportunidades
• **Nueva inscripción:** Podrás inscribirte en el próximo turno disponible

**🔄 ¿Puedo volver a rendir?**
• **Sí, podés volver a rendir** en los próximos turnos
• **Conservás** las oportunidades restantes
• **Sin límite de tiempo** entre intentos (dentro del período de regularidad)

**📊 Registro académico:**
• La nota desaprobatoria **queda registrada**
• **No afecta** otras materias ya aprobadas
• Solo la **última nota aprobatoria** cuenta para el promedio

**💡 Consejos para el próximo intento:**
• **Revisá** los temas que más dificultad te presentaron
• **Consultá** con la cátedra sobre áreas de mejora
• **Preparate** con tiempo suficiente

⚠️ **Recordá:** Tenés **5 oportunidades** en total para aprobar cada materia.`,

  "¿Cuántas veces puedo rendir un examen final?": `🔢 **OPORTUNIDADES DE EXAMEN FINAL - UNNOBA**

**¿Cuántas chances tengo para aprobar?**

**📊 Límite de oportunidades:**
• **5 oportunidades** por materia
• **3 años** desde la pérdida de regularidad para utilizarlas
• **Se cuentan:** Ausencias y desaprobaciones

**⚠️ ¿Qué pasa si agoto las 5 oportunidades?**
• **Deberás recursar** la materia completa
• **Nuevo cursado:** Clases, trabajos prácticos y parciales
• **Nuevas 5 oportunidades** una vez que vuelvas a estar regular

**📅 Tiempo límite:**
• **3 años** desde que perdés la regularidad
• Si no rendís en ese período, **deberás recursar**
• El tiempo corre independientemente de si rendís o no

**💡 Estrategias recomendadas:**
• **No desperdicies** oportunidades sin preparación adecuada
• **Consultá** con la cátedra antes de cada intento
• **Planificá** bien tus intentos dentro del plazo de 3 años

🎯 **Objetivo:** Aprobar antes de agotar las oportunidades disponibles.`,

  "¿Qué son las materias correlativas?": `🔗 **MATERIAS CORRELATIVAS - UNNOBA**

**¿Qué significa "correlatividad"?**

**📚 Definición:**
Las materias correlativas son **asignaturas previas** que debés tener aprobadas para poder cursar o rendir una materia específica. Establecen un orden lógico de aprendizaje.

**🎯 Tipos de correlatividades:**
• **Para cursar:** Materias que debés tener aprobadas para inscribirte al cursado
• **Para rendir:** Materias que debés tener aprobadas para rendir el final

**📋 Ejemplos típicos:**
• **Análisis Matemático II** requiere **Análisis Matemático I**
• **Programación Orientada a Objetos** requiere **Programación Imperativa**

**🔍 ¿Dónde consulto las correlatividades?**
• **Plan de estudios** de tu carrera: ${UNNOBA_URLS.STUDY_PLANS}
• **SIU-Guaraní:** ${UNNOBA_URLS.SIU_GUARANI}
• **Coordinación** de tu carrera

**⚠️ Importante:**
• **No podrás inscribirte** si no cumplís con las correlatividades
• Verificá siempre antes de planificar tu cursado

💡 **Tip:** Planificá tu cursado considerando las correlatividades para optimizar tu avance académico.`,
};

// Respuestas sobre tesis y títulos
export const TESIS_RESPONSES = {
  tesis:
    "Para información sobre trabajos finales de carrera, tesis o tesinas, consultá con la coordinación de tu carrera o con el departamento académico correspondiente.",
};

export const TITULO_RESPONSES = {
  titulo:
    "Para trámites relacionados con la obtención del título, consultá con el Departamento de Alumnos de tu sede o revisá los requisitos en el sitio oficial de la UNNOBA.",
};

// Combinar todas las respuestas especializadas
export const SPECIALIZED_RESPONSES = {
  ...BIBLIOTECA_RESPONSES,
  ...DISTRIBUCION_AULAS_RESPONSES,
  ...FINALES_RESPONSES,
  ...TESIS_RESPONSES,
  ...TITULO_RESPONSES,
};
