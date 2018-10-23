import React,{ Component } from 'react';

import logoUrl from 'images/zomato-logo.jpg'
import { SearchForm } from 'components';

export default class MainSearchContainer extends Component{
  constructor(props) {
    super(props);

    this.state= { city: '' }

  }

  handleParentCityState(city) {
    this.setState({ city });
  }

  render() {
    const { city } = this.state
    return (
      <div className="search-container">
        <img src={ logoUrl } alt="" />
        <div className="city-home-title">Find the best restaurants, cafés, and bars in { city }</div>
        <SearchForm handleParentCityState={ this.handleParentCityState.bind(this) } />
      </div>
    );
  }
};