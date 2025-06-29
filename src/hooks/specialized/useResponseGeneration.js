import { useState, useRef, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_CONFIG, RESPONSE_CONFIG } from "../../constants/apiConstants.js";
import { SYSTEM_PROMPT } from "../../constants/prompts/systemPrompts.js";
import { formatUrls } from "../../utils/formatters.js";

/**
 * Hook especializado para la generación de respuestas con IA
 */
export const useResponseGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState("");
  const [error, setError] = useState(null);

  // Referencias para control de streaming
  const pausarUnnobaAi = useRef(false);
  const saltosDeLinea = useRef(false);

  /**
   * Inicializa la API de Gemini
   */
  const initializeGemini = useCallback(() => {
    if (!API_CONFIG.GEMINI_API_KEY) {
      throw new Error("API Key de Gemini no configurada");
    }

    const genAI = new GoogleGenerativeAI(API_CONFIG.GEMINI_API_KEY);
    return genAI.getGenerativeModel({ model: "gemini-pro" });
  }, []);

  /**
   * Prepara el prompt con contexto del sistema
   * @param {string} userMessage - Mensaje del usuario
   * @param {string} additionalContext - Contexto adicional opcional
   * @returns {string} - Prompt completo
   */
  const preparePrompt = useCallback((userMessage, additionalContext = "") => {
    let fullPrompt = SYSTEM_PROMPT;

    if (additionalContext) {
      fullPrompt += `\n\nCONTEXTO ADICIONAL:\n${additionalContext}`;
    }

    fullPrompt += `\n\nPREGUNTA DEL USUARIO: ${userMessage}`;

    return fullPrompt;
  }, []);

  /**
   * Valida si el contenido de respuesta es apropiado
   * @param {string} content - Contenido a validar
   * @returns {boolean} - True si es válido
   */
  const isValidContent = useCallback((content) => {
    if (!content || content.trim().length === 0) return false;

    // Verificar que sea relacionado con UNNOBA
    const unnobaKeywords = [
      "unnoba",
      "universidad",
      "carrera",
      "materia",
      "inscripcion",
      "calendario",
      "examen",
      "estudiante",
      "alumno",
    ];

    const contentLower = content.toLowerCase();
    return unnobaKeywords.some((keyword) => contentLower.includes(keyword));
  }, []);

  /**
   * Procesa el texto para el streaming con efectos especiales
   * @param {string} text - Texto a procesar
   * @returns {string} - Texto procesado
   */
  const processTextForStreaming = useCallback((text) => {
    let processedText = formatUrls(text);

    // Aplicar saltos de línea si está activado
    if (saltosDeLinea.current) {
      processedText = processedText.replace(/\./g, ".\n");
      saltosDeLinea.current = false; // Reset después de usar
    }

    return processedText;
  }, []);

  /**
   * Simula el efecto de typing con delay variable
   * @param {string} text - Texto a mostrar
   * @param {function} onUpdate - Callback para actualizar texto
   * @param {function} onComplete - Callback al completar
   */
  const simulateTyping = useCallback(
    async (text, onUpdate, onComplete) => {
      const processedText = processTextForStreaming(text);
      let currentText = "";

      for (let i = 0; i < processedText.length; i++) {
        if (pausarUnnobaAi.current) {
          pausarUnnobaAi.current = false;
          break;
        }

        currentText += processedText[i];
        onUpdate(currentText);

        // Delay variable según el caracter
        let delay = RESPONSE_CONFIG.TYPING_SPEED;

        if (
          processedText[i] === "." ||
          processedText[i] === "!" ||
          processedText[i] === "?"
        ) {
          delay = RESPONSE_CONFIG.PAUSE_AFTER_SENTENCES;
        } else if (processedText[i] === "\n") {
          delay = RESPONSE_CONFIG.PAUSE_AFTER_PARAGRAPHS;
        }

        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      onComplete();
    },
    [processTextForStreaming]
  );

  /**
   * Cuenta palabras en un texto
   * @param {string} text - Texto a contar
   * @returns {number} - Número de palabras
   */
  const countWords = useCallback((text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  }, []);

  /**
   * Genera una respuesta usando Gemini AI
   * @param {string} userMessage - Mensaje del usuario
   * @param {string} additionalContext - Contexto adicional
   * @returns {Promise<string>} - Respuesta generada
   */
  const generateAIResponse = useCallback(
    async (userMessage, additionalContext = "") => {
      setIsGenerating(true);
      setError(null);
      setStreamedResponse("");

      try {
        const model = initializeGemini();
        const prompt = preparePrompt(userMessage, additionalContext);

        console.log("🤖 Generando respuesta con IA...");

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        if (!isValidContent(text)) {
          throw new Error("La respuesta generada no es apropiada para UNNOBA");
        }

        // Verificar límite de palabras para streaming
        const wordCount = countWords(text);
        const shouldStream = wordCount <= RESPONSE_CONFIG.MAX_WORD_COUNT;

        if (shouldStream) {
          // Streaming con efecto typing
          await simulateTyping(
            text,
            (currentText) => setStreamedResponse(currentText),
            () => setIsGenerating(false)
          );
        } else {
          // Mostrar todo de una vez si es muy largo
          const processedText = processTextForStreaming(text);
          setStreamedResponse(processedText);
          setIsGenerating(false);
        }

        return text;
      } catch (error) {
        console.error("Error generando respuesta:", error);
        const errorMessage = `Error al generar respuesta: ${error.message}`;
        setError(errorMessage);
        setStreamedResponse(errorMessage);
        setIsGenerating(false);
        throw error;
      }
    },
    [
      initializeGemini,
      preparePrompt,
      isValidContent,
      countWords,
      simulateTyping,
      processTextForStreaming,
    ]
  );

  /**
   * Pausa la generación de respuesta
   */
  const pauseGeneration = useCallback(() => {
    pausarUnnobaAi.current = true;
  }, []);

  /**
   * Activa el modo de saltos de línea
   */
  const enableLineBreaks = useCallback(() => {
    saltosDeLinea.current = true;
  }, []);

  /**
   * Reinicia el estado del hook
   */
  const reset = useCallback(() => {
    setIsGenerating(false);
    setStreamedResponse("");
    setError(null);
    pausarUnnobaAi.current = false;
    saltosDeLinea.current = false;
  }, []);

  return {
    generateAIResponse,
    pauseGeneration,
    enableLineBreaks,
    reset,
    isGenerating,
    streamedResponse,
    error,
    // Referencias expuestas para compatibilidad
    pausarUnnobaAi,
    saltosDeLinea,
  };
};
