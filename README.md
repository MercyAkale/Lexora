# Lexora

A production-ready language learning app with AI tutor, progress tracking, and gamification.

## ✨ Features

- 📚 **Interactive Lessons** - 20+ lessons across vocabulary, grammar, and conversation
- 🤖 **AI Tutor** - Personalized help with multiple AI personas
- ✍️ **Grammar Tools** - Sentence builder, grammar checker, and verb conjugation
- 👤 **Profile Dashboard** - Real-time progress tracking and statistics
- 🏆 **Achievements** - Gamification system with badges and rewards
- 🎨 **Modern UI** - Beautiful dark mode, animations, and responsive design
- 💾 **Progress Persistence** - Supabase backend with user data storage
- 🔒 **Authentication** - Secure login with password reset and email verification

## 🚀 Tech Stack

- **React 19** - Modern UI framework with hooks
- **Vite 7** - Lightning-fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router 7** - Client-side routing
- **Supabase** - PostgreSQL database with real-time subscriptions
- **Zustand** - Lightweight state management
- **Framer Motion** - Smooth animations
- **Vitest** - Unit testing framework

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Supabase account (for backend features)

## 🛠️ Installation

1. **Clone the repository:**
```bash
git clone https://github.com/MercyAkale/Lexora.git
cd Lexora
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. **Set up the database:**

Follow the instructions in [`supabase/README.md`](./supabase/README.md) to set up your Supabase database.

5. **Start the development server:**
```bash
npm run dev
```

6. **Open your browser:** `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## 📁 Project Structure

```
lexora/
├── src/
│   ├── auth/              # Authentication logic
│   │   ├── AuthProvider.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── useAuth.js
│   ├── components/        # Reusable UI components
│   │   ├── Navigation.jsx
│   │   ├── ErrorBoundary.jsx
│   │   └── ui/           # UI primitives
│   ├── contexts/          # React contexts
│   │   ├── DarkModeContext.jsx
│   │   └── ToastContext.jsx
│   ├── pages/             # Page components (22 pages)
│   │   ├── Home.jsx
│   │   ├── Lessons.jsx
│   │   ├── AITutor.jsx
│   │   ├── Profile.jsx
│   │   └── ...
│   ├── services/          # API service layer
│   │   ├── profileService.js
│   │   ├── lessonService.js
│   │   ├── vocabularyService.js
│   │   ├── achievementService.js
│   │   └── ...
│   ├── stores/            # Zustand state management
│   ├── utils/             # Utility functions
│   ├── data/              # Static data
│   ├── lib/               # Third-party integrations
│   ├── App.jsx            # Main app with routing
│   └── main.jsx           # Entry point
├── supabase/              # Database schema and migrations
├── public/                # Static assets
└── tests/                 # Test files
```

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | ✅ | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | ✅ | Your Supabase anonymous key |
| `VITE_APP_ENV` | ❌ | Environment (development/production) |
| `VITE_PUBLIC_BASE_URL` | ✅ | App domain (e.g., http://localhost:5173) |

### Database Setup

See [`supabase/README.md`](./supabase/README.md) for detailed database setup instructions.

## 🎯 Features Overview

### Authentication
- Email/password signup and login
- Password reset via email
- Protected routes
- Session persistence

### Progress Tracking
- Lesson completion tracking
- Study time monitoring
- Streak counting
- Vocabulary mastery levels

### Spaced Repetition
- SuperMemo SM-2 algorithm
- Automatic review scheduling
- Mastery level progression

### Gamification
- Achievement system
- Progress badges
- Activity logging
- Leaderboard-ready data structure

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

### Deploy to Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Add environment variables in Vercel dashboard

### Deploy to Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add environment variables in Netlify dashboard

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for detailed deployment instructions.

## 📚 Documentation

- [API Services Documentation](./src/services/README.md)
- [Database Schema](./supabase/README.md)
- [Contributing Guidelines](./CONTRIBUTING.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Security Policy](./SECURITY.md)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](./CONTRIBUTING.md) before submitting a PR.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Supabase for the backend infrastructure
- Tailwind CSS for the styling system
- All contributors who help improve Lexora

## 📞 Support

- 📧 Email: support@lexora.app (placeholder)
- 🐛 Issues: [GitHub Issues](https://github.com/MercyAkale/Lexora/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/MercyAkale/Lexora/discussions)

---

Made with ❤️ by the Lexora team
