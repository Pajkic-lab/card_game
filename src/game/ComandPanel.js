import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { paymentMinus, paymentPlus, setBet, resetTreasury } from '../actions/treasury'
import { setCard, reShuffleCards } from '../actions/cards'

import data from '../assets/data.json'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'


const ComandPanel = ({unUsedCards, setBet, treasury, setCard, paymentPlus,
     paymentMinus, game_status, reShuffleCards, resetTreasury}) => {


    const[formData, setFormData] = useState({
        bet: 10
    })

    const { bet }  = formData

    const onChange = e => setFormData({
        [e.target.name]: e.target.value
    })

    const onSubmit = e => {
        e.preventDefault()
        if(treasury>=bet && bet>=10){
            setBet(parseInt(bet))
        } 
        if(treasury<bet) {window.alert("Bet can't exed treasury amounts!")}
        if(bet<10) {window.alert("Bet has to be at least 10 coins!")}
    }

    useEffect(()=> {
        if(game_status==='in_process') {
            const betData = JSON.parse(localStorage.getItem('bet_data'))
            if(betData!==null) {
                setFormData({bet: parseInt(betData)})
            }
        }
    // eslint-disable-next-line
    },[])

    const shownCardData = unUsedCards[0]
    const nextCardData = unUsedCards[1]

    if(unUsedCards.length===1) {
        window.alert('You depleted all the cards, cards will reshuffle and you can continue where you left!')
        reShuffleCards(data)
        window.location.reload(false)
    }

    if(treasury===0 || treasury<0) {
        window.alert('You lost!!! The game will start again!')
        reShuffleCards(data)
        resetTreasury()
        window.location.reload(false)
    }

    const onHigher = () => {
        if(shownCardData.value<nextCardData.value) {
            let modifydCardData = shownCardData
            modifydCardData.hit = 'ok'
            setCard(modifydCardData)
            paymentPlus(bet)
        } 
        if(shownCardData.value>nextCardData.value) {
            let modifydCardData = shownCardData
            modifydCardData.hit = 'miss'
            setCard(modifydCardData)
            paymentMinus(bet)
        }
        if(shownCardData.value===nextCardData.value){
            let modifydCardData = shownCardData
            modifydCardData.hit = 'draw'
            setCard(modifydCardData)
        }
    }

    const onLower = () => {
        if(shownCardData.value>nextCardData.value) {
            let modifydCardData = shownCardData
            modifydCardData.hit = 'ok'
            setCard(modifydCardData)
            paymentPlus(bet)
        } 
        if(shownCardData.value<nextCardData.value) {
            let modifydCardData = shownCardData
            modifydCardData.hit = 'miss'
            setCard(modifydCardData)
            paymentMinus(bet)
        }
        if(shownCardData.value===nextCardData.value){
            let modifydCardData = shownCardData
            modifydCardData.hit = 'draw'
            setCard(modifydCardData)
        }
    }

    return (
        <div>
            { unUsedCards.length>0? 
                <>
                    <Button style={{
                        borderRadius: 15,
                        backgroundColor: "#066dbd",
                        padding: "8px 16px",
                        fontSize: "18px",
                        margin: "10px"
                    }}
                    variant="contained" color="secondary" onClick={onHigher}>Higher</Button>
                    <Button style={{
                        borderRadius: 15,
                        backgroundColor: "#066dbd",
                        padding: "8px 16px",
                        fontSize: "18px",
                        margin: "10px"
                    }} 
                    variant="contained" color="secondary" onClick={onLower}>Lower</Button>

                    <form onSubmit={onSubmit}>
                        <TextField className='inp' variant="outlined" size="small"
                     onChange={onChange} name='bet' value={bet} placeholder='place your bet' type='number' required/> <br/>
                        <Button className='bbutton' type="submit" variant="contained" color="default">place bet</Button>
                    </form>
                </>
                : ''
            }
        </div>
    )
}


ComandPanel.propTypes = {
    unUsedCards: PropTypes.array,
    setBet: PropTypes.func,
    treasury: PropTypes.any,
    setCard: PropTypes.func,
    paymentPlus: PropTypes.func,
    paymentMinus: PropTypes.func,
    game_status: PropTypes.any,
    reShuffleCards: PropTypes.func,
    resetTreasury: PropTypes.func
}

const mapStateToProps = state => ({
    unUsedCards: state.cards.unUsedCards,
    treasury: state.tresury.treasury,
    game_status: state.cards.game_status
})

const mapDispatchToProps = {
    setBet,
    setCard,
    paymentPlus,
    paymentMinus,
    reShuffleCards,
    resetTreasury
}
 

export default connect(mapStateToProps, mapDispatchToProps)(ComandPanel)
