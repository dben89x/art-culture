import React from 'react'
import Slider from 'react-slick'
import $ from 'jquery'

export default class ArtCarousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    this.props.artworks.map((artwork) => {console.log('foobar', artwork.images[0])})
    // this.props.artworks.map((artwork) => {console.log(artwork.images[0].url)})

    const SlickButton = ({currentSlide, slideCount, children, ...props}) => (
      <button {...props}>{children}</button>
    )

    const artworks = this.props.artworks.map((artwork) => {
      return (<div className='artwork-container' key={artwork.id}>
        <div className="artwork-image" style={{backgroundImage: `url(${artwork.images[0]})`}}>
          <div className="overlay"></div>
        </div>
        <div className='artwork-details'>
          <div className="details-container">
            <div className="description"></div>
          </div>
        </div>

      </div>)
    })

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
      <div id="art-hero">
        <Slider {...settings} className='art-carousel' id='art-carousel'>
          {artworks}
        </Slider>
        <div className="btn-container">
          <div className="options">
            <a href="#">View art</a>
            <a href="#">View artists</a>
          </div>
          {/* <a  href={`/artworks/${artwork.slug}`} className='view-text action-btn'>View artwork</a> */}
          {/* <a href='' className='action-btn cta-btn dark'>Call to action</a> */}
        </div>
      </div>
    )
  }
}
