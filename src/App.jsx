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
  const messagesEndRef = useRef(null);

const prompt = `Eres un asistente de chatbot para la Universidad Nacional del Noroeste de la Provincia de Buenos Aires (UNNOBA). Tu función es proporcionar información precisa y relevante únicamente sobre temas relacionados con la UNNOBA, como el calendario académico, inscripciones, comedor universitario, biblioteca, planes de estudio (especialmente Ingeniería Informática, Licenciatura en Sistemas y Analista en Sistemas), correlatividades, contactos útiles, funciones del centro de estudiantes, N-4, extensiones y reválidas, intercambio estudiantil, distribución de aulas, exámenes finales, y redes sociales oficiales.
Si la pregunta del usuario no está directamente relacionada con la UNNOBA o con los temas que te han sido indicados, debes responder amablemente que solo puedes asistir con consultas relacionadas con la universidad.`;


  const genAI = useRef(
    new GoogleGenerativeAI("AIzaSyBBZTPaJ_X6bGwycELmkpMRYpyCZOVk9J0")
  );
  const chat = useRef(null);  
  

  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const errorTimeoutRef = useRef(null);

  const showError = (message) => {
    // Limpiar timeout anterior si existe
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }

    setError(message);
    inputRef.current?.focus();

    // Configurar timeout para ocultar el error después de 2 segundos
    errorTimeoutRef.current = setTimeout(() => {
      setError(null);
    }, 2000);
  };

  const formatResponseText = (text) => {
    // Reemplaza los patrones * *** ** con etiquetas <strong>
    let formattedText = text.replace(/\*\s\*\*\*\s\*\*/g, "<strong>");
    formattedText = formattedText.replace(/\*\s\*\*\*\s\*\*/g, "</strong>");

    // También maneja el caso de listas con asteriscos
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
    setError(null); // Limpiar error inmediatamente si hay mensaje válido
    generateResponse(message);
  };

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
  
    // Mostrar el mensaje del usuario inmediatamente
    const updatedMessages = [...messages, { type: "userMsg", text: msg }];
    setMessages(updatedMessages);
    setMessage(""); // limpiar input
    setisResponseScreen(true); // mostrar pantalla de chat
  
    try {
      // Inicializar chat si no existe
      if (!chat.current) {
        const model = genAI.current.getGenerativeModel({
          model: "gemini-1.5-flash",
        });
        const initialSystemMessage = {
          role: "user", // o "system", si el modelo lo acepta
          parts: [{ text: prompt }],
        };
        const chatHistory = [
          {
            role: "user",
            parts: [{ text: prompt }], // esto le da contexto de su rol
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
  
          // Agregar el mensaje de respuesta completo
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
      "Las inscripciones a materias y finales se realizan desde el sistema <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, ingresando con tu cuenta institucional.<br /><br />📅 Las fechas exactas para inscripciones, cursadas, finales y recesos están publicadas en el <a href='https://elegi.unnoba.edu.ar/calendarioacademico/' target='_blank' style='color:#005B96; font-weight:bold;'>Calendario Académico</a> de la UNNOBA. Te recomendamos revisarlo con frecuencia.<br /><br />⚠️ Recordá que algunas materias o finales requieren tener otras materias aprobadas (correlatividades). Para conocerlas, revisá el plan de estudios de tu carrera en el<a href='https://unnoba.edu.ar/' target='_blank' style='color:#005B96; font-weight:bold;'> sitio oficial de la UNNOBA</a>.",
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
    hover: { scale: 1.03, backgroundColor: "#A8D0E6" },
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

  return (
    <div className="container w-screen min-h-screen overflow-x-hidden bg-[#EDEDED] text-[#333333] font-sans flex flex-col">
      <AnimatePresence mode="wait">
        {isResponseScreen ? (
          <motion.div
            key="chat-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col flex-1"
          >
            <div className="header pt-6 flex items-center justify-between w-full px-[10vw]">
              <motion.h2
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-2xl text-[#005B96] font-bold"
              >
                UNNOBA.AI
              </motion.h2>
              <motion.button
  id="newChatBtn"
  whileHover={!isGenerating ? { scale: 1.05 } : {}}
  whileTap={!isGenerating ? { scale: 0.95 } : {}}
  className={`bg-[#005B96] text-white p-2 rounded-full text-sm px-5 transition-colors ${
    isGenerating
      ? "opacity-50 cursor-not-allowed"
      : "hover:bg-[#00467a]"
  }`}
  onClick={newChat}
  disabled={isGenerating}
>
  Nuevo Chat
</motion.button>

            </div>

            <motion.div
              className="messages-container flex-1 px-4 py-4 overflow-y-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="max-w-4xl mx-auto px-4 space-y-4">
                {messages?.map((msg, index) => (
                  <motion.div
                    key={index}
                    variants={messageVariants}
                    className={`p-4 rounded-2xl max-w-[80%] relative ${
                      msg.type === "userMsg"
                        ? "bg-[#005B96] text-white ml-auto rounded-br-none"
                        : "bg-white text-gray-800 shadow-md mr-auto rounded-bl-none"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html:
                        msg.type === "responseMsg"
                          ? formatResponseText(msg.text)
                          : msg.text,
                    }}
                  />
                ))}
                {isGenerating && streamedResponse && (
                  <div className="flex items-end">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-4 rounded-2xl shadow-md max-w-[80%] mr-auto rounded-bl-none"
                      dangerouslySetInnerHTML={{
                        __html: formatResponseText(streamedResponse),
                      }}
                    />
                    <motion.span
                      className="ml-1 inline-block w-2 h-5 bg-[#005B96] mb-4"
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
                    className="bg-white p-4 rounded-2xl shadow-md max-w-[40%] mr-auto rounded-bl-none"
                  >
                    <div className="flex space-x-2 justify-start">
                      <div className="w-2 h-2 rounded-full bg-[#005B96]"></div>
                      <div className="w-2 h-2 rounded-full bg-[#005B96]"></div>
                      <div className="w-2 h-2 rounded-full bg-[#005B96]"></div>
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
            className="flex flex-col items-center justify-center flex-1"
          >
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-4xl text-[#005B96] font-bold mb-8"
            >
              UNNOBA.AI
            </motion.h1>
            <motion.div
              className="w-full max-w-5xl px-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    question: "¿Dónde puedo contactar a la universidad o cuáles son sus redes sociales?",
                    icon: <BiPlanet />,
                  },
                  {
                    question: "¿Como utilizo la plataforma virtual o campus?",
                    icon: <TbMessageChatbot />,
                  },
                  {
                    question: "¿Cómo y cuándo me inscribo a materias o finales?", 
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
                    className="card rounded-lg cursor-pointer px-5 relative min-h-[180px] bg-white p-6 shadow-md flex flex-col"
                    onClick={() =>
                      handleCardClick(item.question.split("\n").join(" "))
                    }
                  >
                    <p className="text-base whitespace-pre-line mb-6">
                      {item.question}
                    </p>
                    <div className="mt-auto text-right">
                      <i className="text-xl text-[#005B96]">{item.icon}</i>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="bottom w-full py-4 flex flex-col items-center px-[10vw] bg-[#EDEDED] border-t border-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="inputBox w-full max-w-2xl text-base py-2 flex items-center bg-white rounded-full border border-[#005B96] shadow-sm px-4"
          whileFocus={{ boxShadow: "0 0 0 2px rgba(0, 91, 150, 0.2)" }}
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") hitRequest();
            }}
            type="text"
            className="p-3 pl-3 bg-transparent flex-1 outline-none border-none"
            placeholder="Escribe tu mensaje aquí..."
            id="messageBox"
          />
          {message && (
            <motion.button
              className="text-[#005B96] text-xl cursor-pointer bg-transparent border-none"
              onClick={hitRequest}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={isGenerating}
            >
              <IoSend />
            </motion.button>
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 text-sm mt-1"
            >
              {error}
            </motion.p>
          )}
        </motion.div>
        <motion.p
          className="text-gray-500 text-sm mt-4 text-center max-w-2xl"
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
