import React from 'react'

export default class CartItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    const {item} = this.props

    return (
      <div className="cart-item">
        <a href={`/artworks/${item.id}`}>
          <img src={item.images[0]} alt=""/>
        </a>
      </div>
    )
  }
}
