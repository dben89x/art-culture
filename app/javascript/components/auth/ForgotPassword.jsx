import React from 'react'

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    return (<div className="users" id="sign-in">
      <div className="overlay"></div>
      <div className="content-wrapper">
        <h2>Forgot your password?</h2>
        <form className="new_user" id="new_user" action="/users/password" acceptCharset="UTF-8" method="post">
          <input name="utf8" type="hidden" value="✓"/>
          <input type="hidden" name="authenticity_token" value="dNb+9A9tjXnQC8q1eQrenIAkH4KHGjRfAuwzCt/EfRu1YLWvUwYoHi/jihmGEDydsjPXCNo/UeebA2LiiQt4VA=="/>
          <div className="field">
            <label htmlFor="user_email">Email</label>
            <input autoComplete="email" type="email" value="" name="user[email]" id="user_email"/>
          </div>
          <div className="actions">
            <input type="submit" name="commit" value="Send me reset password instructions" data-disable-with="Send me reset password instructions"/>
          </div>
        </form>
        <div className="signin-link">
          {"Already have an account? "}
          <a href="/users/sign_in" onClick={this.props.onSigninClick}>Sign in</a>
        </div>
        <div className="signup-link">
          {"Don't have an account? "}
          <a href="/users/sign_up" onClick={this.props.onSignupClick}>Sign up</a>
        </div>
      </div>
    </div>)
  }
}
