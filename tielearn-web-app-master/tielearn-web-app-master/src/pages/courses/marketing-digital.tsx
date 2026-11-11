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

const marketingImages = [
  "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg",
  "WhatsApp Image 2024-11-09 at 12.15.22.jpeg",
  "WhatsApp Image 2024-11-09 at 12.15.23 (1).jpeg",
  "WhatsApp Image 2024-11-09 at 12.15.23.jpeg",
  "WhatsApp Image 2024-11-09 at 12.15.24.jpeg",
  "WhatsApp Image 2024-11-09 at 12.15.25 (1).jpeg",
  "WhatsApp Image 2024-11-09 at 12.15.25 (2).jpeg",
  "WhatsApp Image 2024-11-09 at 12.15.25.jpeg",
  "WhatsApp Image 2024-11-09 at 12.15.26.jpeg"
].map(img => `/assets/img/marketing/${img}`);

const programmes = {
  "Marketing Digital : Fondamentaux et Pratique Professionnelle": [
    "📚 Intitulé de la formation :",
    "Marketing Digital : Fondamentaux et Pratique Professionnelle",
    "⏱ Durée :",
    "3 mois – 50 heures",
    "→ 1 à 2 séances par semaine",
    "🎯 Objectifs généraux :",
    "Comprendre les fondamentaux du marketing digital",
    "Maîtriser les principaux canaux et outils digitaux",
    "Élaborer une stratégie de marketing digital adaptée à un projet",
    "Savoir créer, gérer et analyser des campagnes digitales",
    "📅 Contenu de la formation",
    "🔹 Module 1 : Introduction au Marketing Digital",
    "Durée : 4 heures",
    "Définition et évolution du marketing digital",
    "Comportement du consommateur en ligne",
    "Inbound vs Outbound marketing",
    "Présentation de l’écosystème digital en Tunisie et dans le monde",
    "🔹 Module 2 : Création de contenu et Branding digital",
    "Durée : 8 heures",
    "Stratégie de contenu (Content marketing)",
    "Copywriting et storytelling",
    "Création de visuels avec Canva",
    "Introduction à la vidéo courte (Reels, TikTok, YouTube Shorts)",
    "Outils d’édition gratuits et IA pour contenu",
    "🔹 Module 3 : Réseaux Sociaux et Community Management",
    "Durée : 10 heures",
    "Rôle du Community Manager",
    "Stratégie éditoriale pour réseaux sociaux (Facebook, Instagram, LinkedIn, TikTok)",
    "Création d’un calendrier de publication",
    "Animation et modération de communautés",
    "Publicité sur les réseaux sociaux (Facebook Ads – Initiation)",
    "Analyse des statistiques (Meta Business Suite)",
    "🔹 Module 4 : Référencement et Visibilité Web",
    "Durée : 6 heures",
    "SEO : Référencement naturel (bases)",
    "Google My Business (création et optimisation)",
    "Présentation des outils SEO (Ubersuggest, Google Trends, etc.)",
    "Notions de SEM (référencement payant)",
    "🔹 Module 5 : Email Marketing et Outils CRM",
    "Durée : 4 heures",
    "Création de campagnes email (Mailchimp, Brevo)",
    "Bases de la segmentation d’audience",
    "Suivi des performances (taux d’ouverture, clics, rebonds)",
    "Introduction aux outils de CRM simples",
    "🔹 Module 6 : Publicité en ligne (SEA)",
    "Durée : 6 heures",
    "Introduction à Google Ads",
    "Types de campagnes : Réseau de recherche, display, vidéo",
    "Ciblage et mots-clés",
    "Création d’une campagne test",
    "Suivi et analyse des résultats",
    "🔹 Module 7 : Analyse de performance et Reporting",
    "Durée : 4 heures",
    "Google Analytics (niveau débutant)",
    "Indicateurs clés (KPI) à suivre",
    "Interprétation des données",
    "Création de rapports simples",
    "🔹 Module 8 : Atelier final - Élaboration d’une stratégie digitale complète",
    "Durée : 8 heures",
    "Étude de cas (choix d’un projet réel ou fictif)",
    "Définition des objectifs marketing",
    "Choix des canaux et élaboration du plan de contenu",
    "Budget prévisionnel et campagne publicitaire simulée",
    "Présentation du projet (pitch)",
    "📝 Méthodologie pédagogique :",
    "Apports théoriques illustrés d'exemples concrets",
    "Travaux pratiques individuels et en groupe",
    "Études de cas locaux (pages tunisiennes, entreprises, etc.)",
    "Accès à des outils numériques (Canva, Meta Ads, Mailchimp, etc.)",
    "Suivi individualisé et accompagnement",
    "🎓 Évaluation et attestation :",
    "Évaluation finale (projet personnel ou en binôme)",
    "Attestation de formation délivrée à la fin de la formation"
  ]
};

const MarketingDigital = () => {
  const [selectedProgram, setSelectedProgram] = useState("Marketing Digital : Fondamentaux et Pratique Professionnelle");
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % marketingImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % marketingImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + marketingImages.length) % marketingImages.length);

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
    "⏱ Durée :",
    "📅 Contenu de la formation",
    "📝 Méthodologie pédagogique :",
    "🎓 Évaluation et attestation :",
    "📚 Intitulé de la formation :",
    "🔹 Module 1 : Introduction au Marketing Digital",
    "🔹 Module 2 : Création de contenu et Branding digital",
    "🔹 Module 3 : Réseaux Sociaux et Community Management",
    "🔹 Module 4 : Référencement et Visibilité Web",
    "🔹 Module 5 : Email Marketing et Outils CRM",
    "🔹 Module 6 : Publicité en ligne (SEA)",
    "🔹 Module 7 : Analyse de performance et Reporting",
    "🔹 Module 8 : Atelier final - Élaboration d’une stratégie digitale complète",
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
          Votre Carrière en Marketing Digital Commence Ici
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ fontSize: '1.25rem', marginTop: '1rem', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', position: 'relative', zIndex: 1 }}
        >
          Apprenez les bases du marketing digital et développez vos compétences pour réussir dans le monde numérique.
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

      {/* Slideshow Section */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#f3f4f6' }}>
        <div style={{ position: 'relative', maxWidth: '450px', margin: '0 auto', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <div style={{ position: 'relative', aspectRatio: '16/9' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={marketingImages[currentSlide]}
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
            {marketingImages.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: currentSlide === idx ? '#4f46e5' : '#d1d5db', cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Programme de Cours Title and Buttons */}
      <section style={{ maxWidth: 900, margin: '2rem auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1e293b' }}>Programme de Cours</h2>
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
          Aucune expérience préalable en marketing n'est requise. Ce cours est idéal pour les débutants, les étudiants, les professionnels en reconversion ou les entrepreneurs souhaitant maîtriser le marketing digital.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ fontSize: '1.1rem', lineHeight: '1.6', position: 'relative', zIndex: 1 }}
        >
          Une connaissance de base de l'utilisation d'un ordinateur et d'internet est recommandée.
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
      <CourseAIAssistant pageType="marketing-digital" isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </div>
  );
};

export default MarketingDigital;
