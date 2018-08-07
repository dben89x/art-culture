import React from 'react'
import $ from 'jquery'

export default class BuyerForm extends React.Component {
  constructor(props) {
    super(props)
    var {user} = this.props || {}
    this.state = { ...user }
  }

  changeInput=e=>{
    var {target} = e
    var {name, value} = target
    this.setState({[name]: value})
  }

  render() {

    return (
      <div className="buyer-signup">
        <div className="field name-field">
          <div className="name half">
            <label htmlFor="user_first_name">First name</label>
            <input autoComplete="given-name" type="text" name="first_name" id="user_first_name" value={this.state.first_name} onChange={this.changeInput}/>
          </div>
          <div className="name half">
            <label htmlFor="user_last_name">Last name</label>
            <input autoComplete="family-name" type="text" name="last_name" id="user_last_name" value={this.state.last_name} onChange={this.changeInput}/>
          </div>
        </div>
        <div className="field">
          <label htmlFor="user_email">Email</label>
          <input autoComplete="email" type="email" name="email" id="user_email" value={this.state.email} onChange={this.changeInput}/>
        </div>
        <div className="field">
          <label htmlFor="user_phone_number">Phone number</label>
          <input autoComplete="tel" type="tel" name="phone_number" id="user_phone_number" value={this.state.phone_number} onChange={this.changeInput}/>
        </div>

        {$.isEmptyObject(this.props.user) ? (
          <div>
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
          </div>
        ) : null }
      </div>
    )
  }
}
