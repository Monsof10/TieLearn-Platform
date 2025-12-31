require('dotenv').config();
const User = require('./models/user');
const Certificate = require('./models/certificate');

async function createAdmin() {
  try {
    const adminUser = await User.findByUsername('admin');
    if (adminUser) {
      console.log('Admin user already exists — updating credentials and role');
      await User.updateById(adminUser.id, { password: 'admin123', role: 'admin', email: 'admin@TieLearn.com' });
      console.log('Admin user updated to password `admin123` and role `admin`');
    } else {
      const user = await User.create('admin', 'admin@TieLearn.com', 'admin', 'superuser');
      console.log('Admin user created successfully:', user);
    }

    // create a sample student
    let student = await User.findByUsername('student1');
    if (!student) {
      student = await User.create('student1', 'student1@example.com', 'student123', 'student');
      console.log('Sample student created:', student);
    }

    // create a sample certificate and assign to student
    const cert = await Certificate.create('Intro to TieLearn', 'Sample certificate created by seed script', null);
    await Certificate.assignToUser(cert.id, student.id);
    console.log('Sample certificate created and assigned to student');
  } catch (error) {
    console.error('Error creating admin user or seed data:', error);
  } finally {
    process.exit();
  }
}

createAdmin();
