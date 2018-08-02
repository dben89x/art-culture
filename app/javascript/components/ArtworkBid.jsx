import React from 'react'
import Rodal from 'rodal'

export default class ArtworkBid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      artworkPrice: this.props.artwork.price
    }
  }

  makeOffer=e=>{
    e.preventDefault()
    this.setState({modalIsOpen: true})
  }

  submitBid=e=>{
    e.preventDefault()
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
            <div className="input-wrapper price">
              <label htmlFor="price">Your Price:</label>
              <div>
                $<input type="number" pattern="[0-9]*" inputmode="numeric" name='price' value={this.state.artworkPrice} required onChange={this.changeBid}/>
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
