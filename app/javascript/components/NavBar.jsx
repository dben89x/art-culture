import React from 'react'
import $ from 'jquery'
const $window = $(window)

export default class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.navHeight = 0
    this.state = {
      year: new Date().getFullYear(),
      opened: false,
      navClass: this.props.navClass
    }
  }

  menuClick = e => {
    e.preventDefault()
    this.toggleMenu()
  }

  toggleMenu = e => {
    this.setState({
      opened: !this.state.opened
    }, () => {
      this.state.opened ? this.openMenu() : this.closeMenu()
    })
  }

  openMenu = () =>{
    $('html').css('overflow', 'hidden')
    $('.nav-overlay').fadeToggle(200)
  }

  closeMenu = () =>{
    $('html').css('overflow', 'auto')
    $('.nav-overlay').fadeToggle(200)
  }

  render() {

    return (<div className='nav-padding'>
      <div className='nav-overlay'>
        <div className="nav-overlay-container">
          <div className='page-links'>
          </div>
          <div className='overlay-footer'>
            <span className='copyright smooth-font'>{`© ${this.state.year}`}</span>
          </div>
        </div>
      </div>
      <nav className={`${this.state.navClass}`}>
        <div className="navbar-header">
          <div className="navbar-brand"></div>
          <a href="" className={`nav-menu ${this.state.opened ? 'opened' : ''} ${this.state.navClass}`} onClick={this.menuClick}>
            <span className='lines'></span>
          </a>
        </div>
        <div id="navbar">
          <div className="nav-links">
            <div className="left">
              <div className="section-container">
                <a href="/">Home</a>
                <a href="/about">Who We are</a>
                <a href="/services">what we do</a>
              </div>
            </div>
            <div className="middle">
              <div className="section-container">
                {/* <a href="#"} className='logo'><img src="https://s3-us-west-1.amazonaws.com/logo.png" alt="Power Strategies"/></a> */}
                <a href="#" className='logo'>LOGO</a>
              </div>
            </div>
            <div className="right">
              <div className="section-container">
                <a href="/projects">projects & partners</a>
                <a href="/publications">publications</a>
                <a href="/contact">contact us</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>)
  }
}
