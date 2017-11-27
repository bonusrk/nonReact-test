import React, {Component} from 'react'
import {connect} from 'react-redux'
import './app.css'

class Tile extends Component {

  componentDidMount() {
    const tiles = document.getElementsByClassName('tile')
    Array.from(tiles).forEach((item, i, arr) => {
      item.addEventListener('touchstart', this._preventMe)
    })
  }

  componentWillUnmount() {
    const tiles = document.getElementsByClassName('tile')
    Array.from(tiles).forEach((item, i, arr) => {
      item.removeEventListener('touchstart', this._preventMe)
    })
  }


  _preventMe = e => {
    console.log(e.nativeEvent)
    e.preventDefault()
    console.log('EVENT===>', e.nativeEvent)
    console.log(e.touches)
    console.log('I AM EVENT=========> ', 'X-', e.pageX, ' Y-', e.pageY, ' Type- ', e.type)
    console.log(e.type)
    console.log('id: ', this.props.id)
  }

  toggle = e => {
    // e.nativeEvent.preventDefault()
    // e.nativeEvent.stopPropagation()
    // e.nativeEvent.stopImmediatePropagation()
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
