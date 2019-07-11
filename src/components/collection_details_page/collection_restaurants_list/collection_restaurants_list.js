import React from 'react';

import { CollectionRestaurantItem } from 'components';
export default ({ restaurants, city }) => {
  if (restaurants.length > 0) {
    return (
      <div className="collection-restaurants-list">
        {restaurants.map(restaurant => {
          return (
            <CollectionRestaurantItem
              key={restaurant.restaurant.id}
              city={city}
              restaurant={restaurant}
            />
          );
        })}
      </div>
    );
  }

  return <div />;
};
