import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import zomatoUrbanSpoon from '../images/zomato-us-transparant-logo.webp';

import { GetTheApp, LoginNavigation, FormModal } from 'components';
import { SearchForm } from 'containers';

export default class Layout extends Component {
  constructor(props){
    super(props);

    this.state = {
      cityName: this.props.city.cityName,
      cityId: this.props.city.cityId,
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
    this.setState({ cityName, cityId });
  }
  
  render () {
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
            <img className="zomato-urban-spon-logo" src={zomatoUrbanSpoon} alt='zomato-spoon-logo' />
            <SearchForm 
              urlPath={this.props.urlPath}
              city={{ cityName: this.state.cityName, cityId: this.state.cityId }} 
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
      </div>
    );
  };
}