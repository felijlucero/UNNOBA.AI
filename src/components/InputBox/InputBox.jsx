import { useRef } from "react";
import { motion } from "framer-motion";
import { IoSend } from "react-icons/io5";
import PropTypes from "prop-types";
import "./InputBox.css";

const InputBox = ({ message, setMessage, onSend, isGenerating, error }) => {
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSend();
    }
  };

  return (
    <div className="input-container">
      <motion.div
        className="inputBox"
        whileFocus={{ boxShadow: "0 0 0 2px rgba(0, 91, 150, 0.2)" }}
      >
        <input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          className="input-field"
          placeholder="Escribe tu mensaje aquí..."
          disabled={isGenerating}
        />

        {message && (
          <motion.button
            className="send-button"
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
          className="error-message"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

InputBox.propTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  isGenerating: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default InputBox;
