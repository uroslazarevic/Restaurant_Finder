import React, { Component } from 'react';

import zomatoUrbanSpoon from '../images/zomato-us-transparant-logo.webp';

import { GetTheApp, LoginNavigation } from 'components';
import { SearchForm } from 'containers';

export default class Layout extends Component {
  constructor(props){
    super(props);

    this.state = {
      cityName: this.props.city.cityName,
      cityId: this.props.city.cityId
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
            <SearchForm 
              urlPath={this.props.urlPath}
              city={{ cityName: this.state.cityName, cityId: this.state.cityId }} 
              handleParentCityState={ this.handleParentCityState } />
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