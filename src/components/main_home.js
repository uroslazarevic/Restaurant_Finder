import React from 'react';

import imgUrl from '../images/background-home.jpg'

export default (props) => {
 
  return (
    <main className="main-home-bg" style={{ backgroundImage:`url("${imgUrl}")` }}>
      {props.children}
    </main>
  );
};