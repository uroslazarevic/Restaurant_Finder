import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import { StartForm, LoginForm, SignupForm, PasswordResetForm } from 'components';
// Import Actions
import { signup, login } from '../../../actions/auth_user';
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
      validationMsg: '',
      isValidated: '',
      fieldsAdjusted: false,
    };

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
    if (
      target.classList.contains('form-modal-container') ||
      target.classList.contains('close-icon')
    ) {
      this.props.setHiddenFM();
    }
  }

  hideFormModalOnFormSubmit() {
    this.props.setHiddenFM();
  }

  async validateForm(formData, validate = null) {
    const { username = null, email = null, password = null } = formData;
    let msg;
    if (
      (username === '' && email === '' && password === '') ||
      (username === '' && email === '') ||
      username === ''
    ) {
      msg = 'Please enter your email address or username';
      await this.setState({ isValidated: 'error', validationMsg: msg, fieldsAdjusted: false });
    } else if ((email === '' && password === '') || email === '') {
      msg = 'Please enter your email address';
      await this.setState({ isValidated: 'error', validationMsg: msg, fieldsAdjusted: false });
    } else if (password === '') {
      msg = 'Please enter your password';
      await this.setState({ isValidated: 'error', validationMsg: msg, fieldsAdjusted: false });
    } else if (password.length < 6) {
      msg = 'Password must be atleast 6 characters long';
      await this.setState({ isValidated: 'error', validationMsg: msg, fieldsAdjusted: false });
    } else if (validate) {
      const { status, message } = validate;

      if (status === 200) {
        this.setState({ validationMsg: 'You are successful!', isValidated: 'success' }, () => {
          setTimeout(() => this.props.setHiddenFM(), 1500);
        });
        return;
      }
      // LOGIN ERRORS
      if (status === 400 && message === 'INVALID_PASSWORD') {
        this.setState({ validationMsg: 'Please enter a valid password', isValidated: 'error' });
      }
      if (status === 400 && message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
        this.setState({
          validationMsg: 'Too many unsuccessful login attempts. Try later.',
          isValidated: 'error',
        });
      }
      // SIGNUP ERRORS
      if (status === 400 && message === 'EMAIL_EXISTS') {
        this.setState({
          validationMsg: 'This email is already taken. Try again.',
          isValidated: 'error',
        });
      }
      // LOGIN & SIGNUP ERRORS
      if (
        (status === 400 && message === 'EMAIL_NOT_FOUND') ||
        (status === 400 && message === 'INVALID_EMAIL')
      ) {
        this.setState({
          validationMsg: 'Please enter a valid email  (example@example.com)',
          isValidated: 'error',
        });
      }
    } else {
      await this.setState({ fieldsAdjusted: true });
    }
  }

  handleSubmit(formData, formName) {
    return event => {
      event.preventDefault();
      this.validateForm(formData).then(() => {
        // console.log(`${formName} form fields:`, formData);
        if (this.state.fieldsAdjusted) {
          if (formName === 'login') {
            this.props.login(formData).then(() => this.validateForm(formData, this.props.validate));
          } else {
            this.props
              .signup(formData)
              .then(() => this.validateForm(formData, this.props.validate));
          }
        }
      });
    };
  }

  handleActiveForm(event) {
    const refTo = event.target.dataset.refTo;
    this.setState({ activeForm: refTo, validate: '' });
  }

  handlePolicyText(text) {
    this.setState({ activePolicyText: text });
  }

  handleForgotenPassword(event) {
    event.persist();
    this.setState({ forgotPassword: true }, () => this.handleActiveForm(event));
  }

  render() {
    const {
      activeForm,
      activePolicyText,
      forgotPassword,
      policyText,
      isValidated,
      validationMsg,
    } = this.state;

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
            {isValidated === 'error' && (
              <div className="validation-msg animate-validation-error">{validationMsg}</div>
            )}
            {isValidated === 'success' && (
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
              <SignupForm
                handleSubmit={this.handleSubmit}
                handlePolicyText={this.handlePolicyText}
              />
            )}

            {activeForm === 'password-reset-form' && (
              <PasswordResetForm handleSubmit={this.handleSubmit} />
            )}

            <div className="privacy-policy">
              {forgotPassword ? (
                ''
              ) : (
                <React.Fragment>
                  {policyText[activePolicyText]} , you agree to Zomato's{' '}
                  <span>Terms of Service</span>, <span>Cookie Policy</span>,{' '}
                  <span>Privacy Policy</span> and <span>Content Policies</span>.
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authentification }) {
  const { user, validate } = authentification;
  return {
    user,
    validate,
  };
}

export default connect(
  mapStateToProps,
  { signup, login, setHiddenFM, setVisibleFM }
)(FormModal);
