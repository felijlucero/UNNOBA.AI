import { motion } from "framer-motion";
import "./TypingCursor.css";

const TypingCursor = () => {
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

  return (
    <motion.span
      className="typing-cursor"
      variants={typingCursorVariants}
      animate="blinking"
    />
  );
};

export default TypingCursor;
