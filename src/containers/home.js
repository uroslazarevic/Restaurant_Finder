import React, { Component } from 'react';

// Import Components
import { GetTheApp, MainHome, LoginNavigation, MainSearchContainer } from 'components';

export default class Home extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return(
      <div>
        <div className="container">
          <GetTheApp />
        </div>
        <MainHome>
          <div className="container">
            <LoginNavigation />
            <MainSearchContainer />
          </div>
        </MainHome>
      </div>
    ) 
  };
}