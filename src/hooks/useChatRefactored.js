import { useState, useRef, useCallback } from "react";
import { useCareerSearch } from "./specialized/useCareerSearch.js";
import { useResponseGeneration } from "./specialized/useResponseGeneration.js";
import { useExamSearch } from "./specialized/useExamSearch.js";
import { chatService } from "../services/chat/chatService.js";

/**
 * Hook principal refactorizado para el chat
 * Ahora usa servicios especializados y tiene mejor separación de responsabilidades
 */
export const useChatRefactored = () => {
  // Estados principales
  const [message, setMessage] = useState("");
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);

  // Referencias
  const messagesEndRef = useRef(null);

  // Hooks especializados
  const careerSearch = useCareerSearch();
  const responseGeneration = useResponseGeneration();
  const examSearch = useExamSearch();

  // Estado de carga combinado
  const isGenerating =
    careerSearch.isLoading ||
    responseGeneration.isGenerating ||
    examSearch.isLoading;

  // Error combinado
  const error =
    careerSearch.error || responseGeneration.error || examSearch.error;

  /**
   * Muestra un error en el chat
   * @param {string} message - Mensaje de error
   */
  const showError = useCallback((message) => {
    const errorMessage = {
      id: Date.now() + Math.random(),
      text: message,
      sender: "ai",
      timestamp: new Date(),
      isError: true,
    };
    setMessages((prev) => [...prev, errorMessage]);
  }, []);

  /**
   * Agrega un mensaje al chat
   * @param {string} text - Texto del mensaje
   * @param {string} sender - Remitente ("user" o "ai")
   * @returns {object} - Objeto del mensaje creado
   */
  const addMessage = useCallback((text, sender = "ai") => {
    const newMessage = {
      id: Date.now() + Math.random(),
      text,
      sender,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  }, []);

  /**
   * Agrega una respuesta predefinida al chat
   * @param {string} question - Pregunta del usuario
   * @param {string} response - Respuesta predefinida
   */
  const addPredefinedResponse = useCallback(
    (question, response) => {
      if (!isResponseScreen) {
        setIsResponseScreen(true);
      }

      // Agregar pregunta del usuario
      addMessage(question, "user");

      // Agregar respuesta predefinida
      setTimeout(() => {
        addMessage(response, "ai");
      }, 300);
    },
    [isResponseScreen, addMessage]
  );

  /**
   * Procesa un mensaje del usuario y genera respuesta
   * @param {string} userMessage - Mensaje del usuario
   */
  const generateResponse = useCallback(
    async (userMessage) => {
      try {
        if (!isResponseScreen) {
          setIsResponseScreen(true);
        }

        // Agregar mensaje del usuario
        addMessage(userMessage, "user");

        // 1. Verificar respuestas predefinidas primero
        const predefinedResponse =
          chatService.findPredefinedResponse(userMessage);
        if (predefinedResponse) {
          setTimeout(() => {
            addMessage(predefinedResponse, "ai");
          }, 300);
          return;
        }

        // 2. Verificar si es una consulta sobre fechas específicas de exámenes
        const examResponse = await examSearch.findExamInMessage(userMessage);
        if (examResponse) {
          setTimeout(() => {
            addMessage(examResponse, "ai");
          }, 300);
          return;
        }

        // 3. Verificar si es una consulta sobre carreras
        const careerResponse = await careerSearch.findCareerInMessage(
          userMessage
        );
        if (careerResponse) {
          setTimeout(() => {
            addMessage(careerResponse, "ai");
          }, 300);
          return;
        }

        // 4. Analizar el tipo de consulta para respuesta contextual
        const queryAnalysis = chatService.analyzeQuery(userMessage);

        // Si podemos generar una respuesta contextual sin IA
        if (queryAnalysis.confidence > 0.5) {
          const contextualResponse = chatService.generateContextualResponse(
            userMessage,
            queryAnalysis
          );
          setTimeout(() => {
            addMessage(contextualResponse, "ai");
          }, 300);
          return;
        }

        // 5. Como último recurso, usar IA
        const aiResponse = await responseGeneration.generateAIResponse(
          userMessage
        );
        setTimeout(() => {
          addMessage(aiResponse, "ai");
        }, 300);
      } catch (error) {
        console.error("Error generando respuesta:", error);
        showError(
          "Lo siento, hubo un error procesando tu consulta. Por favor, intenta nuevamente."
        );
      }
    },
    [
      isResponseScreen,
      addMessage,
      careerSearch,
      examSearch,
      responseGeneration,
      showError,
    ]
  );

  /**
   * Maneja el envío de mensajes
   */
  const hitRequest = useCallback(() => {
    if (message.trim()) {
      generateResponse(message.trim());
      setMessage("");
    }
  }, [message, generateResponse]);

  /**
   * Inicia un nuevo chat
   */
  const newChat = useCallback(() => {
    setMessages([]);
    setIsResponseScreen(false);
    setMessage("");
    responseGeneration.reset();
  }, [responseGeneration]);

  /**
   * Manejo de eventos de teclado para funciones especiales
   */
  const handleKeyPress = useCallback(
    (key) => {
      switch (key) {
        case "u":
          responseGeneration.enableLineBreaks();
          break;
        case "x":
          responseGeneration.pauseGeneration();
          break;
        default:
          break;
      }
    },
    [responseGeneration]
  );

  return {
    // Estados principales
    message,
    setMessage,
    isResponseScreen,
    messages,
    messagesEndRef,

    // Estados de carga y error
    isGenerating,
    error,
    streamedResponse: responseGeneration.streamedResponse,

    // Funciones principales
    generateResponse,
    addPredefinedResponse,
    hitRequest,
    newChat,
    handleKeyPress,

    // Referencias expuestas para compatibilidad con componentes existentes
    pausarUnnobaAi: responseGeneration.pausarUnnobaAi,
    saltosDeLinea: responseGeneration.saltosDeLinea,

    // Servicios especializados (para casos avanzados)
    careerSearch,
    responseGeneration,
    examSearch,
  };
};
