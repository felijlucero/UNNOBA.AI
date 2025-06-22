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
import { text } from "motion/react-client";

export const useChat = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState("");
  const [error, setError] = useState(null);

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
  };


  const generateResponse = async (msg) => {

    if (!msg) return;

    setIsGenerating(true);
    setStreamedResponse("");

    const updatedMessages = [...messages, { type: "userMsg", text: msg }];
    setMessages(updatedMessages);
    setMessage("");
    setIsResponseScreen(true);

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
      
      "licenciatura en enfermeria": () => getContenidoCarrera("licenciatura-enfermeria"),
      "enfermeria universitaria": () => getContenidoCarrera("enfermeria"),
      };

    try {
      const carreraDetectada = await detectarCarrera(msg);
      let contextoCarrera = "";

      if (carreraDetectada !== "ninguna" && mapaCarreras[carreraDetectada]) {
        contextoCarrera = await mapaCarreras[carreraDetectada]();
      }
      // Crear modelo, el if del chat.current no era necesario. cada que vez que se inicia el chat lo que se
      //le cargue al contexto se elimina.
      const model = genAI.current.getGenerativeModel({
        model: API_CONFIG.model,
      });

      // Crear historial con el SYSTEM_PROMPT
      const chatHistory = [
        { role: "user", parts: [{ text: SYSTEM_PROMPT+PPS_PROMPT+PROMPT_CENTRO_ESTUDIANTES+INTERCAMBIO_PROMPT}] },
         ...updatedMessages.map((m) => ({
            role: m.type === "userMsg" ? "user" : "model",
            parts: [{ text: m.text }],
          })),
      ];

      // Iniciar el chat con el historial completo
      chat.current = await model.startChat({
        history: chatHistory,
      });
      

      // Inyectar contexto si existe al historial para que lo tenga para futuras respuestas
      if (contextoCarrera) {
        chatHistory.push({
          role: "user",
          parts: [{ text: `Información importante sobre la carrera consultada:\n\n${contextoCarrera}` }],
        });
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

  const hitRequest = () => {
    if (!message.trim()) {
      showError("Debes escribir un mensaje");
      return;
    }
    setError(null);
    generateResponse(message);
  };

  const newChat = () => {
    setIsResponseScreen(false);
    setMessages([]);
    chat.current = null;
  };

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