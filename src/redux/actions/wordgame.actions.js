// - Wordle piece of state
//     - Words guessed
//         - Letters guessed
//             - Current Word
//                 - Guess theyre on

export const SET_CURRENT_WORD = "SET_CURRENT_WORD"
export const ADD_GUESS_NUMBER = "ADD_GUESS_NUMBER"
export const ADD_WORD_GUESS = "ADD_WORD_GUESS"
export const ADD_LETTERS_GUESS = "ADD_LETTERS_GUESS"
export const CLEAR_GUESS_NUMBER = "CLEAR_GUESS_NUMBER"
export const CLEAR_WORD_GUESS = "CLEAR_WORD_GUESS"
export const CLEAR_LETTER_GUESS = "CLEAR_LETTER_GUESS"

export const setCurrentWord = (randomWord) => {
    return { type: SET_CURRENT_WORD, randomWord }
}
export const addGuessNumber = () => {
    return { type: ADD_GUESS_NUMBER }
}
export const addWordGuess = (guessInput) => {
    return { type: ADD_WORD_GUESS, guessInput }
}
export const addLettersGuess = (splitGuessInput) => {
    return { type: ADD_LETTERS_GUESS, splitGuessInput }
}
export const clearGuessNumber = () => {
    return { type: CLEAR_GUESS_NUMBER }
}
export const clearWordGuess = () => {
    return { type: CLEAR_WORD_GUESS }
}
export const clearLetterGuess = () => {
    return { type: CLEAR_LETTER_GUESS }
}


