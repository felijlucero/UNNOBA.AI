import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { IoSend } from "react-icons/io5";
import "./styles/Chat.css";

const ChatInput = ({ message, setMessage, onSend, error, isGenerating }) => {
  return (
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
            if (e.key === "Enter") onSend();
          }}
          type="text"
          className="p-3 pl-3 bg-transparent flex-1 outline-none border-none"
          placeholder="Escribe tu mensaje aquí..."
          id="messageBox"
          disabled={isGenerating}
        />
        {message && (
          <motion.button
            className="text-[#005B96] text-xl cursor-pointer bg-transparent border-none"
            onClick={onSend}
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
          className="text-red-500 text-sm mt-1"
        >
          {error}
        </motion.p>
      )}

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
  );
};

ChatInput.propTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  error: PropTypes.string,
  isGenerating: PropTypes.bool.isRequired,
};

export default ChatInput;
