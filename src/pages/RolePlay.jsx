import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguageStore } from '../stores/languageStore';

function RolePlay() {
  const { selectedLanguage } = useLanguageStore();
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scenarios = [
    {
      id: 'ordering-food',
      title: 'Ordering Food',
      icon: '🍽️',
      description: 'Practice ordering at a restaurant',
      color: 'from-orange-500 to-red-500',
      initialMessage: {
        es: '¡Bienvenido! ¿Qué desea ordenar hoy?',
        en: 'Welcome! What would you like to order today?',
      },
      suggestions: ['I want a coffee', 'The menu please', 'What do you recommend?'],
    },
    {
      id: 'airport-checkin',
      title: 'Airport Check-In',
      icon: '✈️',
      description: 'Navigate airport procedures',
      color: 'from-blue-500 to-cyan-500',
      initialMessage: {
        es: 'Buenas tardes. ¿Tiene su pasaporte y boleto?',
        en: 'Good afternoon. Do you have your passport and ticket?',
      },
      suggestions: ['Yes, here it is', 'Window seat please', 'Where is gate 5?'],
    },
    {
      id: 'job-interview',
      title: 'Job Interview',
      icon: '💼',
      description: 'Prepare for professional conversations',
      color: 'from-purple-500 to-pink-500',
      initialMessage: {
        es: 'Buenos días. Cuéntame sobre ti.',
        en: 'Good morning. Tell me about yourself.',
      },
      suggestions: ['I have 5 years experience', 'What are the hours?', 'I am hardworking'],
    },
    {
      id: 'making-plans',
      title: 'Making Plans',
      icon: '📅',
      description: 'Arrange meetings with friends',
      color: 'from-green-500 to-teal-500',
      initialMessage: {
        es: '¡Hola! ¿Quieres salir este fin de semana?',
        en: 'Hi! Do you want to go out this weekend?',
      },
      suggestions: ['Yes, sounds great!', 'What time?', 'Where shall we meet?'],
    },
    {
      id: 'traveling',
      title: 'Traveling in a Country',
      icon: '🗺️',
      description: 'Ask for directions and information',
      color: 'from-indigo-500 to-blue-500',
      initialMessage: {
        es: '¿Necesita ayuda? ¿Está perdido en España?',
        en: 'Need help? Are you lost in Spain?',
      },
      suggestions: ['Where is the museum?', 'I need a taxi', 'How do I get to Madrid?'],
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const startScenario = (scenario) => {
    setSelectedScenario(scenario);
    setMessages([
      {
        id: 1,
        text: scenario.initialMessage[selectedLanguage.code] || scenario.initialMessage.es,
        translation: scenario.initialMessage.en,
        isBot: true,
      },
    ]);
  };

  const generateResponse = (userMessage) => {
    const responses = {
      'ordering-food': [
        { es: 'Excelente elección. ¿Algo más?', en: 'Excellent choice. Anything else?' },
        { es: 'Aquí tiene el menú.', en: 'Here is the menu.' },
        { es: 'Le recomiendo la paella.', en: 'I recommend the paella.' },
      ],
      'airport-checkin': [
        { es: 'Perfecto. Aquí está su pase de abordar.', en: 'Perfect. Here is your boarding pass.' },
        { es: 'Su vuelo sale de la puerta 5.', en: 'Your flight departs from gate 5.' },
        { es: 'Asiento junto a la ventana, confirmado.', en: 'Window seat, confirmed.' },
      ],
      'job-interview': [
        { es: 'Interesante. ¿Cuáles son sus fortalezas?', en: 'Interesting. What are your strengths?' },
        { es: 'El horario es de 9 a 5.', en: 'The hours are 9 to 5.' },
        { es: 'Me gusta su actitud.', en: 'I like your attitude.' },
      ],
      'making-plans': [
        { es: '¡Perfecto! ¿A qué hora nos vemos?', en: 'Perfect! What time shall we meet?' },
        { es: 'Nos vemos en el café a las 3.', en: 'See you at the cafe at 3.' },
        { es: '¡Será divertido!', en: 'It will be fun!' },
      ],
      'traveling': [
        { es: 'El museo está a dos calles de aquí.', en: 'The museum is two streets from here.' },
        { es: 'Hay una parada de taxis en la esquina.', en: 'There is a taxi stand on the corner.' },
        { es: 'Para ir a Madrid, tome el tren.', en: 'To go to Madrid, take the train.' },
      ],
    };

    const scenarioResponses = responses[selectedScenario.id] || responses['ordering-food'];
    const randomResponse = scenarioResponses[Math.floor(Math.random() * scenarioResponses.length)];
    
    return {
      text: randomResponse[selectedLanguage.code] || randomResponse.es,
      translation: randomResponse.en,
    };
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
            isBot: true,
          },
        ]);
      }, 1000);
    }
  };

  const backToScenarios = () => {
    setSelectedScenario(null);
    setMessages([]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2"
        >
          Role Play Scenarios
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-400 mb-8"
        >
          Practice real-world conversations in {selectedLanguage.name}
        </motion.p>

        {!selectedScenario ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => startScenario(scenario)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer border-2 border-transparent hover:border-purple-300 dark:hover:border-pink-500 transition-all"
              >
                <div className={`bg-gradient-to-br ${scenario.color} w-16 h-16 rounded-lg flex items-center justify-center text-3xl mb-4 shadow-md`}>
                  {scenario.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {scenario.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {scenario.description}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <button
              onClick={backToScenarios}
              className="mb-4 flex items-center gap-2 text-purple-600 dark:text-pink-400 hover:text-purple-700 dark:hover:text-pink-300 font-semibold"
            >
              <span>←</span> Back to Scenarios
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl h-[600px] flex flex-col border-2 border-purple-100 dark:border-gray-700">
              <div className={`bg-gradient-to-r ${selectedScenario.color} p-4 rounded-t-xl`}>
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-3xl">{selectedScenario.icon}</span>
                  {selectedScenario.title}
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
                            ? 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900'
                            : 'bg-gradient-to-br from-purple-600 to-pink-600 text-white'
                        }`}
                      >
                        <p className="text-base leading-relaxed">{message.text}</p>
                        {message.translation && message.isBot && (
                          <p className="text-sm mt-2 italic opacity-70 border-t border-white/20 pt-2">
                            {message.translation}
                          </p>
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
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-2xl p-4 shadow-md">
                      <div className="flex space-x-2">
                        <motion.div
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                          className="w-2 h-2 bg-purple-600 dark:bg-pink-400 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-purple-600 dark:bg-pink-400 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-purple-600 dark:bg-pink-400 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {selectedScenario.suggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSend(suggestion)}
                      className="px-3 py-1.5 text-sm bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/50 transition border border-purple-200 dark:border-purple-700"
                    >
                      {suggestion}
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
                    placeholder="Type your response..."
                    className="flex-1 border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSend()}
                    disabled={!input.trim()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default RolePlay;
