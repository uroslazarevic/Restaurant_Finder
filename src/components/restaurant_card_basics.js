import React from 'react';
import { Link } from 'react-router-dom'

import { ShowNote } from 'components';
import thumbnailReplacement from '../images/restaurant_thumbnail_replacement.jpg'

export default function RestaurantCard ({ restaurants, city }) {
  return renderRestaurantCard(restaurants, city)
}

function renderRestaurantCard(restaurants, city) {
  
  const formatedRestaurants = restaurants.reduce((acc, restaurant) => {
    const restaurantIndex = acc.unique.findIndex(res => res.name === restaurant.restaurant.name);

    if(restaurantIndex !== -1){
      acc.duplicates.push(restaurant.restaurant);
    }else{
      acc.unique.push(restaurant.restaurant);
    }

    return acc;

  }, { unique: [], duplicates: []});

  return formatedRestaurants.unique.map((restaurant, i) => {
    const { 
      thumb,
      name,
      cuisines,
      currency,
      average_cost_for_two,
      location: { address, locality },
      user_rating: { aggregate_rating, votes, rating_text, rating_color },
      R: { res_id }
    } = restaurant;
    const splitedRestaurantName = name.split(' ').join('-');
    const splitedCityName = city.cityName.split(' ').join('-');
    const url = `/${splitedCityName}/restaurants/${splitedRestaurantName}`;
    const ratingStyle = { backgroundColor: `#${rating_color}`, border: `1px solid #${rating_color}`}
    
    return (
      <Link 
        to= {{ pathname: url.toLowerCase(), state: { 
          resId: res_id, 
          resName: name,
          cityName: city.cityName,
          cityId: city.cityId
        } }}
        key={`${name}-${i}`} className="restaurant-card-item">
        <div className="card-top">
          <img src={ thumb ? thumb : thumbnailReplacement } alt="thumb" />
          <div className="restaurant-main-info">
            <div className="name">{name}</div>
            <div className="locality">{locality}</div>
            <div className="address">{address}</div>
          </div>
        </div>
        <div className="card-bottom">
          <div className="cuisines"><span className="add-info">cuisines:</span><span className="specific">{cuisines}</span></div>
          <div className="cost-for-two"><span className="add-info">cost for two:</span><span className="specific">{average_cost_for_two} {currency}</span></div>
          <div className="rating-text"><span className="add-info">rating:</span><span className="specific">{rating_text}</span></div>
          <div className="hours"><span className="add-info">hours:</span><span className="specific">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, explicabo!</span></div>
        </div>
        <div className="restaurant-voting">
          <ShowNote text = { rating_text } className = {'res-basic-note'} >
            <div className="rating" style={ ratingStyle }>{aggregate_rating}</div>
          </ShowNote>
          <div className="votes">{votes} votes</div>
        </div>
      </Link>
    )
  }) 
}

// function generateRatingColor(rating) {
//   const ratingColors = { excelent:'#3F7E00', veryGood:'#5BA829', good:'#9ACD32', average:'#CDD614', poor:'#FF7800', none: '#cdcdcd' };
//   const { excelent, veryGood, good, average, poor, none } = ratingColors;
//   let color= {};
//   switch(true) {
//     case ( rating <=5 && rating >=4.5 ):
//     color.background =excelent;
//     break;

//     case ( rating < 4.5 && rating >=4 ):
//     color.background = veryGood;
//     break;

//     case ( rating < 4 && rating >= 3.5 ):
//     color.background = good;
//     break;

//     case ( rating < 3.5 && rating >= 2.5 ):
//     color.background = average;
//     break;

//     case ( rating < 2.5 && rating >= 2 ):
//     color.background = poor;
//     break;
    
//     default:
//     color.background = none;
//     break;
//   }
//   return color;
// }