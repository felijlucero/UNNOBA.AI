import { useRef } from "react";
import { motion } from "framer-motion";
import { IoSend } from "react-icons/io5";
import PropTypes from "prop-types";
import "./InputBox.css";

const InputBox = ({ message, setMessage, onSend, isGenerating, error, onStop }) => {
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

        {message && !isGenerating && (
          <motion.button
            className="send-button"
            onClick={onSend}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IoSend />
          </motion.button>
        )}
        {isGenerating && (
          <motion.button
            className="stop-button"
            onClick={onStop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="1" ry="1"/>
            </svg>
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
  onStop: PropTypes.func,
};

export default InputBox;
