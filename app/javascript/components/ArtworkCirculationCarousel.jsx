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
      prevArrow: (<SlickButton><span className={`fal fa-chevron-left`} alt="" /></SlickButton>),
      nextArrow: (<SlickButton><span className={`fal fa-chevron-right`} alt="" /></SlickButton>)
    }

    return (
      <div className="art-in-circulation">
        <h2>ART IN CIRCULATION</h2>
        <Slider {...settings} className='art-circulation' id='art-circulation-carousel'>
          {artworks}
        </Slider>
      </div>

    )
  }
}
