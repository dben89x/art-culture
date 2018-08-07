import React from 'react'

export default class ArtworkListing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    const {listing, isFavorite} = this.props

    return (
      <div className="listing hoverable-listing" key={listing.id}>
        <div className={`img-wrapper hoverable-target ${isFavorite ? 'favorite' : ''}`} data-id={listing.id}>
          <img src={listing.images[0]} alt={listing.title}/>
          <div className={`info-wrapper ${this.props.hoveredId === listing.id ? 'hovered' : ''}`} id={`info-${listing.id}`}>
            <div className="info">
              <i className={`${isFavorite ? 'fas' : 'far'} fa-star star`} onClick={(e)=> this.toggleFavoriteChange(e, listing.id, isFavorite)}></i>
              <h2>{listing.title}</h2>
              <div className="category">
                {listing.category}
              </div>
              <div className="tags">
                {listing.tags}
              </div>
              <div className="btn-container">
                <a href="#" className="share" onClick={this.shareBtnClicked}>SHARE</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
