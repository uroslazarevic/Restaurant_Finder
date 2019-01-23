import React from 'react'
import { AddedResItem } from 'components'
import { CSSTransition, TransitionGroup, } from 'react-transition-group';

export default ({ 
  addedRestaurants,
  handleRemoveRes
  }) => {
  if(addedRestaurants.length > 0) {
    return (
      <ul className="restaurants-results">
        <TransitionGroup>
          { addedRestaurants.map( restaurant => {
            return (
              <CSSTransition key = { restaurant.restaurant.id } timeout={500} classNames="fade">
                <AddedResItem
                  handleRemoveRes = { handleRemoveRes }
                  resItem = { restaurant }
                /> 
              </CSSTransition>
            )})
          }
        </TransitionGroup>
      </ul>
    )
  }
        
  return (
    <ul className="restaurants-results">
      <li className="direction">Restaurants you've added should appear here.</li>
    </ul>
  ) 
}