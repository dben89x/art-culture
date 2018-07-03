import React from 'react'
import $ from 'jquery'

const csrfToken = $('meta[name="csrf-token"]').attr('content')

export default class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      year: new Date().getFullYear(),
      opened: false,
      currentUser: this.props.currentUser,
      sidebarOpen: false,
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
    $('#nav-overlay').fadeToggle(200)
  }

  closeMenu = () =>{
    $('html').css('overflow', 'auto')
    $('#nav-overlay').fadeToggle(200)
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

  signOut=(e)=>{
    e.preventDefault()
    $.ajax({
      type: 'DELETE',
      headers: {
        'X-CSRF-Token': csrfToken
      },
      url: `/users/sign_out.${this.state.currentUser.id}`,
      dataType: 'json',
    }).done((response) => {
      console.log('done')
      this.setState({currentUser: null})
      // this.forceUpdate()
    })
  }

  toggleSidebar=e=>{
    e.preventDefault()
    $('#nav-sidebar').animate({width: 'toggle'})
    this.setState({sidebarOpen: !this.state.sidebarOpen})
  }

  render() {
    const {currentUser} = this.state

    const SigninSignupMobile = () => {
      return currentUser ? (
        <div className="signout">
          <a href={`/users/sign_out.${currentUser.id}`} data-method="DELETE" onClick={this.signOut}>Sign out</a>
        </div>
      ) : (
        <div className="signin-signup">
          <a href="/users/sign_in" >Log in</a>
          <span>{' or '}</span>
          <a href="/users/sign_up">Sign up</a>
        </div>
      )
    }

    const SigninSignup = () => {
      return currentUser ? (
        <div className="signout">
          <a href={`/users/sign_out.${currentUser.id}`} data-method="DELETE" onClick={this.signOut}>Sign out</a>
        </div>
      ) : (
        <div className="signin-signup">
          <a href="/users/sign_in" >Log in</a>
          <a href="/users/sign_up">Sign up</a>
        </div>
      )
    }

    return (<div id='nav-container'>
      <div id="nav-sidebar" className={this.state.sidebarOpen ? 'open' : 'closed'}>
        <div className="header">
          <a onClick={this.toggleSidebar} className='close-btn'>&times;</a>
        </div>
        <div className="sidebar-links-container">
          <div className="sidebar-links">
            <a href="/">Home</a>
            <a href="/artists">Artists</a>
            <a href="/categories">Categories</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </div>
      <nav>
        <div id="navbar">
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
              <SigninSignup/>
            </div>
          </div>
        </div>
      </nav>
    </div>)
  }
}
//
//
// import React from 'react'
// import $ from 'jquery'
// const $window = $(window)
//
// export default class NavBar extends React.Component {
//   constructor(props) {
//     super(props)
//     this.navHeight = 0
//     this.state = {
//       year: new Date().getFullYear(),
//       opened: false,
//       navClass: this.props.navClass
//     }
//   }
//
//   menuClick = e => {
//     e.preventDefault()
//     this.toggleMenu()
//   }
//
//   toggleMenu = e => {
//     this.setState({
//       opened: !this.state.opened
//     }, () => {
//       this.state.opened ? this.openMenu() : this.closeMenu()
//     })
//   }
//
//   openMenu = () =>{
//     $('html').css('overflow', 'hidden')
//     $('.nav-overlay').fadeToggle(200)
//   }
//
//   closeMenu = () =>{
//     $('html').css('overflow', 'auto')
//     $('.nav-overlay').fadeToggle(200)
//   }
//
//   render() {
//
//     return (<div id='nav-container'>
//       <div className='nav-overlay'>
//         <div className="nav-overlay-container">
//           <div className='page-links'>
//             <a href="/">Home</a>
//             <a href="/artists">Artists</a>
//             <a href="/categories">Categories</a>
//           </div>
//           <div className='overlay-footer'>
//             <span className='copyright smooth-font'>{`© ${this.state.year}`}</span>
//           </div>
//         </div>
//       </div>
//       <nav className={`${this.state.navClass}`}>
//         <div className="navbar-header">
//           <div className="navbar-brand"></div>
//
//         </div>
//         <div id="navbar">
//           <div className="nav-links">
//             <div className="left">
//               <div className="section-container">
//               </div>
//             </div>
//             <div className="middle">
//               <div className="section-container">
//                 {/* <a href="#"} className='logo'><img src="https://s3-us-west-1.amazonaws.com/logo.png" alt="Power Strategies"/></a> */}
//                 <a href="#" className='logo'><img src="https://s3-us-west-1.amazonaws.com/art-culture/Group+205.png" alt="Art Culture"/></a>
//               </div>
//             </div>
//             <div className="right">
//               <div className="section-container">
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>)
//   }
// }
