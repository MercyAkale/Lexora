import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Accordion from '../components/ui/Accordion';
import Tooltip from '../components/ui/Tooltip';
import LevelBadge from '../components/ui/LevelBadge';
import { useLanguageStore } from '../stores/languageStore';
import { countryExamples } from '../data/countryExamples';

function Conjunctions() {
  const { selectedLanguage } = useLanguageStore();
  const [selectedCategory, setSelectedCategory] = useState('coordinating');
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);

  // Multi-language conjunctions data
  const conjunctionsData = {
    es: {
      coordinating: {
        name: 'Conjunciones Coordinantes',
        description: 'Conectan palabras, frases o cláusulas independientes',
        items: [
          {
            word: 'y',
            english: 'and',
            level: 'beginner',
            tooltip: 'Conecta dos elementos o ideas similares',
            examples: [
              { text: 'Juan y María son amigos.', translation: 'Juan and María are friends.' },
              { text: 'Como pan y queso.', translation: 'I eat bread and cheese.' },
            ],
          },
          {
            word: 'pero',
            english: 'but',
            level: 'beginner',
            tooltip: 'Muestra contraste o contradicción entre ideas',
            examples: [
              { text: 'Quiero ir, pero estoy cansado.', translation: 'I want to go, but I am tired.' },
              { text: 'Es difícil, pero posible.', translation: 'It is difficult, but possible.' },
            ],
          },
          {
            word: 'o',
            english: 'or',
            level: 'beginner',
            tooltip: 'Presenta alternativas u opciones',
            examples: [
              { text: '¿Té o café?', translation: 'Tea or coffee?' },
              { text: 'Podemos ir hoy o mañana.', translation: 'We can go today or tomorrow.' },
            ],
          },
          {
            word: 'ni',
            english: 'nor/neither',
            level: 'intermediate',
            tooltip: 'Negación de dos o más elementos',
            examples: [
              { text: 'No tengo dinero ni tiempo.', translation: 'I have neither money nor time.' },
              { text: 'Ni Juan ni María vinieron.', translation: 'Neither Juan nor María came.' },
            ],
          },
        ],
      },
      subordinating: {
        name: 'Conjunciones Subordinantes',
        description: 'Conectan una cláusula dependiente con una independiente',
        items: [
          {
            word: 'porque',
            english: 'because',
            level: 'beginner',
            tooltip: 'Indica razón o causa',
            examples: [
              { text: 'Estudio porque quiero aprender.', translation: 'I study because I want to learn.' },
              { text: 'No fui porque estaba enfermo.', translation: "I didn't go because I was sick." },
            ],
          },
          {
            word: 'aunque',
            english: 'although/even though',
            level: 'intermediate',
            tooltip: 'Expresa concesión o contraste inesperado',
            examples: [
              { text: 'Aunque llueve, voy a salir.', translation: "Although it's raining, I'm going out." },
              { text: 'Es caro, aunque vale la pena.', translation: "It's expensive, although it's worth it." },
            ],
          },
          {
            word: 'cuando',
            english: 'when',
            level: 'beginner',
            tooltip: 'Indica tiempo o momento',
            examples: [
              { text: 'Cuando llegues, llámame.', translation: 'When you arrive, call me.' },
              { text: 'Era joven cuando lo conocí.', translation: 'I was young when I met him.' },
            ],
          },
          {
            word: 'si',
            english: 'if',
            level: 'intermediate',
            tooltip: 'Expresa condición o hipótesis',
            examples: [
              { text: 'Si estudias, aprobarás.', translation: 'If you study, you will pass.' },
              { text: 'Avísame si necesitas ayuda.', translation: 'Let me know if you need help.' },
            ],
          },
          {
            word: 'mientras',
            english: 'while',
            level: 'intermediate',
            tooltip: 'Indica simultaneidad de acciones',
            examples: [
              { text: 'Escucho música mientras trabajo.', translation: 'I listen to music while I work.' },
              { text: 'Mientras tú duermes, yo cocino.', translation: 'While you sleep, I cook.' },
            ],
          },
          {
            word: 'antes de que',
            english: 'before',
            level: 'advanced',
            tooltip: 'Indica que una acción ocurre antes que otra',
            examples: [
              { text: 'Llámame antes de que salgas.', translation: 'Call me before you leave.' },
              { text: 'Terminé antes de que llegaras.', translation: 'I finished before you arrived.' },
            ],
          },
        ],
      },
      correlative: {
        name: 'Conjunciones Correlativas',
        description: 'Trabajan en pares para conectar elementos equilibrados',
        items: [
          {
            word: 'ni...ni',
            english: 'neither...nor',
            level: 'intermediate',
            tooltip: 'Negación de dos alternativas',
            examples: [
              { text: 'Ni como ni duermo bien.', translation: 'I neither eat nor sleep well.' },
              { text: 'No es ni grande ni pequeño.', translation: 'It is neither big nor small.' },
            ],
          },
          {
            word: 'tanto...como',
            english: 'both...and / as...as',
            level: 'advanced',
            tooltip: 'Compara o incluye dos elementos',
            examples: [
              { text: 'Tanto Juan como María estudian.', translation: 'Both Juan and María study.' },
              { text: 'Es tanto inteligente como amable.', translation: 'He is both intelligent and kind.' },
            ],
          },
          {
            word: 'o...o',
            english: 'either...or',
            level: 'intermediate',
            tooltip: 'Presenta dos opciones exclusivas',
            examples: [
              { text: 'O vienes o te quedas.', translation: 'Either you come or you stay.' },
              { text: 'O estudias o suspendes.', translation: 'Either you study or you fail.' },
            ],
          },
        ],
      },
    },
    fr: {
      coordinating: {
        name: 'Conjonctions de Coordination',
        description: 'Relient des mots, phrases ou propositions indépendantes',
        items: [
          {
            word: 'et',
            english: 'and',
            level: 'beginner',
            tooltip: 'Relie deux éléments ou idées similaires',
            examples: [
              { text: 'Pierre et Marie sont amis.', translation: 'Pierre and Marie are friends.' },
              { text: 'Je mange du pain et du fromage.', translation: 'I eat bread and cheese.' },
            ],
          },
          {
            word: 'mais',
            english: 'but',
            level: 'beginner',
            tooltip: 'Montre un contraste ou une contradiction',
            examples: [
              { text: 'Je veux y aller, mais je suis fatigué.', translation: 'I want to go, but I am tired.' },
              { text: "C'est difficile, mais possible.", translation: 'It is difficult, but possible.' },
            ],
          },
          {
            word: 'ou',
            english: 'or',
            level: 'beginner',
            tooltip: 'Présente des alternatives',
            examples: [
              { text: 'Thé ou café?', translation: 'Tea or coffee?' },
              { text: "On peut y aller aujourd'hui ou demain.", translation: 'We can go today or tomorrow.' },
            ],
          },
        ],
      },
      subordinating: {
        name: 'Conjonctions de Subordination',
        description: 'Relient une proposition dépendante à une indépendante',
        items: [
          {
            word: 'parce que',
            english: 'because',
            level: 'beginner',
            tooltip: 'Indique la raison ou la cause',
            examples: [
              { text: "J'étudie parce que je veux apprendre.", translation: 'I study because I want to learn.' },
              { text: "Je ne suis pas allé parce que j'étais malade.", translation: "I didn't go because I was sick." },
            ],
          },
          {
            word: 'bien que',
            english: 'although',
            level: 'intermediate',
            tooltip: 'Exprime une concession',
            examples: [
              { text: 'Bien qu\'il pleuve, je vais sortir.', translation: "Although it's raining, I'm going out." },
            ],
          },
          {
            word: 'quand',
            english: 'when',
            level: 'beginner',
            tooltip: 'Indique le temps',
            examples: [
              { text: 'Quand tu arrives, appelle-moi.', translation: 'When you arrive, call me.' },
            ],
          },
        ],
      },
      correlative: {
        name: 'Conjonctions Corrélatives',
        description: 'Travaillent en paires',
        items: [
          {
            word: 'ni...ni',
            english: 'neither...nor',
            level: 'intermediate',
            tooltip: 'Négation de deux alternatives',
            examples: [
              { text: 'Je ne mange ni ne dors bien.', translation: 'I neither eat nor sleep well.' },
            ],
          },
        ],
      },
    },
    de: {
      coordinating: {
        name: 'Koordinierende Konjunktionen',
        description: 'Verbinden Wörter, Sätze oder unabhängige Klauseln',
        items: [
          {
            word: 'und',
            english: 'and',
            level: 'beginner',
            tooltip: 'Verbindet zwei Elemente oder Ideen',
            examples: [
              { text: 'Hans und Maria sind Freunde.', translation: 'Hans and Maria are friends.' },
              { text: 'Ich esse Brot und Käse.', translation: 'I eat bread and cheese.' },
            ],
          },
          {
            word: 'aber',
            english: 'but',
            level: 'beginner',
            tooltip: 'Zeigt Kontrast oder Widerspruch',
            examples: [
              { text: 'Ich will gehen, aber ich bin müde.', translation: 'I want to go, but I am tired.' },
              { text: 'Es ist schwierig, aber möglich.', translation: 'It is difficult, but possible.' },
            ],
          },
          {
            word: 'oder',
            english: 'or',
            level: 'beginner',
            tooltip: 'Präsentiert Alternativen',
            examples: [
              { text: 'Tee oder Kaffee?', translation: 'Tea or coffee?' },
              { text: 'Wir können heute oder morgen gehen.', translation: 'We can go today or tomorrow.' },
            ],
          },
        ],
      },
      subordinating: {
        name: 'Subordinierende Konjunktionen',
        description: 'Verbinden abhängige mit unabhängigen Klauseln',
        items: [
          {
            word: 'weil',
            english: 'because',
            level: 'beginner',
            tooltip: 'Gibt Grund oder Ursache an',
            examples: [
              { text: 'Ich lerne, weil ich es verstehen will.', translation: 'I study because I want to understand.' },
            ],
          },
          {
            word: 'obwohl',
            english: 'although',
            level: 'intermediate',
            tooltip: 'Drückt Konzession aus',
            examples: [
              { text: 'Obwohl es regnet, gehe ich raus.', translation: "Although it's raining, I'm going out." },
            ],
          },
        ],
      },
      correlative: {
        name: 'Korrelative Konjunktionen',
        description: 'Arbeiten paarweise',
        items: [
          {
            word: 'weder...noch',
            english: 'neither...nor',
            level: 'intermediate',
            tooltip: 'Negation von zwei Alternativen',
            examples: [
              { text: 'Ich esse weder gut noch schlafe ich gut.', translation: 'I neither eat nor sleep well.' },
            ],
          },
        ],
      },
    },
    it: {
      coordinating: {
        name: 'Congiunzioni Coordinanti',
        description: 'Collegano parole, frasi o proposizioni indipendenti',
        items: [
          {
            word: 'e',
            english: 'and',
            level: 'beginner',
            tooltip: 'Collega due elementi o idee',
            examples: [
              { text: 'Marco e Anna sono amici.', translation: 'Marco and Anna are friends.' },
              { text: 'Mangio pane e formaggio.', translation: 'I eat bread and cheese.' },
            ],
          },
          {
            word: 'ma',
            english: 'but',
            level: 'beginner',
            tooltip: 'Mostra contrasto',
            examples: [
              { text: 'Voglio andare, ma sono stanco.', translation: 'I want to go, but I am tired.' },
            ],
          },
          {
            word: 'o',
            english: 'or',
            level: 'beginner',
            tooltip: 'Presenta alternative',
            examples: [
              { text: 'Tè o caffè?', translation: 'Tea or coffee?' },
            ],
          },
        ],
      },
      subordinating: {
        name: 'Congiunzioni Subordinanti',
        description: 'Collegano proposizioni dipendenti a indipendenti',
        items: [
          {
            word: 'perché',
            english: 'because',
            level: 'beginner',
            tooltip: 'Indica ragione o causa',
            examples: [
              { text: 'Studio perché voglio imparare.', translation: 'I study because I want to learn.' },
            ],
          },
          {
            word: 'sebbene',
            english: 'although',
            level: 'intermediate',
            tooltip: 'Esprime concessione',
            examples: [
              { text: 'Sebbene piova, esco.', translation: "Although it's raining, I'm going out." },
            ],
          },
        ],
      },
      correlative: {
        name: 'Congiunzioni Correlative',
        description: 'Lavorano in coppia',
        items: [
          {
            word: 'né...né',
            english: 'neither...nor',
            level: 'intermediate',
            tooltip: 'Negazione di due alternative',
            examples: [
              { text: 'Non mangio né dormo bene.', translation: 'I neither eat nor sleep well.' },
            ],
          },
        ],
      },
    },
    ar: {
      coordinating: {
        name: 'حروف العطف التنسيقية',
        description: 'تربط الكلمات أو العبارات أو الجمل المستقلة',
        items: [
          {
            word: 'و',
            english: 'and',
            level: 'beginner',
            tooltip: 'يربط عنصرين أو فكرتين',
            examples: [
              { text: 'أحمد وفاطمة أصدقاء.', translation: 'Ahmed and Fatima are friends.' },
              { text: 'آكل خبزاً وجبناً.', translation: 'I eat bread and cheese.' },
            ],
          },
          {
            word: 'لكن',
            english: 'but',
            level: 'beginner',
            tooltip: 'يظهر التباين',
            examples: [
              { text: 'أريد الذهاب، لكنني متعب.', translation: 'I want to go, but I am tired.' },
            ],
          },
          {
            word: 'أو',
            english: 'or',
            level: 'beginner',
            tooltip: 'يقدم البدائل',
            examples: [
              { text: 'شاي أو قهوة؟', translation: 'Tea or coffee?' },
            ],
          },
        ],
      },
      subordinating: {
        name: 'حروف العطف التابعة',
        description: 'تربط الجمل التابعة بالجمل المستقلة',
        items: [
          {
            word: 'لأن',
            english: 'because',
            level: 'beginner',
            tooltip: 'يشير إلى السبب',
            examples: [
              { text: 'أدرس لأنني أريد أن أتعلم.', translation: 'I study because I want to learn.' },
            ],
          },
          {
            word: 'على الرغم من',
            english: 'although',
            level: 'intermediate',
            tooltip: 'يعبر عن التنازل',
            examples: [
              { text: 'على الرغم من المطر، سأخرج.', translation: "Although it's raining, I'm going out." },
            ],
          },
        ],
      },
      correlative: {
        name: 'حروف العطف الترابطية',
        description: 'تعمل في أزواج',
        items: [
          {
            word: 'لا...ولا',
            english: 'neither...nor',
            level: 'intermediate',
            tooltip: 'نفي بديلين',
            examples: [
              { text: 'لا آكل ولا أنام جيداً.', translation: 'I neither eat nor sleep well.' },
            ],
          },
        ],
      },
    },
    ja: {
      coordinating: {
        name: '並立接続詞',
        description: '単語、フレーズ、または独立した節を結ぶ',
        items: [
          {
            word: 'と',
            english: 'and',
            level: 'beginner',
            tooltip: '二つの要素や考えを結ぶ',
            examples: [
              { text: '太郎と花子は友達です。', translation: 'Taro and Hanako are friends.' },
              { text: 'パンとチーズを食べます。', translation: 'I eat bread and cheese.' },
            ],
          },
          {
            word: 'が',
            english: 'but',
            level: 'beginner',
            tooltip: '対照を示す',
            examples: [
              { text: '行きたいですが、疲れています。', translation: 'I want to go, but I am tired.' },
            ],
          },
          {
            word: 'か',
            english: 'or',
            level: 'beginner',
            tooltip: '選択肢を示す',
            examples: [
              { text: '紅茶かコーヒー？', translation: 'Tea or coffee?' },
            ],
          },
        ],
      },
      subordinating: {
        name: '従属接続詞',
        description: '従属節を独立節に結ぶ',
        items: [
          {
            word: 'なぜなら',
            english: 'because',
            level: 'beginner',
            tooltip: '理由を示す',
            examples: [
              { text: '勉強します、なぜなら学びたいからです。', translation: 'I study because I want to learn.' },
            ],
          },
        ],
      },
      correlative: {
        name: '相関接続詞',
        description: 'ペアで働く',
        items: [
          {
            word: 'も...も',
            english: 'neither...nor / both...and',
            level: 'intermediate',
            tooltip: '二つの選択肢の否定または肯定',
            examples: [
              { text: '食べもしないし眠りもしない。', translation: 'I neither eat nor sleep.' },
            ],
          },
        ],
      },
    },
    ko: {
      coordinating: {
        name: '등위 접속사',
        description: '단어, 구 또는 독립절을 연결',
        items: [
          {
            word: '와/과',
            english: 'and',
            level: 'beginner',
            tooltip: '두 요소나 생각을 연결',
            examples: [
              { text: '철수와 영희는 친구입니다.', translation: 'Chulsoo and Younghee are friends.' },
              { text: '빵과 치즈를 먹습니다.', translation: 'I eat bread and cheese.' },
            ],
          },
          {
            word: '하지만',
            english: 'but',
            level: 'beginner',
            tooltip: '대조를 보여줌',
            examples: [
              { text: '가고 싶지만 피곤합니다.', translation: 'I want to go, but I am tired.' },
            ],
          },
          {
            word: '또는',
            english: 'or',
            level: 'beginner',
            tooltip: '선택지를 제시',
            examples: [
              { text: '차 또는 커피?', translation: 'Tea or coffee?' },
            ],
          },
        ],
      },
      subordinating: {
        name: '종속 접속사',
        description: '종속절을 독립절에 연결',
        items: [
          {
            word: '왜냐하면',
            english: 'because',
            level: 'beginner',
            tooltip: '이유를 나타냄',
            examples: [
              { text: '공부합니다, 왜냐하면 배우고 싶기 때문입니다.', translation: 'I study because I want to learn.' },
            ],
          },
        ],
      },
      correlative: {
        name: '상관 접속사',
        description: '쌍으로 작동',
        items: [
          {
            word: '도...도',
            english: 'neither...nor / both...and',
            level: 'intermediate',
            tooltip: '두 선택지의 부정 또는 긍정',
            examples: [
              { text: '먹지도 자지도 않습니다.', translation: 'I neither eat nor sleep.' },
            ],
          },
        ],
      },
    },
  };

  // Get current language conjunctions or default to Spanish
  const conjunctions = conjunctionsData[selectedLanguage.code] || conjunctionsData.es;

  // Get country examples for the selected language
  const currentCountryExamples = countryExamples[selectedLanguage.code] || countryExamples.es;

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
            {/* Educational Accordion Sections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 mb-8"
            >
              <Accordion 
                title="What Are Conjunctions?" 
                level="beginner"
                defaultOpen={true}
              >
                <div className="text-gray-700 dark:text-gray-300 space-y-3">
                  <p className="text-base leading-relaxed">
                    Conjunctions are connecting words that join words, phrases, or clauses together. Think of them as bridges between ideas!
                  </p>
                  <p className="text-base leading-relaxed">
                    Common conjunctions include <strong>and</strong>, <strong>but</strong>, <strong>or</strong>, and <strong>because</strong>. 
                    They help make your sentences flow smoothly and show relationships between different parts of your thoughts.
                  </p>
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-green-500">
                    <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">Simple Example:</p>
                    <p className="text-gray-800 dark:text-white">"I like coffee <strong className="text-green-600 dark:text-green-400">and</strong> tea."</p>
                  </div>
                </div>
              </Accordion>

              <Accordion 
                title="Types of Conjunctions" 
                level="intermediate"
              >
                <div className="text-gray-700 dark:text-gray-300 space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg text-blue-600 dark:text-blue-400 mb-2">Coordinating Conjunctions</h4>
                    <p className="mb-2">Connect equal grammatical elements (words, phrases, or independent clauses).</p>
                    <div className="bg-white dark:bg-gray-700 p-3 rounded">
                      <p className="text-sm text-gray-800 dark:text-white">Examples: <strong>and, but, or, nor, for, yet, so</strong></p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">"I wanted to go, <strong>but</strong> I was tired."</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-blue-600 dark:text-blue-400 mb-2">Subordinating Conjunctions</h4>
                    <p className="mb-2">Connect a dependent clause to an independent clause, showing relationships like time, cause, or condition.</p>
                    <div className="bg-white dark:bg-gray-700 p-3 rounded">
                      <p className="text-sm text-gray-800 dark:text-white">Examples: <strong>because, although, when, if, while</strong></p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">"I stayed home <strong>because</strong> it was raining."</p>
                    </div>
                  </div>
                </div>
              </Accordion>

              <Accordion 
                title="Using Conjunctions in Complex Sentences" 
                level="advanced"
              >
                <div className="text-gray-700 dark:text-gray-300 space-y-4">
                  <p className="text-base leading-relaxed">
                    Advanced usage involves combining multiple conjunctions to create sophisticated sentences with multiple clauses.
                  </p>
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg space-y-3">
                    <div className="border-l-4 border-purple-500 pl-4">
                      <p className="text-sm font-semibold text-purple-700 dark:text-purple-400 mb-1">Multiple Clauses:</p>
                      <p className="text-gray-800 dark:text-white">
                        "I will go to the party <strong className="text-purple-600 dark:text-purple-400">if</strong> I finish my work, 
                        <strong className="text-purple-600 dark:text-purple-400"> but</strong> I might leave early 
                        <strong className="text-purple-600 dark:text-purple-400"> because</strong> I have an early meeting."
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <p className="text-sm font-semibold text-purple-700 dark:text-purple-400 mb-1">Correlative Pairs:</p>
                      <p className="text-gray-800 dark:text-white">
                        "<strong className="text-purple-600 dark:text-purple-400">Either</strong> we leave now 
                        <strong className="text-purple-600 dark:text-purple-400">or</strong> we miss the train."
                      </p>
                    </div>
                  </div>
                </div>
              </Accordion>
            </motion.div>

            {/* Country Examples with Conjunctions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-gradient-to-r from-indigo-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 rounded-lg shadow-md p-6 mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <span>🌍</span>
                <span>Conjunctions with Countries</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Practice using conjunctions with country names in {selectedLanguage.name}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentCountryExamples.slice(0, 6).map((example, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <p className="font-semibold text-gray-800 dark:text-white mb-1">
                      {example.sentence}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {example.translation}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

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
                  <div className="flex items-center gap-4 mb-4 flex-wrap">
                    <Tooltip content={conjunction.tooltip} position="top">
                      <div className="bg-gradient-to-r from-indigo-500 to-teal-500 text-white px-6 py-3 rounded-lg font-bold text-xl">
                        {conjunction.word}
                      </div>
                    </Tooltip>
                    <div className="text-gray-600 dark:text-gray-400 text-lg">
                      = {conjunction.english}
                    </div>
                    <LevelBadge level={conjunction.level} />
                  </div>

                  <div className="space-y-3">
                    {conjunction.examples.map((example, exIndex) => (
                      <motion.div
                        key={exIndex}
                        whileHover={{ x: 5 }}
                        className="p-4 bg-gradient-to-r from-indigo-50 to-teal-50 dark:from-gray-700 dark:to-gray-700 rounded-lg"
                      >
                        <p className="font-medium text-gray-800 dark:text-white mb-1">
                          {example.text}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {example.translation}
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
