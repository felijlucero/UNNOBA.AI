const CALENDAR_ANSWER = `Toda la información sobre fechas la encontrarás en el calendario académico oficial de la UNNOBA. Podés consultarlo en el siguiente enlace: <a href='https://elegi.unnoba.edu.ar/calendario-academico/' target='_blank' style='color:#005B96; font-weight:bold;'>Calendario Académico</a>.`;

const REGULARITY_ANSWER =
  "Para poder inscribirte a materias es necesario tener la condición de <strong>alumno regular</strong>.<br/><br/><strong>¿Cuándo y cómo se verifica?</strong><br/>La regularidad se verifica a fines de marzo de cada año. Por ejemplo, la regularidad 2025 se evalúa considerando el período entre marzo de 2024 y marzo de 2025. Para mantenerla, necesitás sumar al menos <strong>4 puntos</strong> en ese período.<br/><br/><strong>¿Cómo se suman puntos?</strong><br/>Podés sumar puntos de las siguientes maneras:<br/><ul><li>Cada materia cursada y aprobada: <strong>1 punto</strong>.</li><li>Cada examen final aprobado: <strong>2 puntos</strong>.</li></ul>Se pueden combinar cursadas y finales. Por ejemplo: 4 cursadas aprobadas (4 pts), o 2 cursadas (2 pts) y 1 final (2 pts), o 2 finales (4 pts).<br/><br/><strong>¿Qué pasa si no llego a los 4 puntos?</strong><br/>Perdés la condición de alumno regular. Sin embargo, podés seguir cursando si te <strong>reinscribís</strong> a la carrera, manteniendo todo lo que ya aprobaste.<br/><br/><strong>¿Cuántas veces puedo reinscribirme?</strong><br/>Podés reinscribirte hasta <strong>3 veces</strong>. Si superás ese límite, perdés todas las materias aprobadas y debés empezar la carrera desde cero.";

const CORRELATIVITY_ANSWER = "Las materias correlativas son aquellas que requieren haber aprobado otras materias previamente. No podés cursar una materia si no tenés aprobada la cursada de su correlativa, y no podés rendir el final si no tenés aprobado el final de su correlativa.";

const REVALIDA_ANSWER = "Una reválida es una prórroga que te otorga un año adicional para rendir el final de una materia cuya regularidad haya vencido. En algunas materias, para obtener la reválida debés rendir una evaluación interna. Si no la solicitás o no aprobás, deberás recursar la materia.";

const PLAN_ESTUDIOS_LINKS = `<br/><a href='https://www.unnoba.edu.ar/tecnologia/' target='_blank' style='color:#005B96; font-weight:bold;'>Escuela de Tecnología</a><br/><a href='https://www.unnoba.edu.ar/can/' target='_blank' style='color:#005B96; font-weight:bold;'>Escuela de Ciencias Agrarias, Naturales y Ambientales</a><br/><a href='https://www.unnoba.edu.ar/economicas-y-juridicas/' target='_blank' style='color:#005B96; font-weight:bold;'>Escuela de Ciencias Económicas y Jurídicas</a><br/><a href='https://www.unnoba.edu.ar/desarrollo-humano/' target='_blank' style='color:#005B96; font-weight:bold;'>Instituto Académico de Desarrollo Humano</a>`;

const COMEDOR_ANSWER = "El comedor abre de Lunes a Viernes de 8 a 21 hs, y los Sábados de 8 a 14 hs."

const COMEDOR_LIMITE_ANSWER = "Tenés tiempo hasta las 8 am del mismo día para reservar tu comida.";

const PROFESSIONAL_PRACTICE = "La Práctica Profesional Supervisada (PPS) es una instancia formativa que permite a los estudiantes aplicar sus conocimientos en un entorno real de trabajo, bajo la supervisión de un profesional. Es obligatoria en algunas carreras y se realiza al finalizar la carrera.";

const DEGREE_REQUIREMENT = "Una vez aprobada la última materia, podés iniciar el trámite desde tu Login institucional en el servicio 'Dossier - Mesa de Entrada Virtual'. Deberás adjuntar en PDF tu DNI y partida de nacimiento. Más info en <a href='https://www.unnoba.edu.ar/tramite-de-titulo-universitario/' target='_blank' style='color:#005B96; font-weight:bold;'>la web de la UNNOBA</a>.";

const DIPLOMA_PROCESSING_TIME = "El proceso dura aproximadamente 120 días desde que iniciás el expediente, pero puede variar.";

const BECAS_ANSWER = "La UNNOBA ofrece diferentes tipos de becas:<br/><ul><li><strong>Beca de Comedor:</strong> Para estudiantes de bajos recursos</li><li><strong>Beca de Transporte:</strong> Para estudiantes que viven lejos</li><li><strong>Beca de Materiales:</strong> Para compra de libros y materiales</li></ul>Podés consultar los requisitos y fechas de inscripción en Bienestar Estudiantil o en la web oficial.";

const SALUD_ANSWER = "La UNNOBA cuenta con servicios de salud gratuitos para estudiantes:<br/><ul><li><strong>Consultorio Médico:</strong> Atención primaria</li><li><strong>Consultorio Psicológico:</strong> Apoyo emocional y académico</li><li><strong>Consultorio Odontológico:</strong> Atención dental básica</li></ul>Los horarios y ubicaciones varían según la sede. Consultá en Bienestar Estudiantil.";

const ACTIVIDADES_ANSWER = "La UNNOBA ofrece diversas actividades:<br/><ul><li><strong>Deportes:</strong> Fútbol, vóley, básquet, natación</li><li><strong>Arte y Cultura:</strong> Talleres de música, teatro, danza</li><li><strong>Voluntariado:</strong> Programas sociales y comunitarios</li><li><strong>Clubes:</strong> Científicos, tecnológicos, culturales</li></ul>Consultá la cartelera o acercate a la Secretaría de Extensión.";

const TECNOLOGIA_ANSWER = "La UNNOBA te proporciona:<br/><ul><li><strong>WiFi gratuito:</strong> En todos los edificios</li><li><strong>Computadoras:</strong> En laboratorios y biblioteca</li><li><strong>Software académico:</strong> Licencias gratuitas para estudiantes</li><li><strong>Impresión:</strong> Servicio de impresión en biblioteca</li><li><strong>Almacenamiento en la nube:</strong> Google Drive institucional</li></ul>";

const TRANSPORTE_ANSWER = "<strong>Junín:</strong><br/>Líneas de colectivo: 501, 502, 503, 504, 505<br/>Estación de tren: Línea Sarmiento<br/><br/><strong>Pergamino:</strong><br/>Líneas de colectivo: 1, 2, 3, 4, 5<br/>Estación de tren: Línea Mitre<br/><br/>La universidad cuenta con rampas y ascensores para accesibilidad.";

const SEGURIDAD_ANSWER = "En caso de emergencia:<br/><ul><li><strong>Seguridad:</strong> Personal disponible 24/7</li><li><strong>Emergencias médicas:</strong> 107 (ambulancia)</li><li><strong>Bomberos:</strong> 100</li><li><strong>Policía:</strong> 101</li></ul>La universidad cuenta con botones de pánico y cámaras de seguridad.";

const ORIENTACION_ANSWER = "La UNNOBA ofrece servicios de orientación:<br/><ul><li><strong>Orientación Vocacional:</strong> Para estudiantes indecisos</li><li><strong>Orientación Académica:</strong> Para mejorar el rendimiento</li><li><strong>Orientación Laboral:</strong> Para inserción profesional</li></ul>Podés solicitar turnos en Bienestar Estudiantil.";

const INTERNACIONAL_ANSWER = "La UNNOBA tiene convenios con universidades extranjeras:<br/><ul><li><strong>PILA:</strong> Intercambio con universidades latinoamericanas</li><li><strong>ESCALA:</strong> Intercambio con universidades argentinas</li><li><strong>JIMA:</strong> Intercambio con universidades japonesas</li><li><strong>MACA:</strong> Intercambio con universidades mexicanas</li></ul>Consultá en la Secretaría de Relaciones Internacionales.";

const INVESTIGACION_ANSWER = "La UNNOBA fomenta la investigación:<br/><ul><li><strong>Becas de Investigación:</strong> Para estudiantes avanzados</li><li><strong>Proyectos de Investigación:</strong> Participación en grupos de investigación</li><li><strong>Publicaciones:</strong> Revistas científicas estudiantiles</li><li><strong>Congresos:</strong> Participación en eventos académicos</li></ul>Consultá en la Secretaría de Investigación.";

const GRADUADOS_ANSWER = "Como graduado de la UNNOBA tenés acceso a:<br/><ul><li><strong>Red de Graduados:</strong> Networking profesional</li><li><strong>Bolsa de Trabajo:</strong> Oportunidades laborales</li><li><strong>Eventos:</strong> Conferencias y encuentros</li><li><strong>Biblioteca:</strong> Acceso continuo a recursos</li><li><strong>Posgrados:</strong> Descuentos en especializaciones</li></ul>";

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
  "¿qué es la regularidad?": REGULARITY_ANSWER,
  "¿cómo mantengo la regularidad?": REGULARITY_ANSWER,
  "¿qué pasa si pierdo la regularidad?": REGULARITY_ANSWER,
  "¿cómo recupero la regularidad?": REGULARITY_ANSWER,

  // --- FINALES ---
  "¿Cuándo son las mesas de finales?": "Las mesas de exámenes finales están programadas según las fechas establecidas en el calendario académico oficial de la UNNOBA. Generalmente, se realizan durante la segunda semana de cada mes. Sin embargo, es importante tener en cuenta que en los meses de enero y octubre no se habilita la inscripción a mesas de finales. Para conocer las fechas exactas y actualizadas, se recomienda consultar el <a href='https://elegi.unnoba.edu.ar/calendario-academico/' target='_blank' style='color:#005B96; font-weight:bold;'>calendario académico</a>.",
  "¿Qué es un exámen final?": "Un examen final es una instancia de evaluación que se realiza al finalizar cada materia en la UNNOBA. Aprobar esta evaluación es un requisito para dar por aprobada la materia. La calificación obtenida en el examen final se utiliza para calcular el promedio general del estudiante y su porcentaje de avance en la carrera.<br/><br/>Para obtener el título, es necesario tener aprobados los exámenes finales de todas las materias incluidas en el plan de estudios.",
  "¿Cómo me inscribo a un examen?": "La inscripción a un examen final se realiza a través del sistema <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, dentro del período habilitado según el calendario académico. Podés inscribirte desde la fecha de apertura indicada hasta 48 horas hábiles antes del examen, sin contar sábados, domingos ni feriados.<br/><br/><strong>Por ejemplo:</strong><br/><ul><li>Si tu examen es el viernes a las 8:00 hs, tenés tiempo para inscribirte hasta el miércoles a las 8:00 hs.</li><li>Si el examen es el martes a las 14:00 hs, deberás inscribirte hasta el viernes anterior a las 14:00 hs.</li></ul><br/>Es muy importante que te inscribas en tiempo y forma. Si no estás inscripto no podrás rendir el examen.",
  "¿Qué pasa si falto a un final?": "Si te inscribiste a un examen final y no te presentas, el docente registrará tu inasistencia en el sistema. Como consecuencia, no podrás inscribirte a la próxima mesa del mismo examen, ya que el sistema aplica una sanción automática.<br/><br/>Por eso, si sabés que no vas a poder asistir, es importante que canceles tu inscripción antes del cierre del período habilitado en SIU-Guaraní para evitar sanciones.",
  "¿Hasta cuándo tengo tiempo de darme de baja a un final?": "Podés darte de baja de un examen final hasta 48 horas hábiles antes de la fecha del examen. Esto significa que no se cuentan sábados, domingos ni feriados. Recordá hacerlo desde el sistema SIU-Guaraní dentro del período habilitado.",
  "¿Qué pasa si no apruebo un examen final?": "Si no aprobás un final, la nota se registra en el SIU-Guaraní. Tenés hasta 5 oportunidades y 3 años para aprobar el final de una materia desde que aprobaste la regularidad.",
  "¿Cuántas veces puedo rendir un examen final?": "Podés rendir un final hasta 5 veces. Si desaprobás en el quinto intento, deberás recursar la materia para recuperar la condición de regular y volver a rendir.",
  "¿Puedo rendir un final libre?": "Depende de la materia, pero en general, la mayoría no permite rendir en condición de 'libre'. Deberías consultarlo con el profesor titular (Jefe de Cátedra) de la materia.",
  "¿qué es un final?": "Un examen final es una instancia de evaluación que se realiza al finalizar cada materia en la UNNOBA. Aprobar esta evaluación es un requisito para dar por aprobada la materia. La calificación obtenida en el examen final se utiliza para calcular el promedio general del estudiante y su porcentaje de avance en la carrera.<br/><br/>Para obtener el título, es necesario tener aprobados los exámenes finales de todas las materias incluidas en el plan de estudios.",
  "¿cómo es un final?": "Un examen final es una instancia de evaluación que se realiza al finalizar cada materia en la UNNOBA. Aprobar esta evaluación es un requisito para dar por aprobada la materia. La calificación obtenida en el examen final se utiliza para calcular el promedio general del estudiante y su porcentaje de avance en la carrera.<br/><br/>Para obtener el título, es necesario tener aprobados los exámenes finales de todas las materias incluidas en el plan de estudios.",
  "¿cómo se rinde un final?": "La inscripción a un examen final se realiza a través del sistema <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, dentro del período habilitado según el calendario académico. Podés inscribirte desde la fecha de apertura indicada hasta 48 horas hábiles antes del examen, sin contar sábados, domingos ni feriados.<br/><br/><strong>Por ejemplo:</strong><br/><ul><li>Si tu examen es el viernes a las 8:00 hs, tenés tiempo para inscribirte hasta el miércoles a las 8:00 hs.</li><li>Si el examen es el martes a las 14:00 hs, deberás inscribirte hasta el viernes anterior a las 14:00 hs.</li></ul><br/>Es muy importante que te inscribas en tiempo y forma. Si no estás inscripto no podrás rendir el examen.",
  "¿cómo me anoto a un final?": "La inscripción a un examen final se realiza a través del sistema <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, dentro del período habilitado según el calendario académico. Podés inscribirte desde la fecha de apertura indicada hasta 48 horas hábiles antes del examen, sin contar sábados, domingos ni feriados.<br/><br/><strong>Por ejemplo:</strong><br/><ul><li>Si tu examen es el viernes a las 8:00 hs, tenés tiempo para inscribirte hasta el miércoles a las 8:00 hs.</li><li>Si el examen es el martes a las 14:00 hs, deberás inscribirte hasta el viernes anterior a las 14:00 hs.</li></ul><br/>Es muy importante que te inscribas en tiempo y forma. Si no estás inscripto no podrás rendir el examen.",
  "¿qué pasa si no apruebo el final?": "Si no aprobás un final, la nota se registra en el SIU-Guaraní. Tenés hasta 5 oportunidades y 3 años para aprobar el final de una materia desde que aprobaste la regularidad.",
  "¿qué pasa si falto al final?": "Si te inscribiste a un examen final y no te presentas, el docente registrará tu inasistencia en el sistema. Como consecuencia, no podrás inscribirte a la próxima mesa del mismo examen, ya que el sistema aplica una sanción automática.<br/><br/>Por eso, si sabés que no vas a poder asistir, es importante que canceles tu inscripción antes del cierre del período habilitado en SIU-Guaraní para evitar sanciones.",
  "¿cuántas veces puedo rendir un final?": "Podés rendir un final hasta 5 veces. Si desaprobás en el quinto intento, deberás recursar la materia para recuperar la condición de regular y volver a rendir.",
  "¿puedo rendir libre?": "Depende de la materia, pero en general, la mayoría no permite rendir en condición de 'libre'. Deberías consultarlo con el profesor titular (Jefe de Cátedra) de la materia.",
  
  // --- CORRELATIVIDADES Y REVÁLIDAS ---
  "¿Qué son las materias correlativas?": CORRELATIVITY_ANSWER,
  "¿Qué es una correlativa?": CORRELATIVITY_ANSWER,
  "¿Dónde reviso las correlativas?": "Podés consultar las correlativas en el plan de estudios de tu carrera o en <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, entrando a: <strong>Reportes → Plan de Estudios</strong>.",
  "¿Qué son las reválidas?": REVALIDA_ANSWER,
  "que es una revalida" : REVALIDA_ANSWER,
  "¿Cómo solicito una reválida?": "La inscripción a una reválida se realiza igual que la de un examen final regular, a través de <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, durante el período habilitado.",
  "¿para qué sirven las correlativas?": CORRELATIVITY_ANSWER,
  "¿por qué existen las correlativas?": CORRELATIVITY_ANSWER,
  "¿cómo funcionan las correlativas?": CORRELATIVITY_ANSWER,
  "¿qué materias son correlativas?": CORRELATIVITY_ANSWER,
  "¿qué pasa si no tengo la correlativa?": "No podés cursar ni rendir la materia si no tenés aprobada la correlativa correspondiente.",
  "¿puedo cursar sin tener la correlativa?": "No, debés tener aprobada la correlativa para poder cursar o rendir la materia.",
  "¿qué materias necesito aprobar antes?": CORRELATIVITY_ANSWER,
  "¿qué materias tengo que aprobar antes de cursar otra?": CORRELATIVITY_ANSWER,
  "¿qué materias son previas?": CORRELATIVITY_ANSWER,
  "¿qué materias me habilitan a cursar otras?": CORRELATIVITY_ANSWER,
  
  // --- INSCRIPCIÓN A MATERIAS ---
  "¿Cómo me inscribo a las materias?": "La inscripción a las materias se realiza desde <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, dentro del período establecido en el calendario académico.",
  "¿cómo me anoto a materias?": "La inscripción a las materias se realiza desde <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, dentro del período establecido en el calendario académico.",
  "¿cómo inscribirse a materias?": "La inscripción a las materias se realiza desde <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, dentro del período establecido en el calendario académico.",
  "¿cómo inscribirse a finales?": "La inscripción a un examen final se realiza a través del sistema <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, dentro del período habilitado según el calendario académico. Podés inscribirte desde la fecha de apertura indicada hasta 48 horas hábiles antes del examen, sin contar sábados, domingos ni feriados.<br/><br/><strong>Por ejemplo:</strong><br/><ul><li>Si tu examen es el viernes a las 8:00 hs, tenés tiempo para inscribirte hasta el miércoles a las 8:00 hs.</li><li>Si el examen es el martes a las 14:00 hs, deberás inscribirte hasta el viernes anterior a las 14:00 hs.</li></ul><br/>Es muy importante que te inscribas en tiempo y forma. Si no estás inscripto no podrás rendir el examen.",
  "¿cómo me anoto a un examen?": "La inscripción a un examen final se realiza a través del sistema <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, dentro del período habilitado según el calendario académico. Podés inscribirte desde la fecha de apertura indicada hasta 48 horas hábiles antes del examen, sin contar sábados, domingos ni feriados.<br/><br/><strong>Por ejemplo:</strong><br/><ul><li>Si tu examen es el viernes a las 8:00 hs, tenés tiempo para inscribirte hasta el miércoles a las 8:00 hs.</li><li>Si el examen es el martes a las 14:00 hs, deberás inscribirte hasta el viernes anterior a las 14:00 hs.</li></ul><br/>Es muy importante que te inscribas en tiempo y forma. Si no estás inscripto no podrás rendir el examen.",
  "¿cómo me inscribo a cursadas?": "La inscripción a las materias se realiza desde <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, dentro del período establecido en el calendario académico.",
  
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
  "¿cómo funciona la biblioteca?": "<strong>Junín:</strong> Jorge Newbery 375.<br/><strong>Pergamino:</strong> Edificio del Rectorado, en Monteagudo 2772.",
  "¿cómo pido un libro?": "Debés acercarte a alguna de las sedes de la biblioteca para que te registren en el sistema. A partir de ahí, podrás solicitar libros.",
  "¿cómo renuevo un libro?": "Sí, siempre y cuando el libro no tenga una alta demanda o esté reservado. La renovación se gestiona en la biblioteca.",
  "¿cuánto tiempo tengo un libro?": "El préstamo habitual es por dos semanas, pero puede variar. Confirmalo con el bibliotecario.",
  
  // --- DISTRIBUCIÓN DE AULAS ---
  "¿Dónde se cursa cada materia?": "Para consultar la distribución de aulas de la UNNOBA, escribí '¿Dónde se cursa [nombre de la materia]?' o '¿En qué edificio se cursa [materia]?' y te proporcionaré la información específica. También podés preguntar por 'edificios' para ver las ubicaciones. Para consultar una fecha específica, escribí '¿Dónde se cursa [materia] el lunes 23?' o '¿Dónde se cursa [materia] el 23 de junio?'",
  "¿Cuáles son los edificios de la UNNOBA?": "Para ver información detallada sobre los edificios y sus ubicaciones, escribí 'edificios' o 'ubicación de edificios' y te mostraré las direcciones con enlaces a Google Maps.",
  "¿Dónde están los edificios de la UNNOBA?": "Para ver información detallada sobre los edificios y sus ubicaciones, escribí 'edificios' o 'ubicación de edificios' y te mostraré las direcciones con enlaces a Google Maps.",
  "¿Cuál es la ubicación de los edificios?": "Para ver información detallada sobre los edificios y sus ubicaciones, escribí 'edificios' o 'ubicación de edificios' y te mostraré las direcciones con enlaces a Google Maps.",
  "¿dónde están los edificios?": "Para ver información detallada sobre los edificios y sus ubicaciones, escribí 'edificios' o 'ubicación de edificios' y te mostraré las direcciones con enlaces a Google Maps.",
  "¿dónde queda cada edificio?": "Para ver información detallada sobre los edificios y sus ubicaciones, escribí 'edificios' o 'ubicación de edificios' y te mostraré las direcciones con enlaces a Google Maps.",

  // --- COMEDOR ---
  "¿Dónde queda el comedor?": "El comedor universitario está en el Taller Comedor, ubicado en Jorge Newbery 348, Junín.",
  "¿Cuándo abre el comedor universitario?": COMEDOR_ANSWER,
  "que horario tiene el comedor?": COMEDOR_ANSWER,
  "¿Cómo reservar el almuerzo?": "Podés reservar con tu cuenta institucional en la plataforma online del comedor: <a href='https://comedor.unnoba.edu.ar/' target='_blank' style='color:#005B96; font-weight:bold;'>comedor.unnoba.edu.ar</a>.",
  "¿Hasta qué hora puedo reservar el almuerzo?": COMEDOR_LIMITE_ANSWER,
  "hasta que hora es la reserva de almuerzo?": COMEDOR_LIMITE_ANSWER,
  "¿Puedo cancelar una reserva ya hecha?": "Sí, desde la sección 'Mis reservas' en la plataforma del comedor, podés eliminarla.",
  "¿cómo funciona el comedor universitario?": "Para utilizar el comedor universitario debés ingresar a <a href='https://comedor.unnoba.edu.ar/' target='_blank' style='color:#005B96; font-weight:bold;'>comedor.unnoba.edu.ar</a> con tu cuenta institucional y realizar la reserva.<br /><br />🍽️ Cada día se ofrecen dos menús, y al acceder con tu cuenta UNNOBA obtenés un descuento especial.<br /><br />📍 Dirección del comedor: Jorge Newbery 348, Junín, Buenos Aires (CP 6000).",
  "¿cómo reservo el almuerzo?": "Podés reservar con tu cuenta institucional en la plataforma online del comedor: <a href='https://comedor.unnoba.edu.ar/' target='_blank' style='color:#005B96; font-weight:bold;'>comedor.unnoba.edu.ar</a>.",
  "¿puedo cancelar la reserva del comedor?": "Sí, desde la sección 'Mis reservas' en la plataforma del comedor, podés eliminarla.",
  
  // --- CONTACTOS Y TRÁMITES ---
  "¿Cuáles son las redes sociales oficiales de la UNNOBA?": "<strong>Instagram:</strong> @unnobanoticias<br/><strong>Facebook:</strong> UNNOBA<br/><strong>Instagram Secretaría Académica:</strong> @academicaunnoba",
  "¿Cuál es el contacto del Departamento de Alumnos?": "<strong>Sede Junín:</strong><br/>Dirección: Newbery e/ Rivadavia y Sáenz Peña<br/>Teléfono: (0236) 4407750 int. 11211<br/>Correo: alumnosjunin@unnoba.edu.ar<br/><br/><strong>Sede Pergamino:</strong><br/>Dirección: Monteagudo 2772<br/>Teléfono: (02477) 409500 int. 21211<br/>Correo: alumnospergamino@unnoba.edu.ar",
  "¿Qué trámites debo hacer al ingresar?": "Al ingresar debés presentar la documentación requerida (título secundario), completar tus datos en SIU-Guaraní y recibir tu usuario institucional. Para más detalles, consultá la Guía de Trámites en la web oficial.",
  "¿Dónde se piden certificados de alumno regular?": "Podés solicitarlos presencialmente en la Oficina de Alumnos o por correo electrónico desde tu cuenta institucional a alumnosjunin@unnoba.edu.ar o alumnospergamino@unnoba.edu.ar.",
  "¿cómo pido un certificado de alumno regular?": "Podés solicitarlos presencialmente en la Oficina de Alumnos o por correo electrónico desde tu cuenta institucional a alumnosjunin@unnoba.edu.ar o alumnospergamino@unnoba.edu.ar.",
  "¿cómo tramito el título?": "Una vez aprobada la última materia, podés iniciar el trámite desde tu Login institucional en el servicio 'Dossier - Mesa de Entrada Virtual'. Deberás adjuntar en PDF tu DNI y partida de nacimiento. Más info en <a href='https://www.unnoba.edu.ar/tramite-de-titulo-universitario/' target='_blank' style='color:#005B96; font-weight:bold;'>la web de la UNNOBA</a>.",
  "¿cuánto tarda el título?": "El proceso dura aproximadamente 120 días desde que iniciás el expediente, pero puede variar.",

  // --- CENTRO DE ESTUDIANTES ---
  "¿Qué es el Centro de Estudiantes?": "Es un organismo formado por estudiantes que representa y defiende los derechos e intereses del alumnado. Organiza actividades y funciona como un espacio de participación.",
  
  // --- INTERCAMBIO ESTUDIANTIL ---
  "¿Qué es el programa de intercambio estudiantil?": "La UNNOBA ofrece programas para cursar un semestre en universidades extranjeras, garantizando el reconocimiento académico. Algunos programas son PILA, ESCALA, JIMA, MACA y PAME-UDUAL.",
  
  // --- PRÁCTICA PROFESIONAL SUPERVISADA (PPS) ---
  "¿Qué es la Práctica Profesional Supervisada?": PROFESSIONAL_PRACTICE,
  "¿Qué significa la PPS dentro de una carrera universitaria?": PROFESSIONAL_PRACTICE,
  "¿Qué representa la PPS en la formación académica?": PROFESSIONAL_PRACTICE,
  "¿qué es la pps?": PROFESSIONAL_PRACTICE,
  "¿qué significa pps?": PROFESSIONAL_PRACTICE,
  "¿para qué sirve la pps?": PROFESSIONAL_PRACTICE,
  
  // --- TESIS ---
  "¿Qué es la tesis de grado?": "La tesis de grado es un trabajo académico que permite al estudiante integrar y aplicar los conocimientos de su carrera, bajo la supervisión de un director. Su obligatoriedad depende de cada plan de estudios.",
  "¿Cuál es el significado de la tesis dentro de una carrera universitaria?": "La tesis de grado es un trabajo académico que permite al estudiante integrar y aplicar los conocimientos adquiridos durante la carrera. Es un requisito para obtener el título universitario en algunas carreras, y su elaboración se realiza bajo la supervisión de un director de tesis.",
  "¿Qué representa la tesis de grado en la formación académica?": "La tesis de grado representa la instancia final donde el estudiante integra y aplica los conocimientos adquiridos durante la carrera mediante un trabajo académico supervisado.",
  "¿qué es la tesis?": "La tesis de grado es un trabajo académico que permite al estudiante integrar y aplicar los conocimientos de su carrera, bajo la supervisión de un director. Su obligatoriedad depende de cada plan de estudios.",
  "¿para qué sirve la tesis?": "La tesis de grado es un trabajo académico que permite al estudiante integrar y aplicar los conocimientos de su carrera, bajo la supervisión de un director. Su obligatoriedad depende de cada plan de estudios.",
  
  // --- TÍTULO ---
  "¿Qué se necesita para empezar a tramitar el título universitario?": DEGREE_REQUIREMENT,
  "¿Cuáles son los requisitos para iniciar el trámite del título universitario?": DEGREE_REQUIREMENT,
  "¿Cuánto demora obtener el título?": DIPLOMA_PROCESSING_TIME,
  "¿Cuál es el tiempo promedio para recibir el título universitario?": "El proceso dura aproximadamente 120 días desde que iniciás el expediente, pero puede variar.",
  "¿Cuánto tarda el trámite para la entrega del título?": DIPLOMA_PROCESSING_TIME,

  // --- BECAS ---
  "¿Qué becas ofrece la UNNOBA?": BECAS_ANSWER,
  "¿Cómo solicito una beca?": BECAS_ANSWER,
  "¿Cuándo abren las inscripciones a becas?": BECAS_ANSWER,
  "¿Qué requisitos necesito para una beca?": BECAS_ANSWER,

  // --- SERVICIOS DE SALUD ---
  "¿Hay servicios de salud en la universidad?": SALUD_ANSWER,
  "¿Puedo atenderme en la UNNOBA?": SALUD_ANSWER,
  "¿Hay psicólogo en la universidad?": SALUD_ANSWER,
  "¿Ofrecen atención médica?": SALUD_ANSWER,

  // --- ACTIVIDADES EXTRACURRICULARES ---
  "¿Qué actividades extracurriculares hay?": ACTIVIDADES_ANSWER,
  "¿Hay deportes en la universidad?": ACTIVIDADES_ANSWER,
  "¿Puedo hacer voluntariado?": ACTIVIDADES_ANSWER,
  "¿Hay talleres culturales?": ACTIVIDADES_ANSWER,

  // --- TECNOLOGÍA Y RECURSOS DIGITALES ---
  "¿Hay WiFi en la universidad?": TECNOLOGIA_ANSWER,
  "¿Puedo usar computadoras?": TECNOLOGIA_ANSWER,
  "¿Hay impresoras disponibles?": TECNOLOGIA_ANSWER,
  "¿Qué software puedo usar?": TECNOLOGIA_ANSWER,

  // --- TRANSPORTE Y ACCESIBILIDAD ---
  "¿Cómo llego a la universidad?": TRANSPORTE_ANSWER,
  "¿Qué colectivos van a la UNNOBA?": TRANSPORTE_ANSWER,
  "¿Hay estacionamiento?": "Sí, hay estacionamiento gratuito en ambas sedes. En Junín está en Newbery 348 y en Pergamino en Monteagudo 2772.",
  "¿La universidad es accesible?": TRANSPORTE_ANSWER,

  // --- EMERGENCIA Y SEGURIDAD ---
  "¿Qué hago en caso de emergencia?": SEGURIDAD_ANSWER,
  "¿Hay seguridad en la universidad?": SEGURIDAD_ANSWER,
  "¿Dónde llamo si me siento mal?": SEGURIDAD_ANSWER,

  // --- ORIENTACIÓN VOCACIONAL ---
  "¿Puedo cambiar de carrera?": ORIENTACION_ANSWER,
  "¿Qué hago si no me gusta mi carrera?": ORIENTACION_ANSWER,
  "¿Hay orientación vocacional?": ORIENTACION_ANSWER,
  "¿Me pueden ayudar a elegir carrera?": ORIENTACION_ANSWER,

  // --- INTERNACIONALIZACIÓN ---
  "¿Puedo estudiar en el extranjero?": INTERNACIONAL_ANSWER,
  "¿Hay intercambios internacionales?": INTERNACIONAL_ANSWER,
  "¿Qué programas de intercambio hay?": INTERNACIONAL_ANSWER,

  // --- INVESTIGACIÓN Y CIENCIA ---
  "¿Puedo hacer investigación?": INVESTIGACION_ANSWER,
  "¿Hay becas de investigación?": INVESTIGACION_ANSWER,
  "¿Puedo publicar trabajos?": INVESTIGACION_ANSWER,

  // --- GRADUADOS Y RED ALUMNI ---
  "¿Qué beneficios tengo como graduado?": GRADUADOS_ANSWER,
  "¿Hay red de graduados?": GRADUADOS_ANSWER,
  "¿Puedo seguir usando la biblioteca?": GRADUADOS_ANSWER,
};