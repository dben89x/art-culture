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
    const {user} = this.props

    this.setState({isLoading: true})
    $.ajax({
      type: 'PATCH',
      headers: {'X-CSRF-Token': csrfToken},
      url: `/users`,
      dataType: 'json',
      data: {
        user: formDataJson
      }
    }).done((response) => {
      this.setState({isLoading: false})
      console.log(JSON.stringify(response))
      if (response.status === 200) {
        console.log('got here...')
        this.props.onComplete()
      } else if (response.status === 400) {
        var errors = response.responseJSON.map(error => error.message || error)
        this.setState({
          errors: errors || []
        })
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

            {this.props.user.type === 'Artist' ? <ArtistForm user={user}/> : <BuyerForm user={user}/>}
            <div className="actions">
              {this.props.user.type === 'Artist' ? (
                <button className='artist' type="submit" name="commit" data-disable-with="Sign up" onClick={this.formSubmit}>{this.state.isLoading ? (<i className='fas fa-spinner fa-spin'></i>) : "Save Changes"}</button>
              ) : (
                <button className='buyer' type="submit" name="commit" data-disable-with="Sign up" onClick={this.formSubmit}>{this.state.isLoading ? (<i className='fas fa-spinner fa-spin'></i>) : "Save Changes"}</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>)
  }
}
