import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import { LocationList, RestaurantList } from 'components';

export default class AddCollectionResForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputNames: {
        location: this.props.propertyNames.location,
        restaurant: this.props.propertyNames.restaurant,
      },
      showLocations: false,
    };
    this.showLocationList = this.showLocationList.bind(this);
    this.hideLocationList = this.hideLocationList.bind(this);
  }

  showLocationList() {
    this.setState({ showLocations: true });
  }

  hideLocationList() {
    this.setState({ showLocations: false });
  }

  render() {
    const {
      inputValues,
      handleInputState,
      handleActiveForm,
      autocompleteInput,
      searchProps: { searchedLocations, searchedRestaurants },
      handleRestaurants,
    } = this.props;
    const { inputNames, showLocations } = this.state;

    const transitionOptions = {
      in: showLocations,
      timeout: 200,
      classNames: 'fade-scale',
      unmountOnExit: true,
    };

    return (
      <React.Fragment>
        <form className="add-collection-res-form">
          <div className="add-coll-ress-btns">
            <div onClick={handleActiveForm} data-ref-to="addCollectionResForm" className="add-restaurants active-btn">
              Add restaurants
            </div>
            <div onClick={handleActiveForm} data-ref-to="inCollectionResForm" className="in-collection ">
              in Collection {inputValues.restaurants.length > 0 && `(${inputValues.restaurants.length})`}
            </div>
          </div>

          <div className="search-input-container">
            <input
              onFocus={this.showLocationList}
              onBlur={this.hideLocationList}
              value={inputValues.location}
              onChange={handleInputState}
              name={inputNames.location}
              className="search-input"
              type="text"
              placeholder="Please type a location"
              autoComplete="off"
            />
            <CSSTransition {...transitionOptions}>
              <LocationList
                searchString={inputValues.location}
                autocompleteInput={autocompleteInput}
                searchedLocations={searchedLocations}
              />
            </CSSTransition>
          </div>

          <div className="search-input-container">
            <input
              value={inputValues.restaurant}
              onChange={handleInputState}
              name={inputNames.restaurant}
              className="search-input"
              type="text"
              placeholder="Search for restaurants by name"
              autoComplete="off"
            />
            <span>
              <i className="fas fa-search" />
            </span>
          </div>

          <RestaurantList
            autocompleteInput={autocompleteInput}
            restaurantList={searchedRestaurants}
            searchString={inputValues.restaurant}
            addedRestaurants={inputValues.restaurants}
            handleRestaurants={handleRestaurants}
          />
        </form>
      </React.Fragment>
    );
  }
}
