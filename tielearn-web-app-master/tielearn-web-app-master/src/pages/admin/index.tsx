import React, { useState } from 'react';
import Login from './Login';
import AdminDashboard from './AdminDashboard';

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <AdminDashboard />
      ) : (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </>
  );
};

export default AdminPage;
