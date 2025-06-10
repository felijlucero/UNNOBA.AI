import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { formatResponseText } from "../../utils/formatters";
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

  return (
    <motion.div
      variants={messageVariants}
      className={isUser ? "user-message" : "bot-message"}
      dangerouslySetInnerHTML={{
        __html: isUser ? message : formatResponseText(message),
      }}
    />
  );
};

MessageBubble.propTypes = {
  message: PropTypes.string.isRequired,
  isUser: PropTypes.bool.isRequired,
};

export default MessageBubble;
