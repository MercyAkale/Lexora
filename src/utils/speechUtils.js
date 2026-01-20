// Utility function to get the language code for speech synthesis
export const getLanguageCode = (languageCode) => {
  const languageMap = {
    es: 'es-ES',
    fr: 'fr-FR',
    de: 'de-DE',
    ar: 'ar-SA',
    it: 'it-IT',
    ja: 'ja-JP',
    ko: 'ko-KR',
  };
  
  return languageMap[languageCode] || 'en-US';
};

// Helper function to speak text using the browser's speech synthesis API
export const speakText = (text, languageCode, voicePreference = null) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getLanguageCode(languageCode);
    
    if (voicePreference) {
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => {
        if (voicePreference === 'male') {
          return voice.name.toLowerCase().includes('male') || 
                 voice.name.toLowerCase().includes('jorge') || 
                 voice.name.toLowerCase().includes('diego');
        } else if (voicePreference === 'female') {
          return voice.name.toLowerCase().includes('female') || 
                 voice.name.toLowerCase().includes('monica') || 
                 voice.name.toLowerCase().includes('paulina');
        }
        return false;
      });
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
    }
    
    window.speechSynthesis.speak(utterance);
  }
};
