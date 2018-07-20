import React from 'react'
import Slider from 'react-slick'
import $ from 'jquery'

export default class ArtistCarousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detailsSelected: false,
      artSelected: true,
      artistSelected: false,
    }
  }

  componentDidMount() {
  }

  render() {
    // this.props.artists.map((artist) => {console.log('foobar', artist.images[0])})
    // this.props.artists.map((artist) => {console.log(artist.images[0].url)})

    const SlickButton = ({currentSlide, slideCount, children, ...props}) => (
      <button {...props}>{children}</button>
    )

    const artists = this.props.artists.map((artist) => {
      return (<div className='artist-container' key={artist.id}>
        <div className="artist-image" style={{backgroundImage: `url(${artist.featured_artwork})`}}>
          <div className="overlay"></div>
        </div>
        <div className={`artist-details details-${artist.id}`}>
          <div className="details-container">
            <img src={artist.image} alt={artist.name}/>
            <h2 className="name">{artist.name}</h2>
            <h3>About the Artist</h3>
            <p className='bio'>{artist.bio}</p>
            <div className="cta-btn-container">
              <a href={`artists/${artist.slug}`} className='view'>VIEW ARTIST PAGE</a>
            </div>
            <div className="details">
            </div>
          </div>
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
      nextArrow: (<SlickButton><span className={`fal fa-chevron-right dark`} alt="" /></SlickButton>)
    }

    return (
      <Slider {...settings} className='artist-carousel'>
        {artists}
      </Slider>
    )
  }
}
