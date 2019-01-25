import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Actions
import { clearAuth } from '../../actions/auth_user';
import { setVisibleFM } from '../../actions/event_bus';

class LoginNavigation extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.clearAuth();
  }

  capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  render() {
    const { user, isAuth, setVisibleFM } = this.props;
    let loginedUser = isAuth ? this.capitalize(user.username) : 'Log in';

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
  const { user, isAuth } = authentification;
  return {
    user,
    isAuth,
  };
}

export default connect(
  mapStateToProps,
  { clearAuth, setVisibleFM }
)(LoginNavigation);
