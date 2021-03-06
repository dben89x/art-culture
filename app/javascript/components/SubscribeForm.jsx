import React from 'react'
import $ from 'jquery'
const csrfToken = $('meta[name="csrf-token"]').attr('content')

export default class SubscribeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.$form = $(`form${this.props.elementId}`)
  }

  handleClick = (e) => {
    e.preventDefault()
    const {name, email} = this.state
    $.ajax({
      type: 'POST',
      headers: {'X-CSRF-Token': csrfToken},
      url: '/api/blog_subscribe',
      dataType: 'json',
      data: {
        "name": name,
        "email": email
      }
    }).done((response) => {
      console.log(JSON.stringify(response))
    })
  }

  changeInput=(e)=>{
    var target = e.target
    this.setState({[target.name]: target.value})
  }

  render() {

    return (<form id={this.props.elementId} action="email_subscribe" className='flex row center' ref={el => this.formRef = el}>
      {/* <input name='name' type="text" onChange={this.changeInput} placeholder='Name'/> */}
      <input name='email' type="email" onChange={this.changeInput} placeholder='Email Address'/>
      <input type="submit" value='Subscribe' className='action-btn white-btn' onClick={this.handleClick}/>
    </form>)
  }
}
