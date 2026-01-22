import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { ToastProvider } from './contexts/ToastContext';
import { useAuth } from './auth/useAuth';
import { ProtectedRoute } from './auth/ProtectedRoute';
import Navigation from './components/Navigation';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
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

function AppContent() {
  const { user } = useAuth();

  return (
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
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          
          {/* Auth Routes - Redirect to home if already logged in */}
          <Route 
            path="/login" 
            element={user ? <Navigate to="/profile" replace /> : <Login />} 
          />
          <Route 
            path="/signup" 
            element={user ? <Navigate to="/profile" replace /> : <Signup />} 
          />

          {/* Protected Routes */}
          <Route 
            path="/lessons" 
            element={
              <ProtectedRoute>
                <Lessons />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/lessons/basic-vocab" 
            element={
              <ProtectedRoute>
                <BasicVocab />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/lessons/common-phrases" 
            element={
              <ProtectedRoute>
                <CommonPhrases />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/lessons/common-words" 
            element={
              <ProtectedRoute>
                <CommonWordsLesson />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/lessons/subject-pronouns" 
            element={
              <ProtectedRoute>
                <SubjectPronounsLesson />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/lessons/verb-conjugation" 
            element={
              <ProtectedRoute>
                <VerbConjugation />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/lessons/advanced-grammar" 
            element={
              <ProtectedRoute>
                <AdvancedGrammar />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ai-tutor" 
            element={
              <ProtectedRoute>
                <AITutor />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/grammar-tools" 
            element={
              <ProtectedRoute>
                <GrammarTools />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/grammar/checker" 
            element={
              <ProtectedRoute>
                <GrammarChecker />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/grammar/vocab-quiz" 
            element={
              <ProtectedRoute>
                <VocabQuiz />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/verbs-tenses" 
            element={
              <ProtectedRoute>
                <VerbsTenses />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/grammar/sentence-builder" 
            element={
              <ProtectedRoute>
                <SentenceBuilder />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sentence-builder" 
            element={
              <ProtectedRoute>
                <SentenceBuilder />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/conjunctions" 
            element={
              <ProtectedRoute>
                <Conjunctions />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/basics/alphabet-numbers" 
            element={
              <ProtectedRoute>
                <AlphabetNumbers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/roleplay" 
            element={
              <ProtectedRoute>
                <RolePlay />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/daily-conversation" 
            element={
              <ProtectedRoute>
                <DailyConversation />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <ToastProvider>
        <Router>
          <AppContent />
          <Analytics />
        </Router>
      </ToastProvider>
    </DarkModeProvider>
  );
}

export default App;
