import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import DashboardLayout from '@/components/DashboardLayout';
import './UserProfile.scss'; // Reuse styles for now
import { API_BASE } from '@/utils/api';

const sidebarItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Profile', href: '/user/profile' },
  { label: 'My Courses', href: '/user/courses' },
  { label: 'Settings', href: '/user/settings' },
];

const UserCourses: React.FC = () => {
  const { token, user } = useSelector((state: any) => state.auth);
  const [profile, setProfile] = useState<any>(null);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError("Not authenticated");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_BASE}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setProfile(data);
      } catch (err: any) {
        setError(err.message || "Error fetching profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  // Certifications are now handled in the profile fetch

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const displayName = profile?.username ?? user?.username ?? '';
  const displayEmail = profile?.email ?? user?.email ?? '';

  return (
    <DashboardLayout sidebarItems={sidebarItems} userName={displayName} userEmail={displayEmail} logoText="Tie Learn">
      <motion.h1
        className="profile-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Mes Cours
      </motion.h1>
      <motion.section
        className="profile-section"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h2
          className="courses-header"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          Cours Inscrits
        </motion.h2>
        <motion.ul
          className="courses-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {profile?.enrolledCourses && profile.enrolledCourses.length > 0 ? (
            profile.enrolledCourses.map((course: string, idx: number) => (
              <motion.li
                key={idx}
                className="course-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
              >
                {course}
              </motion.li>
            ))
          ) : (
            <motion.li
              className="no-items"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Aucun cours inscrit
            </motion.li>
          )}
        </motion.ul>
        <motion.h2
          className="certifications-header"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          Certifications
        </motion.h2>
        {loading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            Loading certifications...
          </motion.p>
        ) : error ? (
          <motion.p
            className="error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            {error}
          </motion.p>
        ) : (
          <motion.ul
            className="certifications-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            {profile?.certification ? (
              <motion.li
                className="certification-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
              >
                {profile.certification}
              </motion.li>
            ) : (
              <motion.li
                className="no-items"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                No certifications available
              </motion.li>
            )}
          </motion.ul>
        )}
      </motion.section>
    </DashboardLayout>
  );
};

export default UserCourses;
