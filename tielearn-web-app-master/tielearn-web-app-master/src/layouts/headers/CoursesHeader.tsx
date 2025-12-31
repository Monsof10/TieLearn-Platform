"use client";
import React from 'react';
import Link from 'next/link';

const iconEmail = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="16" height="16" style={{ marginRight: 6 }}>
    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.01L12 13 4 6.01V6h16Zm0 12H4v-9l8 7 8-7v9Z" />
  </svg>
);

const iconLocation = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="16" height="16" style={{ marginRight: 6 }}>
    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
  </svg>
);

const iconPhone = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="16" height="16" style={{ marginRight: 6 }}>
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.21 11.36 11.36 0 0 0 3.55.57 1 1 0 0 1 1 1v3.61a1 1 0 0 1-1 1A16 16 0 0 1 4 6a1 1 0 0 1 1-1h3.61a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.55 1 1 0 0 1-.21 1.11Z" />
  </svg>
);

const iconLinkedin = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="16" height="16" style={{ marginLeft: 8 }}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm.02 4.5H2v14h3v-14Zm7 0h-3v14h3v-7.5a2.5 2.5 0 0 1 5 0V17h3v-7.5a5.5 5.5 0 0 0-11 0V17h3v-7.5Z" />
  </svg>
);

const iconFacebook = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="16" height="16" style={{ marginLeft: 8 }}>
    <path d="M22 12a10 10 0 1 0-11.5 9.87v-7h-2v-3h2v-2c0-2 1-3 3-3h2v3h-1c-1 0-1 1-1 2v2h3l-1 3h-2v7A10 10 0 0 0 22 12Z" />
  </svg>
);

const iconInstagram = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="16" height="16" style={{ marginLeft: 8 }}>
    <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7Zm10 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-5 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6.5 3 3 0 0 0 0-6.5Z" />
  </svg>
);

const CoursesHeader = () => {
  return (
    <>
      <div style={{
        backgroundColor: '#1e1e4f',
        color: 'white',
        fontSize: '0.875rem',
        padding: '0.25rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: "'Poppins', sans-serif",
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {iconLocation}
            <span>Rue Marbella, 8000, Nabeul, Tunisie</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {iconEmail}
            <a href="mailto:contact@tielearndigital.com" style={{ color: 'white', textDecoration: 'none' }}>contact@tielearndigital.com</a>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {iconPhone}
            <span>Appelez: <strong>+216 51 001 673</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>Suivez-nous sur :</span>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">{iconLinkedin}</a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">{iconFacebook}</a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">{iconInstagram}</a>
          </div>
        </div>
      </div>
      <header style={{
        backgroundColor: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        fontFamily: "'Poppins', sans-serif",
      }}>
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 1200,
          margin: '0 auto',
        }}>
          <div style={{ fontWeight: '900', fontSize: '1.75rem', color: '#4f46e5', letterSpacing: '0.05em' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#4f46e5' }}>TieLearn</Link>
          </div>
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            gap: '2rem',
            margin: 0,
            padding: 0,
            fontWeight: '600',
            fontSize: '1rem',
            color: 'black',
          }}>
            <li>
              <Link href="/" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 0', borderBottom: '2px solid transparent', transition: 'border-color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#facc15')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/catalogue" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 0', borderBottom: '2px solid transparent', transition: 'border-color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#facc15')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
              >
                Catalogue
              </Link>
            </li>
            <li>
              <Link href="/about-us" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 0', borderBottom: '2px solid transparent', transition: 'border-color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#facc15')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
              >
                À Propos
              </Link>
            </li>
            <li>
              <Link href="/contact" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 0', borderBottom: '2px solid transparent', transition: 'border-color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#facc15')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
              >
                Contact
              </Link>
            </li>
          </ul>
          <div>
            <Link href="/signup" style={{
              backgroundColor: '#facc15',
              color: '#1e293b',
              padding: '0.5rem 1.25rem',
              borderRadius: '9999px',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 4px 10px rgba(250, 204, 21, 0.6)',
              transition: 'background-color 0.3s',
            }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#eab308')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#facc15')}
            >
              S’inscrire
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default CoursesHeader;
