import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import "./reset.css";

// Hooks personalizados
import { useTheme } from "./hooks/useTheme";
import { useChat } from "./hooks/useChat";

// Componentes
import Header from "./components/Header/Header";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";
import ChatScreen from "./components/ChatScreen/ChatScreen";
import InputBox from "./components/InputBox/InputBox";

// Constantes
import { PREDEFINED_RESPONSES } from "./utils/constants";

const App = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const {
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
  } = useChat();

  // Efectos para los eventos de teclado
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
  }, [saltosDeLinea]);

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
  }, [pausarUnnobaAi]);

  // Efecto para hacer scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamedResponse, messagesEndRef]);

  const handleCardClick = (question) => {
    const respuesta = PREDEFINED_RESPONSES[question];

    if (respuesta) {
      addPredefinedResponse(question, respuesta);
    } else {
      // Si no es uno de los atajos, va por IA
      setMessage(question);
      setTimeout(() => {
        generateResponse(question);
      }, 300);
    }
  };

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
            <Header
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              onNewChat={newChat}
              isGenerating={isGenerating}
              showNewChatButton={true}
            />
            <ChatScreen
              messages={messages}
              isGenerating={isGenerating}
              streamedResponse={streamedResponse}
              messagesEndRef={messagesEndRef}
            />
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
                justifyContent: "center",
                width: "100%",
                marginBottom: "2rem",
              }}
            >
              <Header
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                showNewChatButton={false}
              />
            </div>
            <WelcomeScreen onCardClick={handleCardClick} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="bottom"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <InputBox
          message={message}
          setMessage={setMessage}
          onSend={hitRequest}
          isGenerating={isGenerating}
          error={error}
        />
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
