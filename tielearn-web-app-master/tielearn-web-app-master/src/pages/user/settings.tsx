import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import DashboardLayout from '@/components/DashboardLayout';
import './UserProfile.scss'; // Reuse styles for now

// profile will be fetched from backend

const sidebarItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Profile', href: '/user/UserProfile' },
  { label: 'My Courses', href: '/user/courses' },
  { label: 'Settings', href: '/user/settings' },
];

const UserSettings: React.FC = () => {
  const { token, user } = useSelector((state: any) => state.auth);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setProfile(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Les nouveaux mots de passe ne correspondent pas');
      return;
    }
    if (newPassword.length < 6) {
      setError('Le nouveau mot de passe doit faire au moins 6 caractères');
      return;
    }
    setError('');
    setSuccess('Mot de passe changé avec succès (simulation)');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const displayName = profile?.username ?? profile?.name ?? user?.username ?? user?.name ?? '';
  const displayEmail = profile?.email ?? user?.email ?? '';

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <DashboardLayout sidebarItems={sidebarItems} userName={displayName} userEmail={displayEmail} logoText="Tie Learn">
      <motion.h1
        className="profile-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Paramètres
      </motion.h1>
      <motion.section
        className="profile-section"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="profile-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p><strong>Nom:</strong> {displayName}</p>
          <p><strong>Email:</strong> {displayEmail}</p>
        </motion.div>

        <motion.h2
          className="settings-header"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          Changer le Mot de Passe
        </motion.h2>
        <motion.form
          onSubmit={handlePasswordChange}
          className="password-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="form-group">
            <label htmlFor="currentPassword">Mot de passe actuel</label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">Nouveau mot de passe</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          {error && (
            <motion.p
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p
              className="success-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {success}
            </motion.p>
          )}
          <motion.button
            type="submit"
            className="settings-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Changer le Mot de Passe
          </motion.button>
        </motion.form>
      </motion.section>
    </DashboardLayout>
  );
};

export default UserSettings;
