import React, { Component } from 'react';
import _ from 'lodash';
import qs from 'qs';

import { axiosServer } from '../../shared/axios_instances/axios_instances';

import { FormField } from 'components';

export default class PasswordResetForm extends Component {
  constructor() {
    super();

    this.state = {
      inputValues: {
        password: '',
        confirmPassword: '',
      },
      validationMsg: null,
      isFormValid: null,
    };

    this.handleInputState = this.handleInputState.bind(this);
  }

  handleInputState(event) {
    const { value, name } = event.target;
    this.setState({ inputValues: { ...this.state.inputValues, [name]: value } });
  }

  validateForm = async formData => {
    console.log('formData', formData);
    let { confirmPassword, password } = formData;
    let error = false;
    let msg;
    password = password.trim();
    confirmPassword = confirmPassword.trim();
    if ((!confirmPassword && !password) || !password) {
      msg = 'Please enter new password.';
      error = true;
    } else if (confirmPassword !== password) {
      msg = 'Passwords must match!';
      error = true;
    }
    error
      ? await this.setState({ isFormValid: 'false', validationMsg: msg })
      : await this.setState({ isFormValid: 'true', validationMsg: null });
    return this.state.isFormValid;
  };

  handleSubmit = formData => {
    return async event => {
      event.preventDefault();
      try {
        const isFormValid = await this.validateForm(formData);
        if (isFormValid === 'true') {
          const query = this.props.location.search.replace('?', '');
          const token = qs.parse(query).token;
          const request = await axiosServer.post('/reset-password/confirm', {
            resetPasswordToken: token,
            password: formData.password,
          });
          this.setState({ isFormValid: 'true', validationMsg: request.data.message });
          setTimeout(() => {
            localStorage.clear();
            this.props.history.push('/');
          }, 2000);
        }
      } catch (err) {
        this.setState({ isFormValid: 'false', validationMsg: err.response.data.message });
      }
    };
  };

  render() {
    const { inputValues, isFormValid, validationMsg } = this.state;
    const fieldStyle = {
      fontWeight: 700,
    };

    const FIELDS = {
      email: {
        name: 'password',
        label: 'Password',
        value: inputValues.password,
        tag: 'input',
        handleInputState: this.handleInputState,
        style: fieldStyle,
        type: 'password',
      },
      confirmPassword: {
        name: 'confirmPassword',
        label: 'Confirm password',
        value: inputValues.confirmPassword,
        tag: 'input',
        handleInputState: this.handleInputState,
        style: fieldStyle,
        type: 'password',
      },
    };

    return (
      <div className="reset-password-page">
        <div className="header">Change your password</div>
        <div className="content">
          {isFormValid === 'false' && validationMsg && (
            <div className="validation-msg animate-validation-error">{validationMsg}</div>
          )}
          {isFormValid === 'true' && validationMsg && (
            <div className="validation-msg animate-validation-success">{validationMsg}</div>
          )}
          {/* Render Form Fields */}
          {_.map(FIELDS, field => {
            return <FormField key={field.name} field={field} />;
          })}

          <button onClick={this.handleSubmit(inputValues)} type="submit" className="password-reset-form-submit-btn">
            Change my password
          </button>
        </div>
      </div>
    );
  }
}
