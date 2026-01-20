import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Conjunctions() {
  const [selectedCategory, setSelectedCategory] = useState('coordinating');
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);

  const conjunctions = {
    coordinating: {
      name: 'Coordinating',
      description: 'Connect words, phrases, or independent clauses',
      items: [
        {
          spanish: 'y',
          english: 'and',
          examples: [
            { spanish: 'Juan y María son amigos.', english: 'Juan and María are friends.' },
            { spanish: 'Como pan y queso.', english: 'I eat bread and cheese.' },
          ],
        },
        {
          spanish: 'pero',
          english: 'but',
          examples: [
            { spanish: 'Quiero ir, pero estoy cansado.', english: 'I want to go, but I am tired.' },
            { spanish: 'Es difícil, pero posible.', english: 'It is difficult, but possible.' },
          ],
        },
        {
          spanish: 'o',
          english: 'or',
          examples: [
            { spanish: '¿Té o café?', english: 'Tea or coffee?' },
            { spanish: 'Podemos ir hoy o mañana.', english: 'We can go today or tomorrow.' },
          ],
        },
        {
          spanish: 'ni',
          english: 'nor/neither',
          examples: [
            { spanish: 'No tengo dinero ni tiempo.', english: 'I have neither money nor time.' },
            { spanish: 'Ni Juan ni María vinieron.', english: 'Neither Juan nor María came.' },
          ],
        },
      ],
    },
    subordinating: {
      name: 'Subordinating',
      description: 'Connect a dependent clause to an independent clause',
      items: [
        {
          spanish: 'porque',
          english: 'because',
          examples: [
            { spanish: 'Estudio porque quiero aprender.', english: 'I study because I want to learn.' },
            { spanish: 'No fui porque estaba enfermo.', english: "I didn't go because I was sick." },
          ],
        },
        {
          spanish: 'aunque',
          english: 'although/even though',
          examples: [
            { spanish: 'Aunque llueve, voy a salir.', english: "Although it's raining, I'm going out." },
            { spanish: 'Es caro, aunque vale la pena.', english: "It's expensive, although it's worth it." },
          ],
        },
        {
          spanish: 'cuando',
          english: 'when',
          examples: [
            { spanish: 'Cuando llegues, llámame.', english: 'When you arrive, call me.' },
            { spanish: 'Era joven cuando lo conocí.', english: 'I was young when I met him.' },
          ],
        },
        {
          spanish: 'si',
          english: 'if',
          examples: [
            { spanish: 'Si estudias, aprobarás.', english: 'If you study, you will pass.' },
            { spanish: 'Avísame si necesitas ayuda.', english: 'Let me know if you need help.' },
          ],
        },
        {
          spanish: 'mientras',
          english: 'while',
          examples: [
            { spanish: 'Escucho música mientras trabajo.', english: 'I listen to music while I work.' },
            { spanish: 'Mientras tú duermes, yo cocino.', english: 'While you sleep, I cook.' },
          ],
        },
        {
          spanish: 'antes de que',
          english: 'before',
          examples: [
            { spanish: 'Llámame antes de que salgas.', english: 'Call me before you leave.' },
            { spanish: 'Terminé antes de que llegaras.', english: 'I finished before you arrived.' },
          ],
        },
      ],
    },
    correlative: {
      name: 'Correlative',
      description: 'Work in pairs to connect balanced elements',
      items: [
        {
          spanish: 'ni...ni',
          english: 'neither...nor',
          examples: [
            { spanish: 'Ni como ni duermo bien.', english: 'I neither eat nor sleep well.' },
            { spanish: 'No es ni grande ni pequeño.', english: 'It is neither big nor small.' },
          ],
        },
        {
          spanish: 'tanto...como',
          english: 'both...and / as...as',
          examples: [
            { spanish: 'Tanto Juan como María estudian.', english: 'Both Juan and María study.' },
            { spanish: 'Es tanto inteligente como amable.', english: 'He is both intelligent and kind.' },
          ],
        },
        {
          spanish: 'o...o',
          english: 'either...or',
          examples: [
            { spanish: 'O vienes o te quedas.', english: 'Either you come or you stay.' },
            { spanish: 'O estudias o suspendes.', english: 'Either you study or you fail.' },
          ],
        },
      ],
    },
  };

  const practiceQuestions = [
    {
      sentence: 'Quiero ir al cine ___ estoy cansado.',
      answer: 'pero',
      options: ['y', 'pero', 'porque', 'cuando'],
      english: 'I want to go to the cinema ___ I am tired.',
    },
    {
      sentence: 'Estudiaré ___ quiero aprobar el examen.',
      answer: 'porque',
      options: ['pero', 'aunque', 'porque', 'si'],
      english: 'I will study ___ I want to pass the exam.',
    },
    {
      sentence: '___ llueve, iré a caminar.',
      answer: 'aunque',
      options: ['porque', 'aunque', 'cuando', 'mientras'],
      english: '___ it rains, I will go for a walk.',
    },
    {
      sentence: 'Llámame ___ llegues a casa.',
      answer: 'cuando',
      options: ['pero', 'porque', 'cuando', 'aunque'],
      english: 'Call me ___ you arrive home.',
    },
    {
      sentence: 'No tengo ___ dinero ___ tiempo.',
      answer: 'ni',
      options: ['y', 'o', 'ni', 'pero'],
      english: 'I have ___ money ___ time.',
    },
    {
      sentence: '___ estudias mucho, aprobarás.',
      answer: 'si',
      options: ['si', 'aunque', 'porque', 'cuando'],
      english: '___ you study a lot, you will pass.',
    },
  ];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === practiceQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestion < practiceQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
      } else {
        alert(`Quiz complete! Your score: ${score + (answer === practiceQuestions[currentQuestion].answer ? 1 : 0)}/${practiceQuestions.length}`);
        setCurrentQuestion(0);
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
            Conjunctions & Connectors
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Master connecting words with interactive examples
          </p>
        </motion.div>

        {!practiceMode ? (
          <>
            {/* Category Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6"
            >
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Select Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(conjunctions).map(([key, category]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(key)}
                    className={`p-4 rounded-lg text-left transition-all ${
                      selectedCategory === key
                        ? 'bg-gradient-to-r from-indigo-600 to-teal-500 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="font-bold text-lg mb-1">{category.name}</div>
                    <div className={`text-sm ${selectedCategory === key ? 'text-white opacity-90' : 'text-gray-600 dark:text-gray-400'}`}>
                      {category.description}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Conjunction Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4 mb-6"
            >
              {conjunctions[selectedCategory].items.map((conjunction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-r from-indigo-500 to-teal-500 text-white px-6 py-3 rounded-lg font-bold text-xl">
                      {conjunction.spanish}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-lg">
                      = {conjunction.english}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {conjunction.examples.map((example, exIndex) => (
                      <motion.div
                        key={exIndex}
                        whileHover={{ x: 5 }}
                        className="p-4 bg-gradient-to-r from-indigo-50 to-teal-50 dark:from-gray-700 dark:to-gray-700 rounded-lg"
                      >
                        <p className="font-medium text-gray-800 dark:text-white mb-1">
                          {example.spanish}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {example.english}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Practice Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
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
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Gap-Fill Practice</h2>
                <div className="text-right">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                  <div className="text-2xl font-bold text-indigo-600 dark:text-teal-400">
                    {score}/{currentQuestion}
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-indigo-600 to-teal-500 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / practiceQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Question {currentQuestion + 1} of {practiceQuestions.length}
              </p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {practiceQuestions[currentQuestion].sentence}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {practiceQuestions[currentQuestion].english}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {practiceQuestions[currentQuestion].options.map((option) => (
                  <motion.button
                    key={option}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={selectedAnswer !== ''}
                    className={`p-4 rounded-lg font-bold text-lg transition-all ${
                      selectedAnswer === ''
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                        : option === practiceQuestions[currentQuestion].answer
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
                setCurrentQuestion(0);
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

export default Conjunctions;
