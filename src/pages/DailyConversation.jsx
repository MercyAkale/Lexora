import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguageStore } from '../stores/languageStore';
import { usePersonaStore } from '../stores/personaStore';
import Accordion from '../components/ui/Accordion';
import Tooltip from '../components/ui/Tooltip';
import { gerundData } from '../data/gerundData';
import { countryExamples } from '../data/countryExamples';

function DailyConversation() {
  const { selectedLanguage } = useLanguageStore();
  const { selectedPersona } = usePersonaStore();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceInput, setPracticeInput] = useState('');
  const [practiceFeedback, setPracticeFeedback] = useState(null);
  const messagesEndRef = useRef(null);

  const dailyPhrases = {
    es: {
      phrase: 'Estoy aprendiendo español usando gerundios.',
      english: 'I am learning Spanish using gerunds.',
      pronunciation: 'es-TOY ah-pren-dee-EN-doh es-pah-NYOL oo-SAHN-doh heh-ROON-dee-ohs',
      grammar: 'Present continuous tense with "estar" + gerund (-iendo). "Usando" is the gerund of "usar" (to use).',
      gerundUsed: 'aprendiendo (learning), usando (using)',
      tenseExplanation: 'The present continuous (estar + gerund) emphasizes actions happening right now or ongoing actions.',
    },
    fr: {
      phrase: "J'apprends le français en parlant.",
      english: 'I am learning French by speaking.',
      pronunciation: 'zhah-PRAHN luh frahn-SEH ahn par-LAHN',
      grammar: 'Present tense with gerund "en parlant" (by speaking). The gerund is formed with en + present participle (-ant).',
      gerundUsed: 'parlant (speaking)',
      tenseExplanation: 'French uses simple present for ongoing actions, with "en + participle" to show means/manner.',
    },
    de: {
      phrase: 'Ich lerne Deutsch durch Sprechen.',
      english: 'I am learning German by speaking.',
      pronunciation: 'ikh LER-nuh DOYTSH doorkh SHPREH-khen',
      grammar: 'Simple present with "durch" (through/by) + infinitive noun "Sprechen" (speaking).',
      gerundUsed: 'Sprechen (speaking - nominalized infinitive)',
      tenseExplanation: 'German uses nominalized infinitives where English uses gerunds.',
    },
  };

  const conversationStarters = [
    'Tell me about your day',
    'What are you doing right now?',
    'Practice using gerunds',
    'Talk about hobbies',
    'Describe your morning routine',
  ];

  const dailyPhrase = dailyPhrases[selectedLanguage.code] || dailyPhrases.es;
  const currentGerundData = gerundData[selectedLanguage.code] || gerundData.es;
  const currentCountryExamples = countryExamples[selectedLanguage.code] || countryExamples.es;

  // Memoize random selections to avoid calling during render
  const randomCountryExample = useMemo(() => {
    if (currentCountryExamples.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * currentCountryExamples.length);
    return currentCountryExamples[randomIndex];
  }, [selectedLanguage.code]);

  // Get random country example (for responses)
  const getRandomCountryExample = () => {
    const randomIndex = Math.floor(Math.random() * currentCountryExamples.length);
    return currentCountryExamples[randomIndex];
  };

  // Get gerund variation (for responses)
  const getGerundVariation = () => {
    const examples = currentGerundData.intermediate.examples;
    const randomIndex = Math.floor(Math.random() * examples.length);
    return examples[randomIndex];
  };

  // Check practice input
  const checkPracticeInput = () => {
    const normalizedInput = practiceInput.toLowerCase().trim();
    const normalizedPhrase = dailyPhrase.phrase.toLowerCase().trim();
    
    if (normalizedInput === normalizedPhrase) {
      setPracticeFeedback({
        correct: true,
        message: '¡Perfecto! Perfect! You got it exactly right!',
      });
    } else if (normalizedInput.includes(normalizedPhrase.split(' ')[0])) {
      setPracticeFeedback({
        correct: false,
        message: 'Close! Try again. Remember: ' + dailyPhrase.phrase,
        hint: dailyPhrase.english,
      });
    } else {
      setPracticeFeedback({
        correct: false,
        message: 'Not quite. Here is the correct phrase: ' + dailyPhrase.phrase,
        hint: dailyPhrase.english,
      });
    }
  };

  useEffect(() => {
    // Initialize with persona greeting
    setMessages([
      {
        id: 1,
        text: selectedPersona.greeting,
        translation: selectedPersona.greetingEn,
        isBot: true,
        persona: selectedPersona.name,
      },
      {
        id: 2,
        text: '¿Quieres practicar la frase del día?',
        translation: 'Do you want to practice the phrase of the day?',
        isBot: true,
        persona: selectedPersona.name,
      },
    ]);
  }, [selectedPersona]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    const responses = {
      maria: [
        { text: '¡Muy bien! Sigues progresando.', translation: 'Very good! You keep progressing.' },
        { text: 'Excelente trabajo hoy.', translation: 'Excellent work today.' },
        { text: '¿Quieres practicar más?', translation: 'Do you want to practice more?' },
      ],
      juan: [
        { text: 'Correcto. Continúa así.', translation: 'Correct. Keep it up.' },
        { text: 'Necesitas más práctica.', translation: 'You need more practice.' },
        { text: 'Bien. Siguiente tema.', translation: 'Good. Next topic.' },
      ],
      alex: [
        { text: '¡Genial! ¡Eres increíble!', translation: 'Great! You are amazing!' },
        { text: '¡Vamos! ¡Tú puedes!', translation: "Let's go! You can do it!" },
        { text: '¡Súper divertido aprender contigo!', translation: 'Super fun learning with you!' },
      ],
      sofia: [
        { text: 'Interesante. En España, decimos...', translation: 'Interesting. In Spain, we say...' },
        { text: 'Esta expresión es común en México.', translation: 'This expression is common in Mexico.' },
        { text: 'Culturalmente, esto significa...', translation: 'Culturally, this means...' },
      ],
    };

    // Enhanced responses with gerund examples
    if (lowerMessage.includes('gerund')) {
      const gerundExample = getGerundVariation();
      const langKey = Object.keys(gerundExample).find(k => k !== 'english' && k !== 'note');
      return {
        text: `${currentGerundData.name}: ${gerundExample[langKey]}`,
        translation: `${gerundExample.english} (${gerundExample.note})`,
        grammarTip: `Gerunds in ${selectedLanguage.name} end with ${currentGerundData.ending}`,
      };
    }

    // Country name responses
    if (lowerMessage.includes('country') || lowerMessage.includes('travel') || lowerMessage.includes('visit')) {
      const countryExample = getRandomCountryExample();
      const langKey = Object.keys(countryExample).find(k => k === 'sentence');
      return {
        text: countryExample.sentence,
        translation: countryExample.translation,
        grammarTip: `"${countryExample.country}" means "${countryExample.english}"`,
      };
    }

    // Provide grammar tips randomly
    const shouldAddTip = Math.random() > 0.5;
    const personaResponses = responses[selectedPersona.id] || responses.maria;
    const randomResponse = personaResponses[Math.floor(Math.random() * personaResponses.length)];

    if (shouldAddTip) {
      const tips = [
        `Tip: Try using "${currentGerundData.ending}" for continuous actions!`,
        `Remember: ${currentGerundData.name} helps express ongoing actions.`,
        `Grammar note: In ${selectedLanguage.name}, gerunds work differently than English.`,
      ];
      return {
        ...randomResponse,
        grammarTip: tips[Math.floor(Math.random() * tips.length)],
      };
    }

    return randomResponse;
  };

  const handleSend = (messageText = null) => {
    const textToSend = messageText || input.trim();

    if (textToSend) {
      setMessages((prev) => [...prev, { id: Date.now(), text: textToSend, isBot: false }]);
      setInput('');
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        const response = generateResponse(textToSend);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: response.text,
            translation: response.translation,
            grammarTip: response.grammarTip,
            isBot: true,
            persona: selectedPersona.name,
          },
        ]);
      }, 1200);
    }
  };

  const speakPhrase = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(dailyPhrase.phrase);
      utterance.lang = selectedLanguage.code === 'es' ? 'es-ES' : selectedLanguage.code === 'fr' ? 'fr-FR' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2"
        >
          Daily Conversation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-400 mb-8"
        >
          Practice daily conversations with {selectedPersona.name} in {selectedLanguage.name}
        </motion.p>

        {/* Daily Phrase Card - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500 to-teal-500 rounded-xl shadow-xl p-6 mb-6 text-white"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>✨</span> Phrase of the Day
          </h2>
          <div className="bg-white/20 backdrop-blur rounded-lg p-4 mb-4">
            <p className="text-2xl font-bold mb-2">{dailyPhrase.phrase}</p>
            <p className="text-lg opacity-90 mb-1">{dailyPhrase.english}</p>
            <p className="text-sm opacity-75 italic mb-3">
              <Tooltip content="How to pronounce this phrase">
                <span>🔊 Pronunciation:</span>
              </Tooltip> {dailyPhrase.pronunciation}
            </p>
            <div className="border-t border-white/30 pt-3 mt-3">
              <p className="text-sm mb-2">
                <strong>Grammar:</strong> {dailyPhrase.grammar}
              </p>
              <p className="text-sm mb-2">
                <strong>Gerund Used:</strong> {dailyPhrase.gerundUsed}
              </p>
              <p className="text-sm">
                <strong>Why this tense?</strong> {dailyPhrase.tenseExplanation}
              </p>
            </div>
            {randomCountryExample && (
              <div className="border-t border-white/30 pt-3 mt-3">
                <p className="text-sm">
                  <strong>Country Example:</strong> {randomCountryExample.sentence}
                  <br />
                  <span className="opacity-75 italic">{randomCountryExample.translation}</span>
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={speakPhrase}
              className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2"
            >
              <span>🔊</span> Listen
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPracticeMode(!practiceMode)}
              className="bg-white/20 backdrop-blur text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition flex items-center gap-2 border-2 border-white"
            >
              <span>✍️</span> {practiceMode ? 'Hide Practice' : 'Practice Mode'}
            </motion.button>
          </div>
        </motion.div>

        {/* Practice Mode Section */}
        <AnimatePresence>
          {practiceMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border-2 border-green-300 dark:border-green-700"
            >
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <span>✍️</span> Practice: Type the Daily Phrase
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try typing: <span className="italic">"{dailyPhrase.english}"</span>
              </p>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={practiceInput}
                  onChange={(e) => setPracticeInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkPracticeInput()}
                  placeholder="Type the phrase in the target language..."
                  className="flex-1 border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={checkPracticeInput}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Check
                </motion.button>
              </div>
              {practiceFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    practiceFeedback.correct
                      ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500'
                      : 'bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-500'
                  }`}
                >
                  <p className={`font-semibold ${
                    practiceFeedback.correct ? 'text-green-800 dark:text-green-300' : 'text-yellow-800 dark:text-yellow-300'
                  }`}>
                    {practiceFeedback.message}
                  </p>
                  {practiceFeedback.hint && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Hint: {practiceFeedback.hint}
                    </p>
                  )}
                </motion.div>
              )}
              <div className="mt-4 space-y-2">
                <h3 className="font-semibold text-gray-800 dark:text-white">Variations with different gerunds:</h3>
                {currentGerundData.intermediate.examples.slice(0, 3).map((example, idx) => {
                  const langKey = Object.keys(example).find(k => k !== 'english' && k !== 'note');
                  return (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <p className="text-gray-800 dark:text-white font-medium">{example[langKey]}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">{example.english}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Educational Accordion Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-6 space-y-4"
        >
          <Accordion 
            title="Understanding Today's Phrase" 
            level="beginner"
            defaultOpen={false}
          >
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>What does this phrase mean?</strong>
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                "{dailyPhrase.phrase}" translates to "{dailyPhrase.english}". This phrase uses the{' '}
                <Tooltip content="A verb form expressing continuous action">
                  <span>present continuous tense</span>
                </Tooltip>{' '}
                to show an action that is happening right now or currently in progress.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="font-semibold text-gray-800 dark:text-white mb-2">Structure Breakdown:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Subject + verb "to be" + gerund</li>
                  <li>Example: I + am + learning</li>
                  <li>In {selectedLanguage.name}: {dailyPhrase.grammar}</li>
                </ul>
              </div>
            </div>
          </Accordion>

          <Accordion 
            title="Using Gerunds in Daily Conversation" 
            level="intermediate"
            defaultOpen={false}
          >
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>{currentGerundData.intermediate.title}</strong>
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {currentGerundData.intermediate.explanation}
              </p>
              <div className="space-y-2">
                <p className="font-semibold text-gray-800 dark:text-white">Common Examples:</p>
                {currentGerundData.intermediate.examples.map((example, idx) => {
                  const langKey = Object.keys(example).find(k => k !== 'english' && k !== 'note');
                  return (
                    <div key={idx} className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <p className="text-gray-800 dark:text-white font-medium">{example[langKey]}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{example.english}</p>
                      {example.note && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 italic mt-1">💡 {example.note}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Accordion>

          <Accordion 
            title="Contextual Usage: When and Why" 
            level="advanced"
            defaultOpen={false}
          >
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>{currentGerundData.advanced.title}</strong>
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {currentGerundData.advanced.explanation}
              </p>
              <div className="space-y-2">
                <p className="font-semibold text-gray-800 dark:text-white">Advanced Examples:</p>
                {currentGerundData.advanced.examples.map((example, idx) => {
                  const langKey = Object.keys(example).find(k => k !== 'english' && k !== 'note');
                  return (
                    <div key={idx} className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                      <p className="text-gray-800 dark:text-white font-medium">{example[langKey]}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{example.english}</p>
                      {example.note && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 italic mt-1">🎓 {example.note}</p>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mt-3">
                <p className="font-semibold text-gray-800 dark:text-white mb-2">When to use different tenses:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li><strong>Present Continuous:</strong> Actions happening right now or temporary situations</li>
                  <li><strong>Simple Present:</strong> Habits, routines, or general truths</li>
                  <li><strong>Present Perfect Continuous:</strong> Actions that started in the past and continue now</li>
                </ul>
              </div>
            </div>
          </Accordion>
        </motion.div>

        {/* Conversation Starter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <span>💡</span> Conversation Starter
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
            Talk about your day using gerunds (words ending in -ing like "walking", "eating", "speaking")
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            Example: "I am learning by practicing every day" → "Estoy aprendiendo practicando cada día"
          </p>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl h-[500px] flex flex-col border-2 border-green-100 dark:border-gray-700"
        >
          <div className="bg-gradient-to-r from-green-600 to-teal-600 p-4 rounded-t-xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">{selectedPersona.icon}</span>
              Chat with {selectedPersona.name}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl p-4 shadow-md ${
                      message.isBot
                        ? 'bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900 dark:to-teal-900'
                        : 'bg-gradient-to-br from-green-600 to-teal-600 text-white'
                    }`}
                  >
                    {message.persona && (
                      <p className="text-xs font-bold opacity-70 mb-1">{message.persona}:</p>
                    )}
                    <p className="text-base leading-relaxed">{message.text}</p>
                    {message.translation && message.isBot && (
                      <p className="text-sm mt-2 italic opacity-70 border-t border-white/20 pt-2">
                        {message.translation}
                      </p>
                    )}
                    {message.grammarTip && message.isBot && (
                      <div className="mt-2 pt-2 border-t border-green-300 dark:border-green-700">
                        <p className="text-xs font-semibold opacity-80 flex items-center gap-1">
                          <span>💡</span> Grammar Tip:
                        </p>
                        <p className="text-sm italic opacity-90 mt-1">
                          {message.grammarTip}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900 dark:to-teal-900 rounded-2xl p-4 shadow-md">
                  <div className="flex space-x-2">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="w-2 h-2 bg-green-600 dark:bg-teal-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-green-600 dark:bg-teal-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-green-600 dark:bg-teal-400 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              {conversationStarters.map((starter, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSend(starter)}
                  className="px-3 py-1.5 text-sm bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full hover:bg-green-100 dark:hover:bg-green-900/50 transition border border-green-200 dark:border-green-700"
                >
                  {starter}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default DailyConversation;
