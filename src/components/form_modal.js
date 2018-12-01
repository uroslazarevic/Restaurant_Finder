import React, { Component } from 'react';

// Import Components
import { StartForm, LoginForm, SignupForm, PasswordResetForm } from 'components';

export default class FormModal extends Component {
  constructor() {
    super();

    this.state = {
      activeForm: 'start-form',
      activePolicyText: 'login',
      forgotPassword: false,
      policyText: {
        login: 'By logging in',
        signup: 'By creating an account'
      },
      validationMsg: '',
      validate: ''
    }

    this.handleActiveForm = this.handleActiveForm.bind(this);
    this.handlePolicyText = this.handlePolicyText.bind(this);
    this.handleForgotenPassword = this.handleForgotenPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm(fields, event) {
    event.persist();
    const { username = null, email = null, password = null} = fields;
    let msg;
    if(username === '' && email === '' && password === '' 
    || username === '' && email === '' || username === '' ) {
      msg = 'Please enter your email address or username';
      this.setState({ validate: 'error', validationMsg: msg })
    } else if( email === '' && password === '' || email === '' ) {
      msg = 'Please enter your email address';
      this.setState({ validate: 'error', validationMsg: msg })
    } else if ( password === '' ) {
      msg = 'Please enter your password';
      this.setState({ validate: 'error', validationMsg: msg })
    } else {
      msg = 'Submit successful!';
      this.setState({ validate: 'success', validationMsg: msg }, () => {
        setTimeout(() => this.props.hideModalOnSubmit(event), 1500)
      })
    }
  
  }

  handleSubmit(fields, formName) {
    return (event) => {
      event.preventDefault();
      console.log(`${formName} form fields:`, fields)
      this.validateForm(fields, event)
    }
  }

  handleActiveForm(event) {
    const refTo = event.target.dataset.refTo;
    this.setState({ activeForm: refTo, validate: '' })
  }

  handlePolicyText(text) {
    this.setState({ activePolicyText: text });
  }

  handleForgotenPassword(event) {
    event.persist();
    this.setState({ forgotPassword: true }, () => this.handleActiveForm(event) );
  }

  render () {
    const { activeForm, activePolicyText, forgotPassword, policyText, validate, validationMsg } = this.state;

    return (
      <div onClick = { this.props.hideFormModal } className="form-modal-container">
        <div className="form-modal">
          <div className="header">
            {forgotPassword ? 'Forgot password?' : 'Sign up or log in to Zomato'}
            <span className="close-icon"><i className="fas fa-times"></i></span>
          </div>

          <div className="content">

            { validate === 'error' && <div className= "validation-msg animate-validation-error">{validationMsg}</div>  }
            { validate === 'success' && <div className= "validation-msg animate-validation-success">{validationMsg}</div>  }
             { activeForm === 'start-form' && 
              <StartForm handleActiveForm = { this.handleActiveForm } /> }

            { activeForm === 'login-form' && 
            <LoginForm 
              handleSubmit = { this.handleSubmit }
              handlePolicyText = { this.handlePolicyText }
              handleForgotenPassword = { this.handleForgotenPassword }
             /> }

            { activeForm === 'signup-form' && 
            <SignupForm 
              handleSubmit = { this.handleSubmit }
              handlePolicyText = { this.handlePolicyText }
             /> }

            { activeForm === 'password-reset-form' && 
            <PasswordResetForm 
              handleSubmit = { this.handleSubmit }
             /> }

            <div className="privacy-policy">
              { 
                forgotPassword ? '' 
                : <React.Fragment>
                    { policyText[activePolicyText] } , you agree to Zomato's <span>Terms of Service</span>, <span>Cookie Policy</span>, <span>Privacy Policy</span> and <span>Content Policies</span>. 
                  </React.Fragment> 
              }
            </div>
            
          </div>
        </div>
      </div>
    )
  }
}