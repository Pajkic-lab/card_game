import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Navbar from './Navbar'
import Table from './Table'
import ComandPanel from './ComandPanel'

import data from '../assets/data.json'

import { retriveCardsfromLS, setUsedCards, shuffleCards } from '../actions/cards'
import { retriveBetDataFromLS, setTreasury } from '../actions/treasury'


const Interface = ({shuffleCards, game_status, retriveCardsfromLS, retriveBetDataFromLS, setTreasury, setUsedCards }) => {


    useEffect(()=> {
        if(game_status===null) {
            shuffleCards(data)
        }
        if(game_status==='in_process') {
            const data = JSON.parse(localStorage.getItem('un_used_cards')) 
            retriveCardsfromLS(data)

            const betData = JSON.parse(localStorage.getItem('bet_data'))
            if(betData!==null) {
                retriveBetDataFromLS(betData)
            }
            const treasuryData = JSON.parse(localStorage.getItem('treasury'))
            if(treasuryData!==null) {
                setTreasury(treasuryData)
            }
            const usedCardData = JSON.parse(localStorage.getItem('used_cards')) 
            if(usedCardData!==null) {
                setUsedCards(usedCardData)
            }
        }
        // eslint-disable-next-line
    },[])

    return (
        <div>
            <Navbar />
            <Table />
            <ComandPanel />
        </div>
    )
}

Interface.propTypes ={
    shuffleCards: PropTypes.func,
    game_status: PropTypes.any,
    retriveCardsfromLS: PropTypes.func,
    retriveBetDataFromLS: PropTypes.func,
    setTreasury: PropTypes.func,
    setUsedCards: PropTypes.func
}

const mapStateToProps = state => ({
    game_status: state.cards.game_status
})

const mapDispatchToProps = {
    shuffleCards,
    retriveCardsfromLS,
    retriveBetDataFromLS,
    setTreasury,
    setUsedCards
}
 

export default connect(mapStateToProps, mapDispatchToProps)(Interface)
