import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


const Table = ({unUsedCards, usedCards}) => {

    const canvasRef = useRef(null)
    const shownCardData = unUsedCards[0]

    const staticCardBack = ctx => {
        let img = new Image()
        img.src = 'https://res.cloudinary.com/duao2se5l/image/upload/v1601816143/cards/images/addons/red_back_ctbuaj.png'
        ctx.drawImage(img, 420, 150, 100, 150)
    }

    const shownCardDraw = ctx => {
        let img = new Image()
        if(unUsedCards.length>0) {
            img.src = shownCardData.url
            ctx.drawImage(img, 600, 150, 100, 150)
        }
    }

    const usedCardsArr = ctx => {
        if(usedCards.length>0) {
        for (let i = 0; i < usedCards.length; i++) {
          let img = new Image()
          img.src = usedCards[i].url
          ctx.drawImage(img, [i]*25, 400, 80, 130)
        }
      }
    }

    const sign = ctx => {
        if(usedCards.length>0) {
          const el = usedCards.slice(-1)[0]
          if(el.hit==='ok') {
            let img = new Image()
            img.src = 'https://res.cloudinary.com/duao2se5l/image/upload/v1602070419/cards/images/addons/8TzraxBpc_uimfhp.png'
            ctx.clearRect(1100, 0, ctx.canvas.width, 200)
            ctx.drawImage(img, 1200, 50, 50, 50)
          }
          if(el.hit==='miss') {
            let img = new Image()
            img.src = 'https://res.cloudinary.com/duao2se5l/image/upload/v1602070418/cards/images/addons/kisspng-mitchell-aluminium-american-red-cross-symbol-clip-wrong-5abc62510ced63.471556811522295377053_symgxw.png'
            ctx.clearRect(1100, 0, ctx.canvas.width, 200)
            ctx.drawImage(img, 1200, 50, 50, 50)
          }
          if(el.hit==='draw') {
            let img = new Image()
            img.src = 'https://res.cloudinary.com/duao2se5l/image/upload/v1602075953/cards/images/addons/PinClipart.com_robber-clipart_16354_p4773w.png'
            ctx.clearRect(1100, 0, ctx.canvas.width, 200)
            ctx.drawImage(img, 1200, 50, 50, 50)
          }
        }
      }

      useEffect(() => {
    
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId
        
        const render = () => {
          frameCount++
          staticCardBack(context)
          shownCardDraw(context)
          usedCardsArr(context)
          sign(context)
          animationFrameId = window.requestAnimationFrame(render)
        }
        render()
        
        return () => {
          window.cancelAnimationFrame(animationFrameId)
        }
        
      }, [staticCardBack, shownCardDraw, usedCardsArr, sign])

    return (
        <div>
            <canvas ref={canvasRef}  className="c1" height="600" width="1300"/>
        </div>
    )
}

Table.propTypes ={
    unUsedCards: PropTypes.array,
    usedCards: PropTypes.array
}

const mapStateToProps = state => ({
    unUsedCards: state.cards.unUsedCards,
    usedCards: state.cards.usedCards
})


export default connect(mapStateToProps, null)(Table)
