import React from 'react'
import Errors from '../Errors'
const csrfToken = $('meta[name="csrf-token"]').attr('content')

export default class Signin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: [],
    }
  }

  componentDidMount() {
    this.$form = $('form#new_user')
  }

  submitForm=(e)=>{
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
      url: '/users/sign_in',
      dataType: 'json',
      data: {
        user: formDataJson
      }
    }).done((response) => {
      this.props.onComplete(response)
    }).fail(response => {
      var errors = response.responseJSON.map(error => error.message || error)
      this.setState({
        errors: errors || []
      })
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
    return (<div id='sign-in' className='users'>
      <div className="content-wrapper">
      <h2>Log-in</h2>
      <Errors errors={this.state.errors}/>
      <form className="new_user" id="new_user" action="/users/sign_in" acceptCharset="UTF-8" method="post">
        <input name="utf8" type="hidden" value="✓"/>
        <div className="field">
          <label htmlFor="user_email">Email</label>
          <input autoComplete="email" type="email" name="email" id="user_email"/>
        </div>
        <div className="field">
          <label htmlFor="user_password">Password</label>
          <input autoComplete="off" type="password" name="password" id="user_password"/>
        </div>
        <div className="actions">
          <input type="submit" name="commit" value="Log in" data-disable-with="Log in" onClick={this.submitForm}/>
        </div>
      </form>
      <div className="signup-link">
        {"Don't have an account? "}
        <a href="/users/sign_up" onClick={this.props.onSignupClick}>Sign up</a>
      </div>
      <br/>
      <a href="/users/password/new" onClick={this.props.onPasswordClick}>Forgot your password?</a>
      <br/>
    </div>
  </div>)
  }
}
