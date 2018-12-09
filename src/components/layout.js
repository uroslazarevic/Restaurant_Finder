import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

import zomatoUrbanSpoon from '../images/zomato-us-transparant-logo.webp';

import { GetTheApp, LoginNavigation, FormModal, Footer } from 'components';
import { SearchForm } from 'containers';

export default class Layout extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchCityName: this.props.city.cityName,
      searchCityId: this.props.city.cityId,
      showModal: false
    }

    this.handleParentCityState = this.handleParentCityState.bind(this);
    this.showFormModal = this.showFormModal.bind(this);
    this.hideFormModal = this.hideFormModal.bind(this);
    this.hideFormModalOnFormSubmit = this.hideFormModalOnFormSubmit.bind(this);
  }

  showFormModal() {
    this.setState({ showModal: true })
  }

  hideFormModal(event) {
    const target = event.target;

    if( target.classList.contains('form-modal-container') || target.classList.contains('close-icon')) {
      this.setState({ showModal: false }) 
    }
  }

  hideFormModalOnFormSubmit() {
    this.setState({ showModal: false }) 
  }

  handleParentCityState({ cityName, cityId }) {
    this.setState({ searchCityName: cityName, searchCityId: cityId });
  }

  render () {
    const { searchCityName, searchCityId } = this.state;
    const { cityName, cityId } = this.props.city;
    const urlHome = '/';

    const transitionOptions = {
      in: this.state.showModal,
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
            <LoginNavigation showFormModal = {this.showFormModal} />
          </div>
          <div className = "header-bottom">
            <GetTheApp /> 
          </div>
        </header>
        <CSSTransition {...transitionOptions} >
          <FormModal 
            hideModalOnSubmit = { this.hideFormModalOnFormSubmit }
            hideFormModal={this.hideFormModal}/> 
        </CSSTransition>
        {this.props.children}
       { this.props.showFooter && <Footer city = {{ cityName, cityId }} /> }
      </div>
    );
  };
}