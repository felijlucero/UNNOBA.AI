import React, { useState } from 'react'
import "./App.css"
import { IoCodeSlash, IoSend, IoTime, IoWater } from 'react-icons/io5'
import { BiPlanet } from 'react-icons/bi'
import { FaPython } from 'react-icons/fa'
import { TbMessageChatbot } from 'react-icons/tb'
import { GoogleGenerativeAI } from "@google/generative-ai";

const App = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]); 

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    } else {
      alert("Debes escribir un mensaje.");
    }
  };

  const generateResponse = async (msg) => {
    if (!msg) return;

    const genAI = new GoogleGenerativeAI("AIzaSyArai09MtPEm3dsvBPZXNsDQko2Gkgwgyw");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);

    const newMessages = [
      ...messages,
      { type: "userMsg", text: msg },
      { type: "responseMsg", text: result.response.text() },
    ];

    setMessages(newMessages);
    setisResponseScreen(true);
    setMessage("");
  };

  const newChat = () => {
    setisResponseScreen(false);
    setMessages([]);
  }

  return (
    <div className="container w-screen min-h-screen overflow-x-hidden bg-[#EDEDED] text-[#333333] font-sans">
      {
        isResponseScreen ?
          <div className='h-[80vh]'>
            <div className="header pt-6 flex items-center justify-between w-full px-[10vw]">
              <h2 className='text-2xl text-[#005B96] font-bold'>UNNOBA.AI</h2>
              <button id='newChatBtn' className='bg-[#005B96] text-white p-2 rounded-full text-sm px-5 hover:bg-[#00467a]' onClick={newChat}>Nuevo Chat</button>
            </div>

            <div className="messages px-[10vw] py-4 space-y-4">
              {
                messages?.map((msg, index) => (
                  <div key={index} className={`p-3 rounded-lg ${msg.type === 'userMsg' ? 'bg-[#A8D0E6] self-end text-right' : 'bg-white'}`}>{msg.text}</div>
                ))
              }
            </div>
          </div> :
          <div className="middle h-[80vh] flex items-center flex-col justify-center">
            <h1 className='text-4xl text-[#005B96] font-bold'>UNNOBA.AI</h1>
            <div className="boxes mt-8 flex items-center gap-4 flex-wrap justify-center px-4">
              <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#A8D0E6] px-5 relative min-h-[20vh] bg-white p-4 shadow-md w-60">
                <p className='text-base'>¿Cómo funciona el comedor?</p>
                <i className='absolute right-3 bottom-3 text-xl text-[#005B96]'><IoWater /></i>
              </div>
              <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#A8D0E6] px-5 relative min-h-[20vh] bg-white p-4 shadow-md w-60">
                <p className='text-base'>¿Cuales son las<br />Redes de la universidad?</p>
                <i className='absolute right-3 bottom-3 text-xl text-[#005B96]'><BiPlanet /></i>
              </div>
              <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#A8D0E6] px-5 relative min-h-[20vh] bg-white p-4 shadow-md w-60">
                <p className='text-base'>¿Existe un<br />Calendario Académico?</p>
                <i className='absolute right-3 bottom-3 text-xl text-[#005B96]'><IoTime /></i>
              </div>
              <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#A8D0E6] px-5 relative min-h-[20vh] bg-white p-4 shadow-md w-60">
                <p className='text-base'>¿Existe algún<br />contacto de ayuda?</p>
                <i className='absolute right-3 bottom-3 text-xl text-[#005B96]'><TbMessageChatbot /></i>
              </div>
            </div>
          </div>
      }

      <div className="bottom w-full flex flex-col items-center px-[10vw]">
        <div className="inputBox w-full max-w-2xl text-base py-2 flex items-center bg-white rounded-full border border-[#005B96] shadow-sm">
          <input value={message} onChange={(e) => { setMessage(e.target.value) }} type="text" className='p-3 pl-5 bg-transparent flex-1 outline-none border-none' placeholder='Escribe tu mensaje aquí...' id='messageBox' />
          {
            message && <i className='text-[#005B96] text-xl mr-5 cursor-pointer' onClick={hitRequest}><IoSend /></i>
          }
        </div>
        <p className='text-gray-500 text-sm my-4 text-center'>Chatbot desarrollado para la UNNOBA con el objetivo de ayudar a los/as estudiantes de la misma.</p>
      </div>
    </div>
  )
}

export default App;