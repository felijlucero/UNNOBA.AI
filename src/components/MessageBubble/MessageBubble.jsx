import { motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  formatResponseText,
  formatCalendarResponse,
  formatDateInfo,
} from "../../utils/formatters";
import "./MessageBubble.css";

const MessageBubble = ({ message, isUser }) => {
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  // Función para detectar el tipo de respuesta y aplicar el formateo apropiado
  const getFormattedMessage = (text) => {
    if (isUser) return text;

    // Detectar si es una respuesta del calendario académico
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

    // Detectar si contiene información de fechas específicas
    const hasDateInfo =
      /\d{4}-\d{2}-\d{2}|\d{1,2}\s+de\s+\w+|\w+\s+\d{1,2}\s+al?\s+\d{1,2}/i.test(
        text
      );
    if (hasDateInfo) {
      return formatDateInfo(text);
    }

    // Formateo estándar mejorado
    return formatResponseText(text);
  };

  return (
    <motion.div
      variants={messageVariants}
      className={`message-bubble ${isUser ? "user-message" : "bot-message"}`}
      dangerouslySetInnerHTML={{
        __html: getFormattedMessage(message),
      }}
    />
  );
};

MessageBubble.propTypes = {
  message: PropTypes.string.isRequired,
  isUser: PropTypes.bool.isRequired,
};

export default MessageBubble;
