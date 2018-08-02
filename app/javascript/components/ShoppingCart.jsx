import React from 'react'
import CartItem from './CartItem'

const localStorage = window.localStorage

export default class ShoppingCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    // window.addEventListener('storage', this.localStorageUpdated)
    window.addEventListener('storage', ()=>{console.log('updated')})
    // console.log(browser)
  }

  localStorageUpdated=()=>{
    console.log(localStorage)
  }

  render() {
    var {items} = this.props
    return (
      <div id="shopping-cart" className={this.props.open ? 'open' : 'closed'}>
        <div className="header">
          <h4>Your Cart ({items.length})</h4>
          <a onClick={this.props.onClose} className='close-btn'>&times;</a>
        </div>
        <div className="shopping-cart-container">
          <div className="cart-items">
            {items.map(item => (
              <CartItem key={item.id}></CartItem>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
