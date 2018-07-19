import React from 'react'
import $ from 'jquery'
import Rodal from 'rodal'
import AuthForms from './auth/AuthForms'

const csrfToken = $('meta[name="csrf-token"]').attr('content')

export default class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      year: new Date().getFullYear(),
      opened: false,
      currentUser: this.props.currentUser,
      sidebarOpen: false,
      signinVisible: false,
      selectedAuth: null,
    }
  }

  componentWillUnmount() {
    this.setState({opened: false})
    $('html').css('overflow', 'auto')
    $('#nav-overlay').css('display', 'none')
    console.log('unmounting...')
  }

  componentWillReceiveProps(nextProps) {
    console.log("in navbar")
    console.log('foobar', nextProps)
  }


  ////////// Nav menu //////////

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
    $('#nav-overlay').fadeToggle(200)
  }

  closeMenu = () =>{
    $('html').css('overflow', 'auto')
    $('#nav-overlay').fadeToggle(200)
  }

  toggleSidebar=e=>{
    e.preventDefault()
    $('#nav-sidebar').animate({width: 'toggle'})
    this.setState({sidebarOpen: !this.state.sidebarOpen})
  }

  ////////// Nav menu //////////


  ////////// Auth actions //////////

  signinClick=(e)=>{
    e.preventDefault()
    this.setState({selectedAuth: 'signin'})
  }
  signupClick=(e)=>{
    e.preventDefault()
    this.setState({selectedAuth: 'signup'})
  }

  onSignoutComplete=(response)=>{
    window.location.reload()
    // console.log('done')
    // this.setState({currentUser: null})
    // this.forceUpdate()
  }

  closeModal=(callback)=>{
    this.setState({modalIsOpen: false}, ()=> callback())
  }

  signOut=(e)=>{
    e.preventDefault()
    $.ajax({
      type: 'GET',
      headers: { 'X-CSRF-Token': csrfToken },
      url: `/users/sign_out.${this.state.currentUser.id}`,
      dataType: 'json',
    }).done((response) => {
      this.onSignoutComplete(response)
    })
  }
  ////////// Auth actions //////////

  render() {
    const {currentUser} = this.state

    const AuthOptions = () => (
      currentUser
      ? <Signout/>
      : <SigninSignup/>)

    const Signout = () => (<div className="signout">
      <a href={`/users/sign_out`} onClick={this.signOut}>Sign out</a>
    </div>)

    const SigninSignup = () => (<div className="signin-signup">
      <a href="/users/sign_in" onClick={this.signinClick}>Log in</a>
      <a href="/users/sign_up" onClick={this.signupClick}>Sign up</a>
    </div>)

    return (<div id='nav-container'>
      <div id="nav-sidebar" className={this.state.sidebarOpen ? 'open' : 'closed'}>
        <div className="header">
          {/* <img src="https://s3-us-west-1.amazonaws.com/art-culture/Group+122.png" style={{width: '90%', margin: '0 0 2em'}} alt=""/> */}
          <a onClick={this.toggleSidebar} className='close-btn'>&times;</a>
        </div>
        <div className="sidebar-links-container">
          <div className="sidebar-links">
            {/* <img src="https://s3-us-west-1.amazonaws.com/art-culture/Group+122.png" style={{width: '90%', margin: '0 0 2em'}} alt=""/> */}
            <a href="/">Home</a>
            <a href="/artists">Artists</a>
            <a href="/categories">Categories</a>
            <a href="/contact">Contact</a>

            <div className="sidebar-footer">
              <AuthOptions/>
              <div className="social-links">
                <a href='https://www.instagram.com/' target='_blank'>
                  <i className='fab fa-instagram'/>
                </a>
                <a href='https://www.facebook.com/' target='_blank'>
                  <i className='fab fa-facebook-f'/>
                </a>
                <a href='https://www.twitter.com/' target='_blank'>
                  <i className='fab fa-twitter'/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav>
        <div id="navbar">
          {/* <a href="" className={`nav-menu nav-menu-mobile`} onClick={this.toggleSidebar}>
            <span className='lines'></span>
          </a> */}
          <div className="nav-links">
            <div className={`navbar-header left`}>
              <a href="" className={`nav-menu`} onClick={this.toggleSidebar}>
                <span className='lines'></span>
              </a>
            </div>
            <div className="middle">
              <a href="#" className='logo'><img src="https://s3-us-west-1.amazonaws.com/art-culture/Group+205.png" alt="Art Culture"/></a>
            </div>
            <div className="right">
              <AuthOptions/>
            </div>
          </div>
        </div>
      </nav>
      <AuthForms selectedAuth={this.state.selectedAuth}/>
    </div>)
  }
}
