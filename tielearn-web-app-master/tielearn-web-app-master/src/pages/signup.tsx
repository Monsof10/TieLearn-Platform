import React, { useState } from 'react';
import Link from 'next/link';
import FloatingBubbles from '../components/FloatingBubbles';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    // TODO: Add signup logic here
    alert('Inscription réussie (simulation)');
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
        {/* Social sign-in buttons removed */}
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
        <h1 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '2rem', color: '#1e293b' }}>Sign up</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label htmlFor="email" style={{ color: '#6b7280', fontSize: '0.9rem' }}>Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Type here your email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ padding: '0.75rem', fontSize: '1rem', border: 'none', borderBottom: '1px solid #cbd5e1' }}
          />
          <label htmlFor="password" style={{ color: '#6b7280', fontSize: '0.9rem' }}>Password</label>
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
          <label htmlFor="confirmPassword" style={{ color: '#6b7280', fontSize: '0.9rem' }}>Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
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
            sign up
          </button>
        </form>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Already have an account? <Link href="/login" style={{ color: '#4f46e5' }}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
