/* eslint-disable no-case-declarations */
import { RETRIVE_CARDS_FROM_LS, RETRIVE_USED_CARDS,
     RE_SHUFFLE_CARDS, SET_CARD, SHUFFLE_CARDS } from "../actions/types"

const initState = {
    game_status: localStorage.getItem('game_status'),
    unUsedCards: [],
    usedCards: []
}


export default function(state= initState, action) {

    switch(action.type) {
        case SHUFFLE_CARDS:
            localStorage.setItem('game_status', 'in_process')
            localStorage.setItem('un_used_cards', JSON.stringify(action.payload))
            return { ...state, unUsedCards: action.payload }
        case RETRIVE_CARDS_FROM_LS:
            return {...state, unUsedCards: action.payload }
        case SET_CARD:
            const uuc = state.unUsedCards.slice(1)
            localStorage.setItem('un_used_cards', JSON.stringify(uuc))
            const uc = state.usedCards.concat(action.payload)
            localStorage.setItem('used_cards', JSON.stringify(uc) )
            return { ...state, unUsedCards: state.unUsedCards.slice(1),
                 usedCards: state.usedCards.concat(action.payload)}
        case RE_SHUFFLE_CARDS:
            localStorage.setItem('un_used_cards', JSON.stringify(action.payload))
            localStorage.removeItem('used_cards')
            return { ...state, unUsedCards: action.payload, usedCards: [] }
        case RETRIVE_USED_CARDS:
            return {...state, usedCards: action.payload}
        default: return state
    }
}