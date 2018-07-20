import React from 'react'
import ContactForm from './ContactForm'

export default class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    return (
      <div id="contact">
        <div className="contact-banner">
          <h2>Let's Get in Touch</h2>
        </div>
        <ContactForm>
          <h3>Please fill out the form below</h3>
        </ContactForm>
      </div>
    )
  }
}
