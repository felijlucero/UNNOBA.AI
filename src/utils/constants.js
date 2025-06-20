
export const SYSTEM_PROMPT = `
Eres un chatbot especializado en brindar información oficial y útil sobre la Universidad Nacional del Noroeste de la Provincia de Buenos Aires (UNNOBA). Debes responder de forma clara, precisa y actualizada sobre temas como:

- Inscripciones y calendario académico
- Planes de estudio y materias
- Distribución de aulas por sede
- Trámites estudiantiles
- Becas y programas de intercambio
- Funciones del Centro de Estudiantes
- Acceso a servicios como biblioteca, WiFi, comedor, orientación
- Cualquier otra información oficial provista en las fuentes de la universidad

SI LA PREGUNTA NO ESTÁ RELACIONADA CON LA UNNOBA, RESPONDE:
"Lo siento, solo puedo ayudarte con temas relacionados con la UNNOBA."

Formato de respuesta: 
- Clara y directa, no des resumenes, siempre respuestas completas. Salvo que el usuario te lo pida.
- Si hay un enlace oficial, inclúyelo
- Si se requiere fecha actual, úsala automáticamente
- No respondas que para buscar información precisa y actualizada vaya a la pagina oficial de la UNNOBA.
`;

export const PPS_PROMPT = `Te voy a poner en contexto sobre las Prácticas Profesionales y posibles dudas que te puedan preguntar.Resolución CD.ET 258/2015
Fecha: 9 de diciembre de 2015

Objeto: Aprobación del nuevo reglamento de PPS para carreras de Ingeniería.

Reglamento PPS (resumen de puntos clave)
🔸 Requisitos Generales
Mínimo de 200 horas en sectores productivos y/o de servicios.

Pueden realizarse en una o más instituciones.

Participan: Alumno, Supervisor Docente, Coordinador de PPS, Coordinador de Carrera, Empresa/Institución/Organización, Tutor de Empresa y Secretario Académico.

🔸 Responsabilidades
Alumno:

Solicita PPS mediante nota (Anexo I-A o I-B).

Elabora un plan de trabajo con Supervisor y Tutor (Anexo II).

Presenta informes cada 50 hs (Anexo V).

Presenta informe final (Anexo VI).

Rinde un examen final ante tribunal.

Supervisor Docente:

Guía al alumno, aprueba el informe final.

Participa del tribunal evaluador.

Visita la empresa y comunica avances.

Coordinador de PPS:

Coordina convenios.

Aprueba proyectos.

Lleva registro documental.

Coordinador de Carrera:

Aprueba proyectos.

Integra el tribunal de examen.

Empresa/Institución:

Firma convenios marco y específicos.

Asigna un tutor.

Participa en el diseño del plan de trabajo.

Tutor de Empresa:

Supervisa al alumno.

Informa sobre desempeño.

Secretario Académico:

Verifica situación académica.

Certifica actas de examen.

Documentación Requerida
Convenio Marco

Convenio Particular

Formulario A – Solicitud PPS

Formulario B – Plan de Trabajo

Formulario C – Informe del Tutor

Formulario D – Informe del Supervisor

Formulario E – Informe de Avance

Formulario F – Informe Final

Anexos
Anexo VII – Estructura del Informe Final

Introducción

Objetivos

Plan de Trabajo y Carga Horaria

Descripción de la Práctica

Conclusiones

Bibliografía

Anexos

Agradecimientos 
Posibles preguntas:¿Cuántas horas hay que realizar en total?¿Cómo son las supervisiones o seguimientos?`;

export const PROMPT_CENTRO_ESTUDIANTES = `
El Centro de Estudiantes de la UNNOBA se llama Franja Morada. Es una agrupación estudiantil que colabora activamente brindando información y acompañamiento sobre:

- Inscripciones a materias y finales
- Calendario académico actualizado
- Distribución semanal de aulas (links incluidos)
- Becas disponibles y cómo postularse
- Cambios de carrera, plan o equivalencias
- Paros, comunicados y novedades institucionales

Tienen contacto directo con la comunidad estudiantil y actúan como nexo con la institución.`;

export const PROMPT_INSCRIPCIONES = `
La inscripción a materias y carreras en la UNNOBA se realiza siguiendo estos pasos:

1. Completar formulario de preinscripción (disponible durante el período habilitado)
2. Cargar la documentación requerida en PDF en la Mesa de Entrada Virtual
3. Alternativamente, se puede presentar en forma física en Junín o Pergamino
4. Recibir confirmación por correo institucional

🔗 Fuente oficial: https://elegi.unnoba.edu.ar/inscripcion/
Nota: Durante el receso administrativo (21 al 26 de julio), no se procesan inscripciones.`;


export const PREGUNTAS_FRECUENTES = [
  {
    pregunta: "¿Qué función cumple el centro de estudiantes?",
    respuesta: "Ayuda e informa sobre inscripción, calendario, distribución de aulas, becas y paros."
  },
  {
    pregunta: "¿Dónde cursan las materias en Junín?",
    respuesta: "Podés verlo en la distribución de aulas de Junín: https://unnoba.edu.ar/distribucion-aulas/junin"
  },
  {
    pregunta: "¿Cómo conectarse al WiFi institucional?",
    respuesta: "Podés usar el WiFi público, pero para mejor conexión, ingresá con tu cuenta institucional."
  },
  {
    pregunta: "¿Dónde estudiar o hacer trabajos grupales?",
    respuesta: "Tenés el Comedor Universitario, el Aula Parlante y otros espacios comunes."
  }
];

export const INTERCAMBIO_PROMPT = `
🔹 CONTEXTO:
La UNNOBA ofrece programas de intercambio internacional a través de PILA, AUGM y convenios específicos. La duración del intercambio suele ser un semestre (5 meses) y se cursan al menos 3 materias en universidades extranjeras. Los programas están destinados a estudiantes de grado.

🔹 REQUISITOS:
- Ser alumno regular
- Tener aprobado al menos el 40% de la carrera (preferente)
- Ser menor de 30 años (preferente)
- Estar cursando al momento del intercambio

🔹 BENEFICIOS:
- Hospedaje y comida cubiertos por la universidad anfitriona (en la mayoría de los casos)
- El estudiante debe costear el viaje, seguro y gastos personales

🔹 POSTULACIÓN:
- Se postula vía formulario + documentación: certificado analítico, aval académico, pasaporte o DNI
- Más información y contacto: rrii@unnoba.edu.ar

🔹 POSIBLES RESPUESTAS:
Q: ¿Qué universidades están disponibles?
A: Algunas opciones incluyen universidades en Brasil, Uruguay, Chile, Paraguay, México, etc.

Q: ¿Cuánto dura el intercambio?
A: Dura un semestre académico (aproximadamente 5 meses).

Q: ¿La universidad cubre los gastos?
A: La universidad anfitriona suele cubrir hospedaje y comida, pero el estudiante paga pasajes, seguro y visa.

Q: ¿Dónde me inscribo?
A: Completando este formulario: [URL DINÁMICO]
`;


export const PREDEFINED_RESPONSES = {
  "¿Dónde puedo contactar a la universidad o cuáles son sus redes sociales?":
    "<strong style='color: #007bbf;'>Redes de la Universidad</strong><br />Instagram: @elegiunnoba o @unnobanoticias<br />Facebook: NoticiasUNNOBA<br />Web: www.unnoba.edu.ar<br /><br /><strong style='color:rgb(150, 0, 137);'>Centro de estudiantes</strong><br />Vía Instagram:<br />Franja Morada Junín: @franjaunnobajunin<br />Franja Morada Pergamino: @franjamoradaunnoba<br /><br /><strong style='color:gray;'>Contactos institucionales📧</strong><br /> estudiantes@unnoba.edu.ar<br />También podés acercarte a Bienestar Estudiantil en tu sede.",
  "¿Cómo y cuándo me inscribo a materias o finales?":
    "Las inscripciones a materias y finales se realizan desde el sistema <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, ingresando con tu cuenta institucional.<br /><br />📅 Las fechas exactas para inscripciones, cursadas y finales están publicadas en el <a href='https://elegi.unnoba.edu.ar/calendarioacademico/' target='_blank' style='color:#005B96; font-weight:bold;'>Calendario Académico</a> de la UNNOBA. Te recomendamos revisarlo con frecuencia.<br /><br />⚠️ Recordá que algunas materias o finales requieren tener otras materias aprobadas (correlatividades). Para conocerlas, revisá el plan de estudios de tu carrera en el<a href='https://unnoba.edu.ar/' target='_blank' style='color:#005B96; font-weight:bold;'> sitio oficial de la UNNOBA</a>.",
  "¿Cómo funciona el comedor?":
    "Para utilizar el comedor universitario debés ingresar a <a href='https://comedor.unnoba.edu.ar/' target='_blank' style='color:#005B96; font-weight:bold;'>comedor.unnoba.edu.ar</a> con tu cuenta institucional y realizar la reserva.<br /><br />🍽️ Cada día se ofrecen dos menús, y al acceder con tu cuenta UNNOBA obtenés un descuento especial.<br /><br />📍 Dirección del comedor: Jorge Newbery 348, Junín, Buenos Aires (CP 6000).",
  "¿Como utilizo la plataforma virtual o campus?":
    "Al acceder a la plataforma virtual <a href='https://plataformaed.unnoba.edu.ar' target='_blank' style='color:#005B96; font-weight:bold;'>plataformaed.unnoba.edu.ar</a> vas a encontrar todas las materias que estés cursando actualmente o que hayas cursado previamente.<br /><br />📩 Para ingresar necesitás tu cuenta institucional de la UNNOBA. Si no podés acceder, consultá con la Dirección de Alumnos o el área de soporte académico.",
};

export const WELCOME_MESSAGE =
  "¡Hola! soy el asistente virtual de la unnoba, ¿En que puedo ayudarte?";

export const API_CONFIG = {
  apiKey: "AIzaSyC7AN2LSQqJijBR4IpPsp5ZGN_uk-C2UQA",
  model: "gemini-1.5-flash",
};

export const TYPING_SPEED = 75;
export const RESPONSE_TYPING_SPEED = 20;
export const MAX_WORD_COUNT = 1500;
