import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import { StartForm, LoginForm, SignupForm, PasswordResetForm } from 'components';
// Import Actions
import { signup, signin } from '../../../actions/auth_user';
import { setHiddenFM, setVisibleFM } from '../../../actions/event_bus';

class FormModal extends Component {
  constructor() {
    super();

    this.state = {
      activeForm: 'start-form',
      activePolicyText: 'login',
      forgotPassword: false,
      policyText: {
        login: 'By logging in',
        signup: 'By creating an account',
      },
      validationMsg: null,
      isFormValid: null,
      formData: null,
    };
  }

  hideFormModal = event => {
    const target = event.target;
    if (target.classList.contains('form-modal-container') || target.classList.contains('close-icon')) {
      this.props.setHiddenFM();
    }
  };

  validateForm = async (formData, formName) => {
    console.log('formData', formData);
    let { username = '', email = '', password = '' } = formData;
    if (formName === 'login') {
      username = 'empty';
    }
    username = username.trim();
    email = username.trim();
    password = password.trim();
    let msg;
    let error;
    if ((!username && !email && !password) || (!username && !email) || !username) {
      error = true;
      msg = 'Please enter your email address or username';
    } else if ((!email && !password) || !email) {
      error = true;
      msg = 'Please enter your email address';
    } else if (!password) {
      error = true;
      msg = 'Please enter your password';
    }
    error
      ? await this.setState({ isFormValid: 'false', validationMsg: msg })
      : await this.setState({ isFormValid: 'true', validationMsg: null });
    return this.state.isFormValid;
  };

  handleSubmit = (formData, formName) => {
    return async event => {
      event.preventDefault();
      const isFormValid = await this.validateForm(formData, formName);
      if (isFormValid === 'true') {
        if (formName === 'login') {
          await this.props.signin(formData);
          this.hideModalOnSubmit();
        } else {
          await this.props.signup(formData);
          this.setState({ isFormValid: 'true', validationMsg: this.props.authMessage });
          this.hideModalOnSubmit();
        }
        if (this.props.errorMessage) {
          this.setState({ isFormValid: 'false', validationMsg: this.props.errorMessage });
        }
      }
    };
  };

  hideModalOnSubmit() {
    setTimeout(() => {
      this.props.setHiddenFM();
    }, 2000);
  }

  handleActiveForm = event => {
    const refTo = event.target.dataset.refTo;
    this.setState({ activeForm: refTo, validate: '' });
  };

  handlePolicyText = text => {
    this.setState({ activePolicyText: text });
  };

  handleForgotenPassword = event => {
    event.persist();
    this.setState({ forgotPassword: true }, () => this.handleActiveForm(event));
  };

  render() {
    const { activeForm, activePolicyText, forgotPassword, policyText, isFormValid, validationMsg } = this.state;

    return (
      <div onClick={this.hideFormModal} className="form-modal-container">
        <div className="form-modal">
          <div className="header">
            {forgotPassword ? 'Forgot password?' : 'Sign up or log in to Zomato'}
            <span className="close-icon">
              <i className="fas fa-times" />
            </span>
          </div>

          <div className="content">
            {isFormValid === 'false' && validationMsg && (
              <div className="validation-msg animate-validation-error">{validationMsg}</div>
            )}
            {isFormValid === 'true' && validationMsg && (
              <div className="validation-msg animate-validation-success">{validationMsg}</div>
            )}
            {activeForm === 'start-form' && <StartForm handleActiveForm={this.handleActiveForm} />}

            {activeForm === 'login-form' && (
              <LoginForm
                handleSubmit={this.handleSubmit}
                handlePolicyText={this.handlePolicyText}
                handleForgotenPassword={this.handleForgotenPassword}
              />
            )}

            {activeForm === 'signup-form' && (
              <SignupForm handleSubmit={this.handleSubmit} handlePolicyText={this.handlePolicyText} />
            )}

            {activeForm === 'password-reset-form' && <PasswordResetForm handleSubmit={this.handleSubmit} />}

            <div className="privacy-policy">
              {forgotPassword ? (
                ''
              ) : (
                <React.Fragment>
                  {policyText[activePolicyText]} , you agree to Zomato&apos;s <span>Terms of Service</span>,{' '}
                  <span>Cookie Policy</span>, <span>Privacy Policy</span> and <span>Content Policies</span>.
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authentification, errorMessage }) {
  const { user, authMessage } = authentification;
  return {
    user,
    errorMessage,
    authMessage,
  };
}

export default connect(
  mapStateToProps,
  { signup, signin, setHiddenFM, setVisibleFM }
)(FormModal);
