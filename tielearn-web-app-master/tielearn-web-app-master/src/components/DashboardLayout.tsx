import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import './DashboardLayout.scss';

interface DashboardLayoutProps {
  children: ReactNode;
  sidebarItems: { label: string; href: string }[];
  userName: string;
  userEmail: string;
  userAvatarUrl?: string;
  logoText?: string;
}

const sidebarVariants = {
  hidden: { x: -250 },
  visible: { x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const mainVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, sidebarItems, userName, userEmail, userAvatarUrl, logoText }) => {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <motion.aside
        className="sidebar"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
      >
        <a href="/" className="logo-link">
          <div className="logo">{logoText || 'TieLearn  Admin'}</div>
        </a>
        <nav className="nav">
          <ul className="nav-list">
            {sidebarItems.map((item, idx) => (
              <motion.li
                key={idx}
                className="nav-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <a href={item.href} className="nav-link">
                  {item.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
        <motion.div
          className="user-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {userAvatarUrl ? (
            <img src={userAvatarUrl} alt="User Avatar" className="user-avatar" />
          ) : (
            <div className="user-avatar-placeholder" />
          )}
          <div className="user-details">
            <div className="user-name">{userName}</div>
            <div className="user-email">{userEmail}</div>
          </div>
        </motion.div>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        className="main-content"
        initial="hidden"
        animate="visible"
        variants={mainVariants}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default DashboardLayout;
