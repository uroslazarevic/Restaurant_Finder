import React, { Component } from 'react';

import { HandpickedCollCard, NavigationCollCard, FollowingCollCard, SavedCollCard } from 'components'

export default class CollContentDisplay extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      displayView: 'handpicked'
    }
    
    this.updateDisplayView = this.updateDisplayView.bind(this);
  }
  
  updateDisplayView(e) {
    const value = e.target.getAttribute('value');
    this.setState({ displayView: value })
  }
  
  render() {
    const { displayView } = this.state;
    const { collections, city, savedCollections } = this.props;

  return (
      <div className="coll-content-display">
        <NavigationCollCard 
         currentDisplayView = { displayView }
         updateDisplayView = { this.updateDisplayView } />
        { 
          displayView === 'handpicked' && 
            <HandpickedCollCard 
              collections = { collections }
              city = { city } 
          /> 
        }
        { 
          displayView === 'following' && 
            <FollowingCollCard /> 
        }

        { 
          displayView === 'saved' && 
            <SavedCollCard 
              city = { city }
              savedCollections = { savedCollections }
            /> 
        }
      </div>
    )
  }
}