import React from 'react';

import thumbSupstitution from '../images/place_thumb_noimg.svg'

export default function PlacesList ({ placesList }) {
  
  if(placesList.length !== 0) {
    const uniquePlaces = placesList.filter((place, index, self) => {
       return index === self.findIndex((t) => {
         return t.restaurant.name === place.restaurant.name
        })
    });
    return (
      <div>
        {uniquePlaces.map( place => {
          const { name, thumb, location: { locality } } = place.restaurant;
          return (
            <li key={name} className="place-item">
              {thumb ? <img className="thumb-normal" src={thumb} alt=""/> : <img className="thumb-supstitution" src={thumbSupstitution} alt=""/> }
              <div className="place">
                <div className="name">{name}</div>
                <div className="locality">{locality}</div>
              </div>
            </li>
          )})} 
      </div>
    )
  }
  return null
}

