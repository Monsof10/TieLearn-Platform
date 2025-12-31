import re
from difflib import SequenceMatcher

def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()

# Complete Q&A database from chatbot.js
chatbot_data = {
    "gettingStarted": {
        "How do I sign up for a course": "To sign up for a course: 1. Click the 'Login/Register' button 2. Create an account or log in 3. Browse courses 4. Click 'Enroll' on your chosen course. You'll get immediate access to start learning!",
        "What is the first course I should take as a beginner": "For beginners, we recommend starting with our 'SQL Injection' track. It provides fundamental cybersecurity concepts and hands-on practice. This course will give you a solid foundation before moving to more advanced topics.",
        "Can you recommend courses based on my interests": "Yes! Tell me what interests you: Offensive Security, Defensive Security, or Forensics? Each path has specialized courses tailored to your career goals.",
        "How do I reset my password": "To reset your password: 1. Click 'Forgot Password' on the login page 2. Enter your email 3. Check your email for reset instructions 4. Create a new password.",
        "How do I update my profile or change my email": "Go to your Profile settings (click your avatar in the top right), where you can update your personal information, email, and notification preferences."
    },
    "courseNavigation": {
        "How do I access my enrolled courses": "Access your enrolled courses through your Dashboard. Click your profile icon and select 'My Courses' to see all your active enrollments.",
        "Where can I find course materials and lectures": "Course materials are available in each course's main page. You'll find video lectures, reading materials, and hands-on labs organized by modules.",
        "How do I download lecture slides or PDFs": "Look for the download icon next to each lecture. Course materials marked with a download symbol can be saved for offline access.",
        "Can I take notes inside the platform": "Yes! Each lecture has a built-in notes feature. Click the 'Notes' tab to take and save notes while watching lectures.",
        "How do I mark a lesson as complete": "Click the 'Mark as Complete' button at the bottom of each lesson. Your progress is automatically saved and tracked."
    },
    "courseRecommendations": {
        "What are the top rated courses": "Our highest-rated courses include: 1. SQL Injection Mastery 2. Network Security Fundamentals 3. Ethical Hacking Essentials 4. Digital Forensics Basics",
        "Which cybersecurity courses are best for beginners": "For beginners, we recommend: 1. Introduction to Cybersecurity 2. Basic Network Security 3. Fundamentals of SQL Injection 4. Web Security Basics",
        "Are there any advanced AI in cybersecurity courses": "Yes! Check out our advanced courses: 1. AI for Threat Detection 2. Machine Learning in Security 3. Automated Security Testing",
        "What certification courses are available": "We offer preparation courses for: CompTIA Security+, CEH (Certified Ethical Hacker), CISSP, and our own platform certifications.",
        "Can you recommend a learning path for ethical hacking": "Our recommended ethical hacking path: 1. Network Basics 2. SQL Injection 3. Web Security 4. Advanced Penetration Testing"
    },
    "technicalSupport": {
        "The video won't play what can I do": "Try these steps: 1. Refresh the page 2. Clear browser cache 3. Try a different browser 4. Check your internet connection 5. Contact support if issues persist",
        "I'm getting an error message": "Please provide the error message or screenshot. Common fixes include clearing cache, updating browser, or checking system requirements.",
        "How do I report a bug in a course": "Use the 'Report Issue' button in the course interface or contact support with details about the bug and steps to reproduce it.",
        "My progress isn't being saved": "First, check your internet connection. Then clear browser cache and cookies. If the issue persists, contact our technical support."
    },
    "cybersecurityTopics": {
        "What is a firewall and how does it work": "A firewall is a security system that monitors and controls network traffic based on predetermined rules. It acts as a barrier between trusted and untrusted networks.",
        "What are common types of cyber attacks": "Common attacks include: 1. Phishing 2. Malware 3. SQL Injection 4. DDoS 5. Man-in-the-Middle 6. Password Attacks",
        "Can you explain how phishing attacks work": "Phishing attacks trick users into revealing sensitive information by posing as legitimate entities. They often use fake emails, websites, or messages.",
        "What is the difference between IDS and IPS": "IDS (Intrusion Detection System) monitors and alerts about suspicious activity. IPS (Intrusion Prevention System) actively blocks or prevents detected threats.",
        "How do I secure my home Wi-Fi network": "1. Use WPA3 encryption 2. Create a strong password 3. Change default SSID 4. Enable firewall 5. Keep router firmware updated"
    },
    "labsAndSimulations": {
        "How do I start a penetration testing lab": "1. Set up a virtual environment 2. Install required tools 3. Configure target systems 4. Follow lab setup guides 5. Start with basic scenarios",
        "Can you guide me through a CTF challenge": "Select a challenge from our CTF platform. Each challenge includes hints and step-by-step guidance if needed.",
        "How do I simulate a DDoS attack safely": "Use our controlled lab environment for DDoS simulations. Never perform attacks outside of authorized testing environments.",
        "Where can I practice Linux terminal commands": "Access our built-in terminal simulator or use the virtual lab environment for hands-on Linux practice.",
        "How do I use tools like Wireshark or Nmap": "Our practical labs include guided tutorials for security tools. Start with basic usage and progress to advanced features."
    }
}

def find_best_match(question):
    question = question.lower()
    best_match = None
    highest_score = 0
    
    # Remove common words that might interfere with matching
    stop_words = {'what', 'how', 'why', 'when', 'where', 'who', 'which', 'is', 'are', 'do', 'does', 'can', 'could', 'would', 'should', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'}
    question_words = set(re.findall(r'\w+', question)) - stop_words

    for category in chatbot_data:
        for q, a in chatbot_data[category].items():
            q_lower = q.lower()
            q_words = set(re.findall(r'\w+', q_lower)) - stop_words
            
            # Calculate word overlap score
            word_overlap = len(question_words.intersection(q_words))
            
            # Calculate sequence similarity
            sequence_similarity = similar(question, q_lower)
            
            # Combined score (weight both factors)
            score = (word_overlap * 0.6) + (sequence_similarity * 0.4)
            
            if score > highest_score:
                highest_score = score
                best_match = a

    # Threshold for minimum match quality
    if highest_score > 0.2:
        return best_match
    else:
        suggestions = []
        for category in chatbot_data:
            suggestions.extend(list(chatbot_data[category].keys())[:2])
        return f"I'm not quite sure about that. Try asking one of these questions:\n" + "\n".join(f"- {q}" for q in suggestions[:5])

def main():
    print("Welcome to the Cybersecurity Learning Assistant!")
    print("Ask me anything about our courses, cybersecurity topics, or technical support.")
    print("Type 'quit' to exit.")
    
    while True:
        try:
            user_input = input("\nYou: ").strip()
            if user_input.lower() in ['quit', 'exit', 'bye']:
                print("Goodbye! Happy learning!")
                break
            if not user_input:
                print("Please type your question.")
                continue
                
            response = find_best_match(user_input)
            print("\nAssistant:", response)
            
        except KeyboardInterrupt:
            print("\nGoodbye! Happy learning!")
            break
        except Exception as e:
            print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()
