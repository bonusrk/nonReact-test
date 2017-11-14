import React, {Component} from 'react'
import {connect} from 'react-redux'
import './app.css'

class Tile extends Component {

  componentDidMount() {
    // var hasListenerOptions = ( function () {
    //   var result = false;
    //   window.addEventListener('touchstart', null, Object.defineProperty({}, "passive", {
    //     get: function () {
    //       result = true
    //     }
    //   }));
    //   return result;
    // }());
    // console.log('LISTENER', hasListenerOptions)
    // const boxes = document.getElementsByClassName('tile')
    // console.log(boxes)
    //
    // //click handler
    // function onMouseDown(e) {
    //   //this wont stop double delete
    //   // e.preventDefault()
    //   // e.stopPropagation()
    //   console.log('I am CLICK target Id===>', e.target.id)
    //   console.log('EVENT TYPE ===>', e.type, ', EVENT X ===>', e.clientX, ', EVENT Y ===>', e.clientY)
    // }
    //
    // //ontouchstart handler
    // function onTouchStart(e) {
    //   e.preventDefault()  //This stops double delete
    //   // e.stopPropagation()
    //   //Use 'touches' object to get touch event data
    //   console.log('I am TOUCHSTART target ID ===>', e.touches[0].target.id)
    //   console.log('EVENT TYPE ===>', e.type, ', EVENT X ===>', e.touches[0].pageX, ', EVENT Y ===>', e.touches[0].pageX)
    // }
    //
    // // Add eventListener for click
    // Array.from(boxes).forEach(function (item, i, arr) {
    //   item.addEventListener('mousedown', onMouseDown)
    // })
    //
    // // Add eventListener for touch
    // Array.from(boxes).forEach(function (item, i, arr) {
    //   item.addEventListener('touchstart', onTouchStart)
    // })
  }

  toggle = e => {
    e.nativeEvent.preventDefault()
    e.nativeEvent.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    console.log('EVENT===>', e.nativeEvent)
    console.log(e.touches)
    console.log('I AM EVENT=========> ', 'X-', e.pageX, ' Y-', e.pageY, ' Type- ', e.type)
    console.log(e.type)
    console.log('id: ', this.props.id)
    this.props.dispatch({
      type: 'REMOVE_TOUCHED',
      payload: this.props.id
    })
  }

  render() {
    return (
      <div className={`tile`} onMouseDown={this.toggle} onTouchStart={this.toggle}>
        <div className='box' style={{backgroundColor: this.props.id}}></div>
      </div>
    )
  }
}

const App = ({boxes, dispatch}) => {
  const first = boxes.indexOf('blue') !== -1
  const second = boxes.indexOf('green') !== -1
  return (
    <div>
      {first && <Tile id='blue' dispatch={dispatch}/>}
      {second && <Tile id='green' dispatch={dispatch}/>}
    </div>
  )
}

/*----------------------------------------------------------------------------*/

export const initialState = {
  boxes: ['blue', 'green'],
}

export const rootReducer = (state, action) => {
  switch (action.type) {
    case 'REMOVE_TOUCHED':
      const id = action.payload
      console.log(state.boxes.filter(e => e !== id))
      return {boxes: state.boxes.filter(e => e !== id)}
    default:
      return state
  }
}

export default connect(state => state)(App)
