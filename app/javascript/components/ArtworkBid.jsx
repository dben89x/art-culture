import React from 'react'
import Rodal from 'rodal'
import Errors from './Errors'
const csrfToken = $('meta[name="csrf-token"]').attr('content')

export default class ArtworkBid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      price: this.props.artwork.price,
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

    var bid = {
      artwork_id: artwork.id,
      user_id: currentUser.id,
      price: this.state.price,
      notes: this.state.notes,
    }

    this.setState({isLoading: true, faClass: 'fa-spinner fa-spin'})
    $.ajax({
      type: 'POST',
      headers: {'X-CSRF-Token': csrfToken},
      url: '/api/bids',
      dataType: 'json',
      data: {bid: bid}
    }).done((response) => {
      this.setState({faClass: 'fa-check'}, ()=>{
        window.setTimeout(()=>{
          this.setState({isLoading: false})
          this.onComplete(response)
        }, 1000)
      })
    }).fail(response => {
      var errors = JSON.parse(response.responseText).map((error) => error.message || error)
      this.setState({faClass: 'fa-exclamation-triangle'}, ()=>{
        window.setTimeout(()=>{
          this.setState({isLoading: false})
        }, 1000)
      })
    })
  }

  onComplete=()=>{
    this.setState({modalIsOpen: false})
  }

  changeInput=e=>{
    e.preventDefault()
    var {name, value} = e.target
    this.setState({[name]: value}, ()=> console.log(this.state[name]))

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
                $<input type="number" pattern="[0-9]*" inputMode="numeric" name='price' value={this.state.price} required onChange={this.changeInput}/>
              </div>
            </div>
            <div className="input-wrapper notes">
              <label htmlFor="notes">Notes:</label>
              <textarea rows='10' name='notes' value={this.state.notes} onChange={this.changeInput}/>
            </div>
            <button type="submit" onClick={this.submitBid}>{this.state.isLoading ? (<i className={`far ${this.state.faClass}`}></i>) : "Submit Bid"}</button>
          </form>
          {this.state.authContent}
        </Rodal>
      </div>
    )
  }
}
