import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { IoRestaurant, IoTime } from "react-icons/io5";
import { BiPlanet } from "react-icons/bi";
import { TbMessageChatbot } from "react-icons/tb";
import QuestionCard from "./QuestionCard";
import "./styles/Welcome.css";

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

const WelcomeScreen = ({ onQuestionClick }) => {
  const questions = [
    {
      question: "¿Cómo funciona el comedor?",
      icon: <IoRestaurant />,
    },
    {
      question: "¿Cuáles son las\nRedes de la universidad?",
      icon: <BiPlanet />,
    },
    {
      question: "¿Existe un\nCalendario Académico?",
      icon: <IoTime />,
    },
    {
      question: "¿Existe algún\ncontacto de ayuda?",
      icon: <TbMessageChatbot />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center flex-1"
    >
      <motion.h1
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-4xl text-[#005B96] font-bold mb-8"
      >
        UNNOBA.AI
      </motion.h1>
      <motion.div
        className="w-full max-w-5xl px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {questions.map((item, i) => (
            <QuestionCard
              key={i}
              question={item.question}
              icon={item.icon}
              index={i}
              onClick={() =>
                onQuestionClick(item.question.split("\n").join(" "))
              }
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

WelcomeScreen.propTypes = {
  onQuestionClick: PropTypes.func.isRequired,
};

export default WelcomeScreen;
