import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Ayuda.css';

// === UTILIDADES DE SEGURIDAD ===

// Sanitizar input para prevenir XSS
const sanitizeInput = (input: string): string => {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/\(/g, '&#x28;')
    .replace(/\)/g, '&#x29;')
    .replace(/{/g, '&#x7B;')
    .replace(/}/g, '&#x7D;');
};

// Sanitizar HTML permitido en respuestas (solo texto plano)
const sanitizeOutput = (text: string): string => {
  return sanitizeInput(text);
};

// Reutilizamos tu interfaz y datos
interface FAQItem {
  pregunta: string;
  respuesta: string;
  categoria: string;
}

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const faqData: FAQItem[] = [
  // ... tus datos actuales de faqData se mantienen igual
  { pregunta: '¿Cómo accedo a los cursos?', respuesta: 'Desde el panel principal, haz clic en "Ver Cursos"...', categoria: 'Cursos' },
  // ... (puedes dejar el array completo aquí)
];

export const Ayuda = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '¡Hola! Soy tu asistente de CNSF. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    // Sanitizar input del usuario antes de guardar
    const sanitizedInput = sanitizeInput(input.trim());

    const userMsg: Message = {
      id: Date.now(),
      text: sanitizedInput,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    processResponse(input.trim());
    setInput('');
  };

  const processResponse = (query: string) => {
    setIsTyping(true);

    // Simulamos un delay de "pensamiento"
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      
      // Lógica de búsqueda básica en tu faqData
      const match = faqData.find(
        (faq) =>
          lowerQuery.includes(faq.pregunta.toLowerCase()) ||
          lowerQuery.includes(faq.categoria.toLowerCase()) ||
          faq.respuesta.toLowerCase().includes(lowerQuery)
      );

      // Sanitizar respuesta antes de enviar
      const responseText = match 
        ? sanitizeOutput(match.respuesta) 
        : sanitizeOutput("Lo siento, no encontré una respuesta específica. ¿Podrías intentar con otras palabras o contactar a soporte@cnsf.gob.mx?");

      const botResponse: Message = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="ayuda-container-chat">
      <header className="ayuda-header">
        <button onClick={() => navigate('/dashboard')} className="back-button">
          ← Volver
        </button>
        <div className="header-info">
          <h1>Asistente Virtual CNSF</h1>
          <span className="status-online">En línea ahora</span>
        </div>
      </header>

      <main className="chat-window">
        <div className="messages-container">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
              <div className="message-bubble">
                {msg.text}
                <span className="message-time">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message-wrapper bot">
              <div className="message-bubble typing">
                Escribiendo<span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Sugerencias rápidas basadas en tus categorías */}
        <div className="quick-suggestions">
          {['Cursos', 'Exámenes', 'Certificados'].map((cat) => (
            <button key={cat} onClick={() => { setInput(cat); handleSend(); }}>
              {cat}
            </button>
          ))}
        </div>

        <form className="input-area" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Escribe tu duda aquí..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="send-btn">
            ✈️
          </button>
        </form>
      </main>

      <footer className="chat-footer">
        <p>¿No encuentras lo que buscas? Llama al 55 3000 8000 ext. 1234</p>
      </footer>
    </div>
  );
};