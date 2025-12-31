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
  "Programme de Formation Power BI (50 Heures)": [
    "Objectif de la formation :",
    "Apprendre à utiliser Power BI pour la création de rapports et de tableaux de bord interactifs, en permettant aux participants de maîtriser l'analyse de données et la visualisation dans un contexte professionnel.",
    "Module 1 : Introduction à Power BI et Prise en Main (5 heures)",
    "Objectifs : Comprendre l’environnement Power BI, ses composants et son rôle dans l’analyse de données.",
    "Présentation de Power BI : Introduction aux composants de Power BI (Power BI Desktop, Power BI Service, Power BI Mobile).",
    "Installation et configuration de Power BI Desktop : Comment télécharger et installer Power BI Desktop.",
    "Interface de Power BI : Présentation de l'interface utilisateur et des outils disponibles.",
    "Connexion aux données : Connexion à des sources de données (Excel, bases de données SQL, services en ligne, etc.).",
    "Module 2 : Chargement et Transformation des Données (10 heures)",
    "Objectifs : Maîtriser le processus de chargement, nettoyage et transformation des données.",
    "Importation des données : Chargement de données à partir de différentes sources (Excel, SQL Server, API, etc.).",
    "Utilisation de Power Query : Introduction à Power Query pour transformer et nettoyer les données.",
    "Nettoyage des données : Filtrer, supprimer des colonnes, renommer des colonnes, gérer les types de données.",
    "Fusionner et joindre des tables : Utilisation des fonctions de fusion et de jointure pour combiner les données.",
    "Module 3 : Modélisation des Données (10 heures)",
    "Objectifs : Apprendre à structurer les données pour une analyse optimale.",
    "Création de modèles de données : Relations entre les tables, modèles étoilés, modèles en flocon.",
    "Gestion des clés primaires et étrangères : Définition des relations entre les tables.",
    "Utilisation de DAX (Data Analysis Expressions) : Introduction aux formules DAX pour la création de mesures et de calculs.",
    "Calculs simples et avancés : Sommes, moyennes, calculs de pourcentages, filtres contextuels.",
    "Module 4 : Création de Visualisations (10 heures)",
    "Objectifs : Apprendre à créer des graphiques et des visualisations interactives.",
    "Types de visualisations : Graphiques en colonnes, graphiques en barres, courbes, cartes géographiques, tableaux, matrices.",
    "Création de rapports interactifs : Ajouter des filtres, segments, slicers et boutons pour rendre les rapports interactifs.",
    "Mise en forme conditionnelle : Application de mises en forme avancées selon les critères de données.",
    "Optimisation des visualisations : Conseils sur la lisibilité et l'interactivité des rapports.",
    "Module 5 : Analyse Avancée et DAX (10 heures)",
    "Objectifs : Approfondir l'utilisation de DAX pour effectuer des analyses avancées.",
    "Fonctions DAX avancées : Utilisation des fonctions CALCULATE, FILTER, TIME INTELLIGENCE, etc.",
    "Création de mesures complexes : Analyse des tendances, calculs cumulés, variations.",
    "Utilisation des tables de dates : Création et utilisation des tables de dates pour l’analyse temporelle.",
    "Analyse de scénarios : Création de mesures conditionnelles pour des analyses spécifiques.",
    "Module 6 : Publication et Partage des Rapports (5 heures)",
    "Objectifs : Apprendre à publier, partager et collaborer sur des rapports Power BI.",
    "Publication sur Power BI Service : Exporter les rapports et tableaux de bord vers Power BI Service.",
    "Création de dashboards dans Power BI Service : Utilisation des dashboards interactifs dans le cloud.",
    "Partage des rapports et collaboration : Paramétrage des permissions et partage avec d'autres utilisateurs.",
    "Publication sur Power BI Mobile : Consultation et modification des rapports sur appareils mobiles.",
    "Module 7 : Sécurisation des Données et Optimisation des Performances (5 heures)",
    "Objectifs : Apprendre à sécuriser les rapports et optimiser les performances de Power BI.",
    "Sécurisation des données dans Power BI : Rôles et sécurité au niveau des lignes de données (Row Level Security - RLS).",
    "Optimisation des rapports : Améliorer la vitesse et la performance des rapports, gestion des tailles de fichiers et des sources de données.",
    "Utilisation des paramètres et des options avancées : Optimisation des modèles pour des rapports de grande envergure.",
    "Module 8 : Projet Pratique (5 heures)",
    "Objectifs : Mettre en application les connaissances acquises à travers un projet pratique.",
    "Création d'un tableau de bord complet : À partir de données réelles ou fictives, création d'un rapport interactif complet incluant toutes les étapes : chargement, transformation, modélisation, visualisation, et publication.",
    "Analyse et présentation des résultats : Interprétation des résultats et présentation du tableau de bord devant le groupe.",
    "Méthodes pédagogiques :",
    "Formation en présentiel et en ligne : Combinaison de sessions théoriques et d'ateliers pratiques.",
    "Supports pédagogiques : Présentations, tutoriels vidéo, exercices pratiques et études de cas.",
    "Suivi personnalisé : Accompagnement individuel pour les projets pratiques et les questions spécifiques.",
    "Évaluations : Tests de connaissances en fin de chaque module, évaluation finale basée sur le projet pratique.",
    "Modalités de certification :",
    "À l'issue de la formation, une certification de compétence Power BI sera délivrée aux participants ayant réussi les évaluations."
  ]
};

const MicrosoftOffice = () => {
  const [selectedProgram, setSelectedProgram] = useState("Programme de Formation Power BI (50 Heures)");
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const boldKeywords = [
    "Module",
    "Objectifs",
    "Atelier",
    "Pré-requis",
    "Contenu",
    "Objectif de la formation :",
    "Module 1 : Introduction à Power BI et Prise en Main (5 heures)",
    "Module 2 : Chargement et Transformation des Données (10 heures)",
    "Module 3 : Modélisation des Données (10 heures)",
    "Module 4 : Création de Visualisations (10 heures)",
    "Module 5 : Analyse Avancée et DAX (10 heures)",
    "Module 6 : Publication et Partage des Rapports (5 heures)",
    "Module 7 : Sécurisation des Données et Optimisation des Performances (5 heures)",
    "Module 8 : Projet Pratique (5 heures)",
    "Méthodes pédagogiques :",
    "Modalités de certification :",
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
          Votre Carrière en Microsoft Office Commence Ici
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ fontSize: '1.25rem', marginTop: '1rem', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', position: 'relative', zIndex: 1 }}
        >
          Maîtrisez les outils essentiels de Microsoft Office pour améliorer votre productivité.
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
      <section style={{ maxWidth: 900, margin: '2rem auto', textAlign: 'left' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1e293b' }}>Programme de Cours</h2>
        <div style={{ display: 'flex', justifyContent: 'left', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
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
          Aucune expérience préalable n'est requise. Ce cours est conçu pour les débutants.
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
        pageType="microsoft-office"
      />
    </div>
  );
};

export default MicrosoftOffice;
