import React, { Component } from 'react';

// Import picture
import backgroundUrl from '../../../images/background-home1.jpg';
import logoUrl from '../../../images/zomato-logo.jpg';
// Import container
import { SearchForm, HomeBottom } from 'containers';
// Import Components
import { LoginNavigation } from 'components';

export default class MainHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityName: this.props.city.cityName,
      cityId: this.props.city.cityId,
    };
    this.handleParentCityState = this.handleParentCityState.bind(this);
  }

  handleParentCityState({ cityName, cityId }) {
    this.setState({ cityName, cityId });
  }

  render() {
    return (
      <main className="main-home-bg" style={{ backgroundImage: `url("${backgroundUrl}")` }}>
        <div className="container">
          <LoginNavigation />
          <div className="search-container">
            <img src={logoUrl} alt="" />
            <div className="city-home-title">
              Find the best restaurants, cafés, and bars in {this.state.cityName ? this.state.cityName : 'Bratislava'}
            </div>
            <SearchForm
              urlPath={this.props.urlPath}
              city={{ cityName: this.state.cityName, cityId: this.state.cityId }}
              handleParentCityState={this.handleParentCityState}
            />
          </div>
        </div>
        <HomeBottom city={{ cityName: this.state.cityName, cityId: this.state.cityId }} urlPath={this.props.urlPath} />
      </main>
    );
  }
}
