import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FloatingBubbles from '../../components/FloatingBubbles';
import HeaderOne from '../../layouts/headers/HeaderOne';
import CourseAIAssistant from '../../components/Ai/CourseAIAssistant';

const CheckIcon = () => (
  <svg width="20" height="20" fill="#4f46e5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '0.5rem' }}>
    <path d="M20.285 6.709l-11.39 11.39-5.18-5.18 1.414-1.414 3.766 3.766 9.976-9.976z" />
  </svg>
);

const programmes = {
  "Formation en UI/UX Design (50 heures)": [
    "Durée de la formation : 3 mois",
    "Nombre d'heures : 50 heures",
    "Fréquence : 2 séances par semaine (2h30 par séance)",
    "Objectif de la formation :",
    "Acquérir les compétences nécessaires pour concevoir des interfaces utilisateurs ergonomiques et intuitives en tenant compte des principes du design UX. À la fin de cette formation, les participants seront capables de réaliser des maquettes d’interface et de mener des recherches utilisateur efficaces.",
    "Module 1 : Introduction à l'UX Design (10 heures)",
    "Objectif : Comprendre les bases de l’UX Design et son importance dans le processus de création numérique.",
    "Séance 1 (2h30) :",
    "Introduction à l'UX Design",
    "Différence entre UI et UX",
    "Les 5 étapes du processus UX : Recherche, Design, Prototype, Test, Implémentation",
    "Notions de base sur la psychologie de l’utilisateur",
    "Séance 2 (2h30) :",
    "Étude des différents types de recherche utilisateur (quantitative et qualitative)",
    "Interviews, sondages et observation",
    "Introduction à l’analyse des données utilisateurs",
    "Études de cas d’interfaces réussies et ratées",
    "Module 2 : Recherche Utilisateur et Personas (8 heures)",
    "Objectif : Maîtriser les techniques de recherche utilisateur pour identifier les besoins et comportements des utilisateurs.",
    "Séance 3 (2h30) :",
    "Création de personas : définition, rôle, importance",
    "Méthodes pour recueillir des informations utilisateur : interviews, sondages",
    "Introduction à la carte d’empathie",
    "Séance 4 (2h30) :",
    "Analyse des personas créés",
    "Mise en pratique : création de personas pour un projet fictif",
    "Introduction aux user flows et scénarios d’utilisation",
    "Module 3 : Conception d’Interface (12 heures)",
    "Objectif : Apprendre à concevoir des interfaces efficaces en tenant compte des besoins utilisateurs.",
    "Séance 5 (2h30) :",
    "Introduction aux principes de conception d’interface",
    "Principes de design UI : hiérarchie, alignement, contraste, lisibilité",
    "Introduction à la conception mobile-first",
    "Séance 6 (2h30) :",
    "Wireframing : objectifs, outils, bonnes pratiques",
    "Création de wireframes pour une application mobile ou un site web",
    "Utilisation des outils de wireframing (ex : Figma, Adobe XD)",
    "Séance 7 (2h30) :",
    "Prototypage interactif : création de prototypes simples",
    "Introduction à l’utilisation des grilles et des systèmes de design",
    "Conception d’interactions utilisateur (ex : transitions, animations)",
    "Module 4 : UI Design et Outils (10 heures)",
    "Objectif : Approfondir les compétences pratiques en design UI et maîtrise des outils modernes de conception.",
    "Séance 8 (2h30) :",
    "Les éléments UI : boutons, menus, icônes, formulaires",
    "La théorie des couleurs et la psychologie des couleurs dans le design",
    "Choix des typographies et bonnes pratiques",
    "Séance 9 (2h30) :",
    "Introduction à Figma/Adobe XD (selon l’outil choisi pour la formation)",
    "Création d’une interface utilisateur avec un outil de design",
    "Mise en pratique : conception d’une page d’accueil d’application",
    "Séance 10 (2h30) :",
    "Utilisation de composants réutilisables dans un design",
    "Introduction au responsive design et aux layouts adaptatifs",
    "Test d’interactions UI sur des maquettes créées",
    "Module 5 : Testing et Validation (8 heures)",
    "Objectif : Apprendre à tester et valider des designs auprès d’utilisateurs réels.",
    "Séance 11 (2h30) :",
    "Méthodes de test utilisateur : tests A/B, tests d’usabilité",
    "Comment recueillir et analyser les retours utilisateurs",
    "Introduction au logiciel de prototypage (ex : InVision, Marvel)",
    "Séance 12 (2h30) :",
    "Mener un test utilisateur sur un prototype",
    "Analyser les résultats du test et ajuster le design",
    "Validation d’un design UI auprès de groupes utilisateurs",
    "Module 6 : Développement de Projet (12 heures)",
    "Objectif : Appliquer les concepts appris dans la création d’un projet complet.",
    "Séance 13 (2h30) :",
    "Planification du projet final : création d’un cahier des charges UX/UI",
    "Réalisation d’un prototype interactif complet (site web ou application)",
    "Définition des éléments de branding (logos, palettes de couleurs, typographie)",
    "Séance 14 (2h30) :",
    "Revue et feedback sur les prototypes réalisés",
    "Finalisation du prototype avec corrections et améliorations",
    "Préparation à la présentation du projet final",
    "Évaluation et Conclusion (5 heures)",
    "Séance 15 (2h30) :",
    "Présentation des projets finaux devant le formateur et les autres participants",
    "Critiques constructives et feedback sur les projets",
    "Discussion sur l’évolution de l’UX/UI dans les métiers du numérique",
    "Séance 16 (2h30) :",
    "Bilan de la formation",
    "Conseils pour la suite : trouver un stage ou un premier emploi en tant qu’UX/UI designer",
    "Remise des certificats de formation",
    "Supports pédagogiques :",
    "Slides et supports de cours partagés en ligne",
    "Accès aux outils de design (Figma, Adobe XD)",
    "Études de cas réelles et exercices pratiques"
  ]
};

const UXUI = () => {
  const [selectedProgram, setSelectedProgram] = useState("Formation en UI/UX Design (50 heures)");
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

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
    "🎯 Objectif général :",
    "⏳ Durée totale",
    "Période :",
    "Rythme :",
    "Nombre de modules :",
    "Niveau requis :",
    "📚 Programme par modules :",
    "🔹 Module 1 :",
    "🔹 Module 2 :",
    "🔹 Module 3 :",
    "🔹 Module 4 :",
    "🔹 Module 5 :",
    "🧑‍🏫 Méthodologie :",
    "✅ Compétences visées :",
    "📄 Livrables à fournir :"
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
          Votre Carrière en UX/UI Commence Ici
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ fontSize: '1.25rem', marginTop: '1rem', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', position: 'relative', zIndex: 1 }}
        >
          Découvrez les principes fondamentaux de l'expérience utilisateur et du design d'interface.
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
          Demandez à votre assistant IA
        </motion.button>
      </section>

      {/* Quick Overview Section */}


      {/* Programme de Cours Title and Buttons */}
      <section style={{ maxWidth: 900, margin: '2rem auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1e293b', textAlign: 'center' }}>Programme de Cours</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
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
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
          }}
          style={{ fontSize: '1.1rem', color: '#374151', listStyleType: 'none', paddingLeft: 0, lineHeight: '1.8', maxWidth: 900, marginLeft: 0 }}
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
          Programme content will be provided.
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

      <CourseAIAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        pageType="ux-ui"
      />
    </div>
  );
};

export default UXUI;
