import React from 'react';
import { Link } from 'react-router-dom';

export default ({ data, city }) => {
  return (
    <div className="container">
      <div className="popular-restaurants-title">Popular restaurants in {city.cityName}</div>
      <div className="popular-restaurants-subtitle">Explore the best rated restaurants </div>
      <div className="restaurants-container">{createPopularRestaurantItem(data, city)}</div>
    </div>
  )
}

function createPopularRestaurantItem(data, city) {
  // Remove duplicates
  const uniqueRestaurants = data.best_rated_restaurant.filter((restaurant, index, self) => {
    return index === self.findIndex((t) => {
      return t.restaurant.name === restaurant.restaurant.name
     })
 });
  return uniqueRestaurants.map( restaurant => {
    const { 
      name,
      average_cost_for_two,
      currency,
      location: { locality },
      R: { res_id}
    } = restaurant.restaurant;

    const splitedRestaurantName = name.split(' ').join('-');
    const splitedCityName = city.cityName.split(' ').join('-');
    
    return (
      <Link 
        key={name} 
        className="restaurant-item"
        to= {{ pathname:`/${splitedCityName}/Restaurants/${splitedRestaurantName}`, state: { 
          resId: res_id, 
          resName: name,
          cityName: city.cityName,
          cityId: city.cityId
        } }} 
        >
        <div className="locality">{locality}</div>
        <div className="name">{name}</div>
        <div className="average-cost-for-two">AVG cost for two: {average_cost_for_two} {currency}</div>
      </Link>
    );
  });
}