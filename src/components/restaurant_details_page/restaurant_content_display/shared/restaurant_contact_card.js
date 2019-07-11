import React from 'react';
import resDirectionImg from 'images/restaurant_imgs/res_direction.png'

export default ({ restaurant }) => {
  return (
    <div className="restaurant-contact-card">

      <div className="grid-row">
        <div className="phone-numbers">
          <div className="title">Phone number</div>
          <div className="info">+421 917492219</div>
        </div>
        <div className="cuisines">
          <div className="title">Cuisines</div>
          <div className="info">{restaurant.cuisines}</div>
        </div>
        <div className="avg-cost">
          <div className="title">Average Cost</div>
          <div className="info">{restaurant.average_cost_for_two} {restaurant.currency} for two people (approx.)</div>
          <div className="payment">Cash only</div>
        </div>
      </div>

      <div className="grid-row">
        <div className="working-hours">
          <div className="title">Opening hours</div>
          <div className="info">Today  11:00 – 19:00</div>
          <div className="see-more">See more</div>
        </div>
        <div className="address">
          <div className="title">Address</div>
          <div className="info">{restaurant.address}</div>
          <div className="map">
            <img src={resDirectionImg} alt='direction-img' />
            <div className="text">Get Directions</div>
          </div>
        </div>
      </div>

      <div className="grid-row">
        <div className="more-info">
          <div className="title">More Info</div>
          <div className="info"><span><i className="fas fa-check"></i></span>Some service</div>
          <div className="info"><span><i className="fas fa-check"></i></span>Some service</div>
          <div className="info"><span><i className="fas fa-times"></i></span>Some service</div>
          <div className="info"><span><i className="fas fa-check"></i></span>Some service</div>
          <div className="info"><span><i className="fas fa-check"></i></span>Some service</div>
          <div className="info"><span><i className="fas fa-check"></i></span>Some service</div>
        </div>
      </div>

    </div>
  )
}