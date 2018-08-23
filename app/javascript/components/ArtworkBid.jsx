import React from 'react'
import Rodal from 'rodal'
import Errors from './Errors'
import BidPurchase from './BidPurchase'
const csrfToken = $('meta[name="csrf-token"]').attr('content')
import AuthForms from './auth/AuthForms'

export default class ArtworkBid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      price: this.props.artwork.price,
      currentBid: this.props.currentBid,
      currentUser: this.props.currentUser,
      errors: [],
      authModalOpen: false,
      selectedAuth: null,
    }
  }

  makeOffer = e => {
    e.preventDefault()
    if (this.props.currentUser) {
      this.setState({modalIsOpen: true})
    } else {
      this.openLogin()
    }
  }

  submitBid = e => {
    e.preventDefault()

    var target = e.target
    const {artwork, currentUser} = this.props

    var bid = {
      artwork_id: artwork.id,
      user_id: currentUser.id,
      price: this.state.price,
      notes: this.state.notes
    }

    this.setState({isLoading: true, faClass: 'fa-spinner fa-spin'})
    $.ajax({
      type: 'POST',
      headers: { 'X-CSRF-Token': csrfToken },
      url: '/api/bids',
      dataType: 'json',
      data: {
        bid: bid
      }
    }).done((response) => {
      this.setState({ faClass: 'fa-check' }, () => {
        window.setTimeout(() => {
          this.setState({isLoading: false})
          this.onComplete(response)
        }, 1000)
      })
    }).fail(response => {
      var errors = JSON.parse(response.responseText).map((error) => error.message || error)
      this.setState({
        faClass: 'fa-exclamation-triangle'
      }, () => {
        window.setTimeout(() => {
          this.setState({isLoading: false})
        }, 1000)
      })
    })
  }

  onComplete = (response) => {
    this.setState({modalIsOpen: false, currentBid: response})
  }

  openLogin=()=>{
    this.setState({selectedAuth: 'signin', authModalOpen: true})
  }

  changeInput = e => {
    e.preventDefault()
    var {name, value } = e.target
    this.setState({ [name]: value }w)
  }

  closeModal = () => {
    this.setState({modalIsOpen: false})
  }

  acceptBid=()=>{
    const {currentBid} = this.state
    $.ajax({
      type: 'PUT',
      headers: { 'X-CSRF-Token': csrfToken },
      url: `/api/bids/${currentBid.id}/accept.json`,
      dataType: 'json',
      data: {
        bidId: currentBid.id
      }
    }).done((response) => {
      this.setState({currentBid: response})
    })
  }

  render() {
    const CurrentBidText =({currentBid})=>{
      return currentBid.accepted ? (
        <div className='accepted-bid'>
          <h3>Your bid on this piece has been accepted.</h3>
          <h4>You can now purchase it here.</h4>
        </div>
      ) : (
        <div className='pending-bid'>
          <button onClick={this.acceptBid}>Accept bid</button>
          <h3>You have a pending bid on this piece.</h3>
          <h4>You will be able to purchase it when your offer is accepted.</h4>
        </div>
      )
    }
    const {artwork, stripeKey, currentUser} = this.props

    return (<div className="bid-container" id='bids'>
      { this.state.currentBid ? (
        <CurrentBidText currentBid={this.state.currentBid}/>
      ) : (
        <div>
          <h2 className='title'>{artwork.title}</h2>

            <h3>${Number.parseFloat(artwork.price).toFixed(2)}</h3>
            <p>{artwork.description}</p>
            <div className="btn-container">
              <a href="#" className='offer-btn' onClick={this.makeOffer}>MAKE AN OFFER</a>
            </div>

            <Rodal visible={this.state.modalIsOpen} onClose={this.closeModal} closeOnEsc={true} className={`users signin`} animation='flip'>
              <form action="#" className='bid-form'>
                <legend>Place a bid on <b>{artwork.title}</b></legend>
                <Errors errors={this.state.errors}/>
                <div className="input-wrapper price">
                  <label htmlFor="price">Your Price:</label>
                  <div>
                    $<input type="number" pattern="[0-9]*" inputMode="numeric" name='price' value={this.state.price} required="required" onChange={this.changeInput}/>
                  </div>
                </div>
                <div className="input-wrapper notes">
                  <label htmlFor="notes">Notes:</label>
                  <textarea rows='10' name='notes' value={this.state.notes} onChange={this.changeInput}/>
                </div>
                <button type="submit" onClick={this.submitBid}>{ this.state.isLoading ? (<i className={`far ${this.state.faClass}`}></i>) : "Submit Bid" }</button>
              </form>
              {this.state.authContent}
            </Rodal>
          </div>)}

      { this.state.currentBid ? (
        <BidPurchase stripeKey={stripeKey} currentUser={currentUser} bid={this.state.currentBid} artwork={artwork}/>
      ) : (null)}
      <AuthForms selectedAuth={this.state.selectedAuth} modalIsOpen={this.state.authModalOpen} onClose={()=> this.setState({authModalOpen: false})}/>
    </div>)
  }
}
