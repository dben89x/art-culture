import React from 'react'
import $ from 'jquery'

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      number: '',
      message: '',
      requestSent: false,
      formDisabled: false,
    }
  }

  submitForm = (e) => {
    e.preventDefault()
    this.setState({formDisabled: true})
    this.displaySuccessMessage()
    // const {name, email, number, message} = this.state
    // $.post('/requests', {
    //   request: {
    //     type: 'ContactRequest',
    //     name: name,
    //     email: email,
    //     phone: number,
    //     message: message
    //   }
    // }).done((data) => {
    //   this.displaySuccessMessage()
    // })
  }

  inputChange = (e) => {
    var target = e.target
    this.setState({
      [target.name]: target.value
    })
  }

  displaySuccessMessage = () => {
    $('#contact-form').fadeOut(200,()=>{
      $('#contact-success .success-message').fadeIn(200)
    })
  }

  render() {
    return (<div id='contact-form-container'>
      <div className="contact-container">
        <form id="contact-form">
          <div className="form-container">
            <h2>Have a Question?</h2>
            <p>Fill out the form below and a representative from Art & Culture Exchange will reach out to you within 24 hours.</p>
            <div className='input-wrapper name'>
              <input type="text" name='name' placeholder='Your Name' value={this.state.name} onChange={this.inputChange}/>
            </div>
            <div className='input-wrapper email'>
              <input type="email" name='email' placeholder='Email Address' value={this.state.email} onChange={this.inputChange}/>
            </div>
            <div className='input-wrapper number'>
              <input type="tel" name='number' placeholder='Phone Number' value={this.state.number} onChange={this.inputChange}/>
            </div>
            <div className='input-wrapper message'>
              <textarea name='message' placeholder='Your Message' value={this.state.message} onChange={this.inputChange}/>
            </div>
            <div className='input-wrapper submit smooth-font'>
              <input type="submit" value='submit form' className='submit action-btn blue-btn' onClick={this.submitForm} disabled={this.state.formDisabled}/>
            </div>
          </div>
        </form>
        <div id='contact-success'>
          <div className='success-message'>
            Thanks! We will contact you soon!
          </div>
        </div>
      </div>
    </div>)
  }
}
