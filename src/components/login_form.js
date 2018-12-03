import React, { Component } from 'react';
import _ from 'lodash';

import { FormField } from 'components';

export default class LoginForm extends Component {

  constructor() {
    super();

    this.state = {
      formFor: 'login',
      boxChecked: false,
      inputValues : {
        username: '',
        password: '',
      }
    }

    this.handleCheckBoxState = this.handleCheckBoxState.bind(this);
    this.handleInputState = this.handleInputState.bind(this);
  }

  handleCheckBoxState() {
    this.setState(state => ({ boxChecked: !state.boxChecked }))
  }

  handleInputState(event) {
    const { value, name } = event.target;
    this.setState({ inputValues: {...this.state.inputValues, [name]: value  }} )
  }

  componentWillMount() {
    this.props.handlePolicyText(this.state.formFor);
  }

  render() {
    const { inputValues, formFor } = this.state;
 
    const FIELDS = {
      username: {
        name: 'username',
        label: 'Email / Zomato Username',
        value: inputValues.username,
        type: 'input',
        handleInputState: this.handleInputState
      },
      password: {
        name: 'password',
        label: 'Password',
        value: inputValues.password,
        type: 'input',
        handleInputState: this.handleInputState
      },
    }

    return (
      <form className="login-form">
        {/* Render Form Fields */}
        { _.map( FIELDS, field => {
          return <FormField key = {field.name} field = { field } />
        } )  }
       
        <div className="check-data">
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked = { this.state.boxChecked } onClick = { this.handleCheckBoxState } />
            Remember me
          </label>
          <div data-ref-to = 'password-reset-form' onClick = { (this.props.handleForgotenPassword) } className="forgotpass">
            Forgot password?
          </div>
        </div>
        <button 
          onClick={this.props.handleSubmit(inputValues, formFor)} 
          type="submit" 
          className="login-form-submit-btn"
        >
          Log in
        </button>
      </form>
    )
  }
}
