import React from 'react';
import { ResNavigationCard, ResMenuCard, ResGeneralCard } from 'components';

export default ({ resInfo, resReviews, updateDisplayView, currentDisplayView }) => {
  
  if(resInfo.length !== 0) {

    return (
      <div className="restaurant-overview-display" >
        <ResGeneralCard resInfo={resInfo}  />
        <ResNavigationCard 
          resReviews = { resReviews } 
          updateDisplayView = { updateDisplayView }
          currentDisplayView = { currentDisplayView } />
        <ResMenuCard />
      </div>
    )
  }

  return null;
}