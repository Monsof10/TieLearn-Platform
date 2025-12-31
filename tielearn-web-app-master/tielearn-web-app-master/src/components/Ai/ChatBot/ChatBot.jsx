import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';
import chatbotData from '../../data/chatbot.js';
import { getOllamaResponse } from '../../utils/ollamaUtils';

// Define courses at component scope
const courses = [
  {
    id: 'course_sql_injection',
    text: 'SQL Injection',
    description: 'Learn about SQL injection attacks and prevention',
    link: '/Sql-Injection/HomePage'
  },
  {
    id: 'course_spoofing',
    text: 'Spoofing',
    description: 'Understanding and preventing spoofing attacks',
    link: '/Spoofing/HomePage'
  },
  {
    id: 'course_dos_ddos',
    text: 'DoS and DDoS Attacks',
    description: 'Learn about denial of service attacks and mitigation',
    link: '/DosAndDdos/HomePage'
  },
  {
    id: 'course_xss',
    text: 'Cross-Site Scripting',
    description: 'Understanding XSS vulnerabilities and protection',
    link: '/CrossSiteScripting/HomePage'
  },
  {
    id: 'course_forensics',
    text: 'Forensic Science',
    description: 'Digital forensics and investigation techniques',
    link: '/ForensicScience/HomePage'
  },
  {
    id: 'course_user_enum',
    text: 'User Enumeration',
    description: 'Learn about user enumeration techniques and prevention',
    link: '/UserEnumeration/HomePage'
  },
  {
    id: 'course_privesc',
    text: 'Privilege Escalation',
    description: 'Understanding privilege escalation attacks',
    link: '/PrivilegeEscalation/HomePage'
  },
  {
    id: 'course_buffer',
    text: 'Buffer Overflows',
    description: 'Learn about buffer overflow vulnerabilities',
    link: '/BufferOverflows/HomePage'
  },
  {
    id: 'course_ssrf',
    text: 'Server-Side Request Forgery',
    description: 'Understanding SSRF attacks and prevention',
    link: '/ServerSideRequestForgery/HomePage'
  },
  {
    id: 'course_dns',
    text: 'DNS Poisoning',
    description: 'Learn about DNS poisoning attacks',
    link: '/DnsPoisoning/HomePage'
  }
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAiMode, setIsAiMode] = useState(false);
  const [expectingCourseSearch, setExpectingCourseSearch] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setMessages([{
        type: 'bot',
        text: 'Hi! How can I help you today? Choose from these options or ask me anything:',
        options: [
          { id: 'career', text: '💼 Suggest a track based on my career goals' },
          { id: 'learn', text: '🎓 Help me find something to learn' },
          { id: 'question', text: '❓ I have a question about a course/track' },
          { id: 'issue', text: '🔧 I have an issue / need some help' }
        ]
      }]);
    }
  }, [isOpen]);

  const findPredefinedAnswer = (question) => {
    const normalizedQuestion = question.toLowerCase();
    for (const category in chatbotData.qa) {
      const qaSet = chatbotData.qa[category];
      for (const [q, a] of Object.entries(qaSet)) {
        const cleanQuestion = q.replace(/[🔰🎓🧭🧪🛠️🛡️👩‍💻🧠🧾📊🤝🖥️]/g, '').trim().toLowerCase();
        if (normalizedQuestion.includes(cleanQuestion) || 
            cleanQuestion.includes(normalizedQuestion)) {
          return a;
        }
      }
    }
    return null;
  };

  const handleCareerPathQuestion = (text) => {
    const paths = Object.entries(chatbotData.careerPaths).map(([key, path]) => ({
      id: key,
      text: path.title,
      description: path.description,
      tracks: path.recommendedTracks
    }));

    setMessages(prevMessages => [...prevMessages,
      {
        type: 'bot',
        text: 'Here are our available career paths. Click one to learn more:',
        options: paths.map(path => ({
          id: path.id,
          text: path.text,
          icon: '🎯'
        }))
      }
    ]);
  };

  const handleOptionClick = async (option) => {
    setMessages(prevMessages => [...prevMessages, { type: 'user', text: option.text }]);

    if (option.id === 'question') {
      setMessages(prevMessages => [...prevMessages, {
        type: 'bot',
        text: 'What type of question do you have?',
        options: [
          { id: 'course_navigation', text: '🔍 Navigation (Find a course)' },
          { id: 'course_billing', text: '💳 Billing' },
          { id: 'course_ai_problem', text: '🤖 Problem with AI' }
        ]
      }]);
      return;
    }

    if (option.id === 'course_navigation') {
      setExpectingCourseSearch(true);
      setMessages(prevMessages => [...prevMessages, {
        type: 'bot',
        text: 'Please enter the name of the course you\'re looking for:'
      }]);
      return;
    }

    if (option.id === 'course_billing') {
      setMessages(prevMessages => [...prevMessages, {
        type: 'bot',
        text: 'For billing related questions, please contact our support team at support@cyberhub.com'
      }]);
      return;
    }

    if (option.id === 'course_ai_problem') {
      setIsAiMode(true);
      setMessages(prevMessages => [...prevMessages, {
        type: 'bot',
        text: 'Please describe the AI-related problem you\'re experiencing, and I\'ll help you resolve it.'
      }]);
      return;
    }

    if (option.id === 'issue') {
      setIsAiMode(true);
      setMessages(prevMessages => [...prevMessages, {
        type: 'bot',
        text: 'I can help you with any cybersecurity-related questions or issues. Please type your question and I\'ll assist you using our AI system.',
        options: [{ id: 'consult_ai', text: 'Consult AI Assistant' }]
      }]);
      return;
    }

    if (option.id === 'consult_ai') {
      setIsAiMode(true);
      setMessages(prevMessages => [...prevMessages, {
        type: 'bot',
        text: 'I\'m ready to help! Please type your cybersecurity question or describe your issue, and I\'ll provide expert assistance.'
      }]);
      return;
    }

    if (option.id === 'career') {
      const careerGoals = [
        { id: 'goal_offensive', text: 'Offensive Security' },
        { id: 'goal_defensive', text: 'Defensive Security' },
        { id: 'goal_research', text: 'Security Research' },
        { id: 'goal_management', text: 'Security Management' }
      ];
      setMessages(prevMessages => [...prevMessages, {
        type: 'bot',
        text: 'Please select your career goal:',
        options: careerGoals
      }]);
      return;
    }

    if (option.id === 'learn') {
      setMessages(prevMessages => [...prevMessages, {
        type: 'bot',
        text: 'What are you interested in learning? Choose one:',
        options: [
          { id: 'courses', text: 'Courses' },
          { id: 'ctf', text: 'CTF Challenges' },
          { id: 'skillpaths', text: 'Skill Paths' }
        ]
      }]);
      return;
    }

    if (option.id === 'courses') {
      setMessages(prevMessages => [...prevMessages, {
        type: 'bot',
        text: 'Here are all our available courses:',
        options: courses
      }]);
      return;
    }

    // Handle other options...
    if (option.id && option.id.startsWith('course_')) {
      const course = courses.find(c => c.id === option.id);
      if (course) {
        setMessages(prevMessages => [...prevMessages, {
          type: 'bot',
          text: `${course.description}\n\nYou can explore this course in detail on the course page.`,
          options: [{ id: `goto_${course.link}`, text: 'Go to course page' }]
        }]);
      }
      return;
    }

    if (option.id && option.id.startsWith('goto_')) {
      const path = option.id.replace('goto_', '');
      window.location.href = path;
      return;
    }
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputText.trim() || isProcessing) return;

    const userQuestion = inputText.trim();
    setMessages(prevMessages => [...prevMessages, { type: 'user', text: userQuestion }]);
    setInputText('');
    setIsProcessing(true);

    try {
      if (expectingCourseSearch) {
        const searchQuery = userQuestion.toLowerCase();
        const matchingCourses = courses.filter(course => 
          course.text.toLowerCase().includes(searchQuery)
        );

        if (matchingCourses.length > 0) {
          setMessages(prevMessages => [...prevMessages, {
            type: 'bot',
            text: 'I found these courses that match your search:',
            options: matchingCourses.map(course => ({
              id: course.id,
              text: course.text,
              description: course.description
            }))
          }]);
        } else {
          setMessages(prevMessages => [...prevMessages, {
            type: 'bot',
            text: 'I couldn\'t find any courses matching your search. Please try different keywords or browse our course catalog.'
          }]);
        }
        setExpectingCourseSearch(false);
      } else if (isAiMode) {
        const response = await getOllamaResponse(userQuestion);
        setMessages(prevMessages => [...prevMessages, {
          type: 'bot',
          text: response
        }]);
      } else {
        if (userQuestion.toLowerCase().includes('career') || 
            userQuestion.toLowerCase().includes('path')) {
          handleCareerPathQuestion(userQuestion);
        } else {
          const predefinedAnswer = findPredefinedAnswer(userQuestion);
          if (predefinedAnswer) {
            setMessages(prevMessages => [...prevMessages, {
              type: 'bot',
              text: predefinedAnswer
            }]);
          } else {
            setMessages(prevMessages => [...prevMessages, {
              type: 'bot',
              text: 'I don\'t have a predefined answer for that. Would you like to consult our AI assistant?',
              options: [{ id: 'consult_ai', text: 'Consult AI Assistant' }]
            }]);
          }
        }
      }
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      setMessages(prevMessages => [...prevMessages, {
        type: 'bot',
        text: error.message || 'I apologize, but I encountered an error. Please try asking your question differently.'
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

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsAiMode(false);
    setExpectingCourseSearch(false);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>✨ Chatbot Assistant</h3>
            <button className="close-button" onClick={toggleChat}>×</button>
          </div>
          <div className="chatbot-body">
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={`chat-message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}>
                  {message.text}
                  {message.options && (
                    <div className="chat-options">
                      {message.options.map((option) => (
                        <button
                          key={option.id}
                          className="chat-option-button"
                          onClick={() => handleOptionClick(option)}
                        >
                          {option.icon && <span className="option-icon">{option.icon}</span>}
                          {option.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isProcessing && (
                <div className="chat-message bot-message">
                  <div className="typing-indicator">Thinking...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <div className="chat-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isProcessing ? "Please wait..." : isAiMode ? "Ask me anything about cybersecurity..." : "Type your question here..."}
              disabled={isProcessing}
            />
            <button 
              onClick={handleSendMessage}
              disabled={isProcessing || !inputText.trim()}
            >
              {isProcessing ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
      <button className="chatbot-button" onClick={toggleChat}>
        {isOpen ? '×' : '✨'}
      </button>
    </div>
  );
};

export default ChatBot;
