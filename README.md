# Lexora

Language learning app with AI tutor and grammar tools

## Features

- 📚 **Interactive Lessons** - Structured lessons to improve your language skills
- 🤖 **AI Tutor** - Get personalized help 24/7 from our AI tutor
- ✍️ **Grammar Tools** - Master grammar with interactive exercises
- 👤 **Profile Dashboard** - Track your progress and statistics
- 🎨 **Modern UI** - Beautiful interface built with React and Tailwind CSS

## Tech Stack

- **React 19** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing for multi-page navigation

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MercyAkale/Lexora.git
cd Lexora
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
lexora/
├── src/
│   ├── components/      # Reusable components
│   │   └── Navigation.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Lessons.jsx
│   │   ├── AITutor.jsx
│   │   ├── GrammarTools.jsx
│   │   └── Profile.jsx
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles with Tailwind
├── public/              # Static assets
├── index.html           # HTML template
└── package.json         # Dependencies and scripts
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
