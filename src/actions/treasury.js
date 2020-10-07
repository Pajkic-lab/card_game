import { PLACE_BET, SET_BET, PAYMENT_PLUS, PAYMENT_MINUS, SET_TREASURY, RE_SET_TREASURY } from "./types"


export const setBet = bet => dispatch => {
    dispatch({
        type: PLACE_BET,
        payload: bet
    })
}

export const retriveBetDataFromLS = betData => dispatch => {
    dispatch({
        type: SET_BET,
        payload: betData
    })
}

export const paymentPlus = data => dispatch => {
    dispatch({
        type: PAYMENT_PLUS,
        payload: parseInt(data)
    })
}

export const paymentMinus = data => dispatch => {
    dispatch({
        type: PAYMENT_MINUS,
        payload: parseInt(data)
    })
}

export const setTreasury = data => dispatch => {
    dispatch({
        type: SET_TREASURY,
        payload: data
    })
}

export const resetTreasury = () => dispatch => {
    dispatch({
        type: RE_SET_TREASURY
    })
}

