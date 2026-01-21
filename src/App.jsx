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
import BasicVocab from './pages/BasicVocab';
import CommonPhrases from './pages/CommonPhrases';
import VerbConjugation from './pages/VerbConjugation';
import AdvancedGrammar from './pages/AdvancedGrammar';
import AlphabetNumbers from './pages/AlphabetNumbers';
import RolePlay from './pages/RolePlay';
import DailyConversation from './pages/DailyConversation';
import GrammarChecker from './pages/GrammarChecker';
import VocabQuiz from './pages/VocabQuiz';
import CommonWordsLesson from './pages/CommonWordsLesson';
import SubjectPronounsLesson from './pages/SubjectPronounsLesson';
import NotFound from './pages/NotFound';

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/lessons/basic-vocab" element={<BasicVocab />} />
            <Route path="/lessons/common-phrases" element={<CommonPhrases />} />
            <Route path="/lessons/common-words" element={<CommonWordsLesson />} />
            <Route path="/lessons/subject-pronouns" element={<SubjectPronounsLesson />} />
            <Route path="/lessons/verb-conjugation" element={<VerbConjugation />} />
            <Route path="/lessons/advanced-grammar" element={<AdvancedGrammar />} />
            <Route path="/ai-tutor" element={<AITutor />} />
            <Route path="/grammar-tools" element={<GrammarTools />} />
            <Route path="/grammar/checker" element={<GrammarChecker />} />
            <Route path="/grammar/vocab-quiz" element={<VocabQuiz />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/verbs-tenses" element={<VerbsTenses />} />
            <Route path="/grammar/sentence-builder" element={<SentenceBuilder />} />
            <Route path="/sentence-builder" element={<SentenceBuilder />} />
            <Route path="/conjunctions" element={<Conjunctions />} />
            <Route path="/basics/alphabet-numbers" element={<AlphabetNumbers />} />
            <Route path="/roleplay" element={<RolePlay />} />
            <Route path="/daily-conversation" element={<DailyConversation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
