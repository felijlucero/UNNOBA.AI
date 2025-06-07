import { motion } from "framer-motion";
import PropTypes from "prop-types";
import ChatMessage from "./ChatMessage";
import "./styles/Chat.css";

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

const ChatScreen = ({
  messages,
  isGenerating,
  streamedResponse,
  messagesEndRef,
}) => {
  return (
    <motion.div
      className="messages-container flex-1 px-4 py-4 overflow-y-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto px-4 space-y-4">
        {messages?.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} type={msg.type} />
        ))}
        {isGenerating && streamedResponse && (
          <div className="flex items-end">
            <ChatMessage message={streamedResponse} type="responseMsg" />
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
  );
};

ChatScreen.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(["userMsg", "responseMsg"]).isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  isGenerating: PropTypes.bool.isRequired,
  streamedResponse: PropTypes.string,
  messagesEndRef: PropTypes.object.isRequired,
};

export default ChatScreen;
