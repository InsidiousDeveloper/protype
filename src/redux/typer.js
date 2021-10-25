import { DROP_SPACE, SET_CORRECT_WORD, SET_FOCUS_WORD, SET_KEYBOARD_HIT, SET_PAGE, SET_RANDOM_NUMBERS, SET_SPACE_PRESSED, SET_WRONG_WORD, TOGGLE_TEST } from "./types"

const initialState = {
    randomNumbers: [],
    page: 1,
    isStarted: false,
    focusWord: {},
    correctWordsNum: 0,
    wrongWordsNum: 0,
    totalKeyboardHits: 0,
    spacePressed: 0
}

export const typerReducer = (state = initialState, action) => {
    switch (action.type) {
        case DROP_SPACE:
            return {...state, spacePressed: action.payload}
        case SET_PAGE:
            return {...state, page: state.page + 1}
        case SET_FOCUS_WORD:
            return {...state, focusWord: action.payload}
        case SET_CORRECT_WORD:
            return { ...state, correctWordsNum: state.correctWordsNum + 1 }
        case SET_WRONG_WORD:
            return { ...state, wrongWordsNum: state.wrongWordsNum + 1 }
        case SET_KEYBOARD_HIT:
            return { ...state, totalKeyboardHits: state.totalKeyboardHits + 1 }
        case SET_SPACE_PRESSED:
            return { ...state, spacePressed: state.spacePressed + 1 }
        case SET_RANDOM_NUMBERS:
            return { ...state, randomNumbers: action.payload }
        case TOGGLE_TEST:
            return { ...state, isStarted: action.payload }
        default:
            return { ...state }
    }
}

export const increaseCorrectWordNumber = () => ({ type: SET_CORRECT_WORD })
export const increaseWrongWordNumber = () => ({ type: SET_WRONG_WORD })
export const increaseKeyboardHitNumber = () => ({ type: SET_KEYBOARD_HIT })
export const increaseSpacePressed = () => ({ type: SET_SPACE_PRESSED })
export const dropSpaceNumber = () => ({type: SET_SPACE_PRESSED, payload: 0})
export const toggleTest = payload => ({ type: TOGGLE_TEST, payload: payload })
export const changePage = () => ({type: SET_PAGE})
export const setFocusWord = payload => ({ type: SET_FOCUS_WORD, payload: payload })
export const generateRandomNumbers = payload => {
    console.log('generated')
    const randomWordNumbers = []
    for (let i = 0; i < payload; i++) {
        randomWordNumbers.push(Math.floor(Math.random() * 200))
    }
    return { type: SET_RANDOM_NUMBERS, payload: randomWordNumbers }
}