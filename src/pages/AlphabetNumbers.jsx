import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '../stores/languageStore';
import Accordion from '../components/ui/Accordion';
import Tooltip from '../components/ui/Tooltip';
import { countryExamples } from '../data/countryExamples';

function AlphabetNumbers() {
  const { selectedLanguage } = useLanguageStore();
  const [playingSound, setPlayingSound] = useState(null);

  // Complete alphabet data for all 7 languages
  const alphabetData = {
    es: [
      { letter: 'A', pronunciation: 'ah', example: 'Argentina' },
      { letter: 'B', pronunciation: 'beh', example: 'Brasil' },
      { letter: 'C', pronunciation: 'seh', example: 'Cuba' },
      { letter: 'D', pronunciation: 'deh', example: 'Dinamarca' },
      { letter: 'E', pronunciation: 'eh', example: 'España' },
      { letter: 'F', pronunciation: 'efeh', example: 'Francia' },
      { letter: 'G', pronunciation: 'heh', example: 'Guatemala' },
      { letter: 'H', pronunciation: 'acheh', example: 'Honduras' },
      { letter: 'I', pronunciation: 'ee', example: 'Italia' },
      { letter: 'J', pronunciation: 'hotah', example: 'Japón' },
      { letter: 'K', pronunciation: 'kah', example: 'Kazajistán' },
      { letter: 'L', pronunciation: 'eleh', example: 'Luxemburgo' },
      { letter: 'M', pronunciation: 'emeh', example: 'México' },
      { letter: 'N', pronunciation: 'eneh', example: 'Nicaragua' },
      { letter: 'Ñ', pronunciation: 'enyeh', example: 'España' },
      { letter: 'O', pronunciation: 'oh', example: 'Omán' },
      { letter: 'P', pronunciation: 'peh', example: 'Portugal' },
      { letter: 'Q', pronunciation: 'koo', example: 'Qatar' },
      { letter: 'R', pronunciation: 'ereh', example: 'Rusia' },
      { letter: 'S', pronunciation: 'eseh', example: 'Suiza' },
      { letter: 'T', pronunciation: 'teh', example: 'Turquía' },
      { letter: 'U', pronunciation: 'oo', example: 'Uruguay' },
      { letter: 'V', pronunciation: 'veh', example: 'Venezuela' },
      { letter: 'W', pronunciation: 'doble veh', example: 'Washington' },
      { letter: 'X', pronunciation: 'ekis', example: 'México' },
      { letter: 'Y', pronunciation: 'ye', example: 'Yemen' },
      { letter: 'Z', pronunciation: 'seta', example: 'Zambia' },
    ],
    fr: [
      { letter: 'A', pronunciation: 'ah', example: 'Allemagne' },
      { letter: 'B', pronunciation: 'beh', example: 'Belgique' },
      { letter: 'C', pronunciation: 'seh', example: 'Canada' },
      { letter: 'D', pronunciation: 'deh', example: 'Danemark' },
      { letter: 'E', pronunciation: 'euh', example: 'Espagne' },
      { letter: 'F', pronunciation: 'eff', example: 'France' },
      { letter: 'G', pronunciation: 'jheh', example: 'Grèce' },
      { letter: 'H', pronunciation: 'ash', example: 'Hongrie' },
      { letter: 'I', pronunciation: 'ee', example: 'Italie' },
      { letter: 'J', pronunciation: 'jhee', example: 'Japon' },
      { letter: 'K', pronunciation: 'kah', example: 'Kenya' },
      { letter: 'L', pronunciation: 'ell', example: 'Luxembourg' },
      { letter: 'M', pronunciation: 'emm', example: 'Mexique' },
      { letter: 'N', pronunciation: 'enn', example: 'Norvège' },
      { letter: 'O', pronunciation: 'oh', example: 'Oman' },
      { letter: 'P', pronunciation: 'peh', example: 'Portugal' },
      { letter: 'Q', pronunciation: 'kew', example: 'Qatar' },
      { letter: 'R', pronunciation: 'air', example: 'Russie' },
      { letter: 'S', pronunciation: 'ess', example: 'Suisse' },
      { letter: 'T', pronunciation: 'teh', example: 'Turquie' },
      { letter: 'U', pronunciation: 'ew', example: 'Uruguay' },
      { letter: 'V', pronunciation: 'veh', example: 'Vietnam' },
      { letter: 'W', pronunciation: 'doobl-veh', example: 'Washington' },
      { letter: 'X', pronunciation: 'eeks', example: 'Mexique' },
      { letter: 'Y', pronunciation: 'ee-grek', example: 'Yémen' },
      { letter: 'Z', pronunciation: 'zed', example: 'Zambie' },
    ],
    de: [
      { letter: 'A', pronunciation: 'ah', example: 'Amerika' },
      { letter: 'B', pronunciation: 'beh', example: 'Belgien' },
      { letter: 'C', pronunciation: 'tseh', example: 'China' },
      { letter: 'D', pronunciation: 'deh', example: 'Deutschland' },
      { letter: 'E', pronunciation: 'eh', example: 'England' },
      { letter: 'F', pronunciation: 'eff', example: 'Frankreich' },
      { letter: 'G', pronunciation: 'geh', example: 'Griechenland' },
      { letter: 'H', pronunciation: 'hah', example: 'Holland' },
      { letter: 'I', pronunciation: 'ee', example: 'Italien' },
      { letter: 'J', pronunciation: 'yot', example: 'Japan' },
      { letter: 'K', pronunciation: 'kah', example: 'Kanada' },
      { letter: 'L', pronunciation: 'ell', example: 'Luxemburg' },
      { letter: 'M', pronunciation: 'emm', example: 'Mexiko' },
      { letter: 'N', pronunciation: 'enn', example: 'Norwegen' },
      { letter: 'O', pronunciation: 'oh', example: 'Österreich' },
      { letter: 'P', pronunciation: 'peh', example: 'Portugal' },
      { letter: 'Q', pronunciation: 'koo', example: 'Katar' },
      { letter: 'R', pronunciation: 'err', example: 'Russland' },
      { letter: 'S', pronunciation: 'ess', example: 'Spanien' },
      { letter: 'T', pronunciation: 'teh', example: 'Türkei' },
      { letter: 'U', pronunciation: 'oo', example: 'Uruguay' },
      { letter: 'V', pronunciation: 'fow', example: 'Vietnam' },
      { letter: 'W', pronunciation: 'veh', example: 'Wales' },
      { letter: 'X', pronunciation: 'iks', example: 'Mexiko' },
      { letter: 'Y', pronunciation: 'üpsilon', example: 'Ypern' },
      { letter: 'Z', pronunciation: 'tset', example: 'Zypern' },
    ],
    it: [
      { letter: 'A', pronunciation: 'ah', example: 'Austria' },
      { letter: 'B', pronunciation: 'bee', example: 'Brasile' },
      { letter: 'C', pronunciation: 'chee', example: 'Cina' },
      { letter: 'D', pronunciation: 'dee', example: 'Danimarca' },
      { letter: 'E', pronunciation: 'eh', example: 'Egitto' },
      { letter: 'F', pronunciation: 'effe', example: 'Francia' },
      { letter: 'G', pronunciation: 'jee', example: 'Germania' },
      { letter: 'H', pronunciation: 'acca', example: 'Olanda' },
      { letter: 'I', pronunciation: 'ee', example: 'Italia' },
      { letter: 'J', pronunciation: 'ee lunga', example: 'Giappone' },
      { letter: 'K', pronunciation: 'cappa', example: 'Kenya' },
      { letter: 'L', pronunciation: 'elle', example: 'Lussemburgo' },
      { letter: 'M', pronunciation: 'emme', example: 'Messico' },
      { letter: 'N', pronunciation: 'enne', example: 'Norvegia' },
      { letter: 'O', pronunciation: 'oh', example: 'Oman' },
      { letter: 'P', pronunciation: 'pee', example: 'Portogallo' },
      { letter: 'Q', pronunciation: 'coo', example: 'Qatar' },
      { letter: 'R', pronunciation: 'erre', example: 'Russia' },
      { letter: 'S', pronunciation: 'esse', example: 'Spagna' },
      { letter: 'T', pronunciation: 'tee', example: 'Turchia' },
      { letter: 'U', pronunciation: 'oo', example: 'Uruguay' },
      { letter: 'V', pronunciation: 'vee', example: 'Vietnam' },
      { letter: 'W', pronunciation: 'doppia voo', example: 'Washington' },
      { letter: 'X', pronunciation: 'iks', example: 'Messico' },
      { letter: 'Y', pronunciation: 'ipsilon', example: 'Yemen' },
      { letter: 'Z', pronunciation: 'zeta', example: 'Zambia' },
    ],
    ar: [
      { letter: 'ا', pronunciation: 'alif', example: 'الإمارات' },
      { letter: 'ب', pronunciation: 'ba', example: 'البحرين' },
      { letter: 'ت', pronunciation: 'ta', example: 'تونس' },
      { letter: 'ث', pronunciation: 'tha', example: 'ثقافة' },
      { letter: 'ج', pronunciation: 'jim', example: 'الجزائر' },
      { letter: 'ح', pronunciation: 'ha', example: 'حرف' },
      { letter: 'خ', pronunciation: 'kha', example: 'خليج' },
      { letter: 'د', pronunciation: 'dal', example: 'دبي' },
      { letter: 'ذ', pronunciation: 'thal', example: 'ذهب' },
      { letter: 'ر', pronunciation: 'ra', example: 'رياض' },
      { letter: 'ز', pronunciation: 'zay', example: 'زمن' },
      { letter: 'س', pronunciation: 'sin', example: 'سوريا' },
      { letter: 'ش', pronunciation: 'shin', example: 'شمس' },
      { letter: 'ص', pronunciation: 'sad', example: 'صحراء' },
      { letter: 'ض', pronunciation: 'dad', example: 'ضوء' },
      { letter: 'ط', pronunciation: 'ta', example: 'طريق' },
      { letter: 'ظ', pronunciation: 'za', example: 'ظهر' },
      { letter: 'ع', pronunciation: 'ain', example: 'عمان' },
      { letter: 'غ', pronunciation: 'ghain', example: 'غرب' },
      { letter: 'ف', pronunciation: 'fa', example: 'فرنسا' },
      { letter: 'ق', pronunciation: 'qaf', example: 'قطر' },
      { letter: 'ك', pronunciation: 'kaf', example: 'كويت' },
      { letter: 'ل', pronunciation: 'lam', example: 'لبنان' },
      { letter: 'م', pronunciation: 'mim', example: 'مصر' },
      { letter: 'ن', pronunciation: 'nun', example: 'نيل' },
      { letter: 'ه', pronunciation: 'ha', example: 'هند' },
      { letter: 'و', pronunciation: 'waw', example: 'وطن' },
      { letter: 'ي', pronunciation: 'ya', example: 'يمن' },
    ],
    ja: [
      { letter: 'あ', pronunciation: 'a', example: 'アメリカ' },
      { letter: 'い', pronunciation: 'i', example: 'イタリア' },
      { letter: 'う', pronunciation: 'u', example: 'ウクライナ' },
      { letter: 'え', pronunciation: 'e', example: 'エジプト' },
      { letter: 'お', pronunciation: 'o', example: 'オランダ' },
      { letter: 'か', pronunciation: 'ka', example: 'カナダ' },
      { letter: 'き', pronunciation: 'ki', example: 'キプロス' },
      { letter: 'く', pronunciation: 'ku', example: 'クウェート' },
      { letter: 'け', pronunciation: 'ke', example: 'ケニア' },
      { letter: 'こ', pronunciation: 'ko', example: 'コロンビア' },
      { letter: 'さ', pronunciation: 'sa', example: 'サウジ' },
      { letter: 'し', pronunciation: 'shi', example: 'シリア' },
      { letter: 'す', pronunciation: 'su', example: 'スペイン' },
      { letter: 'せ', pronunciation: 'se', example: 'セルビア' },
      { letter: 'そ', pronunciation: 'so', example: 'ソマリア' },
      { letter: 'た', pronunciation: 'ta', example: 'タイ' },
      { letter: 'ち', pronunciation: 'chi', example: 'チリ' },
      { letter: 'つ', pronunciation: 'tsu', example: 'ツバル' },
      { letter: 'て', pronunciation: 'te', example: 'デンマーク' },
      { letter: 'と', pronunciation: 'to', example: 'トルコ' },
      { letter: 'な', pronunciation: 'na', example: 'ナイジェリア' },
      { letter: 'に', pronunciation: 'ni', example: '日本' },
      { letter: 'ぬ', pronunciation: 'nu', example: 'ヌーク' },
      { letter: 'ね', pronunciation: 'ne', example: 'ネパール' },
      { letter: 'の', pronunciation: 'no', example: 'ノルウェー' },
      { letter: 'は', pronunciation: 'ha', example: 'ハンガリー' },
      { letter: 'ひ', pronunciation: 'hi', example: 'フィリピン' },
      { letter: 'ふ', pronunciation: 'fu', example: 'フランス' },
      { letter: 'へ', pronunciation: 'he', example: 'ベルギー' },
      { letter: 'ほ', pronunciation: 'ho', example: 'ポーランド' },
      { letter: 'ま', pronunciation: 'ma', example: 'マレーシア' },
      { letter: 'み', pronunciation: 'mi', example: 'ミャンマー' },
      { letter: 'む', pronunciation: 'mu', example: 'ムンバイ' },
      { letter: 'め', pronunciation: 'me', example: 'メキシコ' },
      { letter: 'も', pronunciation: 'mo', example: 'モンゴル' },
      { letter: 'や', pronunciation: 'ya', example: 'ヤンゴン' },
      { letter: 'ゆ', pronunciation: 'yu', example: 'ユーゴ' },
      { letter: 'よ', pronunciation: 'yo', example: 'ヨルダン' },
      { letter: 'ら', pronunciation: 'ra', example: 'ラオス' },
      { letter: 'り', pronunciation: 'ri', example: 'リビア' },
      { letter: 'る', pronunciation: 'ru', example: 'ルーマニア' },
      { letter: 'れ', pronunciation: 're', example: 'レバノン' },
      { letter: 'ろ', pronunciation: 'ro', example: 'ロシア' },
      { letter: 'わ', pronunciation: 'wa', example: 'ワシントン' },
      { letter: 'を', pronunciation: 'wo', example: '助詞' },
      { letter: 'ん', pronunciation: 'n', example: 'ロンドン' },
    ],
    ko: [
      { letter: 'ㄱ', pronunciation: 'giyeok', example: '가나' },
      { letter: 'ㄴ', pronunciation: 'nieun', example: '나라' },
      { letter: 'ㄷ', pronunciation: 'digeut', example: '독일' },
      { letter: 'ㄹ', pronunciation: 'rieul', example: '러시아' },
      { letter: 'ㅁ', pronunciation: 'mieum', example: '미국' },
      { letter: 'ㅂ', pronunciation: 'bieup', example: '브라질' },
      { letter: 'ㅅ', pronunciation: 'siot', example: '스페인' },
      { letter: 'ㅇ', pronunciation: 'ieung', example: '영국' },
      { letter: 'ㅈ', pronunciation: 'jieut', example: '일본' },
      { letter: 'ㅊ', pronunciation: 'chieut', example: '체코' },
      { letter: 'ㅋ', pronunciation: 'kieuk', example: '캐나다' },
      { letter: 'ㅌ', pronunciation: 'tieut', example: '터키' },
      { letter: 'ㅍ', pronunciation: 'pieup', example: '프랑스' },
      { letter: 'ㅎ', pronunciation: 'hieut', example: '한국' },
      { letter: 'ㅏ', pronunciation: 'a', example: '아르헨티나' },
      { letter: 'ㅑ', pronunciation: 'ya', example: '야구' },
      { letter: 'ㅓ', pronunciation: 'eo', example: '에콰도르' },
      { letter: 'ㅕ', pronunciation: 'yeo', example: '여행' },
      { letter: 'ㅗ', pronunciation: 'o', example: '오스트리아' },
      { letter: 'ㅛ', pronunciation: 'yo', example: '요르단' },
      { letter: 'ㅜ', pronunciation: 'u', example: '우루과이' },
      { letter: 'ㅠ', pronunciation: 'yu', example: '유럽' },
      { letter: 'ㅡ', pronunciation: 'eu', example: '그리스' },
      { letter: 'ㅣ', pronunciation: 'i', example: '이탈리아' },
    ],
  };

  const numbersData = {
    es: [
      { num: 1, word: 'uno' },
      { num: 2, word: 'dos' },
      { num: 3, word: 'tres' },
      { num: 4, word: 'cuatro' },
      { num: 5, word: 'cinco' },
      { num: 6, word: 'seis' },
      { num: 7, word: 'siete' },
      { num: 8, word: 'ocho' },
      { num: 9, word: 'nueve' },
      { num: 10, word: 'diez' },
      { num: 11, word: 'once' },
      { num: 12, word: 'doce' },
      { num: 13, word: 'trece' },
      { num: 14, word: 'catorce' },
      { num: 15, word: 'quince' },
      { num: 16, word: 'dieciséis' },
      { num: 17, word: 'diecisiete' },
      { num: 18, word: 'dieciocho' },
      { num: 19, word: 'diecinueve' },
      { num: 20, word: 'veinte' },
      { num: 30, word: 'treinta' },
      { num: 40, word: 'cuarenta' },
      { num: 50, word: 'cincuenta' },
      { num: 60, word: 'sesenta' },
      { num: 70, word: 'setenta' },
      { num: 80, word: 'ochenta' },
      { num: 90, word: 'noventa' },
      { num: 100, word: 'cien' },
      { num: 200, word: 'doscientos' },
      { num: 1000, word: 'mil' },
    ],
    fr: [
      { num: 1, word: 'un' },
      { num: 2, word: 'deux' },
      { num: 3, word: 'trois' },
      { num: 4, word: 'quatre' },
      { num: 5, word: 'cinq' },
      { num: 6, word: 'six' },
      { num: 7, word: 'sept' },
      { num: 8, word: 'huit' },
      { num: 9, word: 'neuf' },
      { num: 10, word: 'dix' },
      { num: 11, word: 'onze' },
      { num: 12, word: 'douze' },
      { num: 13, word: 'treize' },
      { num: 14, word: 'quatorze' },
      { num: 15, word: 'quinze' },
      { num: 16, word: 'seize' },
      { num: 17, word: 'dix-sept' },
      { num: 18, word: 'dix-huit' },
      { num: 19, word: 'dix-neuf' },
      { num: 20, word: 'vingt' },
      { num: 30, word: 'trente' },
      { num: 40, word: 'quarante' },
      { num: 50, word: 'cinquante' },
      { num: 60, word: 'soixante' },
      { num: 70, word: 'soixante-dix' },
      { num: 80, word: 'quatre-vingts' },
      { num: 90, word: 'quatre-vingt-dix' },
      { num: 100, word: 'cent' },
      { num: 200, word: 'deux cents' },
      { num: 1000, word: 'mille' },
    ],
    de: [
      { num: 1, word: 'eins' },
      { num: 2, word: 'zwei' },
      { num: 3, word: 'drei' },
      { num: 4, word: 'vier' },
      { num: 5, word: 'fünf' },
      { num: 6, word: 'sechs' },
      { num: 7, word: 'sieben' },
      { num: 8, word: 'acht' },
      { num: 9, word: 'neun' },
      { num: 10, word: 'zehn' },
      { num: 11, word: 'elf' },
      { num: 12, word: 'zwölf' },
      { num: 13, word: 'dreizehn' },
      { num: 14, word: 'vierzehn' },
      { num: 15, word: 'fünfzehn' },
      { num: 16, word: 'sechzehn' },
      { num: 17, word: 'siebzehn' },
      { num: 18, word: 'achtzehn' },
      { num: 19, word: 'neunzehn' },
      { num: 20, word: 'zwanzig' },
      { num: 30, word: 'dreißig' },
      { num: 40, word: 'vierzig' },
      { num: 50, word: 'fünfzig' },
      { num: 60, word: 'sechzig' },
      { num: 70, word: 'siebzig' },
      { num: 80, word: 'achtzig' },
      { num: 90, word: 'neunzig' },
      { num: 100, word: 'hundert' },
      { num: 200, word: 'zweihundert' },
      { num: 1000, word: 'tausend' },
    ],
    it: [
      { num: 1, word: 'uno' },
      { num: 2, word: 'due' },
      { num: 3, word: 'tre' },
      { num: 4, word: 'quattro' },
      { num: 5, word: 'cinque' },
      { num: 6, word: 'sei' },
      { num: 7, word: 'sette' },
      { num: 8, word: 'otto' },
      { num: 9, word: 'nove' },
      { num: 10, word: 'dieci' },
      { num: 11, word: 'undici' },
      { num: 12, word: 'dodici' },
      { num: 13, word: 'tredici' },
      { num: 14, word: 'quattordici' },
      { num: 15, word: 'quindici' },
      { num: 16, word: 'sedici' },
      { num: 17, word: 'diciassette' },
      { num: 18, word: 'diciotto' },
      { num: 19, word: 'diciannove' },
      { num: 20, word: 'venti' },
      { num: 30, word: 'trenta' },
      { num: 40, word: 'quaranta' },
      { num: 50, word: 'cinquanta' },
      { num: 60, word: 'sessanta' },
      { num: 70, word: 'settanta' },
      { num: 80, word: 'ottanta' },
      { num: 90, word: 'novanta' },
      { num: 100, word: 'cento' },
      { num: 200, word: 'duecento' },
      { num: 1000, word: 'mille' },
    ],
    ar: [
      { num: 1, word: 'واحد' },
      { num: 2, word: 'اثنان' },
      { num: 3, word: 'ثلاثة' },
      { num: 4, word: 'أربعة' },
      { num: 5, word: 'خمسة' },
      { num: 6, word: 'ستة' },
      { num: 7, word: 'سبعة' },
      { num: 8, word: 'ثمانية' },
      { num: 9, word: 'تسعة' },
      { num: 10, word: 'عشرة' },
      { num: 11, word: 'أحد عشر' },
      { num: 12, word: 'اثنا عشر' },
      { num: 13, word: 'ثلاثة عشر' },
      { num: 14, word: 'أربعة عشر' },
      { num: 15, word: 'خمسة عشر' },
      { num: 16, word: 'ستة عشر' },
      { num: 17, word: 'سبعة عشر' },
      { num: 18, word: 'ثمانية عشر' },
      { num: 19, word: 'تسعة عشر' },
      { num: 20, word: 'عشرون' },
      { num: 30, word: 'ثلاثون' },
      { num: 40, word: 'أربعون' },
      { num: 50, word: 'خمسون' },
      { num: 60, word: 'ستون' },
      { num: 70, word: 'سبعون' },
      { num: 80, word: 'ثمانون' },
      { num: 90, word: 'تسعون' },
      { num: 100, word: 'مئة' },
      { num: 200, word: 'مئتان' },
      { num: 1000, word: 'ألف' },
    ],
    ja: [
      { num: 1, word: '一 (いち)' },
      { num: 2, word: '二 (に)' },
      { num: 3, word: '三 (さん)' },
      { num: 4, word: '四 (よん)' },
      { num: 5, word: '五 (ご)' },
      { num: 6, word: '六 (ろく)' },
      { num: 7, word: '七 (なな)' },
      { num: 8, word: '八 (はち)' },
      { num: 9, word: '九 (きゅう)' },
      { num: 10, word: '十 (じゅう)' },
      { num: 11, word: '十一 (じゅういち)' },
      { num: 12, word: '十二 (じゅうに)' },
      { num: 13, word: '十三 (じゅうさん)' },
      { num: 14, word: '十四 (じゅうよん)' },
      { num: 15, word: '十五 (じゅうご)' },
      { num: 16, word: '十六 (じゅうろく)' },
      { num: 17, word: '十七 (じゅうなな)' },
      { num: 18, word: '十八 (じゅうはち)' },
      { num: 19, word: '十九 (じゅうきゅう)' },
      { num: 20, word: '二十 (にじゅう)' },
      { num: 30, word: '三十 (さんじゅう)' },
      { num: 40, word: '四十 (よんじゅう)' },
      { num: 50, word: '五十 (ごじゅう)' },
      { num: 60, word: '六十 (ろくじゅう)' },
      { num: 70, word: '七十 (ななじゅう)' },
      { num: 80, word: '八十 (はちじゅう)' },
      { num: 90, word: '九十 (きゅうじゅう)' },
      { num: 100, word: '百 (ひゃく)' },
      { num: 200, word: '二百 (にひゃく)' },
      { num: 1000, word: '千 (せん)' },
    ],
    ko: [
      { num: 1, word: '일 (il)' },
      { num: 2, word: '이 (i)' },
      { num: 3, word: '삼 (sam)' },
      { num: 4, word: '사 (sa)' },
      { num: 5, word: '오 (o)' },
      { num: 6, word: '육 (yuk)' },
      { num: 7, word: '칠 (chil)' },
      { num: 8, word: '팔 (pal)' },
      { num: 9, word: '구 (gu)' },
      { num: 10, word: '십 (sip)' },
      { num: 11, word: '십일 (sip-il)' },
      { num: 12, word: '십이 (sip-i)' },
      { num: 13, word: '십삼 (sip-sam)' },
      { num: 14, word: '십사 (sip-sa)' },
      { num: 15, word: '십오 (sip-o)' },
      { num: 16, word: '십육 (sip-yuk)' },
      { num: 17, word: '십칠 (sip-chil)' },
      { num: 18, word: '십팔 (sip-pal)' },
      { num: 19, word: '십구 (sip-gu)' },
      { num: 20, word: '이십 (i-sip)' },
      { num: 30, word: '삼십 (sam-sip)' },
      { num: 40, word: '사십 (sa-sip)' },
      { num: 50, word: '오십 (o-sip)' },
      { num: 60, word: '육십 (yuk-sip)' },
      { num: 70, word: '칠십 (chil-sip)' },
      { num: 80, word: '팔십 (pal-sip)' },
      { num: 90, word: '구십 (gu-sip)' },
      { num: 100, word: '백 (baek)' },
      { num: 200, word: '이백 (i-baek)' },
      { num: 1000, word: '천 (cheon)' },
    ],
  };

  const alphabet = alphabetData[selectedLanguage.code] || alphabetData.es;
  const numbers = numbersData[selectedLanguage.code] || numbersData.es;
  const examples = countryExamples[selectedLanguage.code] || countryExamples.es;

  const speechLanguageMap = {
    es: 'es-ES',
    fr: 'fr-FR',
    de: 'de-DE',
    it: 'it-IT',
    ar: 'ar-SA',
    ja: 'ja-JP',
    ko: 'ko-KR',
  };

  const speak = (text, index) => {
    if ('speechSynthesis' in window) {
      setPlayingSound(index);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = speechLanguageMap[selectedLanguage.code] || 'en-US';
      utterance.onend = () => setPlayingSound(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const educationalContent = {
    es: {
      beginner: {
        title: 'Aprendiendo el Alfabeto',
        content: 'El alfabeto español tiene 27 letras, incluyendo la Ñ. Cada letra tiene un sonido específico. La pronunciación es más consistente que en inglés - cada letra normalmente suena de la misma manera.'
      },
      intermediate: {
        title: 'Usando Letras en Palabras',
        content: 'Las letras se combinan para formar nombres de países y otras palabras. Por ejemplo: "España" usa E-s-p-a-ñ-a. Las vocales (A, E, I, O, U) siempre se pronuncian de la misma manera.'
      },
      advanced: {
        title: 'Patrones de Ortografía y Pronunciación',
        content: 'Reglas avanzadas: "C" antes de "e" o "i" suena como "th" (España) o "s" (América Latina). "G" antes de "e" o "i" suena como "h". La "H" es siempre silenciosa. La "LL" suena como "y" o "j" según la región.'
      }
    },
    fr: {
      beginner: {
        title: 'Apprendre l\'Alphabet',
        content: 'L\'alphabet français a 26 lettres. Beaucoup de lettres ont des accents (é, è, ê, ë). La prononciation peut être difficile pour les débutants car de nombreuses lettres finales sont silencieuses.'
      },
      intermediate: {
        title: 'Utiliser les Lettres dans les Mots',
        content: 'Les lettres se combinent pour former des mots. Par exemple: "France" utilise F-r-a-n-c-e. Notez que le "e" final est généralement silencieux. Les accents changent la prononciation.'
      },
      advanced: {
        title: 'Modèles d\'Orthographe et de Prononciation',
        content: 'Règles avancées: Les liaisons connectent les mots. "Ch" se prononce "sh". "Gn" se prononce comme "ny" dans canyon. De nombreuses lettres finales sont silencieuses (s, t, x, z).'
      }
    },
    de: {
      beginner: {
        title: 'Das Alphabet Lernen',
        content: 'Das deutsche Alphabet hat 26 Buchstaben plus Umlaute (ä, ö, ü) und das Eszett (ß). Die Aussprache ist relativ konsistent und folgt festen Regeln.'
      },
      intermediate: {
        title: 'Buchstaben in Wörtern Verwenden',
        content: 'Buchstaben kombinieren sich zu Wörtern. Zum Beispiel: "Deutschland" benutzt D-e-u-t-s-c-h-l-a-n-d. Umlaute ändern den Vokalklang komplett.'
      },
      advanced: {
        title: 'Rechtschreib- und Ausspracheregeln',
        content: 'Erweiterte Regeln: "Ch" kann hart oder weich sein. "Sch" klingt wie englisches "sh". "W" wird wie englisches "v" ausgesprochen. "Z" klingt wie "ts".'
      }
    },
    it: {
      beginner: {
        title: 'Imparare l\'Alfabeto',
        content: 'L\'alfabeto italiano ha 21 lettere native. J, K, W, X, Y vengono usate solo per parole straniere. La pronunciazione è molto regolare e fonetica.'
      },
      intermediate: {
        title: 'Usare le Lettere nelle Parole',
        content: 'Le lettere si combinano per formare parole. Per esempio: "Italia" usa I-t-a-l-i-a. Le vocali sono sempre pronunciate chiaramente. Le doppie consonanti sono importanti.'
      },
      advanced: {
        title: 'Modelli di Ortografia e Pronuncia',
        content: 'Regole avanzate: "Gli" suona come "lli". "Gn" suona come "ny". "Sc" prima di "e" o "i" suona come "sh". Le doppie consonanti si pronunciano più lunghe.'
      }
    },
    ar: {
      beginner: {
        title: 'تعلم الأبجدية',
        content: 'الأبجدية العربية تحتوي على 28 حرفًا. تُكتب العربية من اليمين إلى اليسار. كل حرف له أشكال مختلفة حسب موقعه في الكلمة (بداية، وسط، نهاية).'
      },
      intermediate: {
        title: 'استخدام الحروف في الكلمات',
        content: 'الحروف تتحد لتكوين الكلمات. مثلاً: "الإمارات" تستخدم ا-ل-إ-م-ا-ر-ا-ت. الحركات (الفتحة، الضمة، الكسرة) تغير النطق.'
      },
      advanced: {
        title: 'قواعد الإملاء والنطق',
        content: 'قواعد متقدمة: بعض الحروف لها نطق مشابه للمبتدئين (ت، ط). الشمسية والقمرية تؤثر على نطق "ال". التنوين يضيف نون في النهاية.'
      }
    },
    ja: {
      beginner: {
        title: 'アルファベットを学ぶ',
        content: 'ひらがなには46文字あります。各文字は一つの音を表します。カタカナは外国語の単語に使用されます。漢字もありますが、ひらがなから始めましょう。'
      },
      intermediate: {
        title: '単語で文字を使う',
        content: '文字が組み合わさって単語を作ります。例：「日本」はに-ほ-んを使います。ひらがなは日本語の単語に、カタカナは外国の名前に使われます。'
      },
      advanced: {
        title: 'つづりと発音のパターン',
        content: '上級ルール：濁音（゛）と半濁音（゜）が音を変えます。長音（ー）は母音を伸ばします。促音（っ）は一拍の休止です。'
      }
    },
    ko: {
      beginner: {
        title: '알파벳 배우기',
        content: '한글은 24개의 기본 글자가 있습니다 (14개 자음, 10개 모음). 글자들은 음절 블록으로 결합됩니다. 한글은 매우 체계적이고 배우기 쉽습니다.'
      },
      intermediate: {
        title: '단어에서 글자 사용하기',
        content: '글자들이 결합하여 단어를 만듭니다. 예: "한국"은 ㅎ-ㅏ-ㄴ-ㄱ-ㅜ-ㄱ을 사용합니다. 자음과 모음이 음절 블록으로 결합됩니다.'
      },
      advanced: {
        title: '철자와 발음 패턴',
        content: '고급 규칙: 받침 (final consonants)은 단어 끝에서 소리가 변합니다. 연음 현상이 발생합니다. 경음과 격음을 구별하는 것이 중요합니다.'
      }
    }
  };

  const content = educationalContent[selectedLanguage.code] || educationalContent.es;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2"
        >
          Basics: Alphabet & Numbers
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-400 mb-8"
        >
          Learn the alphabet and numbers in {selectedLanguage.name}
        </motion.p>

        {/* Educational Accordion Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8 space-y-4"
        >
          <Accordion title={content.beginner.title} level="beginner" defaultOpen={true}>
            <p className="text-gray-700 dark:text-gray-300">{content.beginner.content}</p>
          </Accordion>
          
          <Accordion title={content.intermediate.title} level="intermediate">
            <p className="text-gray-700 dark:text-gray-300 mb-4">{content.intermediate.content}</p>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Country Name Examples:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {examples.slice(0, 4).map((ex, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                    <span className="font-medium text-blue-600 dark:text-blue-400">{ex.country}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">({ex.english})</span>
                  </div>
                ))}
              </div>
            </div>
          </Accordion>
          
          <Accordion title={content.advanced.title} level="advanced">
            <p className="text-gray-700 dark:text-gray-300">{content.advanced.content}</p>
          </Accordion>
        </motion.div>

        {/* Alphabet Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <span>🔤</span> Alphabet
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {alphabet.map((item, index) => (
              <Tooltip 
                key={index} 
                content={
                  <div className="text-center">
                    <div className="font-semibold mb-1">Example: {item.example}</div>
                    <div className="text-xs opacity-80">Click to hear pronunciation</div>
                  </div>
                }
                position="top"
              >
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.02 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => speak(item.letter, `alpha-${index}`)}
                  className={`w-full p-4 rounded-lg shadow-md transition-all ${
                    playingSound === `alpha-${index}`
                      ? 'bg-gradient-to-br from-teal-500 to-blue-500 text-white'
                      : 'bg-gradient-to-br from-teal-100 to-blue-100 dark:from-teal-900 dark:to-blue-900 hover:from-teal-200 hover:to-blue-200 dark:hover:from-teal-800 dark:hover:to-blue-800'
                  }`}
                >
                  <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                    {item.letter}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {item.pronunciation}
                  </div>
                </motion.button>
              </Tooltip>
            ))}
          </div>
        </motion.div>

        {/* Numbers Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <span>🔢</span> Numbers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {numbers.map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.02 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => speak(item.word, `num-${index}`)}
                className={`p-4 rounded-lg shadow-md transition-all ${
                  playingSound === `num-${index}`
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                    : 'bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-800 dark:hover:to-cyan-800'
                }`}
              >
                <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  {item.num}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  {item.word}
                </div>
              </motion.button>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-2 border-blue-200 dark:border-blue-700"
          >
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <span className="font-bold">💡 Tip:</span> Click on any letter or number to hear its pronunciation using text-to-speech.
              Hover over alphabet letters to see example words from country names.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default AlphabetNumbers;
