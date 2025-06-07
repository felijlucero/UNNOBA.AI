import { motion } from "framer-motion";
import PropTypes from "prop-types";
import "./styles/Layout.css";

const Header = ({ onNewChat, isGenerating }) => {
  return (
    <div className="header pt-6 flex items-center justify-between w-full px-[10vw]">
      <motion.h2
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-2xl text-[#005B96] font-bold"
      >
        UNNOBA.AI
      </motion.h2>
      <motion.button
        id="newChatBtn"
        whileHover={!isGenerating ? { scale: 1.05 } : {}}
        whileTap={!isGenerating ? { scale: 0.95 } : {}}
        className={`bg-[#005B96] text-white p-2 rounded-full text-sm px-5 transition-colors ${
          isGenerating ? "opacity-50 cursor-not-allowed" : "hover:bg-[#00467a]"
        }`}
        onClick={onNewChat}
        disabled={isGenerating}
      >
        Nuevo Chat
      </motion.button>
    </div>
  );
};

Header.propTypes = {
  onNewChat: PropTypes.func.isRequired,
  isGenerating: PropTypes.bool.isRequired,
};

export default Header;
