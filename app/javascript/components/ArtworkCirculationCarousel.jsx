import React from 'react'
import Slider from 'react-slick'
import $ from 'jquery'

export default class ArtworkCirculationCarousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    console.log(this.props.artworks)

    const artworks = this.props.artworks.map((artwork) => {
      return (<div className='artwork-container' key={artwork.id}>
        <img className="artwork-image" src={artwork.images[0]}/>
        <div className="details-container">
          <h2 className="title">{artwork.title}</h2>
          <div className="description">
            <p>{artwork.description}</p>
          </div>
          <div className="btn-container">
            <a href={`artworks/${artwork.slug}`} className='view-piece'>MORE INFO</a>
          </div>
        </div>
      </div>)
    })

    const SlickButton = ({currentSlide, slideCount, children, ...props}) => (
      <button {...props}>{children}</button>
    )

    var settings = {
      dots: false,
      draggable: false,
      autoplay: false,
      autoplaySpeed: 5000,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: (<SlickButton><span className={`fal fa-chevron-left dark`} alt="" /></SlickButton>),
      nextArrow: (<SlickButton><span className={`fal fa-chevron-right dark`} alt="" /></SlickButton>)
    }

    return (
      <div className="art-in-circulation">
        <h2>
          <div className="custom-hr"></div>
          ART IN CIRCULATION
          <div className="custom-hr"></div>
        </h2>
        <Slider {...settings} className='art-circulation' id='art-circulation-carousel'>
          {artworks}
        </Slider>
      </div>

    )
  }
}
