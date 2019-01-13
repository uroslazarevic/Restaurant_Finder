import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import { StartForm, LoginForm, SignupForm, PasswordResetForm } from 'components';
// Import Actions
import { signup, login } from '../../../actions/auth_user'
import { setHiddenFM, setVisibleFM  } from '../../../actions/event_bus'

class FormModal extends Component {
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
    this.hideFormModal = this.hideFormModal.bind(this);
    this.hideFormModalOnFormSubmit = this.hideFormModalOnFormSubmit.bind(this);
  }

  hideFormModal(event) {
    const target = event.target;
    if( target.classList.contains('form-modal-container') || target.classList.contains('close-icon')) {
      this.props.setHiddenFM()
    }
  }

  hideFormModalOnFormSubmit() {
    this.props.setHiddenFM()
  }

  validateForm(formData, event) {
    event.persist();
    const { username = null, email = null, password = null} = formData;
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
    } else if ( password.length < 6 ){
      msg = 'Password must be atleast 6 characters long';
      this.setState({ validate: 'error', validationMsg: msg })
    } else {
      msg = 'Submit successful!';
      this.setState({ validate: 'success', validationMsg: msg }, () => {
        setTimeout(() => this.props.setHiddenFM(), 1500)
      })
    }
  }

  handleSignup(formData) {
    this.props.signup(formData)
    setTimeout(() => {
      console.log('USER:', this.props.user)
    }, 2000)
  }

  handleLogin(formData) {
    this.props.login(formData)
    setTimeout(() => {
      console.log('USER:', this.props.user)
    }, 2000)
  }

  handleSubmit(formData, formName) {
    return (event) => {
      this.validateForm(formData, event)
      event.preventDefault();
      setTimeout(() => {
        if(this.state.validate === 'success') {
          console.log(`${formName} form fields:`, formData)
          if(formName === 'login') {
            this.handleLogin(formData)
          } else {
            this.handleSignup(formData)
          }
        }
      }, 1500)
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
      <div onClick = { this.hideFormModal } className="form-modal-container">
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

function mapStateToProps({ authentification }) {
  const { user } = authentification;
  return {
    user
  }
}

export default connect(mapStateToProps, { signup, login, setHiddenFM, setVisibleFM } )(FormModal);