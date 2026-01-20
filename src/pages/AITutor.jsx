import { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

function AITutor() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "¡Hola! Soy tu tutor de español. ¿Cómo puedo ayudarte hoy?", 
      translation: "Hello! I'm your Spanish tutor. How can I help you today?",
      isBot: true 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [targetLanguage] = useState('Spanish'); // Default language
  const [messageIdCounter, setMessageIdCounter] = useState(2);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestedReplies = [
    "Teach me verbs",
    "Practice greetings",
    "Tell me a story",
    "Help with grammar",
    "Common phrases"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hola') || lowerMessage.includes('hi')) {
      return {
        text: '¡Hola! ¿Cómo estás hoy?',
        translation: 'Hello! How are you today?'
      };
    }
    
    // Check for verb-related queries
    if (lowerMessage.includes('verb') || lowerMessage.includes('conjugate') || lowerMessage.includes('conjugation')) {
      return {
        text: '¡Claro! Dime un verbo y practicamos conjugaciones.',
        translation: 'Sure! Tell me a verb and we\'ll practice conjugations.'
      };
    }
    
    // Check for greeting practice
    if (lowerMessage.includes('greeting') || lowerMessage.includes('saludos')) {
      return {
        text: 'Perfecto! Practiquemos saludos. ¿Cómo se dice "Good morning" en español?',
        translation: 'Perfect! Let\'s practice greetings. How do you say "Good morning" in Spanish?'
      };
    }
    
    // Check for story request
    if (lowerMessage.includes('story') || lowerMessage.includes('historia') || lowerMessage.includes('cuento')) {
      return {
        text: 'Te cuento una historia corta: "Había una vez un estudiante que quería aprender español..."',
        translation: 'Let me tell you a short story: "Once upon a time there was a student who wanted to learn Spanish..."'
      };
    }
    
    // Check for grammar help
    if (lowerMessage.includes('grammar') || lowerMessage.includes('gramática')) {
      return {
        text: '¡Excelente! ¿Qué tema de gramática te gustaría estudiar?',
        translation: 'Excellent! What grammar topic would you like to study?'
      };
    }
    
    // Check for phrases
    if (lowerMessage.includes('phrase') || lowerMessage.includes('frase')) {
      return {
        text: 'Aquí hay algunas frases útiles: "¿Dónde está...?", "Me gustaría...", "¿Cuánto cuesta?"',
        translation: 'Here are some useful phrases: "Where is...?", "I would like...", "How much does it cost?"'
      };
    }
    
    // Default response
    return {
      text: 'Interesante... ¿Quieres practicar vocabulario, gramática o conversación?',
      translation: 'Interesting... Want to practice vocabulary, grammar or conversation?'
    };
  };

  const handleSend = (messageText = null) => {
    const textToSend = messageText || input.trim();
    
    if (textToSend) {
      // Add user message
      const userMessage = { 
        id: messageIdCounter, 
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
          id: messageIdCounter + 1,
          text: response.text,
          translation: response.translation,
          isBot: true
        };
        setMessages(prev => [...prev, botMessage]);
        setMessageIdCounter(prev => prev + 2);
      }, 1200);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSend(suggestion);
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
          Chat with your personal {targetLanguage} tutor
        </motion.p>
        
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
              {suggestedReplies.map((reply, index) => (
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
                ref={inputRef}
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
