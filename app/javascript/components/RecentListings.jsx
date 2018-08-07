import React from 'react'
import $ from 'jquery'
import ArtworkListing from './ArtworkListing'

export default class RecentListings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favorites: this.props.favorites,
      hoveredId: null,
    }
    this.userId = this.props.currentUser ? this.props.currentUser.id : null
  }

  componentDidMount() {
    this.$listings = $('.listings-container .listing')
    $(this.$listings).mouseenter(this.toggleInfoIn).mouseleave(this.toggleInfoOut)
  }

  toggleInfoIn=(e)=>{
    var target = e.target
    var infoId = $(target).data('id')
    this.setState({hoveredId: infoId})
  }

  toggleInfoOut=(e)=>{
    this.setState({hoveredId: null})
  }

  shareBtnClicked=e=>{
    e.preventDefault()
  }

  toggleFavoriteChange=(e, listingId, isFavorite)=> {
    var target = e.target
    if (this.userId) {
      var currentFavorites = this.state.favorites
      var favorite = {
        user_id: this.userId,
        artwork_id: listingId
      }
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

  artworkClicked=e=>{
    var {target} = e
    $(target).closest('.info-wrapper').removeClass('hovered')
  }

  render() {
    const {recentListings} = this.props
    var {favorites} = this.state

    const listings = recentListings.map(listing => {
      var isFavorite = favorites.includes(listing.id)
      return (
        <div className="listing hoverable-listing" key={listing.id}>
          <div className={`img-wrapper hoverable-target ${isFavorite ? 'favorite' : ''}`} data-id={listing.id}>
            <img src={listing.images[0]} alt={listing.title}/>
            <div className={`info-wrapper ${this.state.hoveredId === listing.id ? 'hovered' : ''}`} id={`info-${listing.id}`}>
              <div className="info">
                <div className="fa-btns">
                  <i className='fas fa-share-alt' onClick={this.shareBtnClicked}></i>
                  <i className={`${isFavorite ? 'fas' : 'far'} fa-star star`} onClick={(e)=> this.toggleFavoriteChange(e, listing.id, isFavorite)}></i>
                </div>
                <h2>{listing.title}</h2>
                <div className="category">
                  {listing.category}
                </div>
                <div className="tags">
                  {listing.tags}
                </div>
                <div className="btn-container">
                  <a href={`/artworks/${listing.id}`} className="share" onClick={this.artworkClicked}>VIEW THIS PIECE</a>
                </div>
              </div>
            </div>
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
