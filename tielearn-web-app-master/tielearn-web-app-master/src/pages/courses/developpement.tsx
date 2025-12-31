
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FloatingBubbles from '../../components/FloatingBubbles';
import CoursesHeader from '../../layouts/headers/CoursesHeader';

const CheckIcon = () => (
  <svg width="20" height="20" fill="#4f46e5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '0.5rem' }}>
    <path d="M20.285 6.709l-11.39 11.39-5.18-5.18 1.414-1.414 3.766 3.766 9.976-9.976z" />
  </svg>
);

const programmes = {
  "Développement – Initiation et Pratique Professionnelle": [
    "Programme content will be provided."
  ]
};

const Developpement = () => {
  const [selectedProgram, setSelectedProgram] = useState("Développement – Initiation et Pratique Professionnelle");

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
      <CoursesHeader />
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
          Contactez-Nous
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
          &copy; {new Date().getFullYear()} TieLearn. Tous droits réservés.
        </motion.p>
      </footer>
    </div>
  );
};

export default Developpement;
