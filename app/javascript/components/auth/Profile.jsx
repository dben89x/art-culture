import React from 'react'
import ArtistForm from './ArtistForm'
import BuyerForm from './BuyerForm'
import Errors from '../Errors'
const csrfToken = $('meta[name="csrf-token"]').attr('content')

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }

  componentDidMount() {
    this.$form = $('form#edit_user')
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

  capitalize=(string)=>{
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  }

  render() {

    const {user} = this.props

    return (<div className="users" id="profile-modal">
      <div id='profile-container'>
        <div className="content-wrapper">
          <h2>Edit your profile</h2>
          <Errors errors={this.state.errors}/>
          <form className="edit_user" id="edit_user" action="/users" acceptCharset="UTF-8" method="post">
            <input name="utf8" type="hidden" value="✓"/>

            {this.props.user.type === 'artist' ? <ArtistForm user={user}/> : <BuyerForm user={user}/>}
            <div className="actions">
              {this.props.user.type === 'artist' ? (
                <input className='artist' type="submit" name="commit" value="Save Changes" data-disable-with="Sign up" onClick={this.formSubmit}/>
              ) : (
                <input className='buyer' type="submit" name="commit" value="Save Changes" data-disable-with="Sign up" onClick={this.formSubmit}/>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>)
  }
}
