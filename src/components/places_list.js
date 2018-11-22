import React from 'react';
import { Link } from 'react-router-dom';

import thumbSupstitution from '../images/place_thumb_noimg.svg'

export default function PlacesList ({ placesList, city }) {
  
  if(placesList.length !== 0) {
    // Remove Duplicates
    // const uniquePlaces = placesList.filter((place, index, self) => {
    //    return index === self.findIndex((t) => {
    //      return t.restaurant.name === place.restaurant.name
    //     })
    // });

    const uniquePlaces = placesList.reduce((acc, place) => {
      if(acc.findIndex(pl => pl.name === place.restaurant.name) === -1){
        acc.push(place.restaurant)
      }
      return acc
    }, []);

    return (
      <React.Fragment>
        {uniquePlaces.map( place => {
          const { name, thumb, location: { locality }, R: { res_id } } = place;
          const splitedRestaurantName = name.split(' ').join('-');
          const splitedCityName = city.cityName.split(' ').join('-');

          return (
            <Link 
            to= {{ pathname:`/${splitedCityName}/Restaurants/${splitedRestaurantName}`, state: { 
              resId: res_id, 
              resName: name,
              cityName: city.cityName,
              cityId: city.cityId
            } }}
            key={name} className="place-item">
              {thumb ? <img className="thumb-normal" src={thumb} alt=""/> : <img className="thumb-supstitution" src={thumbSupstitution} alt=""/> }
              <div className="place">
                <div className="name">{name}</div>
                <div className="locality">{locality}</div>
              </div>
            </Link>
          )})} 
      </React.Fragment>
    )
  }
  return null
}

