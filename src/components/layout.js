import React, { Component } from 'react';

import zomatoUrbanSpoon from '../images/zomato-us-transparant-logo.webp';

import { GetTheApp, LoginNavigation } from 'components';
import { SearchForm } from 'containers';

export default class Layout extends Component {
  constructor(props){
    super(props);

    this.state = {
      cityName: 'Bratislava',
      cityId: '111'
    }

    this.handleParentCityState = this.handleParentCityState.bind(this);
  }

  handleParentCityState({ cityName, cityId }) {
    this.setState({ cityName, cityId });
  }
  
  render () {
    return (
      <div className="layout">
        <header>
          <div className = "header-top">
            <img className="zomato-urban-spon-logo" src={zomatoUrbanSpoon} alt='zomato-spoon-logo' />
            <SearchForm handleParentCityState={ this.handleParentCityState } />
            <LoginNavigation/>
          </div>
          <div className = "header-bottom">
            <GetTheApp />
          </div>
        </header>
        {this.props.children}
      </div>
    );
  };
}