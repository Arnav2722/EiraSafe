# EiraSafe - Emotional Safety Net for Domestic Violence Survivors

EiraSafe is a compassionate web application designed to provide emotional support, safety planning tools, and resources for survivors of domestic violence. Built with privacy and safety as top priorities, this application offers a secure space for healing and empowerment.

## 🌟 Features

### Core Functionality

- **Private Journaling**: AI-guided therapeutic prompts with supportive responses
- **Safety Planning**: Personalized safety plans for different scenarios
- **Mood Tracking**: Monitor emotional wellbeing with daily check-ins
- **Resource Directory**: Access to helplines, shelters, legal aid, and support services
- **Emergency Features**: Quick exit and disguise modes for safety

### Safety & Privacy Features

- **Panic Button**: Instantly redirect to neutral websites when in danger
- **Disguise Modes**: Transform app to appear as weather or notes app
- **Local Storage**: All data stored securely on user's device
- **No Server Dependencies**: Complete privacy with client-side data storage

### AI Integration

- **Therapeutic Prompts**: AI-generated reflection questions for journaling
- **Supportive Responses**: Compassionate AI feedback for journal entries
- **Mood-Based Affirmations**: Targeted positive affirmations based on current emotional state

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Supabase account (for authentication)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd EiraSafe
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the project settings
3. Authentication is handled automatically - no additional setup required

## 🏗️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful, customizable icons

### Backend & Services

- **Supabase** - Authentication and user management
- **OpenAI API** - AI-powered therapeutic responses
- **Local Storage** - Client-side data persistence

### Build Tools

- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing

## 📱 Application Structure

```
src/
├── components/          # Reusable UI components
│   ├── Footer.tsx
│   ├── Layout.tsx
│   ├── Navbar.tsx
│   └── PanicButton.tsx
├── contexts/           # React context providers
│   ├── AuthContext.tsx
│   └── PanicContext.tsx
├── hooks/              # Custom React hooks
│   └── useLocalStorage.ts
├── lib/                # Utility libraries
│   ├── openai.ts
│   └── supabase.ts
├── pages/              # Application pages
│   ├── AuthPage.tsx
│   ├── DisguisedPage.tsx
│   ├── HomePage.tsx
│   ├── JournalPage.tsx
│   ├── MoodTrackerPage.tsx
│   ├── ResourcesPage.tsx
│   ├── SafetyPlanPage.tsx
│   └── SettingsPage.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
└── App.tsx            # Main application component
```

## 🔐 Privacy & Security

### Data Protection

- **Local-First**: All personal data stored on user's device
- **No Server Storage**: Journal entries, safety plans, and mood data never leave the device
- **Encrypted Authentication**: Secure user authentication via Supabase
- **No Tracking**: No analytics or user behavior tracking

### Safety Features

- **Panic Button**: Always accessible emergency exit
- **Quick Disguise**: Instant transformation to innocent-looking apps
- **Secure Deletion**: Complete data removal when needed
- **Browser Privacy**: Works in incognito/private browsing modes

## 🎯 Usage Guide

### For Survivors

1. **Getting Started**: Create an account and explore the safe space
2. **Daily Journaling**: Use AI prompts to process emotions and experiences
3. **Safety Planning**: Build comprehensive safety strategies
4. **Mood Tracking**: Monitor emotional patterns and progress
5. **Resource Access**: Find local and national support services

### Emergency Situations

- **Panic Button**: Click the floating button (bottom-right) for quick exit options
- **Disguise Mode**: Use navbar buttons or panic menu to switch to weather/notes view
- **Quick Exit**: Panic button redirects to neutral websites immediately

## 🤝 Contributing

We welcome contributions that enhance safety, privacy, and user experience. Please ensure all contributions maintain the highest standards of security and sensitivity.

### Development Guidelines

- Follow existing code patterns and TypeScript conventions
- Maintain privacy-first approach in all features
- Test thoroughly, especially safety-critical features
- Document any new privacy or security considerations

### Code Style

- Use TypeScript for all new code
- Follow existing Tailwind CSS patterns
- Maintain responsive design principles
- Use Lucide React for consistent iconography

## 📞 Support Resources

### Emergency Contacts

- **Emergency Services**: 100
- **National Domestic Violence Hotline**: 1-800-799-7233
- **Women Helpline (India)**: 1901 or 181

<!-- ### Additional Resources
- [National Domestic Violence Hotline](https://www.thehotline.org)
- [Women's Law](https://www.womenslaw.org)
- [National Coalition Against Domestic Violence](https://ncadv.org) -->

## ⚠️ Important Disclaimers

- This application is not a substitute for professional counseling or emergency services
- In immediate danger situations, contact local emergency services
- The AI responses are supportive but not professional therapy
- Users should seek professional help for trauma processing and safety planning

## 📄 License

This project is created for educational and humanitarian purposes. Please use responsibly and in accordance with local laws and regulations.

## 🙏 Acknowledgments

- Built with compassion for survivors of domestic violence
- Inspired by the strength and resilience of survivors worldwide
- Dedicated to creating safer digital spaces for healing and empowerment

## 🌐 Live Demo

## https://eirasafe.netlify.app

**This application is a work in progress. We welcome feedback and suggestions to improve the user experience and safety features.**

**Remember: Your safety is the top priority. If you're in immediate danger, please contact emergency services or the domestic violence hotline immediately.**
