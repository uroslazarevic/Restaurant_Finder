import React from 'react';
import { Link } from 'react-router-dom';

import resThumbAvatar from '../../../../images/restaurant_thumbnail_replacement.jpg';

export default ({ restaurant, city }) => {
  const {
    name,
    featured_image,
    cuisines,
    location: { locality_verbose },
    user_rating: { rating_color, aggregate_rating },
    R: { res_id },
  } = restaurant.restaurant;

  const splitedRestaurantName = name.split(' ').join('-');
  const splitedCityName = city.cityName.split(' ').join('-');
  const ratingStyle = { backgroundColor: `#${rating_color}`, border: `1px solid #${rating_color}` };
  const url = `/${splitedCityName}/restaurants/${splitedRestaurantName}`;

  return (
    <Link
      className="collection-restaurant-item"
      to={{
        pathname: url.toLowerCase(),
        state: {
          resId: res_id,
          resName: name,
          cityName: city.cityName,
          cityId: city.cityId,
        },
      }}
    >
      <div className="restaurant-header">
        <img src={featured_image ? featured_image : resThumbAvatar} alt="restaurant thumb" />
        <div style={ratingStyle} className="restaurant-rating">
          {aggregate_rating}
        </div>
      </div>
      <div className="restaurant-content">
        <div className="title">{name}</div>
        <div className="location">{locality_verbose}</div>
        <div className="cuisines">{cuisines}</div>
      </div>
    </Link>
  );
};
