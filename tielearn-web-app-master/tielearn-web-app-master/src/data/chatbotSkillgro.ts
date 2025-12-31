interface CareerPath {
  title: string;
  description: string;
  recommendedTracks: string[];
}

interface QA {
  [category: string]: { [question: string]: string };
}

interface ChatbotData {
  qa: QA;
  careerPaths: { [key: string]: CareerPath };
}

const chatbotData: ChatbotData = {
  qa: {
    general: {
      "🔰 What is TieLearn ?": "TieLearn  is an online learning platform offering courses in web development, design, marketing, and more to help you advance your career.",
      "🎓 How do I start learning?": "Browse our courses on the /courses page, choose one that interests you, and enroll to begin your learning journey.",
      "🧭 How to navigate the platform?": "Use the menu to access courses, blog, events, and contact. The search bar helps find specific content.",
      "🧪 What courses are available?": "We offer courses in Development, Design, Marketing, Business, Data Science, and more. Check /courses for the full list.",
      "🛠️ How to enroll in a course?": "Go to the course page, click 'Enroll Now', and follow the payment process if required.",
      "🛡️ Is the platform secure?": "Yes, we use secure payment gateways and protect your data with industry-standard encryption.",
      "👩‍💻 Who are the instructors?": "Our instructors are experts in their fields with years of experience. Check instructor profiles on course pages.",
      "🧠 Can I get a certificate?": "Yes, upon completing a course, you'll receive a certificate of completion.",
      "🧾 What is the refund policy?": "Refunds are available within 30 days of purchase if you're not satisfied. Contact support for details.",
      "📊 How to track my progress?": "Log in to your dashboard to view enrolled courses, progress, and certificates.",
      "🤝 How to contact support?": "Use the /contact page or email support@TieLearn .com for assistance."
    },
    courses: {
      "🎓 What is the duration of courses?": "Courses vary from a few hours to several weeks, depending on the topic and depth.",
      "🧭 Are courses self-paced?": "Most courses are self-paced, allowing you to learn at your own speed.",
      "🧪 Do courses include projects?": "Yes, many courses include practical projects to apply what you've learned.",
      "🛠️ What skills will I gain?": "Courses teach practical skills like coding, design tools, marketing strategies, etc.",
      "🛡️ Are there prerequisites?": "Some advanced courses have prerequisites; check the course description.",
      "👩‍💻 Can I access courses on mobile?": "Yes, our platform is mobile-friendly for learning on the go.",
      "🧠 What if I have questions during a course?": "Use the course discussion forums or contact the instructor.",
      "🧾 How much do courses cost?": "Prices range from free to paid, depending on the course. Check individual course pages.",
      "📊 Can I preview courses?": "Some courses offer free previews or trial lessons.",
      "🤝 Are there group discounts?": "Contact us for corporate or group pricing options."
    },
    enrollment: {
      "🔰 How to create an account?": "Click 'Sign Up' and fill in your details to create a free account.",
      "🎓 What payment methods are accepted?": "We accept credit cards, PayPal, and other secure payment options.",
      "🧭 Can I enroll in multiple courses?": "Yes, enroll in as many courses as you like.",
      "🧪 Is there a free trial?": "Some courses offer free trials; check the course page.",
      "🛠️ How to cancel enrollment?": "Go to your dashboard and click 'Unenroll' for any course.",
      "🛡️ What if I forget my password?": "Use the 'Forgot Password' link on the login page.",
      "👩‍💻 Can I share my account?": "No, accounts are personal. Sharing violates our terms.",
      "🧠 How to update my profile?": "Go to your dashboard settings to update personal information.",
      "🧾 Are there subscription plans?": "We offer monthly or annual subscriptions for unlimited access.",
      "📊 How to download certificates?": "Certificates are available in your dashboard after course completion.",
      "🤝 How to get invoice?": "Invoices are emailed after purchase; contact support if needed."
    },
    support: {
      "🔰 How to report a problem?": "Use the /contact page or email support@TieLearn .com with details.",
      "🎓 What if a course doesn't load?": "Try refreshing the page or clearing your browser cache.",
      "🧭 How to update my browser?": "Visit your browser's official site for the latest version.",
      "🧪 Can I get technical support?": "Yes, our support team helps with technical issues.",
      "🛠️ What browsers are supported?": "Chrome, Firefox, Safari, and Edge are fully supported.",
      "🛡️ Is my data safe?": "We comply with data protection regulations and secure your information.",
      "👩‍💻 How to delete my account?": "Contact support to request account deletion.",
      "🧠 What if I have feedback?": "We welcome feedback! Use the /contact page to share.",
      "🧾 How to report inappropriate content?": "Email support@TieLearn .com with details for review.",
      "📊 Are there live sessions?": "Some courses include live Q&A sessions; check course schedules.",
      "🤝 How to become an instructor?": "Apply through our instructor application on the /contact page."
    }
  },
  careerPaths: {
    web_developer: {
      title: "Web Developer",
      description: "Build websites and web applications using modern technologies.",
      recommendedTracks: ["Web Development Fundamentals", "JavaScript Programming", "Frontend Design"]
    },
    graphic_designer: {
      title: "Graphic Designer",
      description: "Create visual content for digital and print media.",
      recommendedTracks: ["Graphic Design Basics", "Advanced Design Techniques", "Digital Marketing"]
    },
    digital_marketer: {
      title: "Digital Marketer",
      description: "Promote products and services online using various strategies.",
      recommendedTracks: ["Digital Marketing Introduction", "Social Media Marketing", "SEO Fundamentals"]
    },
    data_analyst: {
      title: "Data Analyst",
      description: "Analyze data to help businesses make informed decisions.",
      recommendedTracks: ["Data Analysis & Visualization", "Statistics Fundamentals", "Business Intelligence"]
    },
    business_analyst: {
      title: "Business Analyst",
      description: "Bridge the gap between IT and business needs.",
      recommendedTracks: ["Financial Analysis", "Project Management", "Data Science Basics"]
    },
    ux_ui_designer: {
      title: "UX/UI Designer",
      description: "Design user-friendly interfaces and experiences.",
      recommendedTracks: ["UI/UX Design Principles", "Prototyping Tools", "User Research"]
    }
  }
};

export default chatbotData;
