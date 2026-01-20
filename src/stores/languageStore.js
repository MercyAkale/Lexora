import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Language configurations with mock translations
export const languages = [
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

export const useLanguageStore = create(
  persist(
    (set) => ({
      selectedLanguage: languages[0], // Default to Spanish
      setLanguage: (language) => set({ selectedLanguage: language }),
    }),
    {
      name: 'lexora-language-storage',
    }
  )
);
