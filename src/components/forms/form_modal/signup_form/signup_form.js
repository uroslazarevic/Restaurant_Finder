import React, { Component } from 'react';
import _ from 'lodash';

import { FormField } from 'components';

export default class LoginForm extends Component {

  constructor() {
    super();

    this.state = {
      formFor: 'signup',
      boxChecked: false,
      
      inputValues : {
        username: '',
        email: '',
        password: ''
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
    this.setState({ inputValues: {...this.state.inputValues, [name]: value  }})
  }

  componentWillMount() {
    this.props.handlePolicyText(this.state.formFor);
  }

  render() {
    const { boxChecked, inputValues, formFor } = this.state;

    const FIELDS = {
      username: {
        name: 'username',
        label: 'Full Name',
        value: inputValues.username,
        tag: 'input',
        handleInputState: this.handleInputState
      },
      email: {
        name: 'email',
        label: 'Email Address',
        value: inputValues.email,
        tag: 'input',
        handleInputState: this.handleInputState,
      },
      password: {
        name: 'password',
        label: 'Password',
        value: inputValues.password,
        tag: 'input',
        type: 'password',
        handleInputState: this.handleInputState
      },
    }

    return (
      <form className="signup-form">
         {/* Render Form Fields */}
         { _.map( FIELDS, field => {
          return <FormField key = {field.name} field = { field } />
        } )  }
        <div className="check-data">
          <label  className="checkbox-label">
            <input  type="checkbox" defaultChecked = { boxChecked } onClick = { this.handleCheckBoxState } />
            I agree to Zomato's <span>Terms of Service</span>, <span>Privacy Policy</span> and <span>Content Policies</span>
          </label>
        </div>
        <button 
          type="submit" 
          className="signup-form-submit-btn"
          onClick={this.props.handleSubmit(inputValues, formFor)} 
          disabled={boxChecked ? false : true}
        >
          Register
        </button>
      </form>
    )
  }
}
