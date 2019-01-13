import React from 'react';
import { ResNavigationCard, ResGeneralCard, ResPhotosCard } from 'components';

export default ({ resInfo, resReviews, updateDisplayView, currentDisplayView }) => {
  
  if(resInfo.length !== 0) {
    const { 
      photos_url,
    } = resInfo;

    return (
      <div className="restaurant-overview-display" >
        <ResGeneralCard resInfo={resInfo}  />
        <ResNavigationCard 
          resReviews = { resReviews } 
          updateDisplayView = { updateDisplayView }
          currentDisplayView = { currentDisplayView } />
        <ResPhotosCard photosUrl = {photos_url} />
      </div>
    )
  }

  return null;
}