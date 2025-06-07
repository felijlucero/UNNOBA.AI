import { motion } from "framer-motion";
import PropTypes from "prop-types";
import "./styles/Welcome.css";

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
  hover: { scale: 1.03, backgroundColor: "#A8D0E6" },
};

const QuestionCard = ({ question, icon, index, onClick }) => {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      whileHover="hover"
      className="card rounded-lg cursor-pointer px-5 relative min-h-[180px] bg-white p-6 shadow-md flex flex-col"
      onClick={onClick}
    >
      <p className="text-base whitespace-pre-line mb-6">{question}</p>
      <div className="mt-auto text-right">
        <i className="text-xl text-[#005B96]">{icon}</i>
      </div>
    </motion.div>
  );
};

QuestionCard.propTypes = {
  question: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default QuestionCard;
