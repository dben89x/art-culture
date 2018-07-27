import React from 'react'
import $ from 'jquery'

export default class RecentListings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favorites: this.props.favorites,
    }
    this.userId = this.props.currentUser ? this.props.currentUser.id : null
  }

  toggleFavoriteChange=(e, listingId, isFavorite)=> {
    var target = e.target
    if (this.userId) {
      var currentFavorites = this.state.favorites
      var favorite = {
        user_id: this.userId,
        artwork_id: listingId
      }
      console.log(isFavorite)
      isFavorite ? this.favoriteRemoved(currentFavorites, favorite, listingId) : this.favoriteAdded(currentFavorites, favorite, listingId)
    } else {
      this.props.onLoginRequired()
    }
  }
  favoriteRemoved=(currentFavorites, favorite, listingId)=>{
    $.ajax({
      url: `/api/artwork_favorites/${listingId}`,
      method: 'DELETE',
      data: { favorite: favorite },
      dataType: 'json',
      success: (newData) => {
        currentFavorites.splice(currentFavorites.indexOf(listingId), 1)
        this.setState({favorites: currentFavorites})
      }
    })
  }
  favoriteAdded=(currentFavorites, favorite, listingId)=>{
    $.ajax({
      url: `/api/artwork_favorites`,
      method: 'POST',
      data: { favorite: favorite },
      dataType: 'json',
      success: (newData) => {
        currentFavorites.push(listingId)
        this.setState({favorites: currentFavorites})
      }
    })
  }

  render() {
    const {recentListings} = this.props
    var {favorites} = this.state

    const listings = recentListings.map(listing => {
      var isFavorite = favorites.includes(listing.id)
      return (
        <div className="listing" key={listing.id}>
          <img src={listing.images[0]} alt={listing.title}/>
          <div className="details">
            <i className={`${isFavorite ? 'fas' : 'fal'} fa-star star`} onClick={(e)=> this.toggleFavoriteChange(e, listing.id, isFavorite)}></i>
          </div>
        </div>
      )
    })

    return (
      <div id="recent-listings">
        <h2>
          <span className="custom-hr"></span>
          Original Creations
          <span className="custom-hr"></span>
        </h2>
        <div className="listings-container">
          {listings}
        </div>
      </div>
    )
  }
}
