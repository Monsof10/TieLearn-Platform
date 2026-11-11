import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingBubbles from '../../components/FloatingBubbles';
import HeaderOne from '../../layouts/headers/HeaderOne';
import CourseAIAssistant from '../../components/Ai/CourseAIAssistant';

const CheckIcon = () => (
  <svg width="20" height="20" fill="#4f46e5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '0.5rem' }}>
    <path d="M20.285 6.709l-11.39 11.39-5.18-5.18 1.414-1.414 3.766 3.766 9.976-9.976z" />
  </svg>
);

const roboticsImages = [
  "20250104_131645.jpg", "20250104_131648.jpg", "20250104_131731.jpg", "20250104_131734.jpg",
  "20250104_131736.jpg", "20250104_131748.jpg", "20250104_131750.jpg", "20250104_131751.jpg",
  "20250104_131805.jpg", "20250104_131807.jpg", "20250104_131808.jpg", "20250104_131823.jpg",
  "20250104_131827.jpg", "20250104_131828.jpg", "20250104_131848.jpg", "20250104_131850.jpg",
  "20250104_131922.jpg", "20250104_131928.jpg", "20250104_131929.jpg"
].map(img => `/assets/img/robotics/${img}`);



const gameDevProgram = {
  beforeTable: [
    "🎮 Programme de Formation : Développement des Jeux Vidéo",
    "Durée : 3 mois",
    "Volume horaire total : 50 heures",
    "Public cible : Jeunes passionnés de technologie, étudiants en informatique ou autodidactes souhaitant s’initier au développement de jeux",
    "Prérequis : Connaissances de base en informatique (utilisation PC) et logique de programmation",
    "✅ Objectifs Généraux :",
    "Comprendre les bases du développement de jeux vidéo 2D et 3D",
    "Maîtriser un moteur de jeu (Unity ou Godot)",
    "Concevoir un jeu simple de A à Z (idée, gameplay, graphisme, code)",
    "Être capable de publier un jeu jouable sur PC ou mobile",
    "🧱 Structure de la formation (modulaire)",
  ],
  tableData: [
    {
      module: 'M1',
      title: 'Introduction au développement de jeux vidéo',
      duration: '4 h',
      objectives: 'Comprendre l’univers du jeu vidéo, les genres, les métiers',
    },
    {
      module: 'M2',
      title: 'Algorithmique et logique de programmation',
      duration: '6 h',
      objectives: 'Réviser les bases de la logique de programmation orientée jeu',
    },
    {
      module: 'M3',
      title: 'Découverte du moteur Unity ou Godot',
      duration: '8 h',
      objectives: 'Prendre en main l’environnement de développement et l’interface',
    },
    {
      module: 'M4',
      title: 'Création de scènes et gameplay 2D',
      duration: '10 h',
      objectives: 'Manipuler les objets, sprites, animations, collisions',
    },
    {
      module: 'M5',
      title: 'Scripting et logique de jeu (C# ou GDScript)',
      duration: '10 h',
      objectives: 'Implémenter les mécaniques de jeu, contrôles, UI',
    },
    {
      module: 'M6',
      title: 'Introduction au développement 3D',
      duration: '4 h',
      objectives: 'Bases de la 3D, importation d’objets, caméras et lumières',
    },
    {
      module: 'M7',
      title: 'Son, musique et effets visuels',
      duration: '3 h',
      objectives: 'Intégrer sons, effets et atmosphères immersives',
    },
    {
      module: 'M8',
      title: 'Optimisation et exportation du jeu',
      duration: '3 h',
      objectives: 'Tester, déboguer, exporter vers PC / Android',
    },
    {
      module: 'M9',
      title: 'Mini-projet : Créer son propre jeu',
      duration: '2 h (coaching) + travail personnel',
      objectives: 'Encadrer le participant pour réaliser son projet personnel',
    },
  ],
  afterTable: [
    "📘 Méthodologie pédagogique :",
    "Cours interactifs + démonstrations en live",
    "Ateliers pratiques (60% du temps)",
    "Suivi individuel des projets",
    "Apprentissage par projets et jeux existants",
    "Références : Unity (C#), Godot (GDScript)",
    "🎯 Compétences visées à la fin de la formation :",
    "Utiliser un moteur de jeu (Unity ou Godot)",
    "Implémenter des mécaniques de base (déplacement, collisions, scores…)",
    "Structurer un jeu avec des scènes et scripts",
    "Publier un jeu jouable",
    "Comprendre les étapes de production d’un jeu",
    "🧪 Évaluation :",
    "Contrôle continu à travers des mini-ateliers pratiques",
    "Évaluation finale par présentation du jeu développé (pitch + test)",
    "📂 Livrables attendus :",
    "Cahier de conception de jeu (Game Design Document)",
    "Fichiers source du jeu",
    "Export du jeu en .exe ou .apk",
    "Attestation de formation + appréciation du projet final"
  ]
};

const programmes = {
  "Développement des Jeux Vidéo": [],
  "Formation en Robotique & Arduino": [
    "formation en Robotique & Arduino sur 3 mois (45 heures",
    "Objectif de la formation :",
    "À la fin de cette formation, les participants seront capables de concevoir et de réaliser des projets robotiques simples à l’aide de la plateforme Arduino, tout en maîtrisant les bases de la programmation, des capteurs et des moteurs.",
    "Programme détaillé :",
    "Mois 1 : Introduction à Arduino et bases de l’électronique (15 heures)",
    "Semaine 1 : Introduction à la robotique et à Arduino",
    "Durée : 5 heures",
    "Présentation de la robotique et des applications.",
    "Introduction à Arduino : Qu'est-ce que l'Arduino ? Histoire et évolution.",
    "Installation de l’environnement Arduino IDE.",
    "Présentation de la carte Arduino : Types de cartes, broches, et connexions.",
    "Premier projet : Clignotement d'une LED (Blink) avec Arduino.",
    "Semaine 2 : Bases de l’électronique et fonctionnement d’Arduino",
    "Durée : 5 heures",
    "Composants de base : résistances, diodes, transistors, moteurs, capteurs.",
    "Schémas de circuits : Lecture et création.",
    "Utilisation des entrées et sorties numériques (digitalRead, digitalWrite).",
    "Exercice pratique : Contrôle d'une LED via un bouton.",
    "Semaine 3 : Introduction aux capteurs et aux actionneurs",
    "Durée : 5 heures",
    "Sensibilité et fonctionnement des capteurs (Température, lumière, distance).",
    "Introduction aux actionneurs : moteurs à courant continu, servomoteurs, moteurs pas à pas.",
    "Exercice pratique : Mesurer la température avec un capteur et allumer une LED selon la température.",
    "Mois 2 : Programmation avancée et premiers projets robotiques (15 heures)",
    "Semaine 4 : Programmation avancée avec Arduino",
    "Durée : 5 heures",
    "Structure des programmes Arduino : Boucles, conditions et variables.",
    "Gestion du temps avec delay() et millis().",
    "Lecture et écriture analogiques (analogRead, analogWrite).",
    "Exercice pratique : Contrôle de la luminosité d'une LED avec un potentiomètre.",
    "Semaine 5 : Contrôle de moteurs et introduction à la robotique mobile",
    "Durée : 5 heures",
    "Contrôle de moteurs à courant continu avec un pont en H.",
    "Utilisation d’un contrôleur de moteur (L298N).",
    "Introduction aux robots mobiles : concept de châssis et de déplacement.",
    "Exercice pratique : Création d’un robot mobile à 2 roues.",
    "Semaine 6 : Utilisation des capteurs de distance et construction de robots autonomes",
    "Durée : 5 heures",
    "Introduction au capteur de distance (Ultrason HC-SR04).",
    "Programmation du robot pour éviter les obstacles.",
    "Exercice pratique : Création d’un robot autonome capable d'éviter les obstacles.",
    "Mois 3 : Projets avancés et perfectionnement (15 heures)",
    "Semaine 7 : Robot suiveur de ligne et introduction aux servomoteurs",
    "Durée : 5 heures",
    "Utilisation des capteurs de ligne (suiveurs de ligne IR).",
    "Contrôle des moteurs et des servomoteurs pour suivre une ligne.",
    "Exercice pratique : Construction d’un robot suiveur de ligne.",
    "Semaine 8 : Projets robotiques complexes",
    "Durée : 5 heures",
    "Réalisation d’un projet combinant plusieurs capteurs et actionneurs.",
    "Exercice pratique : Création d’un robot mobile avec prise d’objets (bras robotique simple).",
    "Programmation d’un robot mobile contrôlé par capteurs de proximité.",
    "Semaine 9 : Finalisation des projets et présentation",
    "Durée : 5 heures",
    "Finalisation des projets des participants.",
    "Tests, débogage et ajustements des projets.",
    "Présentation des projets devant un jury ou en groupe.",
    "Évaluation finale : Analyse de la performance et retour sur les projets.",
    "Évaluation et validation des compétences :",
    "Évaluations pratiques à la fin de chaque mois.",
    "Rapport écrit sur chaque projet réalisé.",
    "Présentation orale et démonstration d’un projet à la fin de la formation.",
    "Matériel requis :",
    "Carte Arduino Uno ou compatible.",
    "Câbles de connexion.",
    "Capteurs (température, lumière, distance).",
    "Moteurs à courant continu et servomoteurs.",
    "Châssis de robot (facultatif).",
    "Ordinateur avec Arduino IDE installé."
  ],
  "Initiation à l’Intelligence Artificielle et à ses Applications ": [
    "🎓 Intitulé de la formation :",
    "Initiation à l’Intelligence Artificielle et à ses Applications",
    "🕒 Durée :",
    "3 mois (soit environ 1 séance de 3h/semaine)",
    "Total : 45 heures",
    "🎯 Objectifs généraux :",
    "Comprendre les fondements de l’intelligence artificielle",
    "S’initier aux outils et techniques de base (Python, Machine Learning, IA générative)",
    "Être capable de développer un projet simple intégrant des techniques d’IA",
    "🧠 Structure du programme",
    "Module 1 : Introduction à l’intelligence artificielle (6 heures)",
    "Définitions et historique de l’IA",
    "Les grands domaines de l’IA : ML, NLP, Vision, IA générative…",
    "Exemples d’applications concrètes (santé, industrie, marketing, éducation…)",
    "Débat éthique et impact de l’IA sur le marché de l’emploi",
    "Module 2 : Environnement de développement IA (Python & outils) (9 heures)",
    "Installation des outils : Python, Jupyter Notebook, Google Colab",
    "Les bases du langage Python appliqué à l’IA",
    "Variables, conditions, boucles, fonctions",
    "Manipulation de données avec Numpy et Pandas",
    "Introduction à Matplotlib et Seaborn pour la visualisation de données",
    "Module 3 : Machine Learning – Apprentissage supervisé et non supervisé (12 heures)",
    "Concepts clés : features, labels, dataset, overfitting",
    "Méthodologie : préparation des données, normalisation, splitting",
    "Algorithmes supervisés :",
    "Régression linéaire, KNN, arbres de décision, SVM",
    "Algorithmes non supervisés : K-means, PCA",
    "Travaux pratiques avec Scikit-learn",
    "Évaluation des performances (accuracy, confusion matrix…)",
    "Module 4 : Initiation à l’intelligence artificielle générative (IAg) (6 heures)",
    "Comprendre les modèles génératifs : GANs, LLMs",
    "Introduction à ChatGPT et DALL·E",
    "Cas pratiques : génération de texte, résumé automatique, image via prompt.",
    "Module 5 : Mini-projet pratique d’intégration (9 heures)",
    "Conception d’un mini-projet en groupe ou individuel",
    "Exemple : assistant intelligent, chatbot simple, système de recommandation, reconnaissance d’images ou génération de contenu",
    "Encadrement méthodologique (étapes du projet IA)",
    "Présentation finale et évaluation des projets",
    "📋 Méthodes pédagogiques :",
    "Apports théoriques et démonstrations guidées",
    "Travaux pratiques sur ordinateurs",
    "Études de cas",
    "Mini-projets en groupes",
    "✅ Modalités d’évaluation :",
    "Évaluations continues (QCM, exercices)",
    "Évaluation finale : présentation du mini-projet + rapport synthétique",
    "📜 Attestation de formation :",
    "Délivrée à l’issue de la formation après validation du projet final."
  ],
  "Formation en Développement Web": [
    "📚 Intitulé de la formation :",
    "Intitulé : Formation en Développement Web",
    "Durée totale : 65 heures",
    "Période : sur 4 mois (environ 4h/semaine)",
    "Public cible : jeunes diplômés, demandeurs d'emploi, reconversion professionnelle, étudiants",
    "Prérequis : notions de base en informatique et navigation web",
    "🎯 Objectifs de la Formation",
    "Acquérir les bases du développement web (frontend et backend)",
    "Créer un site web dynamique en utilisant des langages et outils modernes",
    "Comprendre les principes de fonctionnement des sites et applications web",
    "Être capable de publier un site en ligne",
    "🧱 Contenu de la Formation",
    "🔹 Module 1 : Introduction au Développement Web (5h)",
    "Présentation des technologies web (Frontend vs Backend)",
    "Fonctionnement d’un site web (client, serveur, DNS, hébergement)",
    "Outils du développeur (éditeur de code, navigateur, GitHub)",
    "🔹 Module 2 : HTML5 & Structure Web (10h)",
    "Balises de base : html, head, body, div, header, footer",
    "Titres, paragraphes, listes, liens, tableaux",
    "Formulaires (input, textarea, select, bouton)",
    "Projet pratique : page de présentation personnelle",
    "🔹 Module 3 : CSS3 & Mise en Forme (10h)",
    "Sélecteurs CSS, classes et identifiants",
    "Couleurs, polices, marges, paddings, borders",
    "Positionnement, Flexbox, Grid",
    "Media Queries et responsive design",
    "Projet pratique : landing page responsive",
    "🔹 Module 4 : Introduction à JavaScript (10h)",
    "Syntaxe de base : variables, fonctions, conditions, boucles",
    "DOM : sélectionner, modifier et créer des éléments",
    "Événements utilisateurs",
    "Mini-projet : calculatrice ou to-do list interactive",
    "🔹 Module 5 : Développement Web Backend avec PHP & MySQL (12h)",
    "Introduction au langage PHP",
    "Traitement des formulaires",
    "Connexion à une base de données MySQL",
    "Requêtes CRUD (Create, Read, Update, Delete)",
    "Sécurité de base (injection SQL, validation)",
    "Projet pratique : mini-blog avec base de données",
    "🔹 Module 6 : Gestion de projet & Git/GitHub (5h)",
    "Introduction à Git et GitHub",
    "Commandes de base : init, commit, push, pull",
    "Collaboration en ligne",
    "Organisation d’un projet (structure de fichiers, versionnage)",
    "🔹 Module 7 : Déploiement Web & Hébergement (3h)",
    "Achat d’un nom de domaine et hébergement web",
    "Transfert de fichiers via FTP",
    "Utilisation de services gratuits (ex : 000webhost, GitHub Pages)",
    "🔹 Module 8 : Projet de Fin de Formation (10h)",
    "Réalisation d’un projet personnel ou imposé (ex : site vitrine, portfolio, blog)",
    "Conception, développement, mise en ligne",
    "Soutenance devant un jury (présentation + démonstration)",
    "📚 Méthodologie pédagogique",
    "Formation en présentiel ou hybride",
    "30% théorie / 70% pratique",
    "Exercices dirigés, projets, challenges",
    "Évaluation continue + évaluation finale (projet)",
    "📜 Évaluation et Attestation",
    "Contrôle continu (20%)",
    "Projet final (60%)",
    "Assiduité et participation (20%)",
    "Attestation de formation remise en fin de parcours"
  ]
};

const Developpement = () => {
  const [selectedProgram, setSelectedProgram] = useState("Développement des Jeux Vidéo");
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % roboticsImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % roboticsImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + roboticsImages.length) % roboticsImages.length);

  const boldKeywords = [
    "Module",
    "Objectifs",
    "Atelier",
    "Pré-requis",
    "Contenu",
    "Objectif général de la formation",
    "Durée totale",
    "Rythme suggéré",
    "MODULE",
    "🎯 Objectifs généraux :",
    "🕒 Durée :",
    "🧠 Structure du programme",
    "Module 1 : Introduction à l’intelligence artificielle (6 heures)",
    "Module 2 : Environnement de développement IA (Python & outils) (9 heures)",
    "Module 3 : Machine Learning – Apprentissage supervisé et non supervisé (12 heures)",
    "Module 4 : Initiation à l’intelligence artificielle générative (IAg) (6 heures)",
    "Module 5 : Mini-projet pratique d’intégration (9 heures)",
    "📋 Méthodes pédagogiques :",
    "✅ Modalités d’évaluation :",
    "📜 Attestation de formation :",
    "🎓 Intitulé de la formation :",
    "📚 Intitulé de la formation :",
    "🎯 Objectifs de la Formation",
    "🧱 Contenu de la Formation",
    "🔹 Module 1 : Introduction au Développement Web (5h)",
    "🔹 Module 2 : HTML5 & Structure Web (10h)",
    "🔹 Module 3 : CSS3 & Mise en Forme (10h)",
    "🔹 Module 4 : Introduction à JavaScript (10h)",
    "🔹 Module 5 : Développement Web Backend avec PHP & MySQL (12h)",
    "🔹 Module 6 : Gestion de projet & Git/GitHub (5h)",
    "🔹 Module 7 : Déploiement Web & Hébergement (3h)",
    "🔹 Module 8 : Projet de Fin de Formation (10h)",
    "📚 Méthodologie pédagogique",
    "📜 Évaluation et Attestation",
    "🎮 Programme de Formation : Développement des Jeux Vidéo",
    "✅ Objectifs Généraux :",
    "🧱 Structure de la formation (modulaire)",
    "📘 Méthodologie pédagogique :",
    "🎯 Compétences visées à la fin de la formation :",
    "🧪 Évaluation :",
    "📂 Livrables attendus :",
    "Objectif de la formation :",
    "Programme détaillé :",
    "Mois 1 : Introduction à Arduino et bases de l’électronique (15 heures)",
    "Semaine 1 : Introduction à la robotique et à Arduino",
    "Semaine 2 : Bases de l’électronique et fonctionnement d’Arduino",
    "Semaine 3 : Introduction aux capteurs et aux actionneurs",
    "Mois 2 : Programmation avancée et premiers projets robotiques (15 heures)",
    "Semaine 4 : Programmation avancée avec Arduino",
    "Semaine 5 : Contrôle de moteurs et introduction à la robotique mobile",
    "Semaine 6 : Utilisation des capteurs de distance et construction de robots autonomes",
    "Mois 3 : Projets avancés et perfectionnement (15 heures)",
    "Semaine 7 : Robot suiveur de ligne et introduction aux servomoteurs",
    "Semaine 8 : Projets robotiques complexes",
    "Semaine 9 : Finalisation des projets et présentation",
    "Évaluation et validation des compétences :",
    "Matériel requis :",
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: '#1e293b' }}>
      <HeaderOne />
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        color: 'white',
        padding: '6rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <FloatingBubbles />
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ fontSize: '3rem', fontWeight: 'bold', maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 1 }}
        >
          Votre Carrière en Développement Commence Ici
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ fontSize: '1.25rem', marginTop: '1rem', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', position: 'relative', zIndex: 1 }}
        >
          Apprenez les bases du développement logiciel et devenez un expert en programmation.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAssistantOpen(true)}
          style={{
            marginTop: '2.5rem',
            backgroundColor: '#facc15',
            color: '#1e293b',
            border: 'none',
            padding: '1rem 3rem',
            borderRadius: 9999,
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(252, 204, 21, 0.5)',
            position: 'relative',
            zIndex: 1
          }}
        >
          Assistant IA
        </motion.button>
      </section>

      {/* Slideshow Section */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#f3f4f6' }}>
        <div style={{ position: 'relative', maxWidth: '450px', margin: '0 auto', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <div style={{ position: 'relative', aspectRatio: '16/9' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={roboticsImages[currentSlide]}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', top: 0, left: 0 }}
                alt={`Diapositive ${currentSlide + 1}`}
              />
            </AnimatePresence>

            {/* Buttons */}
            <button
              onClick={prevSlide}
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', zIndex: 10 }}
            >
              ❮
            </button>
            <button
              onClick={nextSlide}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', zIndex: 10 }}
            >
              ❯
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '10px', background: 'white' }}>
            {roboticsImages.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: currentSlide === idx ? '#4f46e5' : '#d1d5db', cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Overview Section */}
      <section style={{ padding: '4rem 2rem', maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        {[
          { icon: '🎓', title: 'Cours de haute qualité', desc: 'Nous offrons des cours de qualité supérieure pour vous aider à exceller.' },
          { icon: '👨‍🏫', title: 'Mentor personnel', desc: 'Un mentor dédié pour vous guider tout au long de votre apprentissage.' },
          { icon: '💎', title: 'Support premium', desc: 'Assistance prioritaire pour toutes vos questions et besoins.' },
          { icon: '⏰', title: 'Remboursement 24h', desc: 'Satisfait ou remboursé sous 24 heures.' },
        ].map(({ icon, title, desc }, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            style={{
              flex: '1 1 220px',
              textAlign: 'center',
              padding: '1.5rem',
              borderRadius: '12px',
              backgroundColor: '#f9fafb',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ fontSize: 48, marginBottom: '1rem' }}>{icon}</div>
            <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{title}</h3>
            <p style={{ color: '#6b7280' }}>{desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Programme de Cours Title and Buttons */}
      <section style={{ maxWidth: 900, margin: '2rem auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1e293b' }}>Programme de Cours</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {Object.keys(programmes).map((program) => (
            <button
              key={program}
              onClick={() => setSelectedProgram(program)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: selectedProgram === program ? '#6366f1' : '#e0e7ff',
                color: selectedProgram === program ? 'white' : '#4f46e5',
                fontWeight: 'bold',
                fontSize: '1rem',
                boxShadow: selectedProgram === program ? '0 4px 14px rgba(99, 102, 241, 0.5)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {program}
            </button>
          ))}
        </div>
        {/* Programme Content */}
        {selectedProgram === "Développement des Jeux Vidéo" ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <ul style={{ fontSize: '1.1rem', color: '#374151', listStyleType: 'none', paddingLeft: 0, lineHeight: '1.8', maxWidth: 900, margin: '0 auto', textAlign: 'left' }}>
              {gameDevProgram.beforeTable.map((item: string, index: number) => {
                const isBold = boldKeywords.some(keyword => item.startsWith(keyword));
                return (
                  <motion.li
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '0.5rem',
                      whiteSpace: 'pre-line',
                      fontWeight: isBold ? 'bold' : 'normal',
                      paddingLeft: isBold ? '0' : '1.5rem'
                    }}
                  >
                    {!isBold && <CheckIcon />}
                    <span>{item}</span>
                  </motion.li>
                );
              })}
            </ul>
            <div style={{ overflowX: 'auto', margin: '2rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
                <thead>
                  <tr style={{ backgroundColor: '#4a5568', color: 'white' }}>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Module</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Intitulé du module</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Durée (heures)</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Objectifs pédagogiques principaux</th>
                  </tr>
                </thead>
                <tbody>
                  {gameDevProgram.tableData.map((row, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f7fafc' : '#edf2f7' }}>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>{row.module}</td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>{row.title}</td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>{row.duration}</td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>{row.objectives}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul style={{ fontSize: '1.1rem', color: '#374151', listStyleType: 'none', paddingLeft: 0, lineHeight: '1.8', maxWidth: 900, margin: '0 auto', textAlign: 'left' }}>
              {gameDevProgram.afterTable.map((item: string, index: number) => {
                const isBold = boldKeywords.some(keyword => item.startsWith(keyword));
                return (
                  <motion.li
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '0.5rem',
                      whiteSpace: 'pre-line',
                      fontWeight: isBold ? 'bold' : 'normal',
                      paddingLeft: isBold ? '0' : '1.5rem'
                    }}
                  >
                    {!isBold && <CheckIcon />}
                    <span>{item}</span>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        ) : (
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
            }}
            style={{ fontSize: '1.1rem', color: '#374151', listStyleType: 'none', paddingLeft: 0, lineHeight: '1.8', maxWidth: 900, margin: '0 auto' }}
          >
            {(programmes as Record<string, string[]>)[selectedProgram].map((item: string, index: number) => {
              const isBold = boldKeywords.some(keyword => item.startsWith(keyword));
              return (
                <motion.li
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '0.5rem',
                    whiteSpace: 'pre-line',
                    fontWeight: isBold ? 'bold' : 'normal',
                    paddingLeft: isBold ? '0' : '1.5rem'
                  }}
                >
                  {!isBold && <CheckIcon />}
                  <span>{item}</span>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </section>

      {/* Prérequis Section */}
      <section style={{ padding: '4rem 2rem', maxWidth: 900, margin: '2rem auto', backgroundColor: '#3b82f6', borderRadius: '12px', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <FloatingBubbles />
        <motion.h2
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', position: 'relative', zIndex: 1 }}
        >
          Prérequis
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: '1.1rem', lineHeight: '1.6', position: 'relative', zIndex: 1 }}
        >
          Une connaissance de base en informatique et en logique de programmation est recommandée.
        </motion.p>
      </section>

      {/* Footer Section */}
      <footer style={{ backgroundColor: '#6e8efb', color: 'white', padding: '2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <FloatingBubbles />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ margin: 0, fontSize: '1rem', position: 'relative', zIndex: 1 }}
        >
          &copy; {new Date().getFullYear()} TieLearn . Tous droits réservés.
        </motion.p>
      </footer>
      {isAssistantOpen && <CourseAIAssistant pageType="Développement" isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />}
    </div>
  );
};

export default Developpement;
