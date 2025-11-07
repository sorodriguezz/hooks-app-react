export interface ScrambleWordsState {
  currentWord: string;
  errorCounter: number;
  guess: string;
  isGameOver: boolean;
  maxAllowErrors: number;
  maxSkips: number;
  points: number;
  scrambledWord: string;
  skipCounter: number;
  words: string[];
  totalWords: number;
}

const GAME_WORDS = [
  "REACT",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "HTML",
  "ANGULAR",
  "SOLID",
  "NODE",
  "VUEJS",
  "SVELTE",
  "EXPRESS",
  "MONGODB",
  "POSTGRES",
  "DOCKER",
  "KUBERNETES",
  "WEBPACK",
  "VITE",
  "TAILWIND",
];

// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = "") => {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

export const getInitialState = (): ScrambleWordsState => {
  const shuffledWords = shuffleArray([...GAME_WORDS]);

  return {
    currentWord: shuffledWords[0],
    errorCounter: 0,
    guess: "",
    isGameOver: false,
    maxAllowErrors: 3,
    maxSkips: 3,
    points: 0,
    scrambledWord: scrambleWord(shuffledWords[0]),
    skipCounter: 0,
    words: shuffledWords,
    totalWords: shuffledWords.length,
  };
};

export type ScrambleWordsAction =
  | { type: "SET_GUEST"; payload: string }
  | { type: "CHECK_ANSWER" }
  | { type: "START_NEW_GAME"; payload: ScrambleWordsState }
  | { type: "SKIP_WORD" };

export const scrambledWordsReducer = (
  state: ScrambleWordsState,
  action: ScrambleWordsAction
): ScrambleWordsState => {
  switch (action.type) {
    case "SET_GUEST":
      return {
        ...state,
        guess: action.payload.trim().toUpperCase(),
      };
    case "CHECK_ANSWER": {
      if (state.guess === state.currentWord) {
        const nextWords = state.words.slice(1);

        return {
          ...state,
          words: nextWords,
          points: state.points + 1,
          guess: "",
          currentWord: nextWords[0],
          scrambledWord: scrambleWord(nextWords[0]),
        };
      }

      const newErrorCount = state.errorCounter + 1;

      return {
        ...state,
        guess: "",
        errorCounter: newErrorCount,
        isGameOver: newErrorCount >= state.maxAllowErrors,
      };
    }
    case "SKIP_WORD": {
      if (state.skipCounter >= state.maxSkips) return state;

      const nextWords = state.words.slice(1);

      return {
        ...state,
        words: nextWords,
        skipCounter: state.skipCounter + 1,
        guess: "",
        currentWord: nextWords[0],
        scrambledWord: scrambleWord(nextWords[0]),
      };
    }
    case "START_NEW_GAME":
      return action.payload;
    default:
      return state;
  }
};
