import React, { useState } from 'react';
import Link from 'next/link';
import FloatingBubbles from '../components/FloatingBubbles';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/features/authSlice';
import { API_BASE } from '../utils/api';
import { useRouter } from 'next/navigation';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    dispatch(loginStart());

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Response text:', text);
        throw new Error(`Expected JSON but got: ${text}`);
      }

      const result = await response.json();

      console.log('Parsed JSON result:', result);

      if (response.ok) {
        dispatch(loginSuccess({ token: result.token, user: result.user }));
        // Redirect based on role
        if (result.user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/user');
        }
      } else {
        dispatch(loginFailure(result.message || 'Login failed'));
        setError(result.message || 'Login failed');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      dispatch(loginFailure(err.message || 'Network error'));
      setError(err.message || 'Network error');
    } finally {
      setIsSubmitting(false);
    }
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
          <button type="submit" disabled={isSubmitting} style={{
            backgroundColor: '#1e40af',
            color: 'white',
            padding: '0.75rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '6px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            marginTop: '1rem',
            opacity: isSubmitting ? 0.7 : 1,
          }}>
            {isSubmitting ? 'Logging in...' : 'log in'}
          </button>
        </form>
        <Link href="/admin">
          <button style={{
            backgroundColor: '#f59e0b',
            color: 'white',
            padding: '0.75rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginTop: '1rem',
            width: '100%',
          }}>
            interface d'admin
          </button>
        </Link>
        <a href="#" style={{ marginTop: '1rem', color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', textDecoration: 'none' }}>
          Forget your password
        </a>
      </div>
    </div>
  );
};

export default Login;
