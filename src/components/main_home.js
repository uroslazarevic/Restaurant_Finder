import React,{ Component } from 'react';

// Import picture
import backgroundUrl from '../images/background-home.jpg'
import logoUrl from 'images/zomato-logo.jpg'
// Import container
import { SearchForm, HomeBottom } from 'containers';
// Import Components
import { LoginNavigation } from 'components';

export default class MainHome extends Component {
  constructor(props) {
    super(props);

    this.state= { 
      cityName: 'Bratislava',
      cityID: '111'
     }
     this.handleParentCityState = this.handleParentCityState.bind(this);
  }
  handleParentCityState({ cityName, cityID }) {
    this.setState({ cityName, cityID });
  }

  render() {
    return (
      <main className="main-home-bg" style={{ backgroundImage:`url("${backgroundUrl}")` }}>
        <div className="container">
          <LoginNavigation />
          <div className="search-container">
            <img src={ logoUrl } alt="" />
            <div className="city-home-title">Find the best restaurants, cafés, and bars in { this.state.cityName ? this.state.cityName : 'Bratislava' }</div>
            <SearchForm handleParentCityState={ this.handleParentCityState } />
          </div>
        </div>
        <HomeBottom 
          cityName={this.state.cityName}
          cityID={this.state.cityID}/>
      </main>
    );
  }
 
};