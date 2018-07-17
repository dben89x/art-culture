import React from 'react'

const csrfToken = $('meta[name="csrf-token"]').attr('content')

export default class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: [],
    }
  }

  componentDidMount() {
    this.$form = $('form#new_user')
    const _this = this
  }

  formSubmit = (e) => {
    e.preventDefault()
    var target = e.target
    var formData = $(this.$form).serializeArray()
    var formDataJson = this.convertFormData(formData)
    delete formDataJson['utf8']

    $.ajax({
      type: 'POST',
      headers: {
        'X-CSRF-Token': csrfToken
      },
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
      formDataJson[key] = formData[i]['value'];
    }
    return formDataJson
  }

  render() {
    const {currentUser} = this.props

    return (<div className="users" id="sign-up">
      <div className="overlay"></div>
      <div id='signup-container' className={`signup-option ${currentUser ? 'hidden' : 'visible'}`}>
        <div className="content-wrapper">
          <h2>Join the community</h2>
          <div className={`errors ${this.state.errors.length > 0 ? 'with-border' : ''}`}>
            {this.state.errors.map(error => (<div className='error'>{error}</div>))}
          </div>
          <form className="new_user" id="new_user" action="/users" acceptCharset="UTF-8" method="post">
            <input name="utf8" type="hidden" value="✓"/>
            <div className="field name-field">
              <div className="name">
                <label htmlFor="user_first_name">First name</label>
                <input autoComplete="given-name" type="text" name="first_name" id="user_first_name"/>
              </div>
              <div className="name">
                <label htmlFor="user_last_name">Last name</label>
                <input autoComplete="family-name" type="text" name="last_name" id="user_last_name"/>
              </div>
            </div>
            <div className="field">
              <label htmlFor="user_email">Email</label>
              <input autoComplete="email" type="email" name="email" id="user_email"/>
            </div>
            <div className="field">
              <label htmlFor="user_phone_number">Phone number</label>
              <input autoComplete="tel" type="tel" name="phone_number" id="user_phone_number"/>
            </div>
            <div className="field">
              <label htmlFor="user_password">{"Password "}</label>
              <em>
                (6 characters minimum)
              </em>
              <input autoComplete="off" type="password" name="password" id="user_password"/>
            </div>
            <div className="field">
              <label htmlFor="user_password_confirmation">Password confirmation</label>
              <input autoComplete="off" type="password" name="password_confirmation" id="user_password_confirmation"/>
            </div>
            <div className="actions">
              <input type="submit" name="commit" value="Sign up" data-disable-with="Sign up" onClick={this.formSubmit}/>
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
