import React, { Component } from 'react';


export default class RestaurantOverview extends Component {
  constructor(props) {
    super(props);

    this.state = { entity_type: 'city' }
  }

  render() {
    return (
      <div className="city-collections">
        Restaurant Overview
      </div>
    )
  }
}
