import React from 'react';

import { Collections } from 'components';
import { CityCollectionsContext } from 'containers/contexts';

export default () => (
  <CityCollectionsContext.Consumer>
    {cityCollectionsContext => {
      const savedCollections = cityCollectionsContext.collections.reduce((acc, coll) => {
        if (coll.type === 'saved') {
          acc.push({ collection: coll });
        }
        return acc;
      }, []);
      if (savedCollections.length !== 0) {
        return (
          <div className="collections">
            <Collections collections={savedCollections} city={cityCollectionsContext.city} />
          </div>
        );
      }

      return (
        <div className="saved-coll container">
          <div className="filling-in">
            Login & bookmark collections you love!
            <br />
            They&apos;ll appear here.
          </div>
        </div>
      );
    }}
  </CityCollectionsContext.Consumer>
);
