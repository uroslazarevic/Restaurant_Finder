import React from 'react';

export default ({ showFormModal }) => {
  return (
    <div className="login-navigation">
      <div onClick={showFormModal} className="signin-link" >Log in</div>
      <div onClick={showFormModal} className="signup-link" >Create an account</div>
    </div>
  );
};