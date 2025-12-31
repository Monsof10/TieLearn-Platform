import React, { useState, useRef, useEffect } from 'react';
import './AIAssistant.css';
import assistantData from './assistantData';
import { getOllamaResponse } from '../../utils/ollamaUtils';

const AIAssistant = ({ pageType, isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);
  const responseTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && pageType) {
      const topics = assistantData[pageType]?.topics || {};
      const topicTitles = Object.keys(topics);
      
      setMessages([{
        type: 'assistant',
        text: `Welcome! I'm your AI assistant for ${pageType.toUpperCase()}. Choose a topic:`,
        topics: topicTitles.map(title => ({
          title,
          content: topics[title]?.content
        }))
      }]);
    }
  }, [isOpen, pageType]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (responseTimeoutRef.current) {
        clearTimeout(responseTimeoutRef.current);
      }
    };
  }, []);

  const formatContent = (content) => {
    if (content.includes('```')) {
      return content.split('```').map((part, index) => {
        if (index % 2 === 1) {
          return (
            <pre key={index} className="code-block">
              <code>{part.trim()}</code>
            </pre>
          );
        }
        return <p key={index}>{part.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}</p>;
      });
    }
    return content.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const handleTopicClick = (topic) => {
    const topicData = assistantData[pageType]?.topics[topic.title];
    if (topicData) {
      setMessages(prevMessages => [...prevMessages, 
        {
          type: 'user',
          text: `Tell me about ${topic.title}`
        },
        {
          type: 'assistant',
          text: topicData.content,
          isFormatted: true
        }
      ]);
    }
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputText.trim() || isProcessing) return;

    const userMessage = {
      type: 'user',
      text: inputText.trim()
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    setIsProcessing(true);

    try {
      // First check if there's a predefined topic that matches
      const topics = assistantData[pageType]?.topics || {};
      const matchingTopic = Object.entries(topics).find(([title]) => 
        title.toLowerCase().includes(userMessage.text.toLowerCase()) ||
        userMessage.text.toLowerCase().includes(title.toLowerCase())
      );

      if (matchingTopic) {
        setMessages(prevMessages => [...prevMessages, {
          type: 'assistant',
          text: matchingTopic[1].content,
          isFormatted: true
        }]);
        setIsProcessing(false);
        return;
      }

      // Set timeout for response
      const timeoutPromise = new Promise((_, reject) => {
        responseTimeoutRef.current = setTimeout(() => {
          reject(new Error('Response took too long. Please try again.'));
        }, 20000); // 10 second timeout
      });

      // Create a concise prompt
      const prompt = `Context: ${pageType} cybersecurity.
Q: ${userMessage.text}
Give a brief, focused answer about ${pageType}.`;

      // Race between the response and timeout
      const response = await Promise.race([
        getOllamaResponse(prompt),
        timeoutPromise
      ]);

      clearTimeout(responseTimeoutRef.current);

      if (!response) {
        throw new Error('No response received');
      }

      setMessages(prevMessages => [...prevMessages, {
        type: 'assistant',
        text: response
      }]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      setMessages(prevMessages => [...prevMessages, {
        type: 'assistant',
        text: error.message || 'I apologize, but I encountered an error. Please try again.'
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const clearMessages = () => {
    const topics = assistantData[pageType]?.topics || {};
    const topicTitles = Object.keys(topics);
    
    setMessages([{
      type: 'assistant',
      text: `Welcome! I'm your AI assistant for ${pageType ? pageType.toUpperCase() : ''}. Choose a topic:`,
      topics: topicTitles.map(title => ({
        title,
        content: topics[title]?.content
      }))
    }]);
  };

  if (!isOpen) return null;

  return (
    <div className="ai-assistant-container" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className={`ai-assistant-window ${isExpanded ? 'expanded' : ''}`}>
        <div className="ai-assistant-header">
          <div className="header-left">
            <span role="img" aria-label="AI" className="ai-icon">✨</span>
            <h3>AI Learning Assistant</h3>
          </div>
          <div className="header-right">
            <button className="header-icon-button" onClick={clearMessages} aria-label="Clear">
              <span role="img">🗑️</span>
            </button>
            <button className="header-icon-button" onClick={toggleExpand} aria-label="Expand">
              <span>{isExpanded ? '⤢' : '⤡'}</span>
            </button>
            <button className="header-icon-button" onClick={onClose} aria-label="Close">
              <span>×</span>
            </button>
          </div>
        </div>
        
        <div className="ai-assistant-body">
          <div className="ai-chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`ai-message ${message.type === 'user' ? 'ai-user-message' : 'ai-assistant-message'}`}>
                {message.isFormatted ? formatContent(message.text) : message.text}
                {message.topics && (
                  <div className="ai-topics">
                    {message.topics.map((topic, topicIndex) => (
                      <button
                        key={topicIndex}
                        className="ai-topic-button"
                        onClick={() => handleTopicClick(topic)}
                      >
                        {topic.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isProcessing && (
              <div className="ai-message ai-assistant-message">
                <div className="typing-indicator">Thinking...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="ai-chat-input">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isProcessing ? "Please wait..." : "Ask me anything about this topic"}
            disabled={isProcessing}
          />
          <button 
            onClick={handleSendMessage} 
            className="send-button" 
            aria-label="Send"
            disabled={isProcessing || !inputText.trim()}
          >
            <span>{isProcessing ? '...' : '➤'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
