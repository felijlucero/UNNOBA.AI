import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoRestaurant, IoTime, IoLibrary } from "react-icons/io5";
import { BiPlanet } from "react-icons/bi";
import { TbMessageChatbot, TbSchool, TbMapPin } from "react-icons/tb";
import { MdEventNote } from "react-icons/md";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import { WELCOME_MESSAGE, TYPING_SPEED } from "../../utils/constants";
import "./WelcomeScreen.css";

const WelcomeScreen = ({ onCardClick }) => {
  const [displayedMessage, setDisplayedMessage] = useState("");

  useEffect(() => {
    if (displayedMessage.length < WELCOME_MESSAGE.length) {
      const timeout = setTimeout(() => {
        setDisplayedMessage(
          WELCOME_MESSAGE.substring(0, displayedMessage.length + 1)
        );
      }, TYPING_SPEED);
      return () => clearTimeout(timeout);
    }
  }, [displayedMessage]);

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

  const cards = [
    {
      question: "¿Cómo me inscribo a las materias?",
      icon: <TbSchool />,
    },
    {
      question: "¿Dónde está la biblioteca?",
      icon: <IoLibrary />,
    },
    {
      question: "¿Dónde se cursa cada materia?",
      icon: <TbMapPin />,
    },
    {
      question: "¿Dónde veo mi calendario académico?",
      icon: <MdEventNote />,
    },
    {
      question: "¿Cómo funciona el comedor?",
      icon: <IoRestaurant />,
    },
    {
      question: "¿Como utilizo la plataforma virtual?",
      icon: <TbMessageChatbot />,
    },
    {
      question: "¿Cómo y cuándo me inscribo a materias o finales?",
      icon: <IoTime />,
    },
    {
      question:
        "¿Dónde puedo contactar a la universidad o cuáles son sus redes sociales?",
      icon: <BiPlanet />,
    },
  ];

  return (
    <motion.div
      className="welcome-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="welcome-message-container">
        <p className="welcome-message">{displayedMessage}</p>
      </div>
      <div className="cards-grid">
        {cards.map((item, i) => (
          <Card
            key={i}
            index={i}
            question={item.question}
            icon={item.icon}
            onClick={onCardClick}
          />
        ))}
      </div>
    </motion.div>
  );
};

WelcomeScreen.propTypes = {
  onCardClick: PropTypes.func.isRequired,
};

export default WelcomeScreen;
