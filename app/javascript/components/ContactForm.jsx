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
      formValid: false,
      isLoading: false
    }
  }

  submitForm = (e) => {
    e.preventDefault()
    // this.setState({formDisabled: true})
    const {name, email, number, message} = this.state

    this.setState({isLoading: true, faClass: 'fa-spinner fa-spin'})
    $.post('/requests', {
      request: {
        type: 'ContactRequest',
        name: name,
        email: email,
        phone: number,
        message: message
      }
    }).done((data) => {
      this.setState({faClass: 'fa-check'}, ()=>{
        window.setTimeout(()=>{
          this.setState({isLoading: false})
          this.displaySuccessMessage()
        }, 1000)
      })
    })
  }


  inputChange = (e) => {
    var target = e.target
    this.setState({
      [target.name]: target.value
    })
    this.checkValidation()
  }

  checkValidation=()=>{
    this.setState({formValid: this.formRef.checkValidity()})
  }

  displaySuccessMessage = () => {
    $('#contact-form').fadeOut(200,()=>{
      $('#contact-success .success-message').fadeIn(200)
    })
  }

  render() {
    return (<div id='contact-form-container'>
      <div className="contact-container">
        <form id="contact-form" ref={el => this.formRef = el}>
          <div className="form-container">
            {this.props.children}
            <div className='input-wrapper name'>
              <input required={true} type="text" name='name' placeholder='Your Name *' value={this.state.name} onChange={this.inputChange}/>
            </div>
            <div className='input-wrapper email'>
              <input required={true} type="email" name='email' placeholder='Email Address *' value={this.state.email} onChange={this.inputChange}/>
            </div>
            <div className='input-wrapper number'>
              <input required={true} type="tel" name='number' placeholder='Phone Number *' value={this.state.number} onChange={this.inputChange}/>
            </div>
            <div className='input-wrapper message'>
              <textarea name='message' placeholder='Your Message' value={this.state.message} onChange={this.inputChange}/>
            </div>
            <div className='input-wrapper submit smooth-font'>
              <button type="submit" onClick={this.submitForm} className={`submit action-btn blue-btn ${!this.state.formValid ? 'disabled' : ''}`} disabled={!this.state.formValid}>{this.state.isLoading ? (<i className={`far ${this.state.faClass}`}></i>) : "Send Message"}</button>
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
