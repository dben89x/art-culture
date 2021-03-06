import React from 'react'
import $ from 'jquery'
import ArtCarousel from '../ArtCarousel'
import ArtistCarousel from '../ArtistCarousel'
import RecentListings from '../RecentListings'
import AuthForms from '../auth/AuthForms'
import ContactForm from '../ContactForm'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAuth: null,
      selectedUserType: null,
      artSelected: true,
      artistSelected: false,
      authModalOpen: false,
    }
  }

  openLogin=()=>{
    this.setState({selectedAuth: 'signin', authModalOpen: true})
  }

  ctaClick=(e, userType)=>{
    e.preventDefault()
    this.setState({selectedUserType: userType, selectedAuth: 'signup', authModalOpen: true})
  }

  selectArt=(e)=>{
    e.preventDefault()
    this.setState({artistSelected: false})
    this.setState({artSelected: true})
    $('#artist-carousel-wrapper').animate({opacity: '0'}, 200, ()=> {
      $('#artist-carousel-wrapper').css('display', 'none')
      $('#art-carousel-wrapper').css('display', 'block')
      setTimeout(()=> $('#art-carousel-wrapper').animate({opacity: '1'}, 200), 100)
    })
  }
  selectArtist=(e)=>{
    e.preventDefault()
    this.setState({artSelected: false})
    this.setState({artistSelected: true})
    $('#art-carousel-wrapper').animate({opacity: '0'}, 200, ()=> {
      $('#art-carousel-wrapper').css('display', 'none')
      $('#artist-carousel-wrapper').css('display', 'block')
      setTimeout(()=> $('#artist-carousel-wrapper').animate({opacity: '1'}, 200), 150)
    })
  }

  render() {
    return (
      <div>
        <div id="art-hero">
          <div id='art-carousel-wrapper'>
            <ArtCarousel artworks={this.props.artworks}></ArtCarousel>
          </div>
          <div id='artist-carousel-wrapper'>
            <ArtistCarousel artists={this.props.artists}></ArtistCarousel>
          </div>
          <div className="btn-container">
            <div className="options">
              <a href="#" className={this.state.artSelected ? 'selected' : ''} onClick={this.selectArt}>Art</a>
              <a href="#" className={this.state.artistSelected ? 'selected' : ''} onClick={this.selectArtist}>Artists</a>
            </div>
          </div>
        </div>
        <section className="banner info">
          <div className="overlay"></div>
          <div className="content">
            <div className="details">
              <h2>ORIGINAL. MEANINGFUL. CONNECTED.</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eros felis, tristique tristique volutpat quis, consequat sed enim. Pellentesque fringilla ante iaculis, iaculis neque sed, scelerisque metus. Praesent nunc erat, faucibus a congue nec, pretium vel augue. Donec porttitor dapibus diam, sed imperdiet justo consequat a. Morbi vitae placerat urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas</p>
            </div>
            <img src="https://s3-us-west-1.amazonaws.com/art-culture/Group+122.png" alt=""/>
          </div>
        </section>
        <RecentListings recentListings={this.props.recentListings} favorites={this.props.favorites} currentUser={this.props.currentUser} onLoginRequired={this.openLogin}/>

        {this.props.currentUser ? null : (<section className="how-it-works flex center">
          <h2>How it works</h2>
          <div className="cta-btn-container">
            <a href="" className='cta-btn' onClick={(e)=> this.ctaClick(e, 'artist')}>
              I'm an Artist
              <span></span>
            </a>
            <a href="" className='cta-btn' onClick={(e)=> this.ctaClick(e, 'buyer')}>
              I'm a Buyer
              <span></span>
            </a>
          </div>
        </section>)}

        <AuthForms selectedAuth={this.state.selectedAuth} modalIsOpen={this.state.authModalOpen} onClose={()=> this.setState({authModalOpen: false})} selectedUserType={this.state.selectedUserType}/>
        <ContactForm>
          <h2>Have a Question?</h2>
          <p>Fill out the form below and a representative from Art & Culture Exchange will reach out to you within 24 hours.</p>
        </ContactForm>
      </div>
    )
  }
}
