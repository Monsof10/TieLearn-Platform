import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import ChatBot from './ChatBot';

const ChatBotPortal = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let rootElement = document.getElementById('chatbot-root');
    if (!rootElement) {
      rootElement = document.createElement('div');
      rootElement.id = 'chatbot-root';
      document.body.appendChild(rootElement);
    }
    
    const root = ReactDOM.createRoot(rootElement);
    root.render(<ChatBot />);
    setMounted(true);

    return () => {
      if (rootElement) {
        document.body.removeChild(rootElement);
      }
    };
  }, []);

  return null;
};

export default ChatBotPortal;
