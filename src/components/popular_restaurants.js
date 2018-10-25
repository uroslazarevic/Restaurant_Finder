import React from 'react';

export default ({ data, cityName }) => {
  return (
    <div className="container">
      <div className="popular-restaurants-title">Popular restaurants in {cityName}</div>
      <div className="popular-restaurants-subtitle">Explore the best rated restaurants </div>
      <div className="restaurants-container">{createPopularRestaurantItem(data)}</div>
    </div>
  )
}

function createPopularRestaurantItem(data) {
  // Remove duplicates
  const uniqueRestaurants = data.filter((restaurant, index, self) => {
    return index === self.findIndex((t) => {
      return t.restaurant.name === restaurant.restaurant.name
     })
 });
  return uniqueRestaurants.map( restaurant => {
    const { name, average_cost_for_two, currency, location: { locality } } = restaurant.restaurant;
    return (
      <div key={name} className="restaurant-item">
        <div className="locality">{locality}</div>
        <div className="name">{name}</div>
        <div className="average-cost-for-two">AVG cost for two: {average_cost_for_two} {currency}</div>
      </div>
    );
  });
}