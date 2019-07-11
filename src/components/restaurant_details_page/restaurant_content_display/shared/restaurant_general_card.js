import React from 'react';

import { ShowNote } from 'components';

export default ({ resInfo }) => {
  const { 
    thumb,
    cuisines,
    currency,
    average_cost_for_two,
    user_rating : { aggregate_rating, rating_color, votes, rating_text },
    location: { locality },
    name
  } = resInfo;

  const ratingStyle = {
    cursor: 'default',
    backgroundColor: `#${rating_color}`
  };
  
  return (
    <div className="restaurant-general-card">
      <div className="main-img">
        <img src={thumb} alt='restaurant-img'/>
      </div>
      <div className="info">
        <div className="main-info" >
          <div className="title" >{name}</div>
          <div className="restaurant-mark">
            <ShowNote text = {rating_text}>
              <div style={ratingStyle} className="rating">
                <span className="rating-mark">{aggregate_rating}</span>
                <span className="rating-max-mark"> /5</span>
              </div>
            </ShowNote>
            <div className="votes">{votes} votes</div>
          </div>
        </div>
        <div className="offers">
          <span className="locality">{locality} </span>
          <li className="categories"> <span className="grey-dot"></span>{rating_text}</li>
        </div>
        <div className="informative">
          <span className="open-now">Open now</span>
          <li className="cuisines">{cuisines}</li>
          <li className="costs-for-two">Costs {average_cost_for_two } {currency} for two</li>
        </div>
      </div>
    </div>
  )
}