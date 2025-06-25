const CALENDAR_ANSWER = `Toda la información sobre fechas la encontrarás en el calendario académico oficial de la UNNOBA. Podés consultarlo en el siguiente enlace: <a href='https://elegi.unnoba.edu.ar/calendario-academico/' target='_blank' style='color:#005B96; font-weight:bold;'>Calendario Académico</a>.`;

const REGULARITY_ANSWER =
  "Para poder inscribirte a materias es necesario tener la condición de <strong>alumno regular</strong>.<br/><br/><strong>¿Cuándo y cómo se verifica?</strong><br/>La regularidad se verifica a fines de marzo de cada año. Por ejemplo, la regularidad 2025 se evalúa considerando el período entre marzo de 2024 y marzo de 2025. Para mantenerla, necesitás sumar al menos <strong>4 puntos</strong> en ese período.<br/><br/><strong>¿Cómo se suman puntos?</strong><br/>Podés sumar puntos de las siguientes maneras:<br/><ul><li>Cada materia cursada y aprobada: <strong>1 punto</strong>.</li><li>Cada examen final aprobado: <strong>2 puntos</strong>.</li></ul>Se pueden combinar cursadas y finales. Por ejemplo: 4 cursadas aprobadas (4 pts), o 2 cursadas (2 pts) y 1 final (2 pts), o 2 finales (4 pts).<br/><br/><strong>¿Qué pasa si no llego a los 4 puntos?</strong><br/>Perdés la condición de alumno regular. Sin embargo, podés seguir cursando si te <strong>reinscribís</strong> a la carrera, manteniendo todo lo que ya aprobaste.<br/><br/><strong>¿Cuántas veces puedo reinscribirme?</strong><br/>Podés reinscribirte hasta <strong>3 veces</strong>. Si superás ese límite, perdés todas las materias aprobadas y debés empezar la carrera desde cero.";

const PLAN_ESTUDIOS_LINKS = `<br/><a href='https://www.unnoba.edu.ar/tecnologia/' target='_blank' style='color:#005B96; font-weight:bold;'>Escuela de Tecnología</a><br/><a href='https://www.unnoba.edu.ar/can/' target='_blank' style='color:#005B96; font-weight:bold;'>Escuela de Ciencias Agrarias, Naturales y Ambientales</a><br/><a href='https://www.unnoba.edu.ar/economicas-y-juridicas/' target='_blank' style='color:#005B96; font-weight:bold;'>Escuela de Ciencias Económicas y Jurídicas</a><br/><a href='https://www.unnoba.edu.ar/desarrollo-humano/' target='_blank' style='color:#005B96; font-weight:bold;'>Instituto Académico de Desarrollo Humano</a>`;

export const KNOWLEDGE_BASE = {
  // --- ATAJOS DE TARJETAS ---
  "¿Dónde puedo contactar a la universidad o cuáles son sus redes sociales?":
    "<strong style='color: #007bbf;'>Redes de la Universidad</strong><br />Instagram: @elegiunnoba o @unnobanoticias<br />Facebook: NoticiasUNNOBA<br />Web: www.unnoba.edu.ar<br /><br /><strong style='color:rgb(150, 0, 137);'>Centro de estudiantes</strong><br />Vía Instagram:<br />Franja Morada Junín: @franjaunnobajunin<br />Franja Morada Pergamino: @franjamoradaunnoba<br /><br /><strong style='color:gray;'>Contactos institucionales📧</strong><br /> estudiantes@unnoba.edu.ar<br />También podés acercarte a Bienestar Estudiantil en tu sede.",
  "¿Cómo y cuándo me inscribo a materias o finales?":
    "Las inscripciones a materias y finales se realizan desde el sistema <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, ingresando con tu cuenta institucional.<br /><br />📅 Las fechas exactas para inscripciones, cursadas y finales están publicadas en el <a href='https://elegi.unnoba.edu.ar/calendarioacademico/' target='_blank' style='color:#005B96; font-weight:bold;'>Calendario Académico</a> de la UNNOBA. Te recomendamos revisarlo con frecuencia.<br /><br />⚠️ Recordá que algunas materias o finales requieren tener otras materias aprobadas (correlatividades). Para conocerlas, revisá el plan de estudios de tu carrera en el<a href='https://unnoba.edu.ar/' target='_blank' style='color:#005B96; font-weight:bold;'> sitio oficial de la UNNOBA</a>.",
  "¿Cómo funciona el comedor?":
    "Para utilizar el comedor universitario debés ingresar a <a href='https://comedor.unnoba.edu.ar/' target='_blank' style='color:#005B96; font-weight:bold;'>comedor.unnoba.edu.ar</a> con tu cuenta institucional y realizar la reserva.<br /><br />🍽️ Cada día se ofrecen dos menús, y al acceder con tu cuenta UNNOBA obtenés un descuento especial.<br /><br />📍 Dirección del comedor: Jorge Newbery 348, Junín, Buenos Aires (CP 6000).",
  "¿Como utilizo la plataforma virtual o campus?":
    "Al acceder a la plataforma virtual <a href='https://plataformaed.unnoba.edu.ar' target='_blank' style='color:#005B96; font-weight:bold;'>plataformaed.unnoba.edu.ar</a> vas a encontrar todas las materias que estés cursando actualmente o que hayas cursado previamente.<br /><br />📩 Para ingresar necesitás tu cuenta institucional de la UNNOBA. Si no podés acceder, consultá con la Dirección de Alumnos o el área de soporte académico.",

  // --- REGULARIDAD ---
  "¿Necesito ser alumno regular para inscribirme a materias?": REGULARITY_ANSWER,
  "¿Cuándo y cómo se verifica la regularidad?": REGULARITY_ANSWER,
  "¿Cómo se suman puntos para mantener la regularidad?": REGULARITY_ANSWER,
  "¿Qué pasa si no llego a los 4 puntos?": REGULARITY_ANSWER,
  "¿Puedo seguir cursando si pierdo la regularidad?": REGULARITY_ANSWER,
  "¿Cuántas veces puedo reinscribirme?": REGULARITY_ANSWER,

  // --- FINALES ---
  "¿Cuándo son las mesas de finales?": "Las mesas de exámenes finales están programadas según las fechas establecidas en el calendario académico oficial de la UNNOBA. Generalmente, se realizan durante la segunda semana de cada mes. Sin embargo, es importante tener en cuenta que en los meses de enero y octubre no se habilita la inscripción a mesas de finales. Para conocer las fechas exactas y actualizadas, se recomienda consultar el <a href='https://elegi.unnoba.edu.ar/calendario-academico/' target='_blank' style='color:#005B96; font-weight:bold;'>calendario académico</a>.",
  "¿Qué es un exámen final?": "Un examen final es una instancia de evaluación que se realiza al finalizar cada materia en la UNNOBA. Aprobar esta evaluación es un requisito para dar por aprobada la materia. La calificación obtenida en el examen final se utiliza para calcular el promedio general del estudiante y su porcentaje de avance en la carrera.<br/><br/>Para obtener el título, es necesario tener aprobados los exámenes finales de todas las materias incluidas en el plan de estudios.",
  "¿Cómo me inscribo a un examen?": "La inscripción a un examen final se realiza a través del sistema <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, dentro del período habilitado según el calendario académico. Podés inscribirte desde la fecha de apertura indicada hasta 48 horas hábiles antes del examen, sin contar sábados, domingos ni feriados.<br/><br/><strong>Por ejemplo:</strong><br/><ul><li>Si tu examen es el viernes a las 8:00 hs, tenés tiempo para inscribirte hasta el miércoles a las 8:00 hs.</li><li>Si el examen es el martes a las 14:00 hs, deberás inscribirte hasta el viernes anterior a las 14:00 hs.</li></ul><br/>Es muy importante que te inscribas en tiempo y forma. Si no estás inscripto no podrás rendir el examen.",
  "¿Qué pasa si falto a un final?": "Si te inscribiste a un examen final y no te presentas, el docente registrará tu inasistencia en el sistema. Como consecuencia, no podrás inscribirte a la próxima mesa del mismo examen, ya que el sistema aplica una sanción automática.<br/><br/>Por eso, si sabés que no vas a poder asistir, es importante que canceles tu inscripción antes del cierre del período habilitado en SIU-Guaraní para evitar sanciones.",
  "¿Hasta cuándo tengo tiempo de darme de baja a un final?": "Podés darte de baja de un examen final hasta 48 horas hábiles antes de la fecha del examen. Esto significa que no se cuentan sábados, domingos ni feriados. Recordá hacerlo desde el sistema SIU-Guaraní dentro del período habilitado.",
  "¿Qué pasa si no apruebo un examen final?": "Si no aprobás un final, la nota se registra en el SIU-Guaraní. Tenés hasta 5 oportunidades y 3 años para aprobar el final de una materia desde que aprobaste la regularidad.",
  "¿Cuántas veces puedo rendir un examen final?": "Podés rendir un final hasta 5 veces. Si desaprobás en el quinto intento, deberás recursar la materia para recuperar la condición de regular y volver a rendir.",
  "¿Puedo rendir un final libre?": "Depende de la materia, pero en general, la mayoría no permite rendir en condición de 'libre'. Deberías consultarlo con el profesor titular (Jefe de Cátedra) de la materia.",
  
  // --- CORRELATIVIDADES Y REVÁLIDAS ---
  "¿Qué son las materias correlativas?": "Las materias correlativas son aquellas que requieren haber aprobado otras materias previamente. No podés cursar una materia si no tenés aprobada la cursada de su correlativa, y no podés rendir el final si no tenés aprobado el final de su correlativa.",
  "¿Dónde reviso las correlativas?": "Podés consultar las correlativas en el plan de estudios de tu carrera o en <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, entrando a: <strong>Reportes → Plan de Estudios</strong>.",
  "¿Qué son las reválidas?": "Una reválida es una prórroga que te otorga un año adicional para rendir el final de una materia cuya regularidad haya vencido. En algunas materias, para obtener la reválida debés rendir una evaluación interna. Si no la solicitás o no aprobás, deberás recursar la materia.",
  "¿Cómo solicito una reválida?": "La inscripción a una reválida se realiza igual que la de un examen final regular, a través de <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, durante el período habilitado.",
  
  // --- INSCRIPCIÓN A MATERIAS ---
  "¿Cómo me inscribo a las materias?": "La inscripción a las materias se realiza desde <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, dentro del período establecido en el calendario académico.",
  
  // --- CALENDARIO ACADÉMICO ---
  "¿Cuándo abren las inscripciones a cursadas?": CALENDAR_ANSWER,
  "¿Hasta qué día tengo para inscribirme a las materias?": CALENDAR_ANSWER,
  "¿Dónde veo mi calendario académico?": CALENDAR_ANSWER,
  "¿Qué feriados hay este año?": CALENDAR_ANSWER,
  "¿Cuándo empieza el primer cuatrimestre?": CALENDAR_ANSWER,
  "¿Cuándo empieza el segundo cuatrimestre?": CALENDAR_ANSWER,
  "¿Cuándo terminan las clases del primer cuatrimestre?": CALENDAR_ANSWER,
  "¿Cuándo terminan las clases del segundo cuatrimestre?": CALENDAR_ANSWER,
  "¿Cuándo son las vacaciones de invierno?": CALENDAR_ANSWER,

  // --- BIBLIOTECA ---
  "¿Dónde está la biblioteca?": "<strong>Junín:</strong> Jorge Newbery 375.<br/><strong>Pergamino:</strong> Edificio del Rectorado, en Monteagudo 2772.",
  "¿Qué horario tiene la biblioteca?": "La biblioteca abre de lunes a viernes, de 08:00 a 19:00 horas. Durante recesos, los horarios pueden cambiar.",
  "¿Cómo accedo a la biblioteca digital?": "Podés ingresar desde el sitio oficial de la UNNOBA. Si necesitás ayuda, el personal de la biblioteca puede asistirte.",
  "¿Cómo hago para pedir un libro prestado?": "Debés acercarte a alguna de las sedes de la biblioteca para que te registren en el sistema. A partir de ahí, podrás solicitar libros.",
  "¿Cuánto tiempo puedo tener un libro en préstamo?": "El préstamo habitual es por dos semanas, pero puede variar. Confirmalo con el bibliotecario.",
  "¿Puedo renovar el préstamo de un libro?": "Sí, siempre y cuando el libro no tenga una alta demanda o esté reservado. La renovación se gestiona en la biblioteca.",
  
  // --- DISTRIBUCIÓN DE AULAS ---
  "¿Dónde se cursa cada materia?": "Para consultar la distribución de aulas de la UNNOBA, escribí '¿Dónde se cursa [nombre de la materia]?' o '¿En qué edificio se cursa [materia]?' y te proporcionaré la información específica. También podés preguntar por 'edificios' para ver las ubicaciones. Para consultar una fecha específica, escribí '¿Dónde se cursa [materia] el lunes 23?' o '¿Dónde se cursa [materia] el 23 de junio?'",
  "¿Cuáles son los edificios de la UNNOBA?": "Para ver información detallada sobre los edificios y sus ubicaciones, escribí 'edificios' o 'ubicación de edificios' y te mostraré las direcciones con enlaces a Google Maps.",
  "¿Dónde están los edificios de la UNNOBA?": "Para ver información detallada sobre los edificios y sus ubicaciones, escribí 'edificios' o 'ubicación de edificios' y te mostraré las direcciones con enlaces a Google Maps.",
  "¿Cuál es la ubicación de los edificios?": "Para ver información detallada sobre los edificios y sus ubicaciones, escribí 'edificios' o 'ubicación de edificios' y te mostraré las direcciones con enlaces a Google Maps.",

  // --- COMEDOR ---
  "¿Dónde queda el comedor?": "El comedor universitario está en el Taller Comedor, ubicado en Jorge Newbery 348, Junín.",
  "¿Cuándo abre el comedor universitario?": "El comedor abre de Lunes a Viernes de 8 a 21 hs, y los Sábados de 8 a 14 hs.",
  "¿Cómo reservar el almuerzo?": "Podés reservar con tu cuenta institucional en la plataforma online del comedor: <a href='https://comedor.unnoba.edu.ar/' target='_blank' style='color:#005B96; font-weight:bold;'>comedor.unnoba.edu.ar</a>.",
  "¿Hasta qué hora puedo reservar el almuerzo?": "Tenés tiempo hasta las 8 am del mismo día para reservar tu comida.",
  "¿Puedo cancelar una reserva ya hecha?": "Sí, desde la sección 'Mis reservas' en la plataforma del comedor, podés eliminarla.",

  // --- CONTACTOS Y TRÁMITES ---
  "¿Cuáles son las redes sociales oficiales de la UNNOBA?": "<strong>Instagram:</strong> @unnobanoticias<br/><strong>Facebook:</strong> UNNOBA<br/><strong>Instagram Secretaría Académica:</strong> @academicaunnoba",
  "¿Cuál es el contacto del Departamento de Alumnos?": "<strong>Sede Junín:</strong><br/>Dirección: Newbery e/ Rivadavia y Sáenz Peña<br/>Teléfono: (0236) 4407750 int. 11211<br/>Correo: alumnosjunin@unnoba.edu.ar<br/><br/><strong>Sede Pergamino:</strong><br/>Dirección: Monteagudo 2772<br/>Teléfono: (02477) 409500 int. 21211<br/>Correo: alumnospergamino@unnoba.edu.ar",
  "¿Qué trámites debo hacer al ingresar?": "Al ingresar debés presentar la documentación requerida (título secundario), completar tus datos en SIU-Guaraní y recibir tu usuario institucional. Para más detalles, consultá la Guía de Trámites en la web oficial.",
  "¿Dónde se piden certificados de alumno regular?": "Podés solicitarlos presencialmente en la Oficina de Alumnos o por correo electrónico desde tu cuenta institucional a alumnosjunin@unnoba.edu.ar o alumnospergamino@unnoba.edu.ar.",

  // --- PLAN DE ESTUDIOS ---
  "¿Dónde puedo ver mi plan de estudios?": "Podés consultar el plan de estudios de tu carrera en el sitio web oficial de la UNNOBA, en la sección de tu Escuela o Instituto:" + PLAN_ESTUDIOS_LINKS,
  //"¿Cuántos años dura la carrera?": "La duración varía: las tecnicaturas duran aproximadamente 2.5 años, las licenciaturas 4 años y las ingenierías 5 años. Para conocer la duración específica, consultá tu plan de estudios.",
  //"¿Qué materias tiene mi carrera?": "Las materias por año están detalladas en tu plan de estudios. Podés encontrarlo en la web de tu Escuela o Instituto:" + PLAN_ESTUDIOS_LINKS,
  "¿Cada cuanto vencen los planes de estudio?":"En la UNNOBA, los planes de estudio no tienen una fecha fija de vencimiento, pero pueden ser actualizados o reemplazados por nuevos planes conforme a las resoluciones del Consejo Superior o del Ministerio de Educación.Cuando un plan de estudio es reemplazado, la universidad suele establecer un plazo de convivencia (por ejemplo, 3 o 5 años) para que los estudiantes que estaban cursando bajo el plan anterior puedan finalizar su carrera o hacer el traspaso al nuevo plan.",
  "¿Que información te brindan los planes de estudios?":"📘 Un plan de estudios en la UNNOBA incluye:<ul>Duración de la carrera (en años y/o en cantidad de materias o créditos).</ul>Materias obligatorias y optativas, con su distribución por año o semestre.<ul>Carga horaria total y semanal.</ul><ul>Correlatividades entre materias (cuáles deben aprobarse antes de cursar otras).</ul><ul>Alcances del título (perfil profesional, competencias, incumbencias).</ul><ul>Posibles itinerarios de formación, pasantías, prácticas o trabajos finales requeridos.</ul>",

  // --- CENTRO DE ESTUDIANTES ---
  "¿Qué es el Centro de Estudiantes?": "Es un organismo formado por estudiantes que representa y defiende los derechos e intereses del alumnado. Organiza actividades y funciona como un espacio de participación.",
  "¿Cual es la función del centro de estudiantes?":"Brindar información y acompañamiento sobre <ul>- Inscripciones a materias y finales<ul><ul>- Calendario académico actualizado</ul><ul>- Distribución semanal de aulas (links incluidos)</ul><ul>- Becas disponibles y cómo postularse</ul><ul>- Cambios de carrera, plan o equivalencias</ul><ul>- Paros, comunicados y novedades institucionales,</ul>",


  // --- INTERCAMBIO ESTUDIANTIL ---
  "¿Qué es el programa de intercambio estudiantil?": "La UNNOBA ofrece programas para cursar un semestre en universidades extranjeras, garantizando el reconocimiento académico. Algunos programas son PILA, ESCALA, JIMA, MACA y PAME-UDUAL.",
  "¿Qué universidades están disponibles para los intercambios?" : "Algunas opciones incluyen universidades en Brasil, Uruguay, Chile, Paraguay, México, etc.",
  "¿Cuánto dura el intercambio?" : "Dura un semestre académico (aproximadamente 5 meses).",
  "¿La universidad cubre los gastos del intercambio?" : "La universidad anfitriona suele cubrir hospedaje y comida, pero el estudiante paga pasajes, seguro y visa.",
  "¿Dónde me inscribo para el intercambio?":" Para inscribirte: <a href=https://docs.google.com/forms/d/e/1FAIpQLSfDdIRnTnFDyds-04XMedFVjdaRM2G0O_RCt13XzzPTPTxKow/viewform target=_blank>Toca para inscribirte</a>",



  // --- PRÁCTICA PROFESIONAL SUPERVISADA (PPS) ---
  "¿Qué es la Práctica Profesional Supervisada?": "La PPS es una instancia formativa obligatoria en algunas carreras que te permite realizar actividades profesionales en un entorno real de trabajo.",
  
  // --- TESIS ---
  "¿Qué es la tesis de grado?": "La tesis de grado es un trabajo académico que permite al estudiante integrar y aplicar los conocimientos de su carrera, bajo la supervisión de un director. Su obligatoriedad depende de cada plan de estudios.",

  // --- TÍTULO ---
  "¿Qué se necesita para empezar a tramitar el título universitario?": "Una vez aprobada la última materia, podés iniciar el trámite desde tu Login institucional en el servicio 'Dossier - Mesa de Entrada Virtual'. Deberás adjuntar en PDF tu DNI y partida de nacimiento. Más info en <a href='https://www.unnoba.edu.ar/tramite-de-titulo-universitario/' target='_blank' style='color:#005B96; font-weight:bold;'>la web de la UNNOBA</a>.",
  "¿Cuánto demora obtener el título?": "El proceso dura aproximadamente 120 días desde que iniciás el expediente, pero puede variar.",
};
