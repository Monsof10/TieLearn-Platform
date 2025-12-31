import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import './AdminDashboard.scss'; // Reuse styles
import './AdminDashboardAdditional.scss'; // Additional styles
import { API_BASE } from '@/utils/api';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  first_name?: string;
  last_name?: string;
  certification?: string;
  date_enrolled?: string;
}

const AdminSubscribers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    certification: '',
    date_enrolled: ''
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [createdCredentials, setCreatedCredentials] = useState<{username: string, password: string} | null>(null);

  const sidebarItems = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Subscribers', href: '/admin/subscribers' },
    { label: 'Settings', href: '/admin/settings' },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    console.log('handleAddUser called with:', newUser);
    if (newUser.username && newUser.email && newUser.password) {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        console.log('API URL:', `${API_BASE}/users`);
        console.log('Request body:', JSON.stringify(newUser));

        const response = await fetch(`${API_BASE}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newUser),
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (response.ok) {
          const addedUser = await response.json();
          console.log('Added user response:', addedUser);
          setUsers([...users, addedUser.user]);

          // Store credentials for display
          setCreatedCredentials({
            username: newUser.username,
            password: newUser.password
          });

          setNewUser({
            username: '',
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            certification: '',
            date_enrolled: ''
          });
          alert('Étudiant ajouté avec succès!');
        } else {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          alert(`Erreur: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error adding user:', error);
        alert(`Erreur réseau: ${error}`);
      }
    } else {
      alert('Veuillez remplir tous les champs obligatoires: nom d\'utilisateur, email et mot de passe');
    }
  };

  const handleEditUser = (user: User) => {
    setEditingId(user.id);
    setEditingUser(user);
  };

  const handleUpdateUser = async () => {
    if (editingUser) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/users/${editingUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(editingUser),
        });

        if (response.ok) {
          setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
          setEditingId(null);
          setEditingUser(null);
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setUsers(users.filter(u => u.id !== id));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (editingUser) {
      setEditingUser({ ...editingUser, [field]: value });
    } else {
      setNewUser({ ...newUser, [field]: value });
    }
  };

  if (loading) {
    return (
      <DashboardLayout sidebarItems={sidebarItems} userName="Admin User" userEmail="admin@example.com">
        <div>Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} userName="Admin User" userEmail="admin@example.com">
      <motion.h1
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Gestion des Étudiants
      </motion.h1>
      <motion.div
        className="dashboard-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Credentials Display */}
        {createdCredentials && (
          <motion.div
            className="credentials-card"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>🎉 Nouvel Étudiant Créé!</h3>
            <div className="credentials-info">
              <p><strong>Nom d'utilisateur:</strong> {createdCredentials.username}</p>
              <p><strong>Mot de passe:</strong> {createdCredentials.password}</p>
              <p className="credentials-note">
                ⚠️ Note: Veuillez noter ces informations et les transmettre à l'étudiant de manière sécurisée.
                L'étudiant pourra se connecter avec ces identifiants depuis la page de connexion.
              </p>
            </div>
            <button
              className="close-credentials-button"
              onClick={() => setCreatedCredentials(null)}
            >
              J'ai noté les informations
            </button>
          </motion.div>
        )}

        {/* Add New User Form */}
        <motion.div
          className="add-subscriber-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2>Ajouter un Nouvel Étudiant</h2>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Prénom"
              value={newUser.first_name}
              onChange={(e) => handleInputChange('first_name', e.target.value)}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Nom"
              value={newUser.last_name}
              onChange={(e) => handleInputChange('last_name', e.target.value)}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={newUser.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="form-input"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="form-input"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={newUser.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Certification"
              value={newUser.certification}
              onChange={(e) => handleInputChange('certification', e.target.value)}
              className="form-input"
            />
            <input
              type="date"
              placeholder="Date d'inscription"
              value={newUser.date_enrolled}
              onChange={(e) => handleInputChange('date_enrolled', e.target.value)}
              className="form-input"
            />
            <motion.button
              onClick={handleAddUser}
              className="add-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ajouter
            </motion.button>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          className="subscribers-table-container"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <table className="subscribers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Nom d'utilisateur</th>
                <th>Email</th>
                <th>Certification</th>
                <th>Date d'inscription</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className={user.id === editingId ? 'editing' : ''}>
                  {editingId === user.id && editingUser ? (
                    <>
                      <td>{user.id}</td>
                      <td>
                        <input
                          type="text"
                          value={editingUser.first_name || ''}
                          onChange={(e) => handleInputChange('first_name', e.target.value)}
                          className="form-input"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editingUser.last_name || ''}
                          onChange={(e) => handleInputChange('last_name', e.target.value)}
                          className="form-input"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editingUser.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                          className="form-input"
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          value={editingUser.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="form-input"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editingUser.certification || ''}
                          onChange={(e) => handleInputChange('certification', e.target.value)}
                          className="form-input"
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          value={editingUser.date_enrolled || ''}
                          onChange={(e) => handleInputChange('date_enrolled', e.target.value)}
                          className="form-input"
                        />
                      </td>
                      <td>
                        <motion.button
                          onClick={handleUpdateUser}
                          className="update-button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Sauvegarder
                        </motion.button>
                        <motion.button
                          onClick={() => setEditingId(null)}
                          className="cancel-button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Annuler
                        </motion.button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{user.id}</td>
                      <td>{user.first_name || '-'}</td>
                      <td>{user.last_name || '-'}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.certification || '-'}</td>
                      <td>{user.date_enrolled ? new Date(user.date_enrolled).toLocaleDateString() : '-'}</td>
                      <td>
                        <motion.button
                          onClick={() => handleEditUser(user)}
                          className="edit-button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Éditer
                        </motion.button>
                        <motion.button
                          onClick={() => handleDeleteUser(user.id)}
                          className="delete-button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Supprimer
                        </motion.button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AdminSubscribers;
