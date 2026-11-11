import React, { useState, useRef, useEffect } from 'react';
import './CourseAIAssistant.css';
import courseAssistantData from './courseAssistantData';
import { getTieLearnOllamaResponse } from '../../utils/skillgroOllamaUtils';

interface CourseAIAssistantProps {
  pageType: string;
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  type: 'user' | 'assistant';
  text: string;
  topics?: { title: string; content: string }[];
  questions?: { question: string; answer: string }[];
  isFormatted?: boolean;
}

interface Topic {
  title: string;
  content: string;
}

const CourseAIAssistant: React.FC<CourseAIAssistantProps> = ({ pageType, isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && pageType) {
      const topics = (courseAssistantData as any)[pageType]?.topics || {};
      const topicTitles = Object.keys(topics);
      const questions = (courseAssistantData as any)[pageType]?.questions || [];

      setMessages([{
        type: 'assistant',
        text: `Bienvenue ! Je suis votre assistant IA pour ${pageType.toUpperCase()}. Choisissez un sujet ou une question fréquente :`,
        topics: topicTitles.map(title => ({
          title,
          content: topics[title]?.content
        })),
        questions: questions
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

  const formatContent = (content: string): JSX.Element[] | JSX.Element => {
    if (content.includes('```')) {
      return content.split('```').map((part: string, index: number) => {
        if (index % 2 === 1) {
          return (
            <pre key={index} className="code-block">
              <code>{part.trim()}</code>
            </pre>
          );
        }
        return <p key={index}>{part.split('\n').map((line: string, i: number) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}</p>;
      });
    }
    return content.split('\n').map((line: string, i: number) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const handleTopicClick = (topic: Topic) => {
    const topicData = (courseAssistantData as any)[pageType]?.topics[topic.title];
    if (topicData) {
      setMessages(prevMessages => [...prevMessages,
      {
        type: 'user' as const,
        text: `Parlez-moi de ${topic.title}`
      },
      {
        type: 'assistant' as const,
        text: topicData.content,
        isFormatted: true
      }
      ]);
    }
  };

  const handleQuestionClick = (question: { question: string; answer: string }) => {
    setMessages(prevMessages => [...prevMessages,
    {
      type: 'user' as const,
      text: question.question
    },
    {
      type: 'assistant' as const,
      text: question.answer,
      isFormatted: true
    }
    ]);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isProcessing) return;

    const userMessage: Message = {
      type: 'user',
      text: inputText.trim()
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    setIsProcessing(true);

    try {
      // First check if there's a predefined topic that matches
      const topics = (courseAssistantData as any)[pageType]?.topics || {};
      const matchingTopic = Object.entries(topics).find(([title]: [string, any]) =>
        title.toLowerCase().includes(userMessage.text.toLowerCase()) ||
        userMessage.text.toLowerCase().includes(title.toLowerCase())
      );

      if (matchingTopic) {
        setMessages(prevMessages => [...prevMessages, {
          type: 'assistant' as const,
          text: (matchingTopic[1] as { content: string }).content,
          isFormatted: true
        }]);
        setIsProcessing(false);
        return;
      }

      // Set timeout for response
      const timeoutPromise = new Promise<never>((_, reject) => {
        responseTimeoutRef.current = setTimeout(() => {
          reject(new Error('La réponse a pris trop de temps. Veuillez réessayer.'));
        }, 20000); // 20 second timeout
      });

      // Create a concise prompt
      const prompt = `Contexte: Formation ${pageType}.
Question: ${userMessage.text}
Donnez une réponse brève et ciblée sur ${pageType} en français.`;

      // Race between the response and timeout
      const response: string = await Promise.race([
        getTieLearnOllamaResponse(prompt),
        timeoutPromise
      ]) as string;

      if (responseTimeoutRef.current) {
        clearTimeout(responseTimeoutRef.current);
      }

      if (!response) {
        throw new Error('Aucune réponse reçue');
      }

      setMessages(prevMessages => [...prevMessages, {
        type: 'assistant' as const,
        text: response
      }]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      setMessages(prevMessages => [...prevMessages, {
        type: 'assistant' as const,
        text: (error as Error).message || 'Je m\'excuse, mais j\'ai rencontré une erreur. Veuillez réessayer.'
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const clearMessages = () => {
    const topics = (courseAssistantData as any)[pageType]?.topics || {};
    const topicTitles = Object.keys(topics);
    const questions = (courseAssistantData as any)[pageType]?.questions || [];

    setMessages([{
      type: 'assistant',
      text: `Bienvenue ! Je suis votre assistant IA pour ${pageType ? pageType.toUpperCase() : ''}. Choisissez un sujet ou une question fréquente :`,
      topics: topicTitles.map(title => ({
        title,
        content: topics[title]?.content
      })),
      questions: questions
    }]);
  };

  if (!isOpen) return null;

  return (
    <div className="course-ai-assistant-container" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className={`course-ai-assistant-window ${isExpanded ? 'expanded' : ''}`}>
        <div className="course-ai-assistant-header">
          <div className="header-left">
            <span role="img" aria-label="AI" className="ai-icon">✨</span>
            <h3>Assistant IA d'Apprentissage</h3>
          </div>
          <div className="header-right">
            <button className="header-icon-button" onClick={clearMessages} aria-label="Effacer">
              <span role="img">🗑️</span>
            </button>
            <button className="header-icon-button" onClick={toggleExpand} aria-label="Agrandir">
              <span>{isExpanded ? '⤢' : '⤡'}</span>
            </button>
            <button className="header-icon-button" onClick={onClose} aria-label="Fermer">
              <span>×</span>
            </button>
          </div>
        </div>

        <div className="course-ai-assistant-body">
          <div className="course-ai-chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`course-ai-message ${message.type === 'user' ? 'course-ai-user-message' : 'course-ai-assistant-message'}`}>
                {message.isFormatted ? formatContent(message.text) : message.text}
                {message.topics && (
                  <div className="course-ai-topics">
                    {message.topics.map((topic, topicIndex) => (
                      <button
                        key={topicIndex}
                        className="course-ai-topic-button"
                        onClick={() => handleTopicClick(topic)}
                      >
                        {topic.title}
                      </button>
                    ))}
                  </div>
                )}
                {message.questions && (
                  <div className="course-ai-topics" style={{ marginTop: '10px' }}>
                    <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '5px' }}>Questions fréquentes :</p>
                    {message.questions.map((q, qIndex) => (
                      <button
                        key={qIndex}
                        className="course-ai-topic-button"
                        onClick={() => handleQuestionClick(q)}
                        style={{ display: 'block', width: '100%', textAlign: 'left', marginBottom: '5px' }}
                      >
                        {q.question}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isProcessing && (
              <div className="course-ai-message course-ai-assistant-message">
                <div className="typing-indicator">Réflexion en cours...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="course-ai-chat-input">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isProcessing ? "Veuillez patienter..." : "Posez-moi une question sur ce cours"}
            disabled={isProcessing}
          />
          <button
            onClick={handleSendMessage}
            className="send-button"
            aria-label="Envoyer"
            disabled={isProcessing || !inputText.trim()}
          >
            <span>{isProcessing ? '...' : '➤'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseAIAssistant;
