import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

import { getOllamaResponse } from '../ollamaUtils';

// Define courses at component scope - matching the actual website catalog
const courses = [
  {
    id: 'course_design_graphique',
    text: 'Design Graphique',
    description: `📐 **Design Graphique** - Devenez Designer Professionnel

🎯 **Ce que vous allez apprendre :**
• Maîtriser Adobe Photoshop pour la retouche photo et création visuelle
• Créer des logos et illustrations vectorielles avec Illustrator
• Concevoir des documents imprimés professionnels avec InDesign
• Comprendre les principes du design : couleurs, typographie, composition

💼 **Débouchés professionnels :**
Designer graphique, Infographiste, Directeur artistique

⏱️ **Idéal pour :** Débutants et créatifs souhaitant professionnaliser leurs compétences`,
    link: '/courses/design-graphique'
  },
  {
    id: 'course_marketing_digital',
    text: 'Marketing Digital',
    description: `📱 **Marketing Digital** - Devenez Expert en Marketing Numérique

🎯 **Ce que vous allez apprendre :**
• Optimiser votre visibilité sur Google (SEO/SEM)
• Créer et gérer des campagnes sur les réseaux sociaux
• Maîtriser l'email marketing et l'automatisation
• Analyser les performances avec Google Analytics
• Créer du contenu engageant et des stratégies de branding

💼 **Débouchés professionnels :**
Community Manager, Responsable Marketing Digital, Consultant SEO

⏱️ **Idéal pour :** Entrepreneurs, marketeurs et communicants`,
    link: '/courses/marketing-digital'
  },
  {
    id: 'course_developpement',
    text: 'Développement',
    description: `💻 **Développement Web** - Créez des Sites et Applications Modernes

🎯 **Ce que vous allez apprendre :**
• Les fondamentaux : HTML5, CSS3 et JavaScript
• Créer des sites web responsives et interactifs
• Utiliser des frameworks modernes (React, Vue.js)
• Comprendre les bases de données et APIs
• Déployer vos projets en ligne

💼 **Débouchés professionnels :**
Développeur Web, Développeur Front-End, Full-Stack Developer

⏱️ **Idéal pour :** Débutants en programmation et reconversion professionnelle`,
    link: '/courses/developpement'
  },
  {
    id: 'course_microsoft_office',
    text: 'Microsoft Office',
    description: `📊 **Microsoft Office** - Maîtrisez la Suite Bureautique Professionnelle

🎯 **Ce que vous allez apprendre :**
• Word : Créer des documents professionnels et rapports
• Excel : Formules avancées, tableaux croisés dynamiques, graphiques
• PowerPoint : Présentations impactantes et storytelling visuel
• Outlook : Gestion efficace des emails et calendriers
• Collaboration avec Office 365 et Teams

💼 **Débouchés professionnels :**
Compétence essentielle pour tous les métiers de bureau

⏱️ **Idéal pour :** Professionnels, étudiants et toute personne en milieu professionnel`,
    link: '/courses/microsoft-office'
  },
  {
    id: 'course_ux_ui',
    text: 'UX/UI',
    description: `🎯 **UX/UI Design** - Créez des Expériences Utilisateur Exceptionnelles

🎯 **Ce que vous allez apprendre :**
• Principes de l'expérience utilisateur (UX)
• Recherche utilisateur et création de personas
• Design d'interfaces intuitives (UI)
• Maîtriser Figma et Adobe XD
• Prototypage et tests utilisateurs
• Design systems et accessibilité

💼 **Débouchés professionnels :**
UX Designer, UI Designer, Product Designer

⏱️ **Idéal pour :** Designers, développeurs et chefs de produit`,
    link: '/courses/ux-ui'
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
        text: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ? Choisissez parmi ces options ou posez-moi n\'importe quelle question :',
        options: [
          { id: 'career', text: '💼 Suggérer un parcours selon mes objectifs de carrière' },
          { id: 'learn', text: '🎓 M\'aider à trouver quelque chose à apprendre' },
          { id: 'question', text: '❓ J\'ai une question sur un cours/parcours' },
          { id: 'issue', text: '🔧 J\'ai un problème / besoin d\'aide' }
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
      text: 'Voici nos parcours de carrière disponibles. Cliquez sur l\'un d\'eux pour en savoir plus :',
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
        text: 'Quel type de question avez-vous ?',
        options: [
          { id: 'course_navigation', text: '🔍 Navigation (Trouver un cours)' },
          { id: 'course_billing', text: '💳 Facturation' },
          { id: 'course_ai_problem', text: '🤖 Problème avec l\'IA' }
        ]
      }]);
      return;
    }

    if (option.id === 'course_navigation') {
      setExpectingCourseSearch(true);
      setMessages(prevMessages => [...prevMessages, {
        type: 'bot',
        text: 'Veuillez entrer le nom du cours que vous recherchez :'
      }]);
      return;
    }

    if (option.id === 'course_billing') {
      setMessages(prevMessages => [...prevMessages, {
        type: 'bot',
        text: 'Pour les questions relatives à la facturation, veuillez contacter notre équipe d\'assistance à support@cyberhub.com'
      }]);
      return;
    }

    if (option.id === 'course_ai_problem') {
      setIsAiMode(true);
      setMessages(prevMessages => [...prevMessages, {
        type: 'bot',
        text: 'Veuillez décrire le problème lié à l\'IA que vous rencontrez, et je vous aiderai à le résoudre.'
      }]);
      return;
    }

    if (option.id === 'issue') {
      setIsAiMode(true);
      setMessages(prevMessages => [...prevMessages, {
        type: 'bot',
        text: 'Je peux vous aider avec toutes vos questions sur nos formations et la plateforme TieLearn. Veuillez taper votre question et je vous assisterai en utilisant notre système d\'IA.',
        options: [{ id: 'consult_ai', text: 'Consulter l\'assistant IA' }]
      }]);
      return;
    }

    if (option.id === 'consult_ai') {
      setIsAiMode(true);
      setMessages(prevMessages => [...prevMessages, {
        type: 'bot',
        text: 'Je suis prêt à vous aider ! Posez-moi vos questions sur nos cours, la plateforme TieLearn, ou toute question relative à votre formation, et je vous fournirai une assistance personnalisée.'
      }]);
      return;
    }

    if (option.id === 'career') {
      const careerGoals = [
        { id: 'goal_design', text: '🎨 Design Graphique' },
        { id: 'goal_marketing', text: '📱 Marketing Digital' },
        { id: 'goal_development', text: '💻 Développement' },
        { id: 'goal_office', text: '📊 Microsoft Office' },
        { id: 'goal_ux_ui', text: '🎯 UX/UI' }
      ];
      setMessages(prevMessages => [...prevMessages, {
        type: 'bot',
        text: 'Veuillez sélectionner votre objectif de carrière :',
        options: careerGoals
      }]);
      return;
    }

    // Handle career goal selections
    if (option.id && option.id.startsWith('goal_')) {
      const goalToCourse = {
        'goal_design': courses.find(c => c.id === 'course_design_graphique'),
        'goal_marketing': courses.find(c => c.id === 'course_marketing_digital'),
        'goal_development': courses.find(c => c.id === 'course_developpement'),
        'goal_office': courses.find(c => c.id === 'course_microsoft_office'),
        'goal_ux_ui': courses.find(c => c.id === 'course_ux_ui')
      };

      const course = goalToCourse[option.id];
      if (course) {
        setMessages(prevMessages => [...prevMessages, {
          type: 'bot',
          text: `Excellent choix ! Pour ${course.text}, je vous recommande notre cours :\n\n${course.description}`,
          options: [{ id: `goto_${course.link}`, text: 'Aller à la page du cours' }]
        }]);
      }
      return;
    }

    if (option.id === 'learn') {
      setMessages(prevMessages => [...prevMessages, {
        type: 'bot',
        text: 'Voici tous nos cours disponibles :',
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
          text: `${course.description}\n\nVous pouvez explorer ce cours en détail sur la page du cours.`,
          options: [{ id: `goto_${course.link}`, text: 'Aller à la page du cours' }]
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
            text: 'J\'ai trouvé ces cours qui correspondent à votre recherche :',
            options: matchingCourses.map(course => ({
              id: course.id,
              text: course.text,
              description: course.description
            }))
          }]);
        } else {
          setMessages(prevMessages => [...prevMessages, {
            type: 'bot',
            text: 'Je n\'ai trouvé aucun cours correspondant à votre recherche. Veuillez essayer d\'autres mots-clés ou parcourir notre catalogue de cours.'
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
              text: 'Je n\'ai pas de réponse prédéfinie pour cela. Souhaitez-vous consulter notre assistant IA ?',
              options: [{ id: 'consult_ai', text: 'Consulter l\'assistant IA' }]
            }]);
          }
        }
      }
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      setMessages(prevMessages => [...prevMessages, {
        type: 'bot',
        text: error.message || 'Je m\'excuse, mais j\'ai rencontré une erreur. Veuillez essayer de poser votre question différemment.'
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
            <h3>✨ Assistant Chatbot</h3>
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
                  <div className="typing-indicator">Réflexion en cours...</div>
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
              placeholder={isProcessing ? "Veuillez patienter..." : isAiMode ? "Posez-moi vos questions sur nos cours et formations..." : "Tapez votre question ici..."}
              disabled={isProcessing}
            />
            <button
              onClick={handleSendMessage}
              disabled={isProcessing || !inputText.trim()}
            >
              {isProcessing ? '...' : 'Envoyer'}
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
