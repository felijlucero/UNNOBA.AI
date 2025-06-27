import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeAll } from 'vitest';
import App from '../App';

// Mock de framer-motion para evitar animaciones en los tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }) => children,
}));

// Mocks que verificaremos en distintas pruebas
const generateResponseMock = vi.fn();
const toggleThemeMock = vi.fn();
const newChatMock = vi.fn();

// Mock del hook de tema
vi.mock('../hooks/useTheme', () => ({
  useTheme: () => ({
    isDarkMode: false,
    toggleTheme: toggleThemeMock,
  }),
}));

// Mock del hook de chat con estado real para flujo completo
vi.mock('../hooks/useChat', () => {
  const React = require('react');
  return {
    useChat: () => {
      const [message, setMessage] = React.useState('');
      const [isResponseScreen, setIsResponseScreen] = React.useState(false);
      const [messages, setMessages] = React.useState([]);

      const hitRequest = () => {
        if (!message) return;
        // agrega mensaje del usuario a la lista
        setMessages((prev) => [...prev, { type: 'userMsg', text: message }]);
        // limpia el input
        setMessage('');
        // muestra pantalla de chat
        setIsResponseScreen(true);
        // llama a generateResponse
        generateResponseMock(message);
      };

      const newChat = () => {
        // limpiar mensajes y volver a pantalla de bienvenida
        setMessages([]);
        setIsResponseScreen(false);
        newChatMock();
      };

      return {
        message,
        setMessage,
        isResponseScreen,
        messages,
        isGenerating: false,
        streamedResponse: '',
        error: null,
        messagesEndRef: { current: null },
        pausarUnnobaAi: { current: false },
        saltosDeLinea: { current: false },
        hitRequest,
        newChat,
        generateResponse: generateResponseMock,
        addPredefinedResponse: vi.fn(),
      };
    },
  };
});

// Mock de constantes para evitar dependencias de datos grandes
vi.mock('../utils/constants', () => ({
  PREDEFINED_RESPONSES: {},
  WELCOME_MESSAGE: '',
  API_CONFIG: { apiKey: '', model: '' },
  TYPING_SPEED: 50,
  RESPONSE_TYPING_SPEED: 20,
  MAX_WORD_COUNT: 2000,
  SYSTEM_PROMPT: '',
  PPS_PROMPT: '',
  COMEDOR_RESPONSES: {},
}));


describe('Integración: flujo completo de envío de mensaje', () => {
  // Evitamos error de scrollIntoView en JSDOM
  beforeAll(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  it('muestra el mensaje en pantalla y llama a generateResponse', async () => {
    render(<App />);

    // escribe en el input
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Hola integración' } });

    // click en el botón de enviar
    const sendButton = screen.getAllByRole('button').find((btn) => btn.classList.contains('send-button'));
    fireEvent.click(sendButton);

    // el input debe quedar vacío
    expect(input.value).toBe('');

    // el mensaje debe aparecer en el listado (MessageBubble)
    expect(await screen.findByText('Hola integración')).toBeInTheDocument();

    // la función generateResponse debe haber sido llamada una vez con el texto
    expect(generateResponseMock).toHaveBeenCalledTimes(1);
    expect(generateResponseMock).toHaveBeenCalledWith('Hola integración');
  });

  it('hace scroll automático al enviar un mensaje', async () => {
    // limpiamos conteo anterior
    Element.prototype.scrollIntoView.mockClear();

    render(<App />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Hola scroll' } });
    const sendButton = screen.getAllByRole('button').find(btn => btn.classList.contains('send-button'));
    fireEvent.click(sendButton);

    await screen.findByText('Hola scroll');

    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });
});

describe('Integración: cambio de tema y nuevo chat', () => {
  it('llama a toggleTheme cuando se hace clic en el botón de tema', () => {
    render(<App />);

    const themeButton = screen.getAllByRole('button').find(btn => btn.classList.contains('btn-theme'));
    fireEvent.click(themeButton);

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });

  it('restablece la conversación al hacer clic en Nuevo Chat', async () => {
    render(<App />);

    // Enviamos un mensaje para entrar a la pantalla de chat
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Hola' } });
    const sendButton = screen.getAllByRole('button').find(btn => btn.classList.contains('send-button'));
    fireEvent.click(sendButton);

    // Ahora debería aparecer el botón Nuevo Chat
    const newChatButton = await screen.findByRole('button', { name: /nuevo chat/i });
    expect(newChatButton).toBeInTheDocument();

    // Hacemos clic en Nuevo Chat
    fireEvent.click(newChatButton);

    // Se debe haber llamado la función newChatMock
    expect(newChatMock).toHaveBeenCalledTimes(1);

    // La pantalla de bienvenida debe volver a mostrarse
    expect(await screen.findByText(/¿Cómo y cuándo me inscribo a materias o finales\?/i)).toBeInTheDocument();
  });
}); 