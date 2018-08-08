import React from 'react'

const csrfToken = $('meta[name="csrf-token"]').attr('content')

export default class BidPurchase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: [],
      stripeKey: null,
      stripeCheckout: null,
      stripeErrors: '',
    }
  }

  componentDidMount() {
    var {currentUser, stripeKey, bid} = this.props
    var _this = this

    this.setState({
      stripeCheckout: StripeCheckout.configure({
        key: stripeKey,
        locale: 'auto',
        token: (token) => {
          $.ajax({
            url: `/api/bids/${bid.id}/purchase.json`,
            headers: { 'X-CSRF-Token': csrfToken },
            method: 'PUT',
            data: {
              "stripeToken": token.id,
              "email": currentUser.email,
              "bidId": bid.id
            },
            statusCode: {
              201: (response) => {
                _this.setState({stripeErrors: ``},()=>{window.location = response.url})
              },
              400: (response) => {
                _this.setState({stripeErrors: `${response.responseJSON.errors}`})
              },
              401: (response) => {
                _this.setState({stripeErrors: `${response.responseJSON.errors}`})
              },
              402: (response) => {
                _this.setState({stripeErrors: `${response.responseJSON.errors}`})
              },
              403: (response) => {
                _this.setState({stripeErrors: `${response.responseJSON.errors}`})
              }
            }
          }).done((response) => {
            // console.log(JSON.stringify(response))
          })
        }
      })
    })
  }

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  openStripe = (e) => {
    e.preventDefault()

    let {stripeCheckout, currentPrice} = this.state
    let {currentUser, artwork, bid} = this.props

    stripeCheckout.open({
      name: `${artwork.title}`,
      amount: bid.price_in_cents,
      image: artwork.images[0],
      email: currentUser.email,
      "allow-remember-me": false
    })
  }

  render() {
    const {currentUser, bid, artwork} = this.props

    return (
      <div id="purchase-bid">
        <button className={`purchase-bid-btn ${bid.accepted ? 'enabled' : 'disabled'}`} onClick={this.openStripe} disabled={!bid.accepted}>Purchase</button>
      </div>
    )
  }
}
