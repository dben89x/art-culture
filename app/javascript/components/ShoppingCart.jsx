import React from 'react'
import CartItem from './CartItem'
import AuthForms from './auth/AuthForms'

const localStorage = window.localStorage

export default class ShoppingCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authModalOpen: false,
      selectedAuth: null,
    }
  }

  componentDidMount() {
    // window.addEventListener('storage', this.localStorageUpdated)
    window.addEventListener('storage', ()=>{console.log('updated')})
    // console.log(browser)
  }

  ////////// Auth actions //////////

  signinClick=(e)=>{
    e.preventDefault()
    this.setState({selectedAuth: 'signin', authModalOpen: true})
  }
  signupClick=(e)=>{
    e.preventDefault()
    this.setState({selectedAuth: 'signup', authModalOpen: true})
  }

  onSignoutComplete=(response)=>{
    window.location.reload()
  }

  closeModal=(callback)=>{
    this.setState({modalIsOpen: false}, ()=> callback())
  }

  localStorageUpdated=()=>{
    console.log(localStorage)
  }

  render() {
    var {items, currentUser} = this.props
    return (
      <div id="shopping-cart" className={this.props.open ? 'open' : 'closed'}>
        <div className="header">
          <h4>Your Favorites ({items.length})</h4>
          <a onClick={this.props.onClose} className='close-btn'>&times;</a>
        </div>
        <div className="shopping-cart-container">
          {currentUser ? (
            <div className="cart-items">
              {items.map(item => (
                <CartItem item={item} key={item.id}></CartItem>
              ))}
            </div>
          ) : (
            <div className="signin-prompt">
              <p>You must be signed in to manage favorites.</p>
              <p><a href="#" onClick={this.signinClick}>Sign in</a> or <a href="#" onClick={this.signupClick}>Sign up</a></p>
            </div>
          )}
        </div>
        <AuthForms selectedAuth={this.state.selectedAuth} modalIsOpen={this.state.authModalOpen} onClose={()=> this.setState({authModalOpen: false})}/>
      </div>
    )
  }
}
