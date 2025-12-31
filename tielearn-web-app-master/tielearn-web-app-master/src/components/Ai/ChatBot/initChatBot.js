import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatBot from './ChatBot';

export function initChatBot() {
  let container = document.getElementById('chatbot-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'chatbot-container';
    document.body.appendChild(container);
  }
  
  const root = createRoot(container);
  root.render(<ChatBot />);
  
  return () => {
    root.unmount();
    container.remove();
  };
}
