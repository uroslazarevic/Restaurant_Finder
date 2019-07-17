import React from 'react';

// Import images
import googleLogo from '../../../../images/google_logo.png';

export default ({ handleActiveForm }) => {
  return (
    <React.Fragment>
      <button className="continue-with-facebook">
        <span>
          <i className="fab fa-facebook-f" />
        </span>
        Continue with Facebook
      </button>
      <button className="continue-with-google">
        <img src={googleLogo} alt="google-logo" />
        Continue with Google
      </button>
      <div className="horizontal-divider">
        <span className="text">OR</span>
        <span className="line" />
      </div>
      <div className="use-email">Or use your email address</div>
      <div className="form-btns">
        <button data-ref-to="login-form" onClick={handleActiveForm} className="login-email">
          Login
        </button>
        <button data-ref-to="signup-form" onClick={handleActiveForm} className="signUp-email">
          Sign up
        </button>
      </div>
    </React.Fragment>
  );
};
