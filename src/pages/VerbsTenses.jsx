import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function VerbsTenses() {
  const [selectedVerb, setSelectedVerb] = useState('hablar');
  const [selectedTense, setSelectedTense] = useState('present');
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);

  const verbs = [
    { id: 'hablar', spanish: 'hablar', english: 'to speak' },
    { id: 'comer', spanish: 'comer', english: 'to eat' },
    { id: 'vivir', spanish: 'vivir', english: 'to live' },
    { id: 'ser', spanish: 'ser', english: 'to be' },
    { id: 'estar', spanish: 'estar', english: 'to be' },
    { id: 'tener', spanish: 'tener', english: 'to have' },
    { id: 'hacer', spanish: 'hacer', english: 'to do/make' },
    { id: 'ir', spanish: 'ir', english: 'to go' },
  ];

  const tenses = [
    { id: 'present', name: 'Present', spanish: 'Presente' },
    { id: 'preterite', name: 'Past Simple', spanish: 'Pretérito' },
    { id: 'imperfect', name: 'Past Continuous', spanish: 'Imperfecto' },
    { id: 'future', name: 'Future', spanish: 'Futuro' },
    { id: 'conditional', name: 'Conditional', spanish: 'Condicional' },
    { id: 'subjunctive', name: 'Subjunctive', spanish: 'Subjuntivo' },
  ];

  const conjugations = {
    hablar: {
      present: { yo: 'hablo', tú: 'hablas', él: 'habla', nosotros: 'hablamos', vosotros: 'habláis', ellos: 'hablan' },
      preterite: { yo: 'hablé', tú: 'hablaste', él: 'habló', nosotros: 'hablamos', vosotros: 'hablasteis', ellos: 'hablaron' },
      imperfect: { yo: 'hablaba', tú: 'hablabas', él: 'hablaba', nosotros: 'hablábamos', vosotros: 'hablabais', ellos: 'hablaban' },
      future: { yo: 'hablaré', tú: 'hablarás', él: 'hablará', nosotros: 'hablaremos', vosotros: 'hablaréis', ellos: 'hablarán' },
      conditional: { yo: 'hablaría', tú: 'hablarías', él: 'hablaría', nosotros: 'hablaríamos', vosotros: 'hablaríais', ellos: 'hablarían' },
      subjunctive: { yo: 'hable', tú: 'hables', él: 'hable', nosotros: 'hablemos', vosotros: 'habléis', ellos: 'hablen' },
    },
    comer: {
      present: { yo: 'como', tú: 'comes', él: 'come', nosotros: 'comemos', vosotros: 'coméis', ellos: 'comen' },
      preterite: { yo: 'comí', tú: 'comiste', él: 'comió', nosotros: 'comimos', vosotros: 'comisteis', ellos: 'comieron' },
      imperfect: { yo: 'comía', tú: 'comías', él: 'comía', nosotros: 'comíamos', vosotros: 'comíais', ellos: 'comían' },
      future: { yo: 'comeré', tú: 'comerás', él: 'comerá', nosotros: 'comeremos', vosotros: 'comeréis', ellos: 'comerán' },
      conditional: { yo: 'comería', tú: 'comerías', él: 'comería', nosotros: 'comeríamos', vosotros: 'comeríais', ellos: 'comerían' },
      subjunctive: { yo: 'coma', tú: 'comas', él: 'coma', nosotros: 'comamos', vosotros: 'comáis', ellos: 'coman' },
    },
    vivir: {
      present: { yo: 'vivo', tú: 'vives', él: 'vive', nosotros: 'vivimos', vosotros: 'vivís', ellos: 'viven' },
      preterite: { yo: 'viví', tú: 'viviste', él: 'vivió', nosotros: 'vivimos', vosotros: 'vivisteis', ellos: 'vivieron' },
      imperfect: { yo: 'vivía', tú: 'vivías', él: 'vivía', nosotros: 'vivíamos', vosotros: 'vivíais', ellos: 'vivían' },
      future: { yo: 'viviré', tú: 'vivirás', él: 'vivirá', nosotros: 'viviremos', vosotros: 'viviréis', ellos: 'vivirán' },
      conditional: { yo: 'viviría', tú: 'vivirías', él: 'viviría', nosotros: 'viviríamos', vosotros: 'viviríais', ellos: 'vivirían' },
      subjunctive: { yo: 'viva', tú: 'vivas', él: 'viva', nosotros: 'vivamos', vosotros: 'viváis', ellos: 'vivan' },
    },
    ser: {
      present: { yo: 'soy', tú: 'eres', él: 'es', nosotros: 'somos', vosotros: 'sois', ellos: 'son' },
      preterite: { yo: 'fui', tú: 'fuiste', él: 'fue', nosotros: 'fuimos', vosotros: 'fuisteis', ellos: 'fueron' },
      imperfect: { yo: 'era', tú: 'eras', él: 'era', nosotros: 'éramos', vosotros: 'erais', ellos: 'eran' },
      future: { yo: 'seré', tú: 'serás', él: 'será', nosotros: 'seremos', vosotros: 'seréis', ellos: 'serán' },
      conditional: { yo: 'sería', tú: 'serías', él: 'sería', nosotros: 'seríamos', vosotros: 'seríais', ellos: 'serían' },
      subjunctive: { yo: 'sea', tú: 'seas', él: 'sea', nosotros: 'seamos', vosotros: 'seáis', ellos: 'sean' },
    },
  };

  const examples = {
    present: [
      { spanish: 'Yo hablo español todos los días.', english: 'I speak Spanish every day.' },
      { spanish: 'Ellos comen en el restaurante.', english: 'They eat at the restaurant.' },
      { spanish: 'Nosotros vivimos en Madrid.', english: 'We live in Madrid.' },
    ],
    preterite: [
      { spanish: 'Ayer hablé con mi amigo.', english: 'Yesterday I spoke with my friend.' },
      { spanish: 'Comimos paella anoche.', english: 'We ate paella last night.' },
      { spanish: 'Ella vivió en Barcelona.', english: 'She lived in Barcelona.' },
    ],
    imperfect: [
      { spanish: 'Cuando era niño, hablaba mucho.', english: 'When I was a child, I used to speak a lot.' },
      { spanish: 'Ellos comían juntos cada domingo.', english: 'They used to eat together every Sunday.' },
      { spanish: 'Vivíamos cerca de la playa.', english: 'We used to live near the beach.' },
    ],
    future: [
      { spanish: 'Mañana hablaré con el profesor.', english: 'Tomorrow I will speak with the professor.' },
      { spanish: 'Comeremos en casa esta noche.', english: 'We will eat at home tonight.' },
      { spanish: 'Viviré en España el próximo año.', english: 'I will live in Spain next year.' },
    ],
    conditional: [
      { spanish: 'Hablaría más si tuviera tiempo.', english: 'I would speak more if I had time.' },
      { spanish: 'Comeríamos allí si estuviera abierto.', english: 'We would eat there if it were open.' },
      { spanish: 'Viviría en el campo si pudiera.', english: 'I would live in the countryside if I could.' },
    ],
    subjunctive: [
      { spanish: 'Espero que hables español.', english: 'I hope that you speak Spanish.' },
      { spanish: 'Quiero que comas bien.', english: 'I want you to eat well.' },
      { spanish: 'Es importante que vivan felices.', english: "It's important that they live happily." },
    ],
  };

  const quizQuestions = [
    { pronoun: 'yo', verb: 'hablar', tense: 'present', answer: 'hablo', options: ['hablo', 'hablas', 'habla', 'hablamos'] },
    { pronoun: 'tú', verb: 'comer', tense: 'present', answer: 'comes', options: ['como', 'comes', 'come', 'comen'] },
    { pronoun: 'él', verb: 'vivir', tense: 'preterite', answer: 'vivió', options: ['vivo', 'vivió', 'vivía', 'vivirá'] },
    { pronoun: 'nosotros', verb: 'ser', tense: 'imperfect', answer: 'éramos', options: ['somos', 'fuimos', 'éramos', 'seremos'] },
  ];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === quizQuestions[currentQuiz].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuiz < quizQuestions.length - 1) {
        setCurrentQuiz(currentQuiz + 1);
        setSelectedAnswer('');
      } else {
        alert(`Quiz complete! Your score: ${score + (answer === quizQuestions[currentQuiz].answer ? 1 : 0)}/${quizQuestions.length}`);
        setCurrentQuiz(0);
        setScore(0);
        setSelectedAnswer('');
        setPracticeMode(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/grammar-tools" className="text-indigo-600 dark:text-teal-400 hover:underline mb-2 inline-block">
            ← Back to Grammar Tools
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-2">
            Verbs & Tenses
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Master verb conjugations with interactive practice
          </p>
        </motion.div>

        {!practiceMode ? (
          <>
            {/* Verb Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6"
            >
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Select a Verb</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {verbs.map((verb) => (
                  <motion.button
                    key={verb.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedVerb(verb.id)}
                    className={`p-3 rounded-lg font-medium transition-all ${
                      selectedVerb === verb.id
                        ? 'bg-gradient-to-r from-indigo-600 to-teal-500 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="font-bold">{verb.spanish}</div>
                    <div className="text-sm opacity-80">{verb.english}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Tense Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6"
            >
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Select a Tense</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {tenses.map((tense) => (
                  <motion.button
                    key={tense.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTense(tense.id)}
                    className={`p-3 rounded-lg font-medium transition-all ${
                      selectedTense === tense.id
                        ? 'bg-gradient-to-r from-indigo-600 to-teal-500 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="font-bold">{tense.name}</div>
                    <div className="text-sm opacity-80">{tense.spanish}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Conjugation Table */}
            {conjugations[selectedVerb] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6"
              >
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Conjugation Table
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(conjugations[selectedVerb][selectedTense]).map(([pronoun, conjugation]) => (
                    <motion.div
                      key={pronoun}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <span className="font-medium text-gray-600 dark:text-gray-300">{pronoun}</span>
                      <span className="text-lg font-bold text-indigo-600 dark:text-teal-400">{conjugation}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Example Sentences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6"
            >
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Example Sentences
              </h2>
              <div className="space-y-4">
                {examples[selectedTense].map((example, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="p-4 bg-gradient-to-r from-indigo-50 to-teal-50 dark:from-gray-700 dark:to-gray-700 rounded-lg"
                  >
                    <p className="font-medium text-gray-800 dark:text-white mb-1">{example.spanish}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{example.english}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Practice Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPracticeMode(true)}
                className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition"
              >
                Start Practice Mode 🎯
              </motion.button>
            </motion.div>
          </>
        ) : (
          /* Practice Mode */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
          >
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Practice Mode</h2>
                <div className="text-right">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                  <div className="text-2xl font-bold text-indigo-600 dark:text-teal-400">
                    {score}/{currentQuiz}
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-indigo-600 to-teal-500 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuiz + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Question {currentQuiz + 1} of {quizQuestions.length}
              </p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Conjugate "{quizQuestions[currentQuiz].verb}" for "{quizQuestions[currentQuiz].pronoun}" in{' '}
                {tenses.find(t => t.id === quizQuestions[currentQuiz].tense)?.name}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {quizQuestions[currentQuiz].options.map((option) => (
                  <motion.button
                    key={option}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={selectedAnswer !== ''}
                    className={`p-4 rounded-lg font-bold text-lg transition-all ${
                      selectedAnswer === ''
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                        : option === quizQuestions[currentQuiz].answer
                        ? 'bg-green-500 text-white'
                        : option === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white opacity-50'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPracticeMode(false);
                setCurrentQuiz(0);
                setScore(0);
                setSelectedAnswer('');
              }}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition"
            >
              Exit Practice Mode
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default VerbsTenses;
