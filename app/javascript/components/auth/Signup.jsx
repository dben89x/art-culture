import React from 'react'
import Errors from '../Errors'
import ArtistForm from './ArtistForm'
import BuyerForm from './BuyerForm'

const csrfToken = $('meta[name="csrf-token"]').attr('content')

export default class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: [],
      selectedUserType: this.props.selectedUserType || 'artist'
    }
  }

  componentDidMount() {
    this.$form = $('form#new_user')
    const _this = this
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.selectedUserType !== nextProps.selectedUserType) {
      this.setState({selectedUserType: nextProps.selectedUserType})
    }
  }

  userTypeClicked=(e, userType)=>{
    this.setState({selectedUserType: userType})
  }

  capitalize=(string)=>{
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  }


  formSubmit = (e) => {
    e.preventDefault()
    var target = e.target
    var formData = $(this.$form).serializeArray()
    var formDataJson = this.convertFormData(formData)
    delete formDataJson['utf8']

    $.ajax({
      type: 'POST',
      headers: {'X-CSRF-Token': csrfToken},
      url: '/users',
      dataType: 'json',
      data: {
        user: formDataJson
      }
    }).done((response) => {
      this.setState({
        errors: response.full_errors || []
      })
      if (response.status === 200) {
        this.props.onComplete(response)
        // $('#signup-container').fadeOut(200, () => {
        //   $('#subscription-container').fadeIn(200)
        // })
      }
    })
  }

  convertFormData = (formData) => {
    var formDataJson = {}
    for (var i = 0; i < formData.length; ++i) {
      var key = formData[i]['name']
      formDataJson[key] = formData[i]['value']
    }
    return formDataJson
  }

  render() {
    const {currentUser} = this.props

    return (<div className="users" id="sign-up">
      <div id='signup-container' className={`signup-option ${currentUser ? 'hidden' : 'visible'}`}>
        <div className="content-wrapper">
          <h2>Join the community</h2>
          <Errors errors={this.state.errors}/>
          <form className="new_user" id="new_user" action="/users" acceptCharset="UTF-8" method="post">
            <input name="utf8" type="hidden" value="✓"/>
            <input name="type" type="hidden" value={this.capitalize(this.state.selectedUserType)}/>

            <div className="user-types">
              <div className={`user-type artist ${this.state.selectedUserType === 'artist' ? 'selected' : ''}`} onClick={()=> this.setState({selectedUserType: "artist"})}>
                {/* <input type="radio" id="artist" name="type" defaultChecked={['artist', ''].indexOf(this.props.selectedUserType) !== -1} checked={this.state.artistSelected}/> */}
                  <input type="radio" id="artist" name="user_type" checked={this.state.selectedUserType === "artist"}/>
                  <label htmlFor='artist'>Artist</label>
              </div>

              <div className={`user-type buyer ${this.state.selectedUserType === 'buyer' ? 'selected' : ''}`} onClick={()=> this.setState({selectedUserType: "buyer"})}>
                <input type="radio" id="buyer" name="user_type" checked={this.state.selectedUserType === "buyer"}/>
                <label htmlFor="buyer">Buyer</label>
              </div>
            </div>

            {this.state.selectedUserType === 'artist' ? <ArtistForm/> : <BuyerForm/>}
            <div className="actions">
              {this.state.selectedUserType === 'artist' ? (
                <input className='artist' type="submit" name="commit" value="Apply to be an Artist" data-disable-with="Sign up" onClick={this.formSubmit}/>
              ) : (
                <input className='buyer' type="submit" name="commit" value="Sign up as a Buyer" data-disable-with="Sign up" onClick={this.formSubmit}/>
              )}
            </div>
          </form>
          <div className="signin-link">
            {"Already have an account? "}
            <a href="/users/sign_in" onClick={this.props.onSigninClick}>Sign in</a>
          </div>
          <br/>
        </div>
      </div>
    </div>)
  }
}
