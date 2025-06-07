import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useChat } from "./hooks/useChat";
import Header from "./components/Layout/Header";
import ChatScreen from "./components/Chat/ChatScreen";
import ChatInput from "./components/Chat/ChatInput";
import WelcomeScreen from "./components/Welcome/WelcomeScreen";
import "./components/common/styles/global.css";

const App = () => {
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const messagesEndRef = useRef(null);
  const {
    message,
    setMessage,
    messages,
    isGenerating,
    streamedResponse,
    error,
    showError,
    generateResponse,
    newChat: resetChat,
  } = useChat();

  const handleSend = () => {
    if (!message.trim()) {
      showError("Debes escribir un mensaje");
      return;
    }
    generateResponse(message);
    setIsResponseScreen(true);
  };

  const handleNewChat = () => {
    setIsResponseScreen(false);
    resetChat();
  };

  const handleQuestionClick = (question) => {
    setMessage(question);
    setTimeout(() => {
      generateResponse(question);
      setIsResponseScreen(true);
    }, 300);
  };

  return (
    <div className="container w-screen min-h-screen overflow-x-hidden bg-[#EDEDED] text-[#333333] font-sans flex flex-col">
      <AnimatePresence mode="wait">
        {isResponseScreen ? (
          <>
            <Header onNewChat={handleNewChat} isGenerating={isGenerating} />
            <ChatScreen
              messages={messages}
              isGenerating={isGenerating}
              streamedResponse={streamedResponse}
              messagesEndRef={messagesEndRef}
            />
          </>
        ) : (
          <WelcomeScreen onQuestionClick={handleQuestionClick} />
        )}
      </AnimatePresence>

      <ChatInput
        message={message}
        setMessage={setMessage}
        onSend={handleSend}
        error={error}
        isGenerating={isGenerating}
      />
    </div>
  );
};

export default App;
