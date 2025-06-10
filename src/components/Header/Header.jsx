import { motion } from "framer-motion";
import PropTypes from "prop-types";
import "./Header.css";

const Header = ({
  isDarkMode,
  toggleTheme,
  onNewChat,
  isGenerating,
  showNewChatButton = false,
}) => {
  return (
    <div className="header header-always-centered">
      <div className="header-spacer">
        {/* Espaciador izquierdo invisible */}
      </div>
      <motion.h1
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="main-title"
      >
        UNNOBA.AI
      </motion.h1>
      <div className="header-buttons">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-theme"
          onClick={toggleTheme}
          style={{
            backgroundColor: isDarkMode ? "#f59e0b" : "#374151",
            color: isDarkMode ? "#111827" : "white",
          }}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </motion.button>
        {showNewChatButton && (
          <motion.button
            whileHover={!isGenerating ? { scale: 1.05 } : {}}
            whileTap={!isGenerating ? { scale: 0.95 } : {}}
            className="btn-primary"
            onClick={onNewChat}
            disabled={isGenerating}
          >
            Nuevo Chat
          </motion.button>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  onNewChat: PropTypes.func,
  isGenerating: PropTypes.bool,
  showNewChatButton: PropTypes.bool,
};

export default Header;
