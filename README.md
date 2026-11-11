# TieLearn - Online Learning Platform

![TieLearn Logo](https://img.shields.io/badge/TieLearn-Learning%20Platform-blue?style=for-the-badge&logo=next.js)
![Next.js](https://img.shields.io/badge/Next.js-14.2.3-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-8.11.0-blue?style=flat-square&logo=postgresql)

A comprehensive full-stack online learning platform built with Next.js, TypeScript, and Node.js, featuring AI-powered chatbots, course management, user authentication, and interactive learning experiences.

## 🌟 Features

### Frontend Features
- **Modern UI/UX**: Responsive design with Bootstrap 5 and custom SCSS
- **AI-Powered Chatbot**: Integrated chatbot with OpenAI GPT for course recommendations and support
- **Interactive Animations**: Smooth animations using Framer Motion, GSAP, and AOS
- **Video Learning**: Custom video player with Plyr for course content
- **User Dashboard**: Comprehensive dashboard for students and instructors
- **Course Management**: Browse, enroll, and track progress in courses
- **Authentication**: Secure login/signup with JWT tokens
- **Admin Panel**: Administrative features for managing users and content

### Backend Features
- **RESTful API**: Express.js API with PostgreSQL database
- **User Authentication**: JWT-based authentication with role-based access control
- **Certificate Management**: Generate and manage course certificates
- **User Management**: Admin capabilities for user administration
- **Secure**: Password hashing with bcrypt and CORS protection

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14.2.3 with App Router
- **Language**: TypeScript
- **Styling**: SCSS/Sass, Bootstrap 5.3.3
- **State Management**: Redux Toolkit
- **Animations**: Framer Motion, GSAP, AOS, Vivus
- **Forms**: React Hook Form with Yup validation
- **UI Components**: Swiper, React Select, React Paginate
- **AI Integration**: OpenAI API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.18.2
- **Database**: PostgreSQL 8.11.0
- **Authentication**: JWT, bcryptjs
- **CORS**: Enabled for frontend communication

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 8.11+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/tielearn-web-app.git
   cd tielearn-web-app
   ```

2. **Backend Setup**
   ```bash
   cd BACKEND
   npm install
   ```

   Create a `.env` file in the BACKEND directory:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/tielearn_db
   JWT_SECRET=your_jwt_secret_key
   ```

   Set up the database:
   ```bash
   node setup.js
   node create-admin.js
   ```

   Start the backend server:
   ```bash
   npm run dev  # Development mode
   # or
   npm start    # Production mode
   ```

3. **Frontend Setup**
   ```bash
   cd ../tielearn-web-app-master  # Go back to frontend directory
   npm install
   ```

   Create a `.env.local` file in the frontend directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   OPENAI_API_KEY=your_openai_api_key
   ```

   Start the frontend development server:
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
tielearn-web-app-master/
├── BACKEND/                    # Node.js/Express API
│   ├── middleware/            # Authentication middleware
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── db.js                 # Database configuration
│   ├── server.js            # Main server file
│   └── package.json
├── src/                      # Next.js Frontend
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── [...not-found]/ # 404 handling
│   ├── components/         # Reusable components
│   │   ├── homes/         # Homepage sections
│   │   ├── courses/       # Course components
│   │   └── Ai/            # AI chatbot components
│   ├── layouts/           # Layout components
│   ├── pages/             # Additional pages
│   ├── redux/             # State management
│   ├── data/              # Static data
│   ├── forms/             # Form components
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Utility functions
│   └── styles/            # Global styles
├── public/                # Static assets
│   ├── assets/           # CSS, images, fonts
│   └── ...
└── package.json
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Users
- `GET /api/users` - Get all users (admin only)
- `POST /api/users` - Create user (admin only)

### Certificates
- `GET /api/certificates` - Get user certificates
- `POST /api/certificates` - Generate certificate

## 🤖 AI Features

- **Smart Chatbot**: Provides course recommendations and career guidance
- **OpenAI Integration**: Uses GPT for dynamic responses
- **Local AI Utils**: Custom utilities for AI processing

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Bootstrap
- **Dark/Light Themes**: Theme switching capability
- **Animations**: Smooth transitions and micro-interactions
- **Accessibility**: WCAG compliant components
- **Custom Cursor**: Interactive cursor effects

## 🔐 Security

- JWT token-based authentication
- Password hashing with bcrypt
- CORS protection
- Role-based access control (Student, Instructor, Admin)
- Input validation and sanitization

## 🚀 Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Backend (Heroku/Railway)
1. Set up your database on a cloud provider
2. Configure environment variables
3. Deploy using your preferred platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email zouaouimednacef46@gmail.com or join our Discord community.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- OpenAI for AI capabilities
- Bootstrap for the UI framework
- All contributors and supporters

---

**Made with ❤️ for learners worldwide**
