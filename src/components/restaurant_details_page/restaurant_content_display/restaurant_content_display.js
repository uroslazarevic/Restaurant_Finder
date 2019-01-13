import React, { Component } from 'react';
// Import Components
import { 
  RestaurantOverviewDisplay,
  RestaurantMenuDisplay,
  RestaurantPhotosDisplay,
  RestaurantReviewsDisplay
   } from 'components';

export default class ResContentDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayView: 'overview'
    }

    this.updateDisplayView = this.updateDisplayView.bind(this);
  }

  updateDisplayView(e) {
    const value = e.target.getAttribute('value');
    this.setState({ displayView: value })
  }
  
  render() {
    const { resInfo, resReviews } = this.props;
    switch(this.state.displayView) {

      case 'overview': 
      return <RestaurantOverviewDisplay 
        updateDisplayView = {this.updateDisplayView}
        currentDisplayView = {this.state.displayView}
        resInfo = { resInfo }  
        resReviews = { resReviews } />

      case 'menu': 
      return <RestaurantMenuDisplay 
        updateDisplayView = {this.updateDisplayView}
        currentDisplayView = {this.state.displayView}
        resInfo = { resInfo }  
        resReviews = { resReviews } />

      case 'reviews': 
      return <RestaurantReviewsDisplay 
        updateDisplayView = {this.updateDisplayView}
        currentDisplayView = {this.state.displayView}
        resInfo = { resInfo }  
        resReviews = { resReviews } />

      case 'photos': 
      return <RestaurantPhotosDisplay 
        updateDisplayView = {this.updateDisplayView}
        currentDisplayView = {this.state.displayView}
        resInfo = { resInfo }  
        resReviews = { resReviews } />

      default:
      return <div>Restaurant Content Display</div>
    }
  }
}