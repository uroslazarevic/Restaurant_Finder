import React from 'react';

import placesLoader from '../../images/loaders/search_places_loader.gif'
import locationsLoader from '../../images/loaders/search_location_loader.gif'
import pageLoader from '../../images/loaders/page-loader.gif'
import reviewsLoader from '../../images/loaders/reviewsLoader.gif'

export function SearchPlacesLoader() {
  return (
    <div className="places-loader-bg">
      <div className="loader-content">
        <img src={placesLoader} alt="places loader" />
        <div>Coming right up...</div>
      </div>
    </div>
  )
}

export function SearchLocationsLoader() {
  return (
    <div className="locations-loader-bg">
      <img src={locationsLoader} alt="places loader" />
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="page-loader-bg">
      <img src={pageLoader} alt="places loader" />
    </div>
  )
}

export function ReviewsLoader() {
  return (
    <div className="reviews-loader-bg">
      <img src={reviewsLoader} alt="places loader" />
      <div>Fetching Reviews...</div>
    </div>
  )
}