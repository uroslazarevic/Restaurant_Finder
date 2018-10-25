import React, { Component } from 'react';

// Import Components
import { GetTheApp, MainHome } from 'components';

export default class Home extends Component {

  render() {
    return(
      <div>
        <GetTheApp />
        <MainHome />
      </div>
    ) 
  };
}