import React from 'react';

export default ({ searchedLocations, autocompleteInput, searchString }) => {
  if (searchedLocations.length > 0 && searchString.length > 1) {
    return (
      <ul className="location-results">
        {searchedLocations.map(location => {
          const { id, name } = location;
          return (
            <li
              data-autocom-input="location"
              onClick={autocompleteInput(id)}
              className="location"
              key={id}
            >
              {name}
            </li>
          );
        })}
      </ul>
    );
  }
  if (searchString.length > 1 && searchedLocations.length === 0) {
    return (
      <ul className="location-results">
        <li className="location-fetch-failed">There was an issue querying the server.</li>
      </ul>
    );
  }
  return <div />;
};
