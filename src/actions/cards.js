import shuffle from 'shuffle-array'
import { RETRIVE_CARDS_FROM_LS, SHUFFLE_CARDS, SET_CARD, RE_SHUFFLE_CARDS, RETRIVE_USED_CARDS } from "./types"


export const shuffleCards = data => dispatch => {
    const sd = shuffle(data)
    dispatch({
        type: SHUFFLE_CARDS,
        payload: sd
    })
}

export const retriveCardsfromLS = data => dispatch => {
    dispatch({
        type: RETRIVE_CARDS_FROM_LS,
        payload: data
    })
}

export const setCard = data => dispatch => {
    dispatch({
        type: SET_CARD,
        payload: data
    })
}

export const reShuffleCards = data => dispatch => {
    const sd = shuffle(data)
    dispatch({
        type: RE_SHUFFLE_CARDS,
        payload: sd
    })
}

export const setUsedCards = data => dispatch => {
    dispatch({
        type: RETRIVE_USED_CARDS,
        payload: data
    })
}
