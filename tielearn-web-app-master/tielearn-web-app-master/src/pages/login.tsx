import React, { useState } from 'react';
import Link from 'next/link';
import FloatingBubbles from '../components/FloatingBubbles';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // TODO: Add login logic here
    alert('Connexion réussie (simulation)');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", position: 'relative' }}>
      {/* Left Panel */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <FloatingBubbles />
        <div style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          textAlign: 'center',
          letterSpacing: '0.1em',
          userSelect: 'none',
          zIndex: 1,
          position: 'relative',
        }}>
          GET STARTED
        </div>
        <button style={{
          backgroundColor: '#2563eb',
          border: 'none',
          borderRadius: '6px',
          padding: '0.75rem 1.5rem',
          color: 'white',
          fontSize: '1rem',
          marginBottom: '1rem',
          cursor: 'pointer',
          width: '100%',
          maxWidth: 250,
          zIndex: 1,
          position: 'relative',
        }}>
          Sign in with Google+
        </button>
        <button style={{
          backgroundColor: '#2563eb',
          border: 'none',
          borderRadius: '6px',
          padding: '0.75rem 1.5rem',
          color: 'white',
          fontSize: '1rem',
          cursor: 'pointer',
          width: '100%',
          maxWidth: 250,
          zIndex: 1,
          position: 'relative',
        }}>
          Sign in with Facebook
        </button>
      </div>

      {/* Right Panel */}
      <div style={{
        flex: 1,
        backgroundColor: 'white',
        padding: '3rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: 450,
        margin: 'auto',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        borderRadius: '12px',
        position: 'relative',
        zIndex: 2,
      }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '2rem', color: '#1e293b' }}>login</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label htmlFor="username" style={{ color: '#6b7280', fontSize: '0.9rem' }}>Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Type here your name"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ padding: '0.75rem', fontSize: '1rem', border: 'none', borderBottom: '1px solid #cbd5e1' }}
          />
          <label htmlFor="password" style={{ color: '#6b7280', fontSize: '0.9rem' }}>password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Type here your password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ padding: '0.75rem', fontSize: '1rem', border: 'none', borderBottom: '1px solid #cbd5e1' }}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" style={{
            backgroundColor: '#1e40af',
            color: 'white',
            padding: '0.75rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginTop: '1rem',
          }}>
            log in
          </button>
        </form>
        <a href="#" style={{ marginTop: '1rem', color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', textDecoration: 'none' }}>
          Forget your password
        </a>
      </div>
    </div>
  );
};

export default Login;
