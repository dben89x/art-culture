import React from 'react'
import Rodal from 'rodal'

import ForgotPassword from './ForgotPassword'
import Signin from './Signin'
import Signup from './Signup'

export default class AuthForms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      authContent: null,
      formClass: ''
    }
  }

  componentDidMount() {
    this.formActions = {
      signin: ()=> this.setAuthOption('signin', <Signin onComplete={this.onSigninComplete} onSignupClick={this.onSignupClick} onPasswordClick={this.onPasswordClick}/>),
      signup: ()=> this.setAuthOption('signup', <Signup onComplete={this.onSignupComplete} onSigninClick={this.onSigninClick}/>),
      password: ()=> this.setAuthOption('signin', <ForgotPassword onComplete={this.onPasswordComplete} onSignupClick={this.onSignupClick} onSigninClick={this.onSigninClick}/>)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedAuth && nextProps.modalIsOpen) {
      this.renderNewForm(nextProps.selectedAuth)
    }
  }

  renderNewForm = (selectedForm) => {
    this.setState({
      modalIsOpen: false
    }, () => {
      this.formActions[selectedForm]()
    })
  }

  setAuthOption = (formClass, authComponent) => {
    this.setState({
      formClass: formClass,
      authContent: authComponent
    }, () => {
      this.setState({modalIsOpen: true})
    })
  }

  onSigninClick=(e)=>{
    e.preventDefault()
    this.renderNewForm('signin')
  }
  onSignupClick=(e)=>{
    e.preventDefault()
    this.renderNewForm('signup')
  }
  onPasswordClick=(e)=>{
    e.preventDefault()
    this.renderNewForm('password')
  }

  onSigninComplete = (response) => {
    // this.props.onSigninComplete(response)
    window.location.reload()
  }
  onSignupComplete = (response) => {
    // this.props.onSignupComplete(response)
    window.location.reload()
  }
  onPasswordComplete = (response) => {
    // this.props.onPasswordComplete(response)
    window.location.reload()
  }

  closeModal=()=>{
    this.setState({modalIsOpen: false}, ()=>{
      this.props.onClose()
    })
  }

  render() {

    return (<div className="auth-forms">
      <Rodal visible={this.state.modalIsOpen} onClose={this.closeModal} closeOnEsc={true} className={`users ${this.state.formClass}`}>
        {this.state.authContent}
      </Rodal>
    </div>)
  }
}
