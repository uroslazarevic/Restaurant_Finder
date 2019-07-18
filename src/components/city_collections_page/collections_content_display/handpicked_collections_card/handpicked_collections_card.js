import React from 'react';

import { Collections } from 'components';
import { CityCollectionsContext } from 'containers/contexts';

export default () => (
  <CityCollectionsContext.Consumer>
    {cityCollectionsContext => {
      const { searchedCollections, city } = cityCollectionsContext;
      if (searchedCollections) {
        return (
          <div className="collections">
            <Collections collections={searchedCollections} city={city} />
          </div>
        );
      }
      return <div className="container">Collections not available</div>;
    }}
  </CityCollectionsContext.Consumer>
);
