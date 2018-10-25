import React from 'react';

import placesLoader from '../images/loaders/search_places_loader.gif'
import locationsLoader from '../images/loaders/search_location_loader.gif'

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