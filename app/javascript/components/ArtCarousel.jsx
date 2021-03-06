import React from 'react'
import Slider from 'react-slick'
import $ from 'jquery'

export default class ArtCarousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detailsSelected: false,
      artSelected: true,
      artistSelected: false,
    }
  }

  btnClick=(artwork)=>{
    var $artworkDetails = $(`.details-${artwork.id}`)[0]
    this.setState({detailsSelected: !this.state.detailsSelected}, ()=>{
      // this.state.detailsSelected ? $($artworkDetails).fadeTo(300, 1) : $($artworkDetails).fadeTo(300, 0)
      this.state.detailsSelected ? $($artworkDetails).css('opacity', 1) : $($artworkDetails).css('opacity', 0)
    })
  }

  componentDidMount() {
  }

  selectArt=(e)=>{
    e.preventDefault()
    this.setState({artSelected: true})
    this.setState({artistSelected: false})
  }
  selectArtist=(e)=>{
    e.preventDefault()
    this.setState({artSelected: false})
    this.setState({artistSelected: true})
  }

  render() {
    // this.props.artworks.map((artwork) => {console.log('foobar', artwork.images[0])})
    // this.props.artworks.map((artwork) => {console.log(artwork.images[0].url)})

    const SlickButton = ({currentSlide, slideCount, children, ...props}) => (
      <button {...props}>{children}</button>
    )

    const artworks = this.props.artworks.map((artwork) => {
      return (<div className='artwork-container' key={artwork.id}>
        <div className="artwork-image" style={{backgroundImage: `url(${artwork.images[0]})`}}>
          <div className="overlay"></div>
        </div>
        <div className={`artwork-details details-${artwork.id} ${this.state.detailsSelected ? 'all-events' : 'no-events'}`}>
          <div className="details-container">
            <h2 className="title">{artwork.title}</h2>
            <div className="description">
              <h3>The Story Behind the Piece</h3>
              <p>{artwork.description}</p>
            </div>
            <a href={`artworks/${artwork.slug}`} className='view-piece'>VIEW THIS PIECE</a>
            <div className="details">
              <h3>Piece Details</h3>
              <p className="title">{`PIECE NAME: ${artwork.title}`}</p>
              <p className="author">{`AUTHOR: ${artwork.artist_name}`}</p>
              <p className="published">{`DATE PUBLISHED: ${artwork.created_at}`}</p>
            </div>
          </div>
        </div>
        <div className={`details-btn ${this.state.detailsSelected ? 'selected' : ''}`} onClick={()=>this.btnClick(artwork)}>
          <div className="fal fa-times times"></div>
        </div>
      </div>)
    })

    var settings = {
      dots: false,
      beforeChange: (prevIndex, nextIndex) => {
        this.setState({detailsSelected: false})
      },
      draggable: false,
      autoplay: false,
      autoplaySpeed: 5000,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: (<SlickButton><span className={`fal fa-chevron-left`} alt="" /></SlickButton>),
      nextArrow: (<SlickButton><span className={`fal fa-chevron-right`} alt="" /></SlickButton>)
    }

    return (
      <div className={`carousel-wrapper ${this.state.detailsSelected ? 'block-slick-btns' : ''}`}>
        <Slider {...settings} className='art-carousel' id='art-carousel'>
          {artworks}
        </Slider>
      </div>
    )
  }
}
