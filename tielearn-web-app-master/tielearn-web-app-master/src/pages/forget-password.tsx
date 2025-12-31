import React, { useState } from 'react';
import Link from 'next/link';
import FloatingBubbles from '../components/FloatingBubbles';
import { motion } from 'framer-motion';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add reset password logic here
    setSubmitted(true);
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
            textAlign: 'center',
            letterSpacing: '0.1em',
            userSelect: 'none',
            zIndex: 1,
            position: 'relative',
          }}
        >
          RESET PASSWORD
        </motion.div>
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
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '2rem', color: '#1e293b' }}
        >
          Forget Password
        </motion.h1>
        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label htmlFor="email" style={{ color: '#6b7280', fontSize: '0.9rem' }}>Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Type here your email"
              value={email}
              onChange={handleChange}
              required
              style={{ padding: '0.75rem', fontSize: '1rem', border: 'none', borderBottom: '1px solid #cbd5e1' }}
            />
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
              Reset Password
            </button>
          </form>
        ) : (
          <p style={{ color: '#1e293b', fontSize: '1rem' }}>
            If an account with that email exists, a password reset link has been sent.
          </p>
        )}
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Remember your password? <Link href="/login" style={{ color: '#4f46e5' }}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
