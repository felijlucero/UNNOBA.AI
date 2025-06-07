import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { formatResponseText } from "../../utils/formatters";

const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const ChatMessage = ({ message, type }) => {
  return (
    <motion.div
      variants={messageVariants}
      className={`p-4 rounded-2xl max-w-[80%] relative ${
        type === "userMsg"
          ? "bg-[#005B96] text-white ml-auto rounded-br-none"
          : "bg-white text-gray-800 shadow-md mr-auto rounded-bl-none"
      }`}
      dangerouslySetInnerHTML={{
        __html: type === "responseMsg" ? formatResponseText(message) : message,
      }}
    />
  );
};

ChatMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["userMsg", "responseMsg"]).isRequired,
};

export default ChatMessage;
