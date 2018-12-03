import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

// Import Components
import { GetTheApp, LoginNavigation, MainHome, FormModal } from 'components';


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      cityName: 'Bratislava',
      cityId: '111',
      showModal: false
    }

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

    const transitionOptions = {
      in: this.state.showModal,
      timeout: 300,
      classNames :"modal-fade",
      unmountOnExit: true
    }
    
    return(
      <div>
        <GetTheApp />
        <MainHome 
          loginNavigation = { <LoginNavigation showFormModal = {this.showFormModal} /> }
          urlPath={ this.props.match.path } 
          city={{ cityName: city_Name, cityId: city_Id }}
          showFormModal={this.showFormModal}
         />
        <CSSTransition {...transitionOptions} >
          <FormModal 
            hideModalOnSubmit = { this.hideFormModalOnFormSubmit }
            hideFormModal={this.hideFormModal}/> 
        </CSSTransition>
      </div>
    ) 
  };
}