import React, { Component } from 'react';
import _ from 'lodash';

import { FormField } from 'components';

export default class LoginForm extends Component {

  constructor() {
    super();

    this.state = {
      formFor: 'password-reset',
      inputValues : {
        email: '',
      }
    }

    this.handleInputState = this.handleInputState.bind(this);
  }

  handleInputState(event) {
    const { value, name } = event.target;
    this.setState({ inputValues: {...this.state.inputValues, [name]: value  }})
  }

  render() {
    const { inputValues, formFor } = this.state;
    const fieldStyle = {
      fontWeight: 700
    }

    const FIELDS = {
      email: {
        name: 'email',
        label: 'Email Address',
        value: inputValues.password,
        tag: 'input',
        handleInputState: this.handleInputState,
        style : fieldStyle 
      }
    }

    return (
      <form className="password-reset-form">
        <div className="message">Please enter the email address you signed up with and we'll send you a password reset link.</div>

        {/* Render Form Fields */}
        { _.map( FIELDS, field => {
          return <FormField key = {field.name} field = { field } />
        } )  }

        <button 
          onClick={this.props.handleSubmit(inputValues, formFor)} 
          type="submit" 
          className="password-reset-form-submit-btn"
        >
            Reset password
        </button>
      </form>
    )
  }
}
