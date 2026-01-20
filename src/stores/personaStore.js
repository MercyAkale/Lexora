import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Persona configurations
export const personas = [
  {
    id: 'maria',
    name: 'Maria',
    title: 'Friendly Teacher',
    voice: 'female',
    icon: '👩‍🏫',
    style: 'warm and encouraging',
    greeting: '¡Hola! Soy Maria, tu maestra amigable.',
    greetingEn: "Hello! I'm Maria, your friendly teacher.",
  },
  {
    id: 'juan',
    name: 'Juan',
    title: 'Strict Coach',
    voice: 'male',
    icon: '👨‍🏫',
    style: 'direct and corrective',
    greeting: 'Buenos días. Soy Juan, tu entrenador estricto.',
    greetingEn: "Good day. I'm Juan, your strict coach.",
  },
  {
    id: 'alex',
    name: 'Alex',
    title: 'Fun Buddy',
    voice: 'neutral',
    icon: '🧑‍🎓',
    style: 'playful and casual',
    greeting: '¡Hola amigo! Soy Alex, tu compañero divertido.',
    greetingEn: "Hey friend! I'm Alex, your fun buddy.",
  },
  {
    id: 'sofia',
    name: 'Sofia',
    title: 'Cultural Guide',
    voice: 'female',
    icon: '👩‍🎨',
    style: 'informative and cultural',
    greeting: 'Hola, soy Sofía, tu guía cultural.',
    greetingEn: "Hello, I'm Sofia, your cultural guide.",
  },
];

// Default persona
const DEFAULT_PERSONA = personas[0]; // Maria - Friendly Teacher

export const usePersonaStore = create(
  persist(
    (set) => ({
      selectedPersona: DEFAULT_PERSONA,
      setPersona: (persona) => set({ selectedPersona: persona }),
    }),
    {
      name: 'lexora-persona-storage',
    }
  )
);
