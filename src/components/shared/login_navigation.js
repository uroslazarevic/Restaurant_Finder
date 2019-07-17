import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Actions
import { signOut } from './../../actions/auth_user';
import { setVisibleFM } from '../../actions/event_bus';

class LoginNavigation extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.signOut();
  }

  capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  render() {
    const { username, isAuth, setVisibleFM } = this.props;
    const loginedUser = isAuth ? this.capitalize(username) : 'Log in';

    return (
      <div className="login-navigation">
        <div
          className={`nav-link ${!isAuth ? 'signin-link' : 'logined-user'}`}
          onClick={!isAuth ? setVisibleFM : () => console.log('open user')}
        >
          {!isAuth ? 'Log in' : loginedUser}
        </div>
        <div
          onClick={!isAuth ? setVisibleFM : this.handleLogout}
          className={`nav-link ${!isAuth ? 'signup-link' : 'logout-link'}`}
        >
          {!isAuth ? 'Create an account' : 'Logout'}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authentification }) {
  const { username, isAuth } = authentification;
  return {
    username,
    isAuth,
  };
}

export default connect(
  mapStateToProps,
  { setVisibleFM, signOut }
)(LoginNavigation);
