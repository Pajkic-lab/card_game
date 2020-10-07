import { combineReducers } from 'redux'
import cards from './cards'
import tresury from './treasury'

export default combineReducers({
    cards,
    tresury
})