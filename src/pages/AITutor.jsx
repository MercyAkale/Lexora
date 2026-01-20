import { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguageStore } from '../stores/languageStore';
import { usePersonaStore, personas } from '../stores/personaStore';

function AITutor() {
  const { selectedLanguage } = useLanguageStore();
  const { selectedPersona, setPersona } = usePersonaStore();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messageIdCounter, setMessageIdCounter] = useState(2);
  const [showPersonaDropdown, setShowPersonaDropdown] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize with persona greeting
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: selectedPersona.greeting,
        translation: selectedPersona.greetingEn,
        isBot: true,
        persona: selectedPersona.name,
      },
    ]);
    setMessageIdCounter(2);
  }, [selectedPersona]);

  // Dynamic suggested replies based on conversation
  const getSuggestedReplies = () => {
    const lastMessage = messages[messages.length - 1];
    
    if (!lastMessage || !lastMessage.isBot) {
      return [
        'Teach me gerunds',
        'Practice daily conversation',
        'Tell me about verb tenses',
        'How do I use pronouns?',
        'Explain country names',
        'Practice with examples',
      ];
    }

    // Context-aware suggestions
    const baseReplies = [
      'Teach me gerunds',
      'Practice daily conversation',
      'Tell me about verb conjugation',
      'Show me examples',
      'Help with pronunciation',
      'Talk about countries',
    ];

    return baseReplies;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    const persona = selectedPersona;
    let responseText = '';
    let responseTranslation = '';
    
    // Gerund-related responses
    if (lowerMessage.includes('gerund')) {
      const gerundResponses = {
        maria: {
          es: '¡Perfecto! Los gerundios son verbos en forma "-ando" o "-iendo". Por ejemplo: hablando (speaking), comiendo (eating).',
          en: 'Perfect! Gerunds are verbs in "-ando" or "-iendo" form. For example: hablando (speaking), comiendo (eating).',
        },
        juan: {
          es: 'Gerundios: -ando para verbos -ar, -iendo para -er/-ir. Practica: hablar→hablando, comer→comiendo.',
          en: 'Gerunds: -ando for -ar verbs, -iendo for -er/-ir. Practice: hablar→hablando, comer→comiendo.',
        },
        alex: {
          es: '¡Los gerundios son geniales! ¡Usa -ando/-iendo! Como "estoy bailando" (I am dancing) ¡Es divertido!',
          en: 'Gerunds are awesome! Use -ando/-iendo! Like "estoy bailando" (I am dancing) - so fun!',
        },
        sofia: {
          es: 'En la cultura española, los gerundios se usan mucho en conversaciones diarias. "Estoy trabajando" es muy común.',
          en: 'In Spanish culture, gerunds are used a lot in daily conversations. "Estoy trabajando" is very common.',
        },
      };
      const response = gerundResponses[persona.id] || gerundResponses.maria;
      return { text: response.es, translation: response.en };
    }
    
    // Country-related responses
    if (lowerMessage.includes('country') || lowerMessage.includes('countries')) {
      const countryResponses = {
        maria: {
          es: 'Los países se escriben con mayúscula: España, Francia, México. Ejemplo: "Yo vivo en España".',
          en: 'Countries are capitalized: España, Francia, México. Example: "Yo vivo en España" (I live in Spain).',
        },
        juan: {
          es: 'Países importantes: España, México, Argentina, Colombia. Practica: "Vivo en México".',
          en: 'Important countries: España, México, Argentina, Colombia. Practice: "Vivo en México".',
        },
        alex: {
          es: '¡Me encanta hablar de países! España, Francia, Italia... ¿Dónde vives? "Yo vivo en..."',
          en: 'I love talking about countries! Spain, France, Italy... Where do you live? "Yo vivo en..."',
        },
        sofia: {
          es: 'Cada país hispanohablante tiene su cultura única. España tiene flamenco, México tiene mariachi.',
          en: 'Each Spanish-speaking country has its unique culture. Spain has flamenco, Mexico has mariachi.',
        },
      };
      const response = countryResponses[persona.id] || countryResponses.maria;
      return { text: response.es, translation: response.en };
    }
    
    // Pronoun-related responses
    if (lowerMessage.includes('pronoun')) {
      responseText = 'Pronombres: yo (I), tú (you), él/ella (he/she), nosotros (we), ellos/ellas (they).';
      responseTranslation = 'Pronouns: yo (I), tú (you), él/ella (he/she), nosotros (we), ellos/ellas (they).';
      return { text: responseText, translation: responseTranslation };
    }
    
    // Check for greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hola') || lowerMessage.includes('hi')) {
      const greetingResponses = {
        maria: { es: '¡Hola querido estudiante! ¿Cómo estás hoy? ¿Listo para aprender?', en: 'Hello dear student! How are you today? Ready to learn?' },
        juan: { es: 'Hola. Empecemos a trabajar. ¿Qué necesitas aprender?', en: 'Hello. Let\'s get to work. What do you need to learn?' },
        alex: { es: '¡Hola amigo! ¿Qué onda? ¡Vamos a aprender y divertirnos!', en: 'Hey friend! What\'s up? Let\'s learn and have fun!' },
        sofia: { es: 'Hola. Bienvenido a nuestro viaje cultural y lingüístico.', en: 'Hello. Welcome to our cultural and linguistic journey.' },
      };
      const response = greetingResponses[persona.id] || greetingResponses.maria;
      return response;
    }
    
    // Check for verb-related queries
    if (lowerMessage.includes('verb') || lowerMessage.includes('conjugate') || lowerMessage.includes('conjugation')) {
      const verbResponses = {
        maria: { es: '¡Claro! Te ayudo con verbos. Dime un verbo y practicamos juntos.', en: 'Of course! I\'ll help with verbs. Tell me a verb and we\'ll practice together.' },
        juan: { es: 'Verbos. Necesitas practicar más. Dame un verbo ahora.', en: 'Verbs. You need more practice. Give me a verb now.' },
        alex: { es: '¡Verbos! ¡Son súper cool! ¿Cuál quieres conjugar? ¡Yo te ayudo!', en: 'Verbs! They\'re super cool! Which one do you want to conjugate? I\'ll help you!' },
        sofia: { es: 'Los verbos españoles tienen historia. ¿Sabías que muchos vienen del latín?', en: 'Spanish verbs have history. Did you know many come from Latin?' },
      };
      const response = verbResponses[persona.id] || verbResponses.maria;
      return response;
    }
    
    // Daily conversation
    if (lowerMessage.includes('daily') || lowerMessage.includes('conversation')) {
      responseText = '¡Practiquemos! "Buenos días, ¿cómo estás?" - "Estoy bien, gracias." Usa gerundios: "Estoy comiendo."';
      responseTranslation = 'Let\'s practice! "Good morning, how are you?" - "I\'m fine, thanks." Use gerunds: "Estoy comiendo" (I am eating).';
      return { text: responseText, translation: responseTranslation };
    }
    
    // Default persona-styled response
    const defaultResponses = {
      maria: { es: 'Qué interesante, querido. ¿Quieres que hablemos de gramática, vocabulario o cultura?', en: 'How interesting, dear. Would you like to talk about grammar, vocabulary or culture?' },
      juan: { es: 'Enfócate. ¿Gramática, vocabulario o conjugación? Elige uno.', en: 'Focus. Grammar, vocabulary or conjugation? Choose one.' },
      alex: { es: '¡Wow! ¿Qué más quieres saber? ¡Podemos hablar de lo que sea!', en: 'Wow! What else do you want to know? We can talk about anything!' },
      sofia: { es: 'Interesante pregunta. Desde una perspectiva cultural, podemos explorar muchos temas.', en: 'Interesting question. From a cultural perspective, we can explore many topics.' },
    };
    const response = defaultResponses[persona.id] || defaultResponses.maria;
    return response;
  };

  const handleSend = (messageText = null) => {
    const textToSend = messageText || input.trim();
    
    if (textToSend) {
      const currentId = messageIdCounter;
      
      // Add user message
      const userMessage = { 
        id: currentId, 
        text: textToSend, 
        isBot: false 
      };
      setMessages(prev => [...prev, userMessage]);
      setMessageIdCounter(prev => prev + 1);
      setInput('');
      
      // Show typing indicator
      setIsTyping(true);
      
      // Simulate bot response after 1-2 seconds
      setTimeout(() => {
        setIsTyping(false);
        const response = generateBotResponse(textToSend);
        const botMessage = {
          id: currentId + 1,
          text: response.text,
          translation: response.translation,
          isBot: true
        };
        setMessages(prev => [...prev, botMessage]);
        setMessageIdCounter(prev => prev + 1);
      }, 1200);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSend(suggestion);
  };

  const speakMessage = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage.code === 'es' ? 'es-ES' : 
                       selectedLanguage.code === 'fr' ? 'fr-FR' : 
                       selectedLanguage.code === 'de' ? 'de-DE' : 'en-US';
      
      // Try to select appropriate voice based on persona
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => {
        if (selectedPersona.voice === 'male') {
          return voice.name.toLowerCase().includes('male') || voice.name.toLowerCase().includes('jorge') || voice.name.toLowerCase().includes('diego');
        } else if (selectedPersona.voice === 'female') {
          return voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('monica') || voice.name.toLowerCase().includes('paulina');
        }
        return false;
      });
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2"
        >
          AI Tutor
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-400 mb-6"
        >
          Chat with {selectedPersona.name}, your {selectedPersona.title.toLowerCase()}, in {selectedLanguage.name}
        </motion.p>

        {/* Persona Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <label className="font-semibold text-gray-700 dark:text-gray-300">Select Tutor:</label>
            <div className="relative flex-1 min-w-[200px]">
              <button
                onClick={() => setShowPersonaDropdown(!showPersonaDropdown)}
                className="w-full flex items-center justify-between gap-3 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-lg hover:shadow-md transition border-2 border-indigo-200 dark:border-purple-700"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedPersona.icon}</span>
                  <div className="text-left">
                    <div className="font-bold text-gray-800 dark:text-white">{selectedPersona.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{selectedPersona.title}</div>
                  </div>
                </div>
                <span className="text-gray-500">▼</span>
              </button>
              
              {showPersonaDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                  {personas.map((persona) => (
                    <button
                      key={persona.id}
                      onClick={() => {
                        setPersona(persona);
                        setShowPersonaDropdown(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-indigo-50 dark:hover:bg-gray-700 transition flex items-center gap-3 ${
                        selectedPersona.id === persona.id ? 'bg-indigo-100 dark:bg-gray-700' : ''
                      }`}
                    >
                      <span className="text-2xl">{persona.icon}</span>
                      <div>
                        <div className="font-bold text-gray-800 dark:text-white">{persona.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{persona.title} - {persona.style}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl h-[600px] flex flex-col border-2 border-indigo-100 dark:border-gray-700"
        >
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl p-4 shadow-md ${
                      message.isBot
                        ? 'bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-gray-800 dark:text-white'
                        : 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white'
                    }`}
                  >
                    {message.persona && message.isBot && (
                      <p className="text-xs font-bold opacity-70 mb-1">{message.persona}:</p>
                    )}
                    <div className="flex items-start gap-2">
                      <p className="text-base leading-relaxed flex-1">{message.text}</p>
                      {message.isBot && (
                        <button
                          onClick={() => speakMessage(message.text)}
                          className="text-xl hover:scale-125 transition-transform"
                          title="Listen to message"
                        >
                          🔊
                        </button>
                      )}
                    </div>
                    {message.translation && message.isBot && (
                      <p className="text-sm mt-2 italic opacity-70 border-t border-white/20 pt-2">
                        {message.translation}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-2xl p-4 shadow-md">
                  <div className="flex space-x-2">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0 }}
                      className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0, delay: 0.2 }}
                      className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0, delay: 0.4 }}
                      className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Suggested Replies */}
          <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              {getSuggestedReplies().map((reply, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSuggestionClick(reply)}
                  className="px-3 py-1.5 text-sm bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition border border-indigo-200 dark:border-indigo-700"
                >
                  {reply}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message in English..."
                className="flex-1 border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
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

export default AITutor;
