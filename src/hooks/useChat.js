 import { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getContenidoCarrera} from "../service/get";
import {
  INTERCAMBIO_PROMPT,
  PROMPT_CENTRO_ESTUDIANTES,
  PPS_PROMPT,
  SYSTEM_PROMPT,
  API_CONFIG,
  RESPONSE_TYPING_SPEED,
  MAX_WORD_COUNT,
} from "../utils/constants";
import { KNOWLEDGE_BASE } from "../utils/knowledgeBase";
import { findBestMatch } from "../utils/textUtils"; //FUNCION QUE ALTERA OTRAS PREGUNTAS
import { handleClassroomDistributionQuery } from "../utils/classroomDistribution";

export const useChat = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState("");
  const [error, setError] = useState(null);
  const [planesCarreras, setPlanesCarreras] = useState([]);//hook que almacena los planes de estudio.

  const pausarUnnobaAi = useRef(false);
  const saltosDeLinea = useRef(false);
  const genAI = useRef(new GoogleGenerativeAI(API_CONFIG.apiKey));
  const chat = useRef(null);
  const errorTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);

  const showError = (message) => {
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }
    setError(message);

    errorTimeoutRef.current = setTimeout(() => {
      setError(null);
    }, 2000);
  };
  //REEMPLACE ESTO POR LLAMADA A FUNCION
  //REVEER SI CREANDO OTRA INSTANCIA DEL MODELO PARA DETECTAR UNA CARRERA ES LA MEJOR OPCION
  const detectarCarrera = async (msgUsuario) => {
    const model = genAI.current.getGenerativeModel({
      model: API_CONFIG.model,
    });

    const prompt = `
    Dado este mensaje del usuario:

    "${msgUsuario}"

    Tu tarea es identificar si el usuario está consultando sobre una carrera de la UNNOBA. 

    👉 Si el usuario menciona una carrera, incluso con un nombre incompleto, con errores o de forma informal, devolvé el nombre completo oficial y SIN ACENTOS tal como aparece en la siguiente lista (sin agregar ningún texto adicional):
    - analista en sistemas
    - ingenieria en informatica
    - ingenieria industrial
    - ingenieria mecanica
    - diseño grafico
    - diseño de indumentaria y textil
    - diseño industrial
    - tecnicatura en mantenimiento industrial
    - licenciatura en sistemas
    - tecnicatura en diseño y desarrollo de aplicaciones multiplataforma
    - ingenieria agronomica
    - licenciatura en genetica
    - contador publico
    - licenciatura en administracion
    - tecnicatura en gestion de pymes
    - tecnicatura en gestion publica
    - abogacia
    - licenciatura en enfermeria
    - enfermeria universitaria

    ✔️ Por ejemplo:
    - Si el usuario escribe "quiero saber sobre genética", respondé: **"licenciatura en genetica"**
    - Si dice "cuánto dura informatica", respondé: **"ingenieria en informatica"**
    - Si no se refiere a ninguna carrera, respondé exactamente **"ninguna"** (sin comillas).

    Respondé únicamente con el nombre de la carrera, todo en minúsculas, sin tildes ni otros comentarios.
    `;


      const resultado = await model.generateContent(prompt);
      const carrera = resultado.response.text().toLowerCase().trim();
      return carrera;
  }
  

const MAX_ESTIMATED_TOKENS = 30000; // Gemini 1.5 Flash permite hasta ~32k tokens
//calcula los tokens del texto
const estimateTokenLength = (text) => {
  // Aproximación: 1 token ≈ 0.75 palabras
  return Math.ceil(text.trim().split(/\s+/).length / 0.75);
};

//Funcion que genera una respuesta sin sesion del chat (Sin historial predefinido)
const generateResponse = async (msg) => {
  //defino el objeto mapa carreras, que tiene el nombre
  //de las carreras disponibles en la unnoba como claves y como valor: una llamada a una
  //funcion que hace una solicitud HTTP al plan de estudios de es carrera.
  const mapaCarreras = {
      "ingenieria en informatica": () => getContenidoCarrera("ingenieria-informatica"),
      "analista en sistemas": () => getContenidoCarrera("analista-sistemas"),
      "licenciatura en sistemas": () => getContenidoCarrera("licenciatura-sistemas"),
      "tecnicatura en diseño y desarrollo de aplicaciones multiplataforma": () => getContenidoCarrera("tecnicatura-diseño-desarrollo-apps"),

      "ingenieria industrial": () => getContenidoCarrera("ingenieria-industrial"),
      "ingenieria mecanica": () => getContenidoCarrera("ingenieria-mecanica"),
      "tecnicatura en mantenimiento industrial": () => getContenidoCarrera("mantenimiento-industrial"),

      "abogacia": () => getContenidoCarrera("abogacia"),
      
      "contador publico": () => getContenidoCarrera("contador-publico"),
      "licenciatura en administracion": () => getContenidoCarrera("licenciatura-en-administracion"),
      "tecnicatura en gestion publica": () => getContenidoCarrera("tecnicatura-gestion-publica"),
      "tecnicatura en gestion de pymes": () => getContenidoCarrera("tecnicatura-gestion-pymes"),
      
      "diseño grafico": () => getContenidoCarrera("diseño-grafico"),
      "diseño industrial": () => getContenidoCarrera("diseño-industrial"),
      "diseño de indumentaria y textil": () => getContenidoCarrera("diseño-indumentaria-y-textil"),
      
      "ingenieria agronomica": () => getContenidoCarrera("ingenieria-agronomica"),

      "licenciatura en genetica": () => getContenidoCarrera("genetica"),
      "ingenieria en alimentos": () => getContenidoCarrera("ingenieria-en-alimentos"),
      "licenciatura en enfermeria": () => getContenidoCarrera("licenciatura-enfermeria"),
      "enfermeria universitaria": () => getContenidoCarrera("enfermeria"),
      };

  //Si el mensaje es vacio, termina la ejecucion y no procesa nada Gemini
  if (!msg) return;

  //hook que indica que Gemini va a generar una respuesta es true
  setIsGenerating(true);
  //la respuesta transmitida se vacia, porque se va a generar una nueva.    
  setStreamedResponse("");
  //se actualizan los mensajes de la "sesion", no seria let en vez de const?
  const updatedMessages = [...messages, { type: "userMsg", text: msg }];
  //los cargamos al hook
  setMessages(updatedMessages);
  //vacio el que guarda de a un mensaje
  setMessage("");
  //Captura de respuesta true.
  setIsResponseScreen(true);
  
  //llamo a carrera detectada, que instancia otro modelo de gemini y le pregunta si en el
  //mensaje el usuario solicita algo relacionado al plan de estudios de alguna carrera de la unnoba.
  const carreraDetectada = await detectarCarrera(msg);
  let contextoCarrera = ""; //vacio el contexto de carrera
  
  //para poder llevar mejor el conteo de tokens, meto los planes en un arreglo.
  let planCarreraRepetido = false;
  if (carreraDetectada !== "ninguna" && mapaCarreras[carreraDetectada]) {
    for (let plan=0; plan < planesCarreras.length; plan++){
      if(carreraDetectada == planesCarreras[plan]){
        planCarreraRepetido = true;
      }
    }
    if(!planCarreraRepetido){
      if (!planCarreraRepetido) {
        contextoCarrera = await mapaCarreras[carreraDetectada]();
        setPlanesCarreras([...planesCarreras, contextoCarrera]);
      }
    }
  }

  const model = genAI.current.getGenerativeModel({ model: API_CONFIG.model });//se instancia el modelo de GEMINI 1.5 flash

  // Generar contexto base
  const baseSystemPrompt = SYSTEM_PROMPT + PPS_PROMPT + PROMPT_CENTRO_ESTUDIANTES + INTERCAMBIO_PROMPT;
  //cargo el contexto mas los mensajes que le mando el usuario al arreglo chatHistory.
  const chatHistory = [
    { role: "user", parts: [{ text: baseSystemPrompt }] },
    ...updatedMessages.map((m) => ({
      role: m.type === "userMsg" ? "user" : "model",
      parts: [{ text: m.text }],
    })),
  ];

  // Estimar tokens antes de continuar, si excedo los 30000, le digo al usuario que inicie un nuevo chat.
  const totalText = baseSystemPrompt + 
  updatedMessages.map((m) => m.text).join(" ") + planesCarreras.join(" ");
  const estimatedTokens = estimateTokenLength(totalText);
  if (estimatedTokens > MAX_ESTIMATED_TOKENS) {
    setMessages((prev) => [
      ...prev,
      {
        type: "responseMsg",
        text: "🚫 Has superado el límite de tokens permitidos en esta sesión. Por favor, presioná *Nuevo Chat* para comenzar una nueva conversación.",
      },
    ]);
    setIsGenerating(false);
    return;
  }

  try {
    //si chat.current es null es porque inicio un nuevo chat, entonces limipiamos el historial.
    if (!chat.current) {
      chat.current = model.startChat({ history: chatHistory });
    }
    if (contextoCarrera) {
      const infoCarreraMsg = `📚 Información sobre la carrera consultada:\n\n${contextoCarrera}`;
      setMessages((prev) => [
        ...prev,
        { type: "responseMsg", text: infoCarreraMsg },
      ]);
      setIsGenerating(false);
      return;
    }


      const result = await chat.current.sendMessage(msg);
      const responseText = result.response.text();
      const wordCount = responseText.trim().split(/\s+/).length;
      
      let fullText =
        wordCount > MAX_WORD_COUNT
          ? "Lo siento, ese último mensaje conlleva una respuesta demasiado larga..."
          : responseText;

      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setStreamedResponse(fullText.substring(0, i + 1));
          if (pausarUnnobaAi.current) {
            clearInterval(typingInterval);
            const interruptedText =
              fullText.substring(0, i) + ". Se ha interrumpido la respuesta.";
            setMessages((prev) => [
              ...prev,
              { type: "responseMsg", text: interruptedText },
            ]);
            setIsGenerating(false);
            pausarUnnobaAi.current = false;
          }
          if (saltosDeLinea.current) {
            fullText = fullText.slice(0, i) + "\n" + fullText.slice(i);
            saltosDeLinea.current = false;
          }
          i++;
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        } else {
          clearInterval(typingInterval);
          setMessages((prev) => [
            ...prev,
            { type: "responseMsg", text: fullText },
          ]);
          setStreamedResponse("");
          setIsGenerating(false);
        }
      }, RESPONSE_TYPING_SPEED);
    } catch (error) {
      console.error("Error generating response:", error);
      setIsGenerating(false);
    }
  };
  //input
  const hitRequest = async () => {
    if (!message.trim()) {
      showError("Debes escribir un mensaje");
      return;
    }
    setError(null);
    
    // Primero verificar si es una consulta sobre distribución de aulas
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('dónde se cursa') || 
        lowerMessage.includes('dónde cursar') || 
        lowerMessage.includes('en qué aula') || 
        lowerMessage.includes('en qué edificio') ||
        lowerMessage.includes('distribución de aulas') ||
        lowerMessage.includes('edificios') ||
        lowerMessage.includes('ubicación')) {
  
      const distributionResponse = await handleClassroomDistributionQuery(message);
      
      // Si la respuesta es un objeto, extraemos el mensaje. Si no, la usamos directamente.
      const responseText = typeof distributionResponse.message === 'string' ? distributionResponse.message : 'No se pudo obtener una respuesta.';
      addPredefinedResponse(message, responseText);
      setMessage("");
      return;
    }

    // Si no es distribución de aulas, buscar en la base de conocimientos
    const carreraDetectada = await detectarCarrera(message);
    const match = findBestMatch(message, KNOWLEDGE_BASE);
    //si match encontro una pregunta que coincide con el menseja del chat, responde con el banco de preguntas
    if (match && carreraDetectada == "ninguna") {
      addPredefinedResponse(message, match.response);                         
      setMessage("");
      return;
    } else {
      generateResponse(message); //sino la genera a la respuesta
    }
  };
  //elimina todos los mensajes y la referencia del chat la deja en null
  const newChat = () => {
    setIsResponseScreen(false);
    setMessages([]);
    setPlanesCarreras([]);
    chat.current = null;
  };
  //Añade una respuesta predefinida al hook de mensajes.
  const addPredefinedResponse = (question, response) => {
    setMessages((prev) => [
      ...prev,
      { type: "userMsg", text: question },
      { type: "responseMsg", text: response },
    ]);
    setIsResponseScreen(true);
  };

  return {
    message,
    setMessage,
    isResponseScreen,
    messages,
    isGenerating,
    streamedResponse,
    error,
    messagesEndRef,
    pausarUnnobaAi,
    saltosDeLinea,
    hitRequest,
    newChat,
    generateResponse,
    addPredefinedResponse,
    showError,
  };
};