import React from 'react'
import Rodal from 'rodal'
import Errors from './Errors'
const csrfToken = $('meta[name="csrf-token"]').attr('content')

export default class ArtworkBid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      artworkPrice: this.props.artwork.price,
      errors: []
    }
  }

  makeOffer=e=>{
    e.preventDefault()
    this.setState({modalIsOpen: true})
  }

  submitBid=e=>{
    e.preventDefault()
    var target = e.target
    const {artwork, currentUser} = this.props
    console.log(target.price)
    console.log(target.notes)

    var bid = {
      artwork_id: artwork.id,
      buyer_id: currentUser.id,
      price: target.price,
      notes: target.notes,
    }

    $.ajax({
      type: 'POST',
      headers: {'X-CSRF-Token': csrfToken},
      url: '/api/bids',
      dataType: 'json',
      data: {bid: bid}
    }).done((response) => {
      this.onComplete(response)
    }).fail(response => {
      console.log((response.responseText))
      var errors = JSON.parse(response.responseText).map((error) => error.message || error)
      this.setState({
        errors: errors || []
      })
    })
  }

  onComplete=()=>{

  }

  changeBid=e=>{
    e.preventDefault()
    this.setState({artworkPrice: e.value})
  }

  closeModal=()=>{
    this.setState({modalIsOpen: false})
  }

  render() {
    const {artwork} = this.props

    return (
      <div className="bid-container">
        <h2>{artwork.title}</h2>
        {/* <h3><ReactIntl.FormattedNumber value={artwork.price} style="currency" currency="USD" /></h3> */}

        <h3>${Number.parseFloat(artwork.price).toFixed(2)}</h3>
        <p>{artwork.description}</p>
        <div className="btn-container">
          <a href="#" className='offer-btn' onClick={this.makeOffer}>MAKE AN OFFER</a>
        </div>
        <Rodal visible={this.state.modalIsOpen} onClose={this.closeModal} closeOnEsc={true} className={`users signin`} animation='flip'>
          <form action="#">
            <legend>Place a bid on <b>{artwork.title}</b></legend>
            <Errors errors={this.state.errors}/>
            <div className="input-wrapper price">
              <label htmlFor="price">Your Price:</label>
              <div>
                $<input type="number" pattern="[0-9]*" inputMode="numeric" name='price' value={this.state.artworkPrice} required onChange={this.changeBid}/>
              </div>
            </div>
            <div className="input-wrapper notes">
              <label htmlFor="notes">Notes:</label>
              <textarea rows='10' name='notes' value={this.state.notes} onChange={this.changeNotes}/>
            </div>
            <input type="submit" onClick={this.submitBid}/>
          </form>
          {this.state.authContent}
        </Rodal>
      </div>
    )
  }
}
