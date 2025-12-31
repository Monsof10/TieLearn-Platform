import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import './UserProfile.scss';
import { API_BASE, authHeader } from '@/utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { setUser as setReduxUser } from '@/redux/features/authSlice';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  first_name?: string;
  last_name?: string;
  certification?: string;
  date_enrolled?: string;
  created_at?: string;
}

const sidebarItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Profile', href: '/user/UserProfile' },
  { label: 'My Courses', href: '/user/courses' },
  { label: 'Settings', href: '/user/settings' },
];

const UserProfile: React.FC = () => {
  const { user: reduxUser, token } = useSelector((state: any) => state.auth || {});
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If we have a redux user but it's missing details (like email), fetch the full profile.
    if (reduxUser) {
      const hasEmail = (reduxUser as any).email;
      if (hasEmail) {
        setUser(reduxUser);
        setLoading(false);
      } else {
        fetchUserProfile();
      }
    } else {
      fetchUserProfile();
    }
    // only run on mount or when reduxUser/token change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxUser, token]);

  const dispatch = useDispatch();

  const fetchUserProfile = async () => {
    try {
      const t = token ?? localStorage.getItem('token');
      const authHeaders = authHeader(t);
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(authHeaders.Authorization && { Authorization: authHeaders.Authorization })
      };
      const response = await fetch(`${API_BASE}/auth/profile`, {
        headers
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        // update redux store and localStorage so other pages see full profile
        try {
          dispatch(setReduxUser(userData as any));
          if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(userData));
          }
        } catch (e) {
          // ignore
        }
      } else {
        setError('Failed to load profile data');
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError('Network error while loading profile');
      } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout sidebarItems={sidebarItems} userName="Loading..." userEmail="loading@example.com" logoText="Tie Learn">
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading profile...</div>
      </DashboardLayout>
    );
  }

  if (error || !user) {
    return (
      <DashboardLayout sidebarItems={sidebarItems} userName="Error" userEmail="error@example.com" logoText="Tie Learn">
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
          {error || 'User data not found'}
        </div>
      </DashboardLayout>
    );
  }

  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username;

  return (
    <DashboardLayout sidebarItems={sidebarItems} userName={fullName} userEmail={user.email} logoText="Tie Learn">
      <motion.h1
        className="profile-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Profil Utilisateur
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
          <p><strong>Nom d'utilisateur:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {user.first_name && <p><strong>Prénom:</strong> {user.first_name}</p>}
          {user.last_name && <p><strong>Nom:</strong> {user.last_name}</p>}
          <p><strong>Rôle:</strong> {user.role}</p>
          {user.date_enrolled && <p><strong>Date d'inscription:</strong> {new Date(user.date_enrolled).toLocaleDateString('fr-FR')}</p>}
          {user.created_at && <p><strong>Date de création:</strong> {new Date(user.created_at).toLocaleDateString('fr-FR')}</p>}
        </motion.div>

        {user.certification && (
          <>
            <motion.h2
              className="certificates-header"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              Certification
            </motion.h2>
            <motion.div
              className="certificates-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="certificate-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                {user.certification}
              </motion.div>
            </motion.div>
          </>
        )}

        <motion.h2
          className="plan-header"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
        >
          Informations du Compte
        </motion.h2>
        <motion.div
          className="plan-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p><strong>Statut:</strong> Actif</p>
          <p><strong>ID Utilisateur:</strong> {user.id}</p>
        </motion.div>
      </motion.section>
    </DashboardLayout>
  );
};

export default UserProfile;
