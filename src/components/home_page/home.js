import React, { Component } from 'react';
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group';

// Import Components
import { GetTheApp, LoginNavigation, MainHome, FormModal } from 'components';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      cityName: 'Bratislava',
      cityId: '111'
    }
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
      in: this.props.isVisible,
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
         />
        <CSSTransition {...transitionOptions} >
          <FormModal /> 
        </CSSTransition>
      </div>
    ) 
  };
}

function mapStateToProps({ eventBus }) {
  return {
    isVisible: eventBus.isVisible
  }
}

export default connect(mapStateToProps)(Home)