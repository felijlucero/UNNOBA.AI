 import { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getContenidoIngInformatica, getContenidoAnalistSistemas, getContenidoLicSistemas, getContenidoEnfermeria, getContenidoGenetica } from "../service/get";
import {
  INTERCAMBIO_PROMPT,
  PROMPT_CENTRO_ESTUDIANTES,
  PROMPT_INSCRIPCIONES,
  PREGUNTAS_FRECUENTES,
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

  const generateResponse = async (msg) => {
    if (!msg) return;

    setIsGenerating(true);
    setStreamedResponse("");

    const updatedMessages = [...messages, { type: "userMsg", text: msg }];
    setMessages(updatedMessages);
    setMessage("");
    setIsResponseScreen(true);

    try {
      if (!chat.current) {
        const model = genAI.current.getGenerativeModel({
          model: API_CONFIG.model,
        });
        const PROMPT_INGINFORMATICA = await getContenidoIngInformatica();
        const PROMPT_ANALISTASISTEMAS = await getContenidoAnalistSistemas();
        const PROMPT_LICSISTEMAS = await getContenidoLicSistemas();
        const PROMPT_ENFERMERIA = await getContenidoEnfermeria();
        const PROMPT_GENETICA = await getContenidoGenetica();
        const chatHistory = [
          { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
              { role: "user", parts: [{ text: PROMPT_INGINFORMATICA }] },
              { role: "user", parts: [{ text: PROMPT_ANALISTASISTEMAS }] },
              { role: "user", parts: [{ text: PROMPT_LICSISTEMAS }] },
              { role: "user", parts: [{ text: PPS_PROMPT }] },
              { role: "user", parts: [{ text: PROMPT_GENETICA }] },
              { role: "user", parts: [{ text: PROMPT_ENFERMERIA }] },
          ...updatedMessages.map((m) => ({
            role: m.type === "userMsg" ? "user" : "model",
            parts: [{ text: m.text }],
          })),
        ];
        chat.current = await model.startChat({
          history: chatHistory,
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