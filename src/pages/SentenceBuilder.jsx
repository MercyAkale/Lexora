import { useState, useCallback, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Accordion from '../components/ui/Accordion';
import Tooltip from '../components/ui/Tooltip';
import { useLanguageStore } from '../stores/languageStore';
import { gerundData } from '../data/gerundData';
import { countryExamples } from '../data/countryExamples';
import { devLog } from '../utils/devLog';

function SentenceBuilder() {
  const [selectedWords, setSelectedWords] = useState([]);
  const [showGerundTips, setShowGerundTips] = useState(false);
  const { selectedLanguage } = useLanguageStore();
  const langCode = selectedLanguage.code;

  // Language-aware data
  const wordBlocks = {
    es: {
      sentenceStarters: [
        { spanish: 'Me gustaría...', english: 'I would like to' },
        { spanish: 'Ayer yo...', english: 'Yesterday I' },
        { spanish: 'Si yo tuviera...', english: 'If I had' },
        { spanish: 'Aunque es...', english: 'Although it is' },
        { spanish: 'Cuando llego...', english: 'When I arrive' },
        { spanish: 'Espero que...', english: 'I hope that' },
      ],
      subjects: [
        { word: 'yo', english: 'I' },
        { word: 'tú', english: 'you' },
        { word: 'él/ella', english: 'he/she' },
        { word: 'nosotros', english: 'we' },
        { word: 'ellos/ellas', english: 'they' },
      ],
      verbs: [
        { word: 'hablar', english: 'to speak' },
        { word: 'comer', english: 'to eat' },
        { word: 'vivir', english: 'to live' },
        { word: 'ir', english: 'to go' },
        { word: 'tener', english: 'to have' },
        { word: 'querer', english: 'to want' },
        { word: 'poder', english: 'can' },
        { word: 'hacer', english: 'to do/make' },
      ],
      gerunds: [
        { word: 'hablando', english: 'speaking' },
        { word: 'comiendo', english: 'eating' },
        { word: 'viviendo', english: 'living' },
        { word: 'trabajando', english: 'working' },
        { word: 'estudiando', english: 'studying' },
        { word: 'caminando', english: 'walking' },
      ],
      objects: [
        { word: 'a la playa', english: 'to the beach' },
        { word: 'con amigos', english: 'with friends' },
        { word: 'un libro', english: 'a book' },
        { word: 'la comida', english: 'the food' },
        { word: 'español', english: 'Spanish' },
        { word: 'música', english: 'music' },
        { word: 'en casa', english: 'at home' },
        { word: 'el parque', english: 'the park' },
      ],
      conjunctions: [
        { word: 'porque', english: 'because', example: 'Estudio porque quiero aprender' },
        { word: 'pero', english: 'but', example: 'Quiero ir pero estoy cansado' },
        { word: 'y', english: 'and', example: 'Juan y María' },
        { word: 'aunque', english: 'although', example: 'Voy aunque llueve' },
        { word: 'cuando', english: 'when', example: 'Te llamo cuando llegue' },
        { word: 'si', english: 'if', example: 'Si estudias, aprobarás' },
        { word: 'que', english: 'that', example: 'Creo que sí' },
      ],
    },
    fr: {
      sentenceStarters: [
        { french: 'Je voudrais...', english: 'I would like to' },
        { french: 'Hier, je...', english: 'Yesterday I' },
        { french: "Si j'avais...", english: 'If I had' },
        { french: "Bien que ce soit...", english: 'Although it is' },
        { french: "Quand j'arrive...", english: 'When I arrive' },
        { french: "J'espère que...", english: 'I hope that' },
      ],
      subjects: [
        { word: 'je', english: 'I' },
        { word: 'tu', english: 'you' },
        { word: 'il/elle', english: 'he/she' },
        { word: 'nous', english: 'we' },
        { word: 'ils/elles', english: 'they' },
      ],
      verbs: [
        { word: 'parler', english: 'to speak' },
        { word: 'manger', english: 'to eat' },
        { word: 'vivre', english: 'to live' },
        { word: 'aller', english: 'to go' },
        { word: 'avoir', english: 'to have' },
        { word: 'vouloir', english: 'to want' },
        { word: 'pouvoir', english: 'can' },
        { word: 'faire', english: 'to do/make' },
      ],
      gerunds: [
        { word: 'en parlant', english: 'speaking' },
        { word: 'en mangeant', english: 'eating' },
        { word: 'en vivant', english: 'living' },
        { word: 'en travaillant', english: 'working' },
        { word: 'en étudiant', english: 'studying' },
        { word: 'en marchant', english: 'walking' },
      ],
      objects: [
        { word: 'à la plage', english: 'to the beach' },
        { word: 'avec des amis', english: 'with friends' },
        { word: 'un livre', english: 'a book' },
        { word: 'la nourriture', english: 'the food' },
        { word: 'le français', english: 'French' },
        { word: 'la musique', english: 'music' },
        { word: 'à la maison', english: 'at home' },
        { word: 'le parc', english: 'the park' },
      ],
      conjunctions: [
        { word: 'parce que', english: 'because', example: "J'étudie parce que je veux apprendre" },
        { word: 'mais', english: 'but', example: 'Je veux aller mais je suis fatigué' },
        { word: 'et', english: 'and', example: 'Jean et Marie' },
        { word: 'bien que', english: 'although', example: "J'y vais bien qu'il pleuve" },
        { word: 'quand', english: 'when', example: "Je t'appelle quand j'arrive" },
        { word: 'si', english: 'if', example: 'Si tu étudies, tu réussiras' },
        { word: 'que', english: 'that', example: 'Je pense que oui' },
      ],
    },
    de: {
      sentenceStarters: [
        { german: 'Ich möchte...', english: 'I would like to' },
        { german: 'Gestern habe ich...', english: 'Yesterday I' },
        { german: 'Wenn ich hätte...', english: 'If I had' },
        { german: 'Obwohl es...', english: 'Although it is' },
        { german: 'Wenn ich ankomme...', english: 'When I arrive' },
        { german: 'Ich hoffe, dass...', english: 'I hope that' },
      ],
      subjects: [
        { word: 'ich', english: 'I' },
        { word: 'du', english: 'you' },
        { word: 'er/sie', english: 'he/she' },
        { word: 'wir', english: 'we' },
        { word: 'sie', english: 'they' },
      ],
      verbs: [
        { word: 'sprechen', english: 'to speak' },
        { word: 'essen', english: 'to eat' },
        { word: 'leben', english: 'to live' },
        { word: 'gehen', english: 'to go' },
        { word: 'haben', english: 'to have' },
        { word: 'wollen', english: 'to want' },
        { word: 'können', english: 'can' },
        { word: 'machen', english: 'to do/make' },
      ],
      gerunds: [
        { word: 'am Sprechen', english: 'speaking' },
        { word: 'am Essen', english: 'eating' },
        { word: 'am Leben', english: 'living' },
        { word: 'am Arbeiten', english: 'working' },
        { word: 'am Lernen', english: 'studying' },
        { word: 'am Gehen', english: 'walking' },
      ],
      objects: [
        { word: 'zum Strand', english: 'to the beach' },
        { word: 'mit Freunden', english: 'with friends' },
        { word: 'ein Buch', english: 'a book' },
        { word: 'das Essen', english: 'the food' },
        { word: 'Deutsch', english: 'German' },
        { word: 'Musik', english: 'music' },
        { word: 'zu Hause', english: 'at home' },
        { word: 'der Park', english: 'the park' },
      ],
      conjunctions: [
        { word: 'weil', english: 'because', example: 'Ich lerne, weil ich es will' },
        { word: 'aber', english: 'but', example: 'Ich will gehen aber ich bin müde' },
        { word: 'und', english: 'and', example: 'Hans und Maria' },
        { word: 'obwohl', english: 'although', example: 'Ich gehe, obwohl es regnet' },
        { word: 'wenn', english: 'when', example: 'Ich rufe an, wenn ich ankomme' },
        { word: 'falls', english: 'if', example: 'Falls du lernst, wirst du bestehen' },
        { word: 'dass', english: 'that', example: 'Ich denke, dass ja' },
      ],
    },
    it: {
      sentenceStarters: [
        { italian: 'Vorrei...', english: 'I would like to' },
        { italian: 'Ieri ho...', english: 'Yesterday I' },
        { italian: 'Se avessi...', english: 'If I had' },
        { italian: 'Anche se è...', english: 'Although it is' },
        { italian: 'Quando arrivo...', english: 'When I arrive' },
        { italian: 'Spero che...', english: 'I hope that' },
      ],
      subjects: [
        { word: 'io', english: 'I' },
        { word: 'tu', english: 'you' },
        { word: 'lui/lei', english: 'he/she' },
        { word: 'noi', english: 'we' },
        { word: 'loro', english: 'they' },
      ],
      verbs: [
        { word: 'parlare', english: 'to speak' },
        { word: 'mangiare', english: 'to eat' },
        { word: 'vivere', english: 'to live' },
        { word: 'andare', english: 'to go' },
        { word: 'avere', english: 'to have' },
        { word: 'volere', english: 'to want' },
        { word: 'potere', english: 'can' },
        { word: 'fare', english: 'to do/make' },
      ],
      gerunds: [
        { word: 'parlando', english: 'speaking' },
        { word: 'mangiando', english: 'eating' },
        { word: 'vivendo', english: 'living' },
        { word: 'lavorando', english: 'working' },
        { word: 'studiando', english: 'studying' },
        { word: 'camminando', english: 'walking' },
      ],
      objects: [
        { word: 'alla spiaggia', english: 'to the beach' },
        { word: 'con amici', english: 'with friends' },
        { word: 'un libro', english: 'a book' },
        { word: 'il cibo', english: 'the food' },
        { word: 'italiano', english: 'Italian' },
        { word: 'musica', english: 'music' },
        { word: 'a casa', english: 'at home' },
        { word: 'il parco', english: 'the park' },
      ],
      conjunctions: [
        { word: 'perché', english: 'because', example: 'Studio perché voglio imparare' },
        { word: 'ma', english: 'but', example: 'Voglio andare ma sono stanco' },
        { word: 'e', english: 'and', example: 'Giovanni e Maria' },
        { word: 'anche se', english: 'although', example: 'Vado anche se piove' },
        { word: 'quando', english: 'when', example: 'Ti chiamo quando arrivo' },
        { word: 'se', english: 'if', example: 'Se studi, passerai' },
        { word: 'che', english: 'that', example: 'Penso che sì' },
      ],
    },
    ar: {
      sentenceStarters: [
        { arabic: 'أود أن...', english: 'I would like to' },
        { arabic: 'بالأمس أنا...', english: 'Yesterday I' },
        { arabic: 'لو كان لدي...', english: 'If I had' },
        { arabic: 'على الرغم من أنه...', english: 'Although it is' },
        { arabic: 'عندما أصل...', english: 'When I arrive' },
        { arabic: 'آمل أن...', english: 'I hope that' },
      ],
      subjects: [
        { word: 'أنا', english: 'I' },
        { word: 'أنت', english: 'you' },
        { word: 'هو/هي', english: 'he/she' },
        { word: 'نحن', english: 'we' },
        { word: 'هم', english: 'they' },
      ],
      verbs: [
        { word: 'أتكلم', english: 'to speak' },
        { word: 'آكل', english: 'to eat' },
        { word: 'أعيش', english: 'to live' },
        { word: 'أذهب', english: 'to go' },
        { word: 'لدي', english: 'to have' },
        { word: 'أريد', english: 'to want' },
        { word: 'أستطيع', english: 'can' },
        { word: 'أفعل', english: 'to do/make' },
      ],
      gerunds: [
        { word: 'أتكلم', english: 'speaking' },
        { word: 'آكل', english: 'eating' },
        { word: 'أعيش', english: 'living' },
        { word: 'أعمل', english: 'working' },
        { word: 'أدرس', english: 'studying' },
        { word: 'أمشي', english: 'walking' },
      ],
      objects: [
        { word: 'إلى الشاطئ', english: 'to the beach' },
        { word: 'مع الأصدقاء', english: 'with friends' },
        { word: 'كتاب', english: 'a book' },
        { word: 'الطعام', english: 'the food' },
        { word: 'العربية', english: 'Arabic' },
        { word: 'موسيقى', english: 'music' },
        { word: 'في المنزل', english: 'at home' },
        { word: 'الحديقة', english: 'the park' },
      ],
      conjunctions: [
        { word: 'لأن', english: 'because', example: 'أدرس لأنني أريد أن أتعلم' },
        { word: 'لكن', english: 'but', example: 'أريد أن أذهب لكنني متعب' },
        { word: 'و', english: 'and', example: 'أحمد ومريم' },
        { word: 'على الرغم من', english: 'although', example: 'أذهب على الرغم من المطر' },
        { word: 'عندما', english: 'when', example: 'سأتصل بك عندما أصل' },
        { word: 'إذا', english: 'if', example: 'إذا درست، ستنجح' },
        { word: 'أن', english: 'that', example: 'أعتقد أن نعم' },
      ],
    },
    ja: {
      sentenceStarters: [
        { japanese: '私は...したいです', english: 'I would like to' },
        { japanese: '昨日私は...', english: 'Yesterday I' },
        { japanese: 'もし私が...を持っていたら', english: 'If I had' },
        { japanese: '...だけれども', english: 'Although it is' },
        { japanese: '私が到着したら...', english: 'When I arrive' },
        { japanese: '私は...を望みます', english: 'I hope that' },
      ],
      subjects: [
        { word: '私', english: 'I' },
        { word: 'あなた', english: 'you' },
        { word: '彼/彼女', english: 'he/she' },
        { word: '私たち', english: 'we' },
        { word: '彼ら', english: 'they' },
      ],
      verbs: [
        { word: '話す', english: 'to speak' },
        { word: '食べる', english: 'to eat' },
        { word: '住む', english: 'to live' },
        { word: '行く', english: 'to go' },
        { word: '持つ', english: 'to have' },
        { word: '欲しい', english: 'to want' },
        { word: 'できる', english: 'can' },
        { word: 'する', english: 'to do/make' },
      ],
      gerunds: [
        { word: '話している', english: 'speaking' },
        { word: '食べている', english: 'eating' },
        { word: '住んでいる', english: 'living' },
        { word: '働いている', english: 'working' },
        { word: '勉強している', english: 'studying' },
        { word: '歩いている', english: 'walking' },
      ],
      objects: [
        { word: 'ビーチへ', english: 'to the beach' },
        { word: '友達と', english: 'with friends' },
        { word: '本', english: 'a book' },
        { word: '食べ物', english: 'the food' },
        { word: '日本語', english: 'Japanese' },
        { word: '音楽', english: 'music' },
        { word: '家で', english: 'at home' },
        { word: '公園', english: 'the park' },
      ],
      conjunctions: [
        { word: 'なぜなら', english: 'because', example: '勉強します、なぜなら学びたいから' },
        { word: 'でも', english: 'but', example: '行きたいですが疲れています' },
        { word: 'と', english: 'and', example: '太郎と花子' },
        { word: 'けれども', english: 'although', example: '雨が降っているけれども行きます' },
        { word: '時', english: 'when', example: '到着したら電話します' },
        { word: 'もし', english: 'if', example: 'もし勉強すれば、合格します' },
        { word: 'と', english: 'that', example: 'はいと思います' },
      ],
    },
    ko: {
      sentenceStarters: [
        { korean: '저는...하고 싶습니다', english: 'I would like to' },
        { korean: '어제 저는...', english: 'Yesterday I' },
        { korean: '만약 제가...을 가졌다면', english: 'If I had' },
        { korean: '...이지만', english: 'Although it is' },
        { korean: '제가 도착하면...', english: 'When I arrive' },
        { korean: '저는...을 바랍니다', english: 'I hope that' },
      ],
      subjects: [
        { word: '저', english: 'I' },
        { word: '너', english: 'you' },
        { word: '그/그녀', english: 'he/she' },
        { word: '우리', english: 'we' },
        { word: '그들', english: 'they' },
      ],
      verbs: [
        { word: '말하다', english: 'to speak' },
        { word: '먹다', english: 'to eat' },
        { word: '살다', english: 'to live' },
        { word: '가다', english: 'to go' },
        { word: '가지다', english: 'to have' },
        { word: '원하다', english: 'to want' },
        { word: '할 수 있다', english: 'can' },
        { word: '하다', english: 'to do/make' },
      ],
      gerunds: [
        { word: '말하고 있다', english: 'speaking' },
        { word: '먹고 있다', english: 'eating' },
        { word: '살고 있다', english: 'living' },
        { word: '일하고 있다', english: 'working' },
        { word: '공부하고 있다', english: 'studying' },
        { word: '걷고 있다', english: 'walking' },
      ],
      objects: [
        { word: '해변으로', english: 'to the beach' },
        { word: '친구들과', english: 'with friends' },
        { word: '책', english: 'a book' },
        { word: '음식', english: 'the food' },
        { word: '한국어', english: 'Korean' },
        { word: '음악', english: 'music' },
        { word: '집에서', english: 'at home' },
        { word: '공원', english: 'the park' },
      ],
      conjunctions: [
        { word: '왜냐하면', english: 'because', example: '공부해요 왜냐하면 배우고 싶어요' },
        { word: '하지만', english: 'but', example: '가고 싶지만 피곤해요' },
        { word: '그리고', english: 'and', example: '철수 그리고 영희' },
        { word: '비록', english: 'although', example: '비가 오지만 가요' },
        { word: '언제', english: 'when', example: '도착하면 전화할게요' },
        { word: '만약', english: 'if', example: '만약 공부하면, 합격할 거예요' },
        { word: '것', english: 'that', example: '네라고 생각해요' },
      ],
    },
  };

  // Get current language data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const currentData = useMemo(() => wordBlocks[langCode] || wordBlocks.es, [langCode]);
  const sentenceStarters = useMemo(() => currentData.sentenceStarters || [], [currentData]);
  const countries = countryExamples[langCode] || countryExamples.es;

  const addWord = (word, isGerund = false) => {
    setSelectedWords([...selectedWords, word]);
    if (isGerund) {
      setShowGerundTips(true);
      setTimeout(() => setShowGerundTips(false), 5000);
    }
  };

  const removeWord = (index) => {
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
  };

  const clearSentence = () => {
    setSelectedWords([]);
  };

  const generateRandomSentence = useCallback(() => {
    const starter = sentenceStarters[Math.floor(Math.random() * sentenceStarters.length)];
    const subject = currentData.subjects[Math.floor(Math.random() * currentData.subjects.length)];
    const verb = currentData.verbs[Math.floor(Math.random() * currentData.verbs.length)];
    const object = currentData.objects[Math.floor(Math.random() * currentData.objects.length)];
    const conjunction = currentData.conjunctions[Math.floor(Math.random() * currentData.conjunctions.length)];
    
    setSelectedWords([starter, { word: subject.word, english: subject.english }, { word: verb.word, english: verb.english }, { word: object.word, english: object.english }, { word: conjunction.word, english: conjunction.english }]);
  }, [sentenceStarters, currentData]);

  const saveSentence = () => {
    if (selectedWords.length > 0) {
      const native = selectedWords.map(w => w[Object.keys(w).find(k => k !== 'english' && k !== 'example')] || w.word).join(' ');
      const english = selectedWords.map(w => w.english).join(' ');
      devLog('Saving sentence:', { native, english });
      alert(`Sentence saved!\n\n${selectedLanguage.name}: ${native}\nEnglish: ${english}`);
    }
  };

  // Get gerund tips for current language
  const gerundTips = gerundData[langCode] || gerundData.es;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link to="/grammar-tools">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-indigo-600 dark:text-teal-400 hover:text-indigo-700 dark:hover:text-teal-300 font-semibold mb-4"
            >
              <span>←</span> Back to Grammar Tools
            </motion.button>
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent mb-2">
            Sentence Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Build perfect {selectedLanguage.name} sentences with interactive word blocks
          </p>
        </motion.div>

        {/* Educational Accordion Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3 mb-6"
        >
          <Accordion title="Building Your First Sentences" level="beginner">
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Subject + Verb + Object:</strong> This is the basic sentence structure in most languages.
              </p>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                <p className="font-semibold text-gray-800 dark:text-white mb-2">Example:</p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-bold text-indigo-600 dark:text-teal-400">Subject</span> + 
                  <span className="font-bold text-purple-600 dark:text-pink-400"> Verb</span> + 
                  <span className="font-bold text-pink-600 dark:text-purple-400"> Object</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  "I eat food" → {langCode === 'es' && 'Yo como la comida'}
                  {langCode === 'fr' && 'Je mange la nourriture'}
                  {langCode === 'de' && 'Ich esse das Essen'}
                  {langCode === 'it' && 'Io mangio il cibo'}
                  {langCode === 'ar' && 'أنا آكل الطعام'}
                  {langCode === 'ja' && '私は食べ物を食べます'}
                  {langCode === 'ko' && '저는 음식을 먹습니다'}
                </p>
              </div>
            </div>
          </Accordion>

          <Accordion title="Using Gerunds in Sentences" level="intermediate">
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>{gerundTips.name} ({gerundTips.ending}):</strong> {gerundTips.intermediate.explanation}
              </p>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 space-y-2">
                <p className="font-semibold text-gray-800 dark:text-white mb-2">Examples:</p>
                {gerundTips.intermediate.examples.slice(0, 2).map((ex, i) => (
                  <div key={i} className="text-sm">
                    <p className="font-bold text-purple-600 dark:text-pink-400">
                      {ex[langCode] || ex.spanish || ex.french || ex.german || ex.italian || ex.arabic || ex.japanese || ex.korean}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">{ex.english}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                💡 Tip: {langCode === 'es' && 'Use "estar" + gerund for ongoing actions'}
                {langCode === 'fr' && 'Use "être en train de" + infinitive for ongoing actions'}
                {langCode === 'de' && 'Use "sein" + am/beim + infinitive for ongoing actions'}
                {langCode === 'it' && 'Use "stare" + gerund for ongoing actions'}
                {langCode === 'ar' && 'Use present tense to express ongoing actions'}
                {langCode === 'ja' && 'Use て-form + いる for ongoing actions'}
                {langCode === 'ko' && 'Use ~고 있다 for ongoing actions'}
              </p>
            </div>
          </Accordion>

          <Accordion title="Complex Sentences with Conjunctions" level="advanced">
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Combine clauses:</strong> Use conjunctions to create complex sentences that express relationships between ideas.
              </p>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                <p className="font-semibold text-gray-800 dark:text-white mb-2">Structure:</p>
                <p className="text-gray-700 dark:text-gray-300">
                  Clause 1 + <span className="font-bold text-indigo-600 dark:text-teal-400">Conjunction</span> + Clause 2
                </p>
                <div className="mt-3 space-y-2">
                  <div className="text-sm">
                    <p className="font-semibold text-gray-800 dark:text-white">Examples:</p>
                    {langCode === 'es' && (
                      <>
                        <p className="text-purple-600 dark:text-pink-400">Estudio español <strong>porque</strong> quiero viajar</p>
                        <p className="text-gray-600 dark:text-gray-400">I study Spanish <strong>because</strong> I want to travel</p>
                      </>
                    )}
                    {langCode === 'fr' && (
                      <>
                        <p className="text-purple-600 dark:text-pink-400">J'étudie le français <strong>parce que</strong> je veux voyager</p>
                        <p className="text-gray-600 dark:text-gray-400">I study French <strong>because</strong> I want to travel</p>
                      </>
                    )}
                    {langCode === 'de' && (
                      <>
                        <p className="text-purple-600 dark:text-pink-400">Ich lerne Deutsch, <strong>weil</strong> ich reisen will</p>
                        <p className="text-gray-600 dark:text-gray-400">I study German <strong>because</strong> I want to travel</p>
                      </>
                    )}
                    {langCode === 'it' && (
                      <>
                        <p className="text-purple-600 dark:text-pink-400">Studio italiano <strong>perché</strong> voglio viaggiare</p>
                        <p className="text-gray-600 dark:text-gray-400">I study Italian <strong>because</strong> I want to travel</p>
                      </>
                    )}
                    {langCode === 'ar' && (
                      <>
                        <p className="text-purple-600 dark:text-pink-400">أدرس العربية <strong>لأنني</strong> أريد أن أسافر</p>
                        <p className="text-gray-600 dark:text-gray-400">I study Arabic <strong>because</strong> I want to travel</p>
                      </>
                    )}
                    {langCode === 'ja' && (
                      <>
                        <p className="text-purple-600 dark:text-pink-400">旅行したい<strong>から</strong>日本語を勉強します</p>
                        <p className="text-gray-600 dark:text-gray-400">I study Japanese <strong>because</strong> I want to travel</p>
                      </>
                    )}
                    {langCode === 'ko' && (
                      <>
                        <p className="text-purple-600 dark:text-pink-400">여행하고 싶어서 한국어를 공부해요</p>
                        <p className="text-gray-600 dark:text-gray-400">I study Korean <strong>because</strong> I want to travel</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Accordion>
        </motion.div>

        {/* Sentence Starters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <span>🚀</span> Sentence Starters
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {sentenceStarters.map((starter, index) => {
              const nativeText = starter[langCode] || starter.spanish || starter.french || starter.german || starter.italian || starter.arabic || starter.japanese || starter.korean;
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addWord(starter)}
                  className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg hover:shadow-md transition text-left border-2 border-transparent hover:border-purple-300 dark:hover:border-pink-700"
                >
                  <div className="font-bold text-gray-800 dark:text-white text-sm">{nativeText}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{starter.english}</div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Sentence Preview Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-6 border-2 border-indigo-200 dark:border-teal-700"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <span>✨</span> Your Sentence Preview
          </h2>
          
          {/* Spanish Sentence */}
          <div className="min-h-[80px] bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 rounded-lg p-4 mb-4 flex flex-wrap gap-2 items-center border-2 border-dashed border-indigo-300 dark:border-teal-600">
            {selectedWords.length === 0 ? (
              <span className="text-gray-400 dark:text-gray-500 italic">Click word blocks below to build your sentence...</span>
            ) : (
              selectedWords.map((word, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 10 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="bg-white dark:bg-gray-600 px-4 py-2 rounded-lg shadow-md cursor-pointer font-bold text-indigo-700 dark:text-teal-300 flex items-center gap-2 border-2 border-indigo-300 dark:border-teal-500"
                  onClick={() => removeWord(index)}
                >
                  {word[Object.keys(word).find(k => k !== 'english' && k !== 'example')] || word.word}
                  <span className="text-red-500 text-xs hover:scale-125 transition">✕</span>
                </motion.div>
              ))
            )}
          </div>

          {/* English Translation */}
          {selectedWords.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-700 dark:to-gray-700 rounded-lg p-4 mb-4 border-2 border-purple-200 dark:border-pink-700"
            >
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-semibold flex items-center gap-2">
                <span>🌐</span> English Translation:
              </div>
              <div className="text-lg text-gray-800 dark:text-white font-medium">
                {selectedWords.map(w => w.english).join(' ')}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={generateRandomSentence}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>🎲</span> Generate Random Sentence
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={saveSentence}
              disabled={selectedWords.length === 0}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-700 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>💾</span> Save Sentence
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={clearSentence}
              disabled={selectedWords.length === 0}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>🗑️</span> Clear
            </motion.button>
          </div>
        </motion.div>

        {/* Word Blocks Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Dynamic Gerund Tips Info Box */}
          {showGerundTips && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: 0 }}
              className="bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 dark:from-purple-900/40 dark:via-pink-900/40 dark:to-indigo-900/40 rounded-xl p-6 border-2 border-purple-300 dark:border-purple-600 shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <span>✨</span> Gerund Tips - {gerundTips.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>{gerundTips.beginner.explanation}</strong>
              </p>
              <div className="mt-3 space-y-1">
                {gerundTips.beginner.examples.slice(0, 2).map((ex, i) => (
                  <p key={i} className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">
                      {ex[langCode] || ex.spanish || ex.french || ex.german || ex.italian || ex.arabic || ex.japanese || ex.korean}
                    </span> → {ex.english}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
          
          {Object.entries({
            subjects: currentData.subjects,
            verbs: currentData.verbs,
            gerunds: currentData.gerunds,
            countries: countries.map(c => ({ word: c.country || c[langCode] || c.spanish, english: c.english })),
            objects: currentData.objects,
            conjunctions: currentData.conjunctions,
          }).map(([category, words], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + categoryIndex * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 capitalize flex items-center gap-2">
                {category === 'subjects' && '👤'}
                {category === 'verbs' && '⚡'}
                {category === 'gerunds' && '🔄'}
                {category === 'countries' && '🌍'}
                {category === 'objects' && '🎯'}
                {category === 'conjunctions' && '🔗'}
                <span>{category}</span>
                {category === 'gerunds' && (
                  <span className="text-sm font-normal text-purple-600 dark:text-purple-400">
                    ({gerundTips.ending})
                  </span>
                )}
              </h3>
              <div className="flex flex-wrap gap-3">
                {words.map((word, index) => {
                  const isGerund = category === 'gerunds';
                  const isConjunction = category === 'conjunctions';
                  const isCountry = category === 'countries';
                  
                  const wordContent = (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + categoryIndex * 0.1 + index * 0.02 }}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => addWord(word, isGerund)}
                      className="px-4 py-3 bg-gradient-to-br from-indigo-100 to-teal-100 dark:from-indigo-900 dark:to-teal-900 text-gray-800 dark:text-white rounded-lg font-medium hover:shadow-md transition border-2 border-transparent hover:border-indigo-300 dark:hover:border-teal-500"
                    >
                      <div className="font-bold text-sm">{word.word}</div>
                      <div className="text-xs opacity-70">{word.english}</div>
                    </motion.button>
                  );

                  // Add tooltips based on category
                  if (isGerund) {
                    return (
                      <Tooltip
                        key={index}
                        content={`Use gerunds after ${langCode === 'es' ? 'estar' : langCode === 'fr' ? 'être en train de' : langCode === 'de' ? 'sein am/beim' : langCode === 'it' ? 'stare' : langCode === 'ar' ? 'present tense' : langCode === 'ja' ? 'て-form + いる' : '~고 있다'} for ongoing actions`}
                        position="top"
                      >
                        {wordContent}
                      </Tooltip>
                    );
                  }

                  if (isConjunction && word.example) {
                    return (
                      <Tooltip
                        key={index}
                        content={`Example: ${word.example}`}
                        position="top"
                      >
                        {wordContent}
                      </Tooltip>
                    );
                  }

                  if (isCountry) {
                    const countryData = countries.find(c => 
                      c.country === word.word || 
                      c[langCode] === word.word || 
                      c.spanish === word.word
                    );
                    if (countryData && countryData.sentence) {
                      return (
                        <Tooltip
                          key={index}
                          content={`Example: ${countryData.sentence} (${countryData.translation})`}
                          position="top"
                        >
                          {wordContent}
                        </Tooltip>
                      );
                    }
                  }

                  return wordContent;
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default SentenceBuilder;
