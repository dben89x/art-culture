import React from 'react'
import $ from 'jquery'
import ArtCarousel from '../ArtCarousel'
import RecentListings from '../RecentListings'
import AuthForms from '../auth/AuthForms'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAuth: null
    }
  }

  openLogin=()=>{
    this.setState({selectedAuth: 'signin'})
  }

  render() {
    return (
      <div>
        <ArtCarousel artworks={this.props.artworks}></ArtCarousel>
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
        <section className="how-it-works flex center">
          <h2>How it works</h2>
        </section>
        <AuthForms selectedAuth={this.state.selectedAuth}/>
      </div>
    )
  }
}
