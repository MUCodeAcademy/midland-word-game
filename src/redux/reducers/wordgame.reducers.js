import {
    SET_CURRENT_WORD,
    ADD_GUESS_NUMBER,
    ADD_WORD_GUESS,
    ADD_LETTERS_GUESS,
    CLEAR_GUESS_NUMBER,
    CLEAR_WORD_GUESS,
    CLEAR_LETTER_GUESS,
} from "../actions/wordgame.actions"

const initialState = null

export default function wordgameReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_WORD:
            return { ...state, currentWord: [...state.currentWord, action.randomWord] }
        case ADD_GUESS_NUMBER:
            return { ...state, guessNumber: { ...state.guessNumber + 1 } }
        case ADD_WORD_GUESS:
            return { ...state, wordsGuessed: [...state.wordsGuessed, action.guessInput] }
        case ADD_LETTERS_GUESS:
            return { ...state, lettersGuessed: [...state.lettersGuessed, splitGuessInput] }
        case CLEAR_GUESS_NUMBER:
            return { ...state, guessNumber: initialState }
        case CLEAR_WORD_GUESS:
            return { ...state, wordsGuessed: initialState }
        case CLEAR_LETTER_GUESS:
            return { ...state, lettersGuessed: initialState }
        default:
            return state;
    }
}