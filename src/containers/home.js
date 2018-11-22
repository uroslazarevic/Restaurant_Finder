import React, { Component } from 'react';

// Import Components
import { GetTheApp, MainHome } from 'components';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      cityName: 'Bratislava',
      cityId: '111' }

  }

  render() {
    let city_Name, city_Id;
    if(!this.props.location.state) {
      city_Name = this.state.cityName;
      city_Id = this.state.cityId;
    } else {
      const { cityName, cityId } = this.props.location.state;
      city_Name = cityName;
      city_Id = cityId;
    }
    return(
      <div>
        <GetTheApp />
        <MainHome urlPath={ this.props.match.path } city={{ cityName: city_Name, cityId: city_Id }} />
      </div>
    ) 
  };
}