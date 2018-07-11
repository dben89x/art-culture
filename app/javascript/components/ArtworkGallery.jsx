import React from 'react'

export default class ArtworkGallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImage: this.props.artwork.images[0]
    }
    console.log(this.props.artwork)
  }

  setSelectedImage=(image)=>{
    this.setState({selectedImage: image})
  }

  render() {
    const {artwork} = this.props

    return (

      <div className="artwork-gallery">
        <h1>{artwork.title}</h1>
        <div className="gallery">
          <div className="gallery-main">
            <div className="main-container">
              <div className="main-img">
                <img src={this.state.selectedImage} alt={artwork.title}/>
              </div>
              <div className="info-container">
                <div className="description">
                  <h3>The Story Behind the Piece</h3>
                  <p>{artwork.description}</p>
                </div>
                <div className="details">
                  <h3>Piece Details</h3>
                  <div className="title">{`PIECE NAME: ${artwork.title}`}</div>
                  <div className="author">{`AUTHOR: ${artwork.artist_name}`}</div>
                  <div className="published">{`DATE PUBLISHED: ${artwork.created_at}`}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="gallery-img-list">
            {artwork.images.map( (image, index) => (
              <div className="gallery-img" key={index}>
                <img src={image} alt={artwork.title} onClick={() => this.setSelectedImage(image)}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
