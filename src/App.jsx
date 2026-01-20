import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import AITutor from './pages/AITutor';
import GrammarTools from './pages/GrammarTools';
import Profile from './pages/Profile';
import VerbsTenses from './pages/VerbsTenses';
import SentenceBuilder from './pages/SentenceBuilder';
import Conjunctions from './pages/Conjunctions';

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/ai-tutor" element={<AITutor />} />
            <Route path="/grammar-tools" element={<GrammarTools />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/verbs-tenses" element={<VerbsTenses />} />
            <Route path="/sentence-builder" element={<SentenceBuilder />} />
            <Route path="/conjunctions" element={<Conjunctions />} />
          </Routes>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
