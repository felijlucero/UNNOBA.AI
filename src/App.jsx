import { useState, useEffect, useRef } from "react";
import "./App.css";
import { IoRestaurant, IoSend, IoTime } from "react-icons/io5";
import { BiPlanet } from "react-icons/bi";
import { TbMessageChatbot } from "react-icons/tb";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState("");
  const pausarUnnobaAi = useRef(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef(null);
  const saltosDeLinea = useRef(false);

  const prompt = `Eres un asistente de chatbot para la Universidad Nacional del Noroeste de la Provincia de Buenos Aires (UNNOBA). Tu función es proporcionar información precisa y relevante únicamente sobre temas relacionados con la UNNOBA, como el calendario académico, inscripciones, comedor universitario, biblioteca, planes de estudio (especialmente Ingeniería Informática, Licenciatura en Sistemas y Analista en Sistemas), correlatividades, contactos útiles, funciones del centro de estudiantes, N-4, extensiones y reválidas, intercambio estudiantil, distribución de aulas, exámenes finales, y redes sociales oficiales.
Si la pregunta del usuario no está directamente relacionada con la UNNOBA o con los temas que te han sido indicados, debes responder amablemente que solo puedes asistir con consultas relacionadas con la universidad.`;

  const genAI = useRef(
    new GoogleGenerativeAI("AIzaSyC7AN2LSQqJijBR4IpPsp5ZGN_uk-C2UQA")
  );
  const chat = useRef(null);

  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const errorTimeoutRef = useRef(null);

  // Efecto para cambiar el tema del documento
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const showError = (message) => {
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }

    setError(message);
    inputRef.current?.focus();

    errorTimeoutRef.current = setTimeout(() => {
      setError(null);
    }, 2000);
  };

  const formatResponseText = (text) => {
    let formattedText = text.replace(/\*\s\*\*\*\s\*\*/g, "<strong>");
    formattedText = formattedText.replace(/\*\s\*\*\*\s\*\*/g, "</strong>");
    formattedText = formattedText.replace(
      /\*\s\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );
    return formattedText;
  };

  const hitRequest = () => {
    if (!message.trim()) {
      showError("Debes escribir un mensaje");
      return;
    }
    setError(null);
    generateResponse(message);
  };

  useEffect(() => {
    const handle2KeyDown = (e) => {
      if (e.key === "u") {
        saltosDeLinea.current = true;
      }
    };
    document.addEventListener("keydown", handle2KeyDown);

    return () => {
      document.removeEventListener("keydown", handle2KeyDown);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "x") {
        pausarUnnobaAi.current = true;
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Limpiar el timeout cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  const generateResponse = async (msg) => {
    if (!msg) return;

    setIsGenerating(true);
    setStreamedResponse("");

    const updatedMessages = [...messages, { type: "userMsg", text: msg }];
    setMessages(updatedMessages);
    setMessage("");
    setisResponseScreen(true);

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
      }, 20);
    } catch (error) {
      console.error("Error generating response:", error);
      setIsGenerating(false);
    }
  };
  const newChat = () => {
    setisResponseScreen(false);
    setMessages([]);
    chat.current = null;
  };

  const handleCardClick = (question) => {
    const respuestasPredefinidas = {
      "¿Dónde puedo contactar a la universidad o cuáles son sus redes sociales?":
        "<strong style='color: #007bbf;'>Redes de la Universidad</strong><br />Instagram: @elegiunnoba o @unnobanoticias<br />Facebook: NoticiasUNNOBA<br />Web: www.unnoba.edu.ar<br /><br /><strong style='color:rgb(150, 0, 137);'>Centro de estudiantes</strong><br />Vía Instagram:<br />Franja Morada Junín: @franjaunnobajunin<br />Franja Morada Pergamino: @franjamoradaunnoba<br /><br /><strong style='color:gray;'>Contactos institucionales📧</strong><br /> estudiantes@unnoba.edu.ar<br />También podés acercarte a Bienestar Estudiantil en tu sede.",
      "¿Cómo y cuándo me inscribo a materias o finales?":
        "Las inscripciones a materias y finales se realizan desde el sistema <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, ingresando con tu cuenta institucional.<br /><br />📅 Las fechas exactas para inscripciones, cursadas y finales están publicadas en el <a href='https://elegi.unnoba.edu.ar/calendarioacademico/' target='_blank' style='color:#005B96; font-weight:bold;'>Calendario Académico</a> de la UNNOBA. Te recomendamos revisarlo con frecuencia.<br /><br />⚠️ Recordá que algunas materias o finales requieren tener otras materias aprobadas (correlatividades). Para conocerlas, revisá el plan de estudios de tu carrera en el<a href='https://unnoba.edu.ar/' target='_blank' style='color:#005B96; font-weight:bold;'> sitio oficial de la UNNOBA</a>.",
      "¿Cómo funciona el comedor?":
        "Para utilizar el comedor universitario debés ingresar a <a href='https://comedor.unnoba.edu.ar/' target='_blank' style='color:#005B96; font-weight:bold;'>comedor.unnoba.edu.ar</a> con tu cuenta institucional y realizar la reserva.<br /><br />🍽️ Cada día se ofrecen dos menús, y al acceder con tu cuenta UNNOBA obtenés un descuento especial.<br /><br />📍 Dirección del comedor: Jorge Newbery 348, Junín, Buenos Aires (CP 6000).",
      "¿Como utilizo la plataforma virtual o campus?":
        "Al acceder a la plataforma virtual <a href='https://plataformaed.unnoba.edu.ar' target='_blank' style='color:#005B96; font-weight:bold;'>plataformaed.unnoba.edu.ar</a> vas a encontrar todas las materias que estés cursando actualmente o que hayas cursado previamente.<br /><br />📩 Para ingresar necesitás tu cuenta institucional de la UNNOBA. Si no podés acceder, consultá con la Dirección de Alumnos o el área de soporte académico.",
    };

    const respuesta = respuestasPredefinidas[question];

    if (respuesta) {
      setMessages((prev) => [
        ...prev,
        { type: "userMsg", text: question },
        { type: "responseMsg", text: respuesta },
      ]);
      setisResponseScreen(true);
    } else {
      // Si no es uno de los atajos, va por IA
      setMessage(question);
      setTimeout(() => {
        generateResponse(question);
      }, 300);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamedResponse]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.03,
      y: -5,
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.8,
      },
    },
  };

  const typingCursorVariants = {
    blinking: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatDelay: 0,
      },
    },
  };

  const welcomeMessage =
    "¡Hola! soy el asistente virtual de la unnoba, ¿En que puedo ayudarte?";
  const [displayedMessage, setDisplayedMessage] = useState("");
  const typingSpeed = 75;
  useEffect(() => {
    if (displayedMessage.length < welcomeMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayedMessage(
          welcomeMessage.substring(0, displayedMessage.length + 1)
        );
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }
  }, [displayedMessage, welcomeMessage, typingSpeed]);

  return (
    <div className="container">
      <AnimatePresence mode="wait">
        {isResponseScreen ? (
          <motion.div
            key="chat-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: "flex", flexDirection: "column", flex: 1 }}
          >
            <div
              className="header"
              style={{
                paddingTop: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <motion.h2
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="main-title"
              >
                UNNOBA.AI
              </motion.h2>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-theme"
                  onClick={toggleTheme}
                  style={{
                    backgroundColor: isDarkMode ? "#f59e0b" : "#374151",
                    color: isDarkMode ? "#111827" : "white",
                  }}
                >
                  {isDarkMode ? "☀️" : "🌙"}
                </motion.button>
                <motion.button
                  id="newChatBtn"
                  whileHover={!isGenerating ? { scale: 1.05 } : {}}
                  whileTap={!isGenerating ? { scale: 0.95 } : {}}
                  className="btn-primary"
                  onClick={newChat}
                  disabled={isGenerating}
                >
                  Nuevo Chat
                </motion.button>
              </div>
            </div>

            <motion.div
              className="messages-container"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div
                style={{
                  maxWidth: "64rem",
                  margin: "0 auto",
                  padding: "0 1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {messages?.map((msg, index) => (
                  <motion.div
                    key={index}
                    variants={messageVariants}
                    className={
                      msg.type === "userMsg" ? "user-message" : "bot-message"
                    }
                    dangerouslySetInnerHTML={{
                      __html:
                        msg.type === "responseMsg"
                          ? formatResponseText(msg.text)
                          : msg.text,
                    }}
                  />
                ))}
                {isGenerating && streamedResponse && (
                  <div style={{ display: "flex", alignItems: "end" }}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bot-message"
                      dangerouslySetInnerHTML={{
                        __html: formatResponseText(streamedResponse),
                      }}
                    />
                    <motion.span
                      className="typing-cursor"
                      variants={typingCursorVariants}
                      animate="blinking"
                    />
                  </div>
                )}
                {isGenerating && !streamedResponse && (
                  <motion.div
                    variants={loadingVariants}
                    animate="visible"
                    initial="hidden"
                    className="bot-message"
                    style={{ maxWidth: "40%" }}
                  >
                    <div className="loading-dots">
                      <div className="loading-dot"></div>
                      <div className="loading-dot"></div>
                      <div className="loading-dot"></div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="welcome-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                maxWidth: "80rem",
                padding: "0 1rem",
                marginBottom: "2rem",
              }}
            >
              <div></div>
              <motion.h1
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="main-title"
              >
                UNNOBA.AI
              </motion.h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-theme"
                onClick={toggleTheme}
                style={{
                  backgroundColor: isDarkMode ? "#f59e0b" : "#374151",
                  color: isDarkMode ? "#111827" : "white",
                }}
              >
                {isDarkMode ? "☀️" : "🌙"}
              </motion.button>
            </div>
            <motion.div
              style={{ width: "100%", maxWidth: "80rem", padding: "0 1rem" }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="m-5 py-5 flex flex-col w-lg items-center">
                <p className="text-[#005B96] font-bold"> {displayedMessage}</p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1.5rem",
                  "@media (min-width: 768px)": {
                    gridTemplateColumns: "repeat(2, 1fr)",
                  },
                  "@media (min-width: 1024px)": {
                    gridTemplateColumns: "repeat(4, 1fr)",
                  },
                }}
              >
                {[
                  {
                    question:
                      "¿Dónde puedo contactar a la universidad o cuáles son sus redes sociales?",
                    icon: <BiPlanet />,
                  },
                  {
                    question: "¿Como utilizo la plataforma virtual o campus?",
                    icon: <TbMessageChatbot />,
                  },
                  {
                    question:
                      "¿Cómo y cuándo me inscribo a materias o finales?",
                    icon: <IoTime />,
                  },
                  {
                    question: "¿Cómo funciona el comedor?",
                    icon: <IoRestaurant />,
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={cardVariants}
                    whileHover="hover"
                    className="card"
                    onClick={() =>
                      handleCardClick(item.question.split("\n").join(" "))
                    }
                  >
                    <p className="card-text">{item.question}</p>
                    <div className="card-icon">{item.icon}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="bottom"
        style={{
          width: "100%",
          maxWidth: "48rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem 0",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="inputBox"
          style={{
            width: "100%",
            maxWidth: "32rem",
            fontSize: "1rem",
            padding: "0.5rem",
            display: "flex",
            alignItems: "center",
            borderRadius: "9999px",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
          whileFocus={{ boxShadow: "0 0 0 2px rgba(0, 91, 150, 0.2)" }}
        >
          <input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") hitRequest();
            }}
            type="text"
            style={{
              padding: "0.75rem",
              paddingLeft: "0.75rem",
              flex: 1,
              outline: "none",
              border: "none",
            }}
            placeholder="Escribe tu mensaje aquí..."
            id="messageBox"
          />

          {message && (
            <motion.button
              style={{
                fontSize: "1.25rem",
                cursor: "pointer",
                background: "transparent",
                border: "none",
                color: "var(--accent-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.5rem",
              }}
              onClick={hitRequest}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={isGenerating}
            >
              <IoSend />
            </motion.button>
          )}
        </motion.div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="error-message"
          >
            {error}
          </motion.p>
        )}
        <motion.p
          className="bottom-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Chatbot desarrollado para la UNNOBA con el objetivo de ayudar a los/as
          estudiantes de la misma.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default App;
