import { motion } from "framer-motion";
import PropTypes from "prop-types";
import "./Card.css";

const Card = ({ question, icon, onClick, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.03,
      y: -5,
    },
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      whileHover="hover"
      className="card"
      onClick={() => onClick(question.split("\n").join(" "))}
    >
      <p className="card-text">{question}</p>
      <div className="card-icon">{icon}</div>
    </motion.div>
  );
};

Card.propTypes = {
  question: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
