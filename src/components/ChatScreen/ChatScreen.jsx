import { motion } from "framer-motion";
import PropTypes from "prop-types";
import MessageBubble from "../MessageBubble/MessageBubble";
import LoadingDots from "../LoadingDots/LoadingDots";
import TypingCursor from "../TypingCursor/TypingCursor";
import {
  formatResponseText,
  formatCalendarResponse,
  formatDateInfo,
} from "../../utils/formatters";
import "./ChatScreen.css";

const ChatScreen = ({
  messages,
  isGenerating,
  streamedResponse,
  messagesEndRef,
}) => {
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

  // Función para formatear respuestas en streaming
  const getFormattedStreamedResponse = (text) => {
    if (!text) return "";

    // Detectar tipo de respuesta para aplicar formateo apropiado
    if (
      text.includes("CALENDAR") ||
      text.includes("ACADÉMICO") ||
      text.includes("📅") ||
      text.includes("EXÁMENES") ||
      text.includes("INSCRIPCIONES") ||
      text.includes("FERIADOS")
    ) {
      return formatCalendarResponse(text);
    }

    // Detectar información de fechas
    const hasDateInfo =
      /\d{4}-\d{2}-\d{2}|\d{1,2}\s+de\s+\w+|\w+\s+\d{1,2}\s+al?\s+\d{1,2}/i.test(
        text
      );
    if (hasDateInfo) {
      return formatDateInfo(text);
    }

    return formatResponseText(text);
  };

  return (
    <motion.div
      className="messages-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="messages-content">
        {messages?.map((msg, index) => (
          <MessageBubble
            key={index}
            message={msg.text}
            isUser={msg.type === "userMsg"}
          />
        ))}
        {isGenerating && streamedResponse && (
          <div className="streaming-response">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bot-message streaming-message"
              dangerouslySetInnerHTML={{
                __html: getFormattedStreamedResponse(streamedResponse),
              }}
            />
            <TypingCursor />
          </div>
        )}
        {isGenerating && !streamedResponse && (
          <motion.div
            variants={loadingVariants}
            animate="visible"
            initial="hidden"
            className="bot-message loading-message"
          >
            <LoadingDots />
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </motion.div>
  );
};

ChatScreen.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  isGenerating: PropTypes.bool.isRequired,
  streamedResponse: PropTypes.string.isRequired,
  messagesEndRef: PropTypes.object.isRequired,
};

export default ChatScreen;
