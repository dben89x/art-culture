import React from 'react'

export default class RecentListings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  toggleStar=(e, listing)=> {
    var target = e.target
    console.log(target)

  }

  render() {
    const {recentListings} = this.props

    const listings = recentListings.map(listing => (
      <div className="listing" key={listing.id}>
        <img src={listing.images[0]} alt={listing.title}/>
        <div className="details">
          <i className={`star fal fa-star`} onClick={(e)=> this.toggleStar(e, listing)}></i>
        </div>
      </div>
    ))

    return (
      <div id="recent-listings">
        <h2>
          <span className="custom-hr"></span>
          New Listings
          <span className="custom-hr"></span>
        </h2>
        <div className="listings-container">
          {listings}
        </div>
      </div>
    )
  }
}
