import React from 'react'
import $ from 'jquery'

export default class ArtistForm extends React.Component {
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

  componentWillReceiveProps(nextProps) {
    var {user} = this.props || {}
    this.user = user
    console.log(user)
  }

  componentDidMount() {
    var {user} = this.props || {}
    this.user = user
    console.log('foobar stuff and things', user)
  }

  render() {


    return (
      <div className="artist-signup">
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
        <div className="field name-field">
          <div className="name half">
            <label htmlFor="user_email">Email</label>
            <input autoComplete="email" type="email" name="email" id="user_email" value={this.state.email} onChange={this.changeInput}/>
          </div>
          <div className="name half">
            <label htmlFor="user_phone_number">Phone number</label>
            <input autoComplete="tel" type="tel" name="phone_number" id="user_phone_number" value={this.state.phone_number} onChange={this.changeInput}/>
          </div>
        </div>
        <div className="field name-field">
          <div className="name half">
            <label htmlFor="user_location">City, State</label>
            <input type="text" name="location"  id="user_location" value={this.state.location} onChange={this.changeInput}/>
          </div>
          <div className="name half">
            <label htmlFor="user_website">Website</label>
            <input autoComplete="url" type="url" name="website" id="user_website" value={this.state.website} onChange={this.changeInput}/>
          </div>
        </div>
        <div className="field">
          <label htmlFor="user_bio">Bio</label>
          <textarea name="bio" id="user_bio" cols="30" rows="5" value={this.state.bio} onChange={this.changeInput}/>
        </div>

        {$.isEmptyObject(this.props.user) ? (
          <div className="field name-field">
            <div className="name half">
              <label htmlFor="user_password">{"Password "}
                <em>
                  (6 characters minimum)
                </em>
              </label>
              <input autoComplete="off" type="password" name="password" id="user_password"/>
            </div>
            <div className="name half">
              <label htmlFor="user_password_confirmation">Password confirmation</label>
              <input autoComplete="off" type="password" name="password_confirmation" id="user_password_confirmation"/>
            </div>
          </div>
        ) : null }

      </div>
    )
  }
}
