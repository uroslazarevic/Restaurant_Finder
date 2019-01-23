import React from 'react';
import thumbSupstitution from '../../../../../../images/place_thumb_noimg.svg'

export default ({ resItem, handleRemoveRes }) => {

    const { name, location: { locality }, thumb } = resItem.restaurant;
    return (
      <li className="restaurant">
        <div className="description">
          <img src = { thumb ? thumb : thumbSupstitution } alt="restaurant-thumb" />
          <span>{name}, {locality}</span>
        </div>
        <button 
          onClick = { handleRemoveRes(resItem) } 
          className="remove-res">Remove</button> 
      </li>
    )
}