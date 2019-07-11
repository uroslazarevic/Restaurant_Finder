import React from 'react'
import { ResItem } from 'components'

export default ({ 
  restaurantList,
  searchString,
  addedRestaurants,
  handleRestaurants
  }) => {
  if( searchString.length >= 2 ) {
    return (
      <ul className="restaurants-results">
        { restaurantList.map( restaurant => {
          const resItem = restaurant;
          return (
            <ResItem
              key = { restaurant.restaurant.id }
              handleRestaurants = { handleRestaurants }
              resItem = { resItem }
              addedRestaurants = { addedRestaurants }
            /> 
          )})
        }
      </ul>
    )
  }
        
  return (
    <ul className="restaurants-results">
      <li className="direction">Search to add restaurants to this collection</li> 
    </ul>
  ) 
}