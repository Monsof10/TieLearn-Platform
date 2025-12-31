import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardBannerTwo from "@/dashboard/dashboard-common/DashboardBannerTwo"
import DashboardSidebarTwo from "@/dashboard/dashboard-common/DashboardSidebarTwo"
import InstructorEnrolledCourseContent from "@/dashboard/instructor-dashboard/instructor-enrolled-courses/InstructorEnrolledCourseContent"
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
  created_at?: string;
}

const StudentEnrolledCoursesArea = () => {
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      fetchUserProfile();
   }, []);

   const fetchUserProfile = async () => {
      try {
         const token = localStorage.getItem('token');
         const response = await fetch(`${API_BASE}/users/profile/me`, {
            headers: {
               'Authorization': `Bearer ${token}`
            }
         });

         if (response.ok) {
            const userData = await response.json();
            setUser(userData);
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

   return (
      <section className="dashboard__area section-pb-120">
         <div className="container">
            <DashboardBannerTwo />
            <div className="row">
               <DashboardSidebarTwo />
               <div className="col-lg-9">
                  <div className="dashboard__content-wrap dashboard__content-wrap-two">
                     {/* Student Certification Section */}
                     {user?.certification && (
                        <motion.div
                           className="student-certification-section mb-40"
                           initial={{ opacity: 0, y: -20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.5 }}
                        >
                           <div className="certification-card" style={{
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              borderRadius: '12px',
                              padding: '2rem',
                              color: 'white',
                              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                              marginBottom: '2rem'
                           }}>
                              <div className="certification-header mb-3">
                                 <h3 className="certification-title" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
                                    🏆 Ma Certification
                                 </h3>
                              </div>
                              <div className="certification-content">
                                 <p style={{ fontSize: '1.1rem', margin: '0.5rem 0', fontWeight: '500' }}>
                                    {user.certification}
                                 </p>
                                 {user.date_enrolled && (
                                    <p style={{ fontSize: '0.9rem', margin: '0.5rem 0', opacity: 0.9 }}>
                                       📅 Date d'inscription: {new Date(user.date_enrolled).toLocaleDateString('fr-FR')}
                                    </p>
                                 )}
                                 <div className="certification-badge" style={{
                                    display: 'inline-block',
                                    background: 'rgba(255,255,255,0.2)',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold',
                                    marginTop: '1rem'
                                 }}>
                                    ✅ Certifié
                                 </div>
                              </div>
                           </div>
                        </motion.div>
                     )}

                     {/* Loading and Error States */}
                     {loading && (
                        <div className="text-center mb-40">
                           <p>Loading certification data...</p>
                        </div>
                     )}

                     {error && (
                        <div className="text-center mb-40">
                           <p className="text-danger">{error}</p>
                        </div>
                     )}

                     {/* Course Content */}
                     <InstructorEnrolledCourseContent />
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default StudentEnrolledCoursesArea
