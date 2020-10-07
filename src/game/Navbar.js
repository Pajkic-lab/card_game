import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { reShuffleCards } from '../actions/cards'
import { resetTreasury } from '../actions/treasury'

import data from '../assets/data.json'

import Button from '@material-ui/core/Button'


const Navbar = ({betData, treasury, reShuffleCards, resetTreasury}) => {


    return (
        <div>
            <Button style={{
                    borderRadius: 15,
                    backgroundColor: "#066dbd",
                    padding: "8px 16px",
                    fontSize: "18px",
                    margin: "10px"
                    }}
                className='tbutton' variant="contained" color="secondary"
                 onClick={()=>{
                if (window.confirm('Cards will reshuffle and treasury will remain, are you sure?')) {
                reShuffleCards(data)
                window.location.reload(false) }
                }}>New Game</Button>

            <Button style={{
                    borderRadius: 15,
                    backgroundColor: "#066dbd",
                    padding: "8px 16px",
                    fontSize: "18px",
                    margin: "10px"
                    }} 
                className='tbutton' variant="contained" color="secondary" onClick={()=>{
                if (window.confirm('Cards will reshuffle and treasury will reset, are you sure?')) {
                reShuffleCards(data)
                resetTreasury()
                window.location.reload(false) }
            }}>Restart Game</Button>
            <h3>your treasury: {treasury}</h3>
            <h3>your bet: {betData}</h3>
        </div>
    )
}

Navbar.propTypes ={
    betData: PropTypes.any,
    treasury: PropTypes.any,
    reShuffleCards: PropTypes.func,
    resetTreasury: PropTypes.func
}

const mapStateToProps = state => ({
    betData: state.tresury.betData,
    treasury: state.tresury.treasury
})

const mapDispatchToProps = {
    reShuffleCards,
    resetTreasury
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
