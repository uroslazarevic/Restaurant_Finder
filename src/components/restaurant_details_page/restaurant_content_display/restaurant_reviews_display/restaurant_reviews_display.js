import React from 'react';
import { ResNavigationCard, ResReviewsCard, ResGeneralCard } from 'components';

export default ({ resInfo, resReviews, updateDisplayView, currentDisplayView }) => {
  
  if(resInfo.length !== 0) {
    const { 
      name,
    } = resInfo;

    return (
      <div className="restaurant-overview-display" >
        <ResGeneralCard resInfo={resInfo}  />
        <ResNavigationCard 
          resReviews = { resReviews } 
          updateDisplayView = { updateDisplayView }
          currentDisplayView = { currentDisplayView } />
        <ResReviewsCard resReviews = { resReviews } name = { name } />
      </div>
    )
  }

  return null;
}