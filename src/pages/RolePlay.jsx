import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { useLanguageStore } from '../stores/languageStore';
// eslint-disable-next-line no-unused-vars
import { gerundData } from '../data/gerundData';
import { countryExamples } from '../data/countryExamples';

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
        es: '¡Bienvenido! Estoy aquí para ayudarle. ¿Qué desea ordenar?',
        en: 'Welcome! I am here to help you. What would you like to order?',
        fr: 'Bienvenue! Je suis là pour vous aider. Que voulez-vous commander?',
        de: 'Willkommen! Ich bin hier, um Ihnen zu helfen. Was möchten Sie bestellen?',
        it: 'Benvenuto! Sono qui per aiutarti. Cosa vorresti ordinare?',
        ja: 'いらっしゃいませ！お手伝いします。何をご注文なさいますか？',
        ko: '환영합니다! 도와드리겠습니다. 무엇을 주문하시겠습니까?',
        ar: 'أهلا بك! أنا هنا لمساعدتك. ماذا تريد أن تطلب؟',
      },
      suggestions: [
        'I am looking at the menu', 
        'What are you serving today?', 
        'I want a coffee',
        'Are you preparing any specials?'
      ],
    },
    {
      id: 'airport-checkin',
      title: 'Airport Check-In',
      icon: '✈️',
      description: 'Navigate airport procedures',
      color: 'from-blue-500 to-cyan-500',
      initialMessage: {
        es: 'Buenas tardes. Estoy procesando su reservación. ¿Tiene su pasaporte?',
        en: 'Good afternoon. I am processing your reservation. Do you have your passport?',
        fr: 'Bonjour. Je traite votre réservation. Avez-vous votre passeport?',
        de: 'Guten Tag. Ich bearbeite Ihre Reservierung. Haben Sie Ihren Reisepass?',
        it: 'Buon pomeriggio. Sto elaborando la tua prenotazione. Hai il passaporto?',
        ja: 'こんにちは。予約を処理しています。パスポートはお持ちですか？',
        ko: '안녕하세요. 예약을 처리하고 있습니다. 여권 있으세요?',
        ar: 'مساء الخير. أنا أعالج حجزك. هل لديك جواز سفرك؟',
      },
      suggestions: [
        'Yes, I am traveling to France', 
        'I am checking in now', 
        'Where is gate 5?',
        'Are you boarding passengers?'
      ],
    },
    {
      id: 'job-interview',
      title: 'Job Interview',
      icon: '💼',
      description: 'Prepare for professional conversations',
      color: 'from-purple-500 to-pink-500',
      initialMessage: {
        es: 'Buenos días. Gracias por venir. Estoy revisando su currículum.',
        en: 'Good morning. Thank you for coming. I am reviewing your resume.',
        fr: 'Bonjour. Merci d\'être venu. Je consulte votre CV.',
        de: 'Guten Morgen. Danke, dass Sie gekommen sind. Ich schaue mir Ihren Lebenslauf an.',
        it: 'Buongiorno. Grazie per essere venuto. Sto esaminando il tuo curriculum.',
        ja: 'おはようございます。お越しいただきありがとうございます。履歴書を確認しています。',
        ko: '좋은 아침입니다. 와주셔서 감사합니다. 이력서를 검토하고 있습니다.',
        ar: 'صباح الخير. شكرا لمجيئك. أنا أراجع سيرتك الذاتية.',
      },
      suggestions: [
        'I am currently working in tech', 
        'I have been studying Spanish', 
        'What are you looking for?',
        'I am learning new skills'
      ],
    },
    {
      id: 'making-plans',
      title: 'Making Plans',
      icon: '📅',
      description: 'Arrange meetings with friends',
      color: 'from-green-500 to-teal-500',
      initialMessage: {
        es: '¡Hola amigo! Estoy pensando en salir este fin de semana. ¿Te animas?',
        en: 'Hi friend! I am thinking about going out this weekend. Are you up for it?',
        fr: 'Salut! Je pense sortir ce week-end. Tu es partant?',
        de: 'Hallo! Ich denke daran, dieses Wochenende auszugehen. Bist du dabei?',
        it: 'Ciao! Sto pensando di uscire questo fine settimana. Ti va?',
        ja: 'こんにちは！今週末出かけようと思っています。どうですか？',
        ko: '안녕! 이번 주말에 나가려고 생각하고 있어요. 어때요?',
        ar: 'مرحبا! أفكر في الخروج في عطلة نهاية الأسبوع هذه. هل أنت مستعد؟',
      },
      suggestions: [
        'I am planning to go shopping', 
        'What are you doing Saturday?', 
        'I am meeting friends at 3',
        'Are you working this weekend?'
      ],
    },
    {
      id: 'traveling',
      title: 'Traveling in a Country',
      icon: '🗺️',
      description: 'Ask for directions and information',
      color: 'from-indigo-500 to-blue-500',
      initialMessage: {
        es: '¡Hola! ¿Necesita ayuda? Estoy trabajando como guía turístico aquí.',
        en: 'Hello! Need help? I am working as a tour guide here.',
        fr: 'Bonjour! Besoin d\'aide? Je travaille comme guide touristique ici.',
        de: 'Hallo! Brauchen Sie Hilfe? Ich arbeite hier als Reiseführer.',
        it: 'Ciao! Hai bisogno di aiuto? Sto lavorando come guida turistica qui.',
        ja: 'こんにちは！お手伝いしましょうか？ここでツアーガイドをしています。',
        ko: '안녕하세요! 도움이 필요하신가요? 여기서 관광 가이드로 일하고 있습니다.',
        ar: 'مرحبا! هل تحتاج مساعدة؟ أنا أعمل كمرشد سياحي هنا.',
      },
      suggestions: [
        'I am flying to Paris tomorrow', 
        'Where is the museum?', 
        'I am looking for a hotel',
        'Are you traveling to France?'
      ],
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

  const generateResponse = useCallback((_userMessage) => { // eslint-disable-line no-unused-vars
    const langCode = selectedLanguage.code || 'es';
    const countries = countryExamples[langCode] || countryExamples.es;
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    
    const responses = {
      'ordering-food': [
        { 
          es: 'Estoy preparando su pedido ahora mismo. ¿Le gustaría algo de beber?', 
          en: 'I am preparing your order right now. Would you like something to drink?',
          grammarTip: '💡 "Estoy preparando" uses the gerund (preparando) with estar to show an action in progress.',
          gerundHighlight: 'preparando'
        },
        { 
          es: 'Aquí tiene el menú. Estamos sirviendo especiales hoy.', 
          en: 'Here is the menu. We are serving specials today.',
          grammarTip: '💡 "Estamos sirviendo" = we are serving (gerund: sirviendo from servir)',
          gerundHighlight: 'sirviendo'
        },
        { 
          es: 'Le recomiendo la paella. Mucha gente está ordenando ese plato.', 
          en: 'I recommend the paella. Many people are ordering that dish.',
          grammarTip: '💡 "está ordenando" shows ongoing action with gerund',
          gerundHighlight: 'ordenando'
        },
      ],
      'airport-checkin': [
        { 
          es: `Perfecto. Su vuelo está saliendo hacia ${randomCountry.country} en dos horas.`, 
          en: `Perfect. Your flight is departing to ${randomCountry.english} in two hours.`,
          grammarTip: '💡 "está saliendo" = is departing (gerund shows future action already in progress)',
          gerundHighlight: 'saliendo',
          countryTip: `🌍 ${randomCountry.country} = ${randomCountry.english}`
        },
        { 
          es: `Estoy revisando su reservación. ¿Va a viajar a ${randomCountry.country}?`, 
          en: `I am checking your reservation. Are you traveling to ${randomCountry.english}?`,
          grammarTip: '💡 "Estoy revisando" uses gerund (revisando) for action happening now',
          gerundHighlight: 'revisando',
          countryTip: `🌍 Pronunciation: ${randomCountry.country}`
        },
        { 
          es: 'Los pasajeros están abordando ahora. Asiento confirmado.', 
          en: 'Passengers are boarding now. Seat confirmed.',
          grammarTip: '💡 "están abordando" = are boarding (plural gerund form)',
          gerundHighlight: 'abordando'
        },
      ],
      'job-interview': [
        { 
          es: 'Interesante. ¿En qué proyectos está trabajando actualmente?', 
          en: 'Interesting. What projects are you currently working on?',
          grammarTip: '💡 "está trabajando" = are working (present continuous with gerund)',
          gerundHighlight: 'trabajando'
        },
        { 
          es: 'Estamos buscando alguien con experiencia. El horario es flexible.', 
          en: 'We are looking for someone with experience. The hours are flexible.',
          grammarTip: '💡 "Estamos buscando" = we are looking (gerund: buscando)',
          gerundHighlight: 'buscando'
        },
        { 
          es: 'Me gusta que esté mostrando tanto interés en la posición.', 
          en: 'I like that you are showing so much interest in the position.',
          grammarTip: '💡 "esté mostrando" = subjunctive + gerund for politeness',
          gerundHighlight: 'mostrando'
        },
      ],
      'making-plans': [
        { 
          es: '¡Perfecto! Estoy pensando en ir al cine. ¿Te parece bien?', 
          en: 'Perfect! I am thinking about going to the cinema. Does that sound good?',
          grammarTip: '💡 "Estoy pensando" = I am thinking (gerund: pensando)',
          gerundHighlight: 'pensando'
        },
        { 
          es: 'Estamos planeando salir a las 3. ¿Te viene bien esa hora?', 
          en: 'We are planning to leave at 3. Does that time work for you?',
          grammarTip: '💡 "Estamos planeando" = we are planning (gerund form)',
          gerundHighlight: 'planeando'
        },
        { 
          es: '¡Será divertido! Estoy esperando con muchas ganas.', 
          en: 'It will be fun! I am looking forward to it.',
          grammarTip: '💡 "Estoy esperando" = I am waiting/looking forward (gerund)',
          gerundHighlight: 'esperando'
        },
      ],
      'traveling': [
        { 
          es: `El museo está a dos calles. Muchos turistas están visitando ${randomCountry.country} esta temporada.`, 
          en: `The museum is two streets away. Many tourists are visiting ${randomCountry.english} this season.`,
          grammarTip: '💡 "están visitando" = are visiting (gerund: visitando)',
          gerundHighlight: 'visitando',
          countryTip: `🌍 ${randomCountry.country} = ${randomCountry.english}`
        },
        { 
          es: `Estoy volando a ${randomCountry.country} mañana. El taxi está esperando en la esquina.`, 
          en: `I am flying to ${randomCountry.english} tomorrow. The taxi is waiting on the corner.`,
          grammarTip: '💡 "Estoy volando" = I am flying (future action with present continuous)',
          gerundHighlight: 'volando',
          countryTip: `🌍 How to say: ${randomCountry.country}`
        },
        { 
          es: `Para ir a ${randomCountry.country}, tome el tren. Está saliendo en 30 minutos.`, 
          en: `To go to ${randomCountry.english}, take the train. It is leaving in 30 minutes.`,
          grammarTip: '💡 "Está saliendo" = is leaving (near future with gerund)',
          gerundHighlight: 'saliendo',
          countryTip: `🌍 ${randomCountry.country} (${randomCountry.english})`
        },
      ],
    };

    // Language-aware responses for other languages
    if (langCode === 'fr') {
      responses['ordering-food'][0] = {
        fr: 'Je suis en train de préparer votre commande. Voulez-vous quelque chose à boire?',
        en: 'I am preparing your order. Would you like something to drink?',
        grammarTip: '💡 "en train de préparer" = French continuous form (like -ing)',
        gerundHighlight: 'en train de préparer'
      };
      responses['traveling'][1] = {
        fr: `Je vais en ${randomCountry.country} demain. Le taxi attend au coin.`,
        en: `I am going to ${randomCountry.english} tomorrow. The taxi is waiting on the corner.`,
        grammarTip: '💡 French uses present tense for near future actions',
        countryTip: `🌍 ${randomCountry.country} = ${randomCountry.english}`
      };
    } else if (langCode === 'de') {
      responses['ordering-food'][0] = {
        de: 'Ich bin am Vorbereiten Ihrer Bestellung. Möchten Sie etwas trinken?',
        en: 'I am preparing your order. Would you like something to drink?',
        grammarTip: '💡 "am Vorbereiten" = German continuous (am + infinitive)',
        gerundHighlight: 'am Vorbereiten'
      };
    } else if (langCode === 'it') {
      responses['ordering-food'][0] = {
        it: 'Sto preparando il suo ordine. Desidera qualcosa da bere?',
        en: 'I am preparing your order. Would you like something to drink?',
        grammarTip: '💡 "Sto preparando" = Italian continuous (stare + gerund)',
        gerundHighlight: 'preparando'
      };
    } else if (langCode === 'ja') {
      responses['ordering-food'][0] = {
        ja: 'ご注文を準備しています。お飲み物はいかがですか？',
        en: 'I am preparing your order. Would you like something to drink?',
        grammarTip: '💡 "準備しています" = ～ている form for continuous action',
        gerundHighlight: 'しています'
      };
    }

    const scenarioResponses = responses[selectedScenario.id] || responses['ordering-food'];
    const randomResponse = scenarioResponses[Math.floor(Math.random() * scenarioResponses.length)];
    
    return {
      text: randomResponse[langCode] || randomResponse.es || randomResponse.en,
      translation: randomResponse.en,
      grammarTip: randomResponse.grammarTip,
      gerundHighlight: randomResponse.gerundHighlight,
      countryTip: randomResponse.countryTip,
    };
  }, [selectedLanguage.code, selectedScenario]);

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
            gerundHighlight: response.gerundHighlight,
            countryTip: response.countryTip,
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
                        <p className="text-base leading-relaxed">
                          {message.gerundHighlight && message.isBot ? (
                            <>
                              {message.text.split(message.gerundHighlight).map((part, index, array) => (
                                <span key={index}>
                                  {part}
                                  {index < array.length - 1 && (
                                    <span className="font-bold bg-yellow-200 dark:bg-yellow-600 px-1 rounded text-purple-900 dark:text-white">
                                      {message.gerundHighlight}
                                    </span>
                                  )}
                                </span>
                              ))}
                            </>
                          ) : (
                            message.text
                          )}
                        </p>
                        {message.translation && message.isBot && (
                          <p className="text-sm mt-2 italic opacity-70 border-t border-white/20 pt-2">
                            {message.translation}
                          </p>
                        )}
                        {message.grammarTip && message.isBot && (
                          <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                            <p className="text-xs text-blue-800 dark:text-blue-200 font-medium">
                              {message.grammarTip}
                            </p>
                          </div>
                        )}
                        {message.countryTip && message.isBot && (
                          <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-700">
                            <p className="text-xs text-green-800 dark:text-green-200 font-medium">
                              {message.countryTip}
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
