import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Navigation from './components/Navigation';

const Home = lazy(() => import('./pages/Home'));
const Lessons = lazy(() => import('./pages/Lessons'));
const AITutor = lazy(() => import('./pages/AITutor'));
const GrammarTools = lazy(() => import('./pages/GrammarTools'));
const Profile = lazy(() => import('./pages/Profile'));
const VerbsTenses = lazy(() => import('./pages/VerbsTenses'));
const SentenceBuilder = lazy(() => import('./pages/SentenceBuilder'));
const Conjunctions = lazy(() => import('./pages/Conjunctions'));
const BasicVocab = lazy(() => import('./pages/BasicVocab'));
const CommonPhrases = lazy(() => import('./pages/CommonPhrases'));
const VerbConjugation = lazy(() => import('./pages/VerbConjugation'));
const AdvancedGrammar = lazy(() => import('./pages/AdvancedGrammar'));
const AlphabetNumbers = lazy(() => import('./pages/AlphabetNumbers'));
const RolePlay = lazy(() => import('./pages/RolePlay'));
const DailyConversation = lazy(() => import('./pages/DailyConversation'));
const GrammarChecker = lazy(() => import('./pages/GrammarChecker'));
const VocabQuiz = lazy(() => import('./pages/VocabQuiz'));
const CommonWordsLesson = lazy(() => import('./pages/CommonWordsLesson'));
const SubjectPronounsLesson = lazy(() => import('./pages/SubjectPronounsLesson'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Navigation />
          <Suspense
            fallback={(
              <div className="flex min-h-[50vh] items-center justify-center px-4">
                <div className="flex items-center gap-3 rounded-2xl border border-indigo-100 bg-white/80 px-4 py-3 shadow-sm dark:border-indigo-900/50 dark:bg-gray-900/70">
                  <span className="h-3 w-3 animate-ping rounded-full bg-indigo-500" aria-hidden />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Loading Lexora...</span>
                </div>
              </div>
            )}
          >
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
          </Suspense>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
