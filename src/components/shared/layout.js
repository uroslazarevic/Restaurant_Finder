import React, { Component } from 'react';
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

import zomatoUrbanSpoon from '../../images/zomato-us-transparant-logo.webp';

import { GetTheApp, LoginNavigation, FormModal, Footer } from 'components';
import { SearchForm } from 'containers';

class Layout extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchCityName: this.props.city.cityName,
      searchCityId: this.props.city.cityId,
    }

    this.handleParentCityState = this.handleParentCityState.bind(this);
    
  }

  handleParentCityState({ cityName, cityId }) {
    this.setState({ searchCityName: cityName, searchCityId: cityId });
  }

  render () {
    const { searchCityName, searchCityId } = this.state;
    const { cityName, cityId } = this.props.city;
    const urlHome = '/';

    const transitionOptions = {
      in: this.props.isVisible,
      timeout: 300,
      classNames :"modal-fade",
      unmountOnExit: true
    }

    return (
      <div className="layout">
        <header>
          <div className = "header-top">
            <Link to={{ pathname: urlHome, state: { cityName, cityId } }} >
              <img className="zomato-urban-spon-logo" src={zomatoUrbanSpoon} alt='zomato-spoon-logo' />
            </Link>
            <SearchForm 
              urlPath={this.props.urlPath}
              city={{ cityName: searchCityName, cityId: searchCityId }} 
              handleParentCityState={ this.handleParentCityState } />
            <LoginNavigation />
          </div>
          <div className = "header-bottom">
            <GetTheApp /> 
          </div>
        </header>
        <CSSTransition {...transitionOptions} >
          <FormModal /> 
        </CSSTransition>
        {this.props.children}
       { this.props.showFooter && <Footer city = {{ cityName, cityId }} /> }
      </div>
    );
  };
}

function mapStateToProps({ eventBus }) {
  return {
    isVisible: eventBus.isVisible
  }
}

export default connect(mapStateToProps)(Layout)