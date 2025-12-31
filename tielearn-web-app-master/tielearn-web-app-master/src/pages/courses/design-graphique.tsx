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
  "Design Graphique – Initiation et Pratique Professionnelle": [
    "🎯 Objectif général :",
    "Permettre aux participants d’acquérir les compétences fondamentales en design graphique afin de créer des visuels professionnels pour l’impression et le digital à l’aide d’outils standards de la suite Adobe.",
    "⏳ Durée totale : 50 heures",
    "Période : 3 mois",
    "Rythme : 4 à 5 heures / semaine (2 séances par semaine)",
    "Nombre de modules : 5",
    "Niveau requis : Niveau Bac ou équivalent – Maîtrise de base en informatique",
    "📚 Programme par modules :",
    "🔹 Module 1 : Introduction au design graphique (6 heures)",
    "Objectifs :",
    "Comprendre les bases du design et ses métiers",
    "Maîtriser les éléments et principes fondamentaux du design",
    "Contenu :",
    "Historique du design graphique",
    "Principes de base : équilibre, contraste, hiérarchie, répétition, alignement, proximité",
    "Couleurs : cercle chromatique, signification, combinaisons harmonieuses",
    "Typographie : familles, hiérarchie, lisibilité",
    "Formats et résolutions (dpi, pixels, CMJN vs RVB)",
    "Méthodes pédagogiques :",
    "Exposés interactifs + cas pratiques d’analyse de visuels",
    "🔹 Module 2 : Adobe Photoshop – Retouche & Création graphique (14 heures)",
    "Objectifs :",
    "Manipuler des images, réaliser des montages simples et des retouches professionnelles",
    "Contenu :",
    "Interface et outils de base",
    "Détourage, masques, calques, filtres",
    "Correction des couleurs et lumière",
    "Création de visuels pour les réseaux sociaux",
    "Mockup et photomontage simple",
    "TP à réaliser :",
    "Fiche produit, bannière Facebook, retouche de portrait",
    "🔹 Module 3 : Adobe Illustrator – Dessin vectoriel & logos (10 heures)",
    "Objectifs :",
    "Créer des éléments vectoriels, illustrations et logotypes",
    "Contenu :",
    "Interface et outils principaux",
    "Formes vectorielles, plumes, Pathfinder",
    "Tracés et typographie vectorielle",
    "Création de logos et icônes",
    "Dégradés, motifs et symboles",
    "TP à réaliser :",
    "Création d’un logo original pour une marque fictive",
    "🔹 Module 4 : Adobe InDesign – Mise en page et impression (10 heures)",
    "Objectifs :",
    "Concevoir des documents destinés à l’impression ou au digital",
    "Contenu :",
    "Interface et création de gabarits",
    "Gestion des blocs texte/image",
    "Liens, styles, pagination",
    "Préparation à l’impression (PDF, marges, fond perdu)",
    "Mise en page de flyers, brochures, CV",
    "TP à réaliser :",
    "Plaquette commerciale ou dépliant 3 volets",
    "🔹 Module 5 : Projet final et portfolio (10 heures)",
    "Objectifs :",
    "Consolider les acquis par un projet global",
    "Préparer un portfolio professionnel",
    "Contenu :",
    "Cahier des charges d’un projet graphique",
    "Recherche, moodboard et croquis",
    "Réalisation complète (logo, bannière, affiche, brochure)",
    "Présentation orale du projet",
    "Création du portfolio (PDF ou Behance)",
    "🧑‍🏫 Méthodologie :",
    "Formation axée sur la pratique : 70% TP / 30% théorie",
    "Évaluation continue + soutenance finale",
    "Suivi personnalisé avec corrections de projets",
    "✅ Compétences visées :",
    "À l’issue de la formation, le stagiaire sera capable de :",
    "Réaliser des visuels cohérents avec une identité visuelle",
    "Retoucher et préparer des images pour différents supports",
    "Créer un logo et des illustrations vectorielles",
    "Mettre en page des documents pour impression ou digital",
    "Présenter un portfolio professionnel",
    "📄 Livrables à fournir :",
    "Attestation de formation",
    "Portfolio complet",
    "Fiche d’évaluation finale",
  ],
  "Initiation et Perfectionnement en Design 3D": [
    "Durée totale : 50 heures sur 3 mois",
    "Rythme suggéré : 2 séances/semaine de 2h00 à 2h30",
    "Objectif général de la formation :",
    "Acquérir les compétences nécessaires pour modéliser, texturer, éclairer, animer et rendre des objets 3D à usage graphique, industriel ou audiovisuel.",
    "MODULE 1 – Introduction au Design 3D (4 heures)",
    "Objectifs :",
    "Comprendre les bases du design 3D et son champ d’application",
    "Se familiariser avec l’interface du logiciel (Blender recommandé – logiciel libre)",
    "Contenu :",
    "Historique et domaines d’application du 3D",
    "Présentation des logiciels (Blender, 3ds Max, Maya, etc.)",
    "Interface utilisateur, navigation dans l’espace 3D",
    "Configuration du projet",
    "MODULE 2 – Modélisation 3D de base (10 heures)",
    "Objectifs :",
    "Créer des formes simples et les modifier",
    "Maîtriser les techniques de base de la modélisation polygonale",
    "Contenu :",
    "Primitives 3D (cube, sphère, cylindre…)",
    "Outils de transformation (déplacement, rotation, échelle)",
    "Mode Edit : extrusion, loop cut, bevel",
    "Création d’objets complexes par combinaison",
    "Atelier :",
    "Modélisation d’un objet simple (tasse, chaise, etc.)",
    "MODULE 3 – Modélisation avancée et organisation de la scène (8 heures)",
    "Objectifs :",
    "Structurer une scène complexe",
    "Appliquer des techniques de modélisation avancées",
    "Contenu :",
    "Modélisation par subdivision",
    "Utilisation de modificateurs (mirror, array, boolean)",
    "Groupes, collections, hiérarchisation",
    "Gestion des vues et calques",
    "Atelier :",
    "Modélisation d’une pièce complète (meuble, environnement simple)",
    "MODULE 4 – Textures, matériaux et UV Mapping (8 heures)",
    "Objectifs :",
    "Appliquer des matériaux réalistes aux objets 3D",
    "Déplier correctement les UVs",
    "Contenu :",
    "Introduction aux shaders et matériaux (PBR)",
    "Utilisation du Shader Editor",
    "UV Unwrapping de base",
    "Importation et application de textures",
    "Atelier :",
    "Création de matériaux réalistes (bois, métal, verre)",
    "MODULE 5 – Éclairage et rendu (6 heures)",
    "Objectifs :",
    "Créer une ambiance avec les lumières",
    "Réaliser un rendu final d’une scène 3D",
    "Contenu :",
    "Types d’éclairage (point, sun, area, HDRI)",
    "Paramétrage des caméras",
    "Moteurs de rendu (Cycles, Eevee)",
    "Réglage des paramètres de rendu (résolution, échantillonnage)",
    "Atelier :",
    "Rendu photo-réaliste d’un objet modélisé",
    "MODULE 6 – Introduction à l’animation 3D (6 heures)",
    "Objectifs :",
    "Comprendre les principes de base de l’animation",
    "Animer un objet ou une caméra",
    "Contenu :",
    "Timeline, keyframes, interpolation",
    "Animation de position, rotation, échelle",
    "Animation de caméra (flythrough)",
    "Courbes d’animation (Graph Editor)",
    "Atelier :",
    "Animation simple d’un objet (bouncing ball, ouverture de porte)",
    "MODULE 7 – Exportation, présentation et insertion dans un pipeline (4 heures)",
    "Objectifs :",
    "Exporter correctement les projets",
    "Présenter son travail dans un portfolio",
    "Contenu :",
    "Formats d’exportation (FBX, OBJ, GLTF…)",
    "Export pour l’impression 3D ou les moteurs de jeu (Unity/Unreal)",
    "Création de rendus fixes ou vidéos",
    "Présentation dans un mini-portfolio",
    "Évaluation finale (4 heures)",
    "Objectifs :",
    "Évaluer les compétences acquises",
    "Présenter un projet personnel",
    "Contenu :",
    "Réalisation d’un projet complet de design 3D (objet, scène ou animation)",
    "Présentation orale et visuelle",
    "Évaluation par un formateur et un jury (selon les normes tunisiennes)",
    "Pré-requis :",
    "Connaissance de base en informatique",
    "Aucune compétence en dessin requise",
    "Méthodes pédagogiques :",
    "Formation pratique basée sur des projets",
    "Exercices progressifs",
    "Évaluations formatives par module",
    "Suivi individualisé"
  ]
};

const DesignGraphique = () => {
  const [selectedProgram, setSelectedProgram] = useState("Design Graphique – Initiation et Pratique Professionnelle");

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
          Votre Carrière en Design Graphique Commence Ici
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ fontSize: '1.25rem', marginTop: '1rem', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', position: 'relative', zIndex: 1 }}
        >
          Du design au codage, apprenez les bases et devenez expert dans les domaines du design.
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
          Aucune expérience préalable n'est requise. Ce cours est conçu pour les débutants souhaitant apprendre les bases du design graphique.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ fontSize: '1.1rem', lineHeight: '1.6', position: 'relative', zIndex: 1 }}
        >
          Il est recommandé d'avoir une bonne maîtrise des outils informatiques de base et une sensibilité artistique.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ fontSize: '1.1rem', lineHeight: '1.6', position: 'relative', zIndex: 1 }}
        >
          La motivation et la créativité sont des atouts importants pour réussir dans ce domaine.
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

export default DesignGraphique;
