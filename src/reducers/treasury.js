/* eslint-disable no-case-declarations */
import { PAYMENT_MINUS, PAYMENT_PLUS, PLACE_BET, SET_BET,
     SET_TREASURY, RE_SET_TREASURY } from "../actions/types"

const initState = {
    treasury: 100,
    betData: 10
}


export default function(state= initState, action) {
    const { type, payload } = action

    switch(type) {
        case PLACE_BET:
            localStorage.setItem('bet_data', payload)
            return { ...state, betData: payload }
        case SET_BET:
            localStorage.setItem('bet_data', payload)
            return { ...state, betData: payload }
        case PAYMENT_PLUS:
            const trp = state.treasury+payload
            localStorage.setItem('treasury', JSON.stringify(trp))
            return { ...state, treasury: state.treasury+payload }
        case PAYMENT_MINUS:
            const trm = state.treasury-payload
            localStorage.setItem('treasury', JSON.stringify(trm))
            return { ...state, treasury: state.treasury-payload }
        case SET_TREASURY:
            localStorage.setItem('treasury', JSON.stringify(payload))
            return {...state, treasury: payload }
        case RE_SET_TREASURY:
            localStorage.setItem('bet_data', 10)
            localStorage.setItem('treasury', 100)
            return { ...state, treasury: 100, betData:10 }
        default: return state
    }
}
