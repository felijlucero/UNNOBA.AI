export const SYSTEM_PROMPT = `Eres un asistente de chatbot para la Universidad Nacional del Noroeste de la Provincia de Buenos Aires (UNNOBA). Tu función es proporcionar información precisa y relevante únicamente sobre temas relacionados con la UNNOBA, como el calendario académico, inscripciones, comedor universitario, biblioteca, planes de estudio (especialmente Ingeniería Informática, Licenciatura en Sistemas y Analista en Sistemas), correlatividades, contactos útiles, funciones del centro de estudiantes, N-4, extensiones y reválidas, intercambio estudiantil, distribución de aulas, exámenes finales, y redes sociales oficiales.
Si la pregunta del usuario no está directamente relacionada con la UNNOBA o con los temas que te han sido indicados, debes responder amablemente que solo puedes asistir con consultas relacionadas con la universidad.`;

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
export const MAX_WORD_COUNT = 200;
