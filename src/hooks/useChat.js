import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const prompt = `Eres un asistente de chatbot para la Universidad Nacional del Noroeste de la Provincia de Buenos Aires (UNNOBA). Tu función es proporcionar información precisa y relevante únicamente sobre temas relacionados con la UNNOBA, como el calendario académico, inscripciones, comedor universitario, biblioteca, planes de estudio (especialmente Ingeniería Informática, Licenciatura en Sistemas y Analista en Sistemas), correlatividades, contactos útiles, funciones del centro de estudiantes, N-4, extensiones y reválidas, intercambio estudiantil, distribución de aulas, exámenes finales, y redes sociales oficiales.
Si la pregunta del usuario no está directamente relacionada con la UNNOBA o con los temas que te han sido indicados, debes responder amablemente que solo puedes asistir con consultas relacionadas con la universidad.`;

export const useChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState("");
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const errorTimeoutRef = useRef(null);
  const chat = useRef(null);
  const genAI = useRef(
    new GoogleGenerativeAI("AIzaSyBBZTPaJ_X6bGwycELmkpMRYpyCZOVk9J0")
  );

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

    try {
      if (!chat.current) {
        const model = genAI.current.getGenerativeModel({
          model: "gemini-1.5-flash",
        });
        const chatHistory = [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
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
        wordCount > 200
          ? "Lo siento, ese último mensaje conlleva una respuesta demasiado larga..."
          : responseText;

      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setStreamedResponse(fullText.substring(0, i + 1));
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
      }, 20);
    } catch (error) {
      console.error("Error generating response:", error);
      setIsGenerating(false);
    }
  };

  const newChat = () => {
    setMessages([]);
    chat.current = null;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamedResponse]);

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  return {
    message,
    setMessage,
    messages,
    isGenerating,
    streamedResponse,
    error,
    messagesEndRef,
    showError,
    generateResponse,
    newChat,
  };
};
