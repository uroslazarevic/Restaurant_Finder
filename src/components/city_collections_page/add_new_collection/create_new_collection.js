import React, { Component } from 'react';

import { AddCollectionForm, AddCollectionResForm, InCollectionResForm } from 'components';

export default class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      activeForm: 'addCollectionForm',
      showHiddenBtn: false,
      propertyNames: {
        name: 'name',
        description: 'description',
        tags: 'tags',
        location: 'location',
        restaurant: 'restaurant',
        restaurants: 'restaurants',
      },
      createdCollection: {
        name: '',
        description: '',
        tags: '',
        location: 'Bratislava',
        restaurant: '',
        restaurants: [],
      },
      createdTags: '',
      cityId: '111',
    };
  }

  handleActiveForm = event => {
    const refTo = event.target.dataset.refTo;
    this.setState({ activeForm: refTo, validate: '' });
  };

  handleAddResBtn = event => {
    this.setState({ showHiddenBtn: true });
    this.handleActiveForm(event);
  };

  handleBackBtn = event => {
    this.setState({ showHiddenBtn: false });
    this.handleActiveForm(event);
  };

  setTagsInputValue = string => {
    if (string.length > this.state.createdTags.length) {
      const newString = string
        .split(' ')
        .map(word => word.replace('#', ''))
        .map(tag => `#${tag}`)
        .join(' ');
      this.setState({ createdTags: newString });
    } else {
      this.setState({ createdTags: string });
    }
  };

  addRes = place => {
    this.setState({
      createdCollection: {
        ...this.state.createdCollection,
        restaurants: [...this.state.createdCollection.restaurants, place],
      },
    });
  };

  removeRes = place => {
    const restaurants = this.state.createdCollection.restaurants.filter(
      res => res.restaurant.id !== place.restaurant.id
    );
    this.setState({ createdCollection: { ...this.state.createdCollection, restaurants } });
  };

  handleInputState = event => {
    event.persist();
    const {
      searchProps: { debouncedSearchLocations, debouncedSearchRestaurants },
    } = this.props;
    const { value, name } = event.target;
    this.setState({ createdCollection: { ...this.state.createdCollection, [name]: value } }, () => {
      const {
        createdCollection: { location, restaurant },
        cityId,
      } = this.state;
      // Set created tags
      name === 'tags' && this.setTagsInputValue(this.state.createdCollection.tags);
      // Search Locations
      name === 'location' && debouncedSearchLocations({ locationTerm: location });
      // Search Restaurants
      name === 'restaurant' && debouncedSearchRestaurants({ placeTerm: restaurant, entity_id: cityId });
    });
  };

  autocompleteInput = cityId => {
    return event => {
      const {
        searchProps: { debouncedSearchLocations, debouncedSearchRestaurants },
      } = this.props;
      const value = event.target.innerText;
      const name = event.target.dataset.autocomInput;
      this.setState({ cityId, createdCollection: { ...this.state.createdCollection, [name]: value } }, () => {
        const { location, restaurant } = this.state.createdCollection;
        // Search Locations
        name === 'location' &&
          debouncedSearchLocations({ locationTerm: location }).then(() => {
            // Search Restaurants
            restaurant.length > 1 &&
              debouncedSearchRestaurants({ placeTerm: restaurant, entity_id: this.state.cityId });
          });
      });
    };
  };

  randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  handleCollectionSaving = () => {
    const { createdCollection } = this.state;
    const { saveCollection } = this.props;
    const collection_id = this.randomIntFromInterval(1, 1000);
    const myCollection = {
      collection_id,
      title: createdCollection.name,
      description: createdCollection.description,
      res_count: createdCollection.restaurants.length,
      tags: createdCollection.tags,
      restaurants: createdCollection.restaurants,
      image_url: `https://loremflickr.com/180/240/dish?random=${collection_id}`,
      url: `https://loremflickr.com/180/240/dish?random=${collection_id}`,
      share_url: '(The personal collection url) - Are not part of Zomato API',
      type: 'personal',
    };
    console.log('Personal collection', myCollection);
    //  Save personal Collections
    saveCollection(myCollection);
    this.props.hideModalOnSubmit();
  };

  componentDidMount() {
    // Initial Fetch Lcoations on prepopulated input
    this.props.searchProps.debouncedSearchLocations({
      locationTerm: this.state.createdCollection.location,
    });
  }

  render() {
    const { showHiddenBtn, activeForm } = this.state;
    const collName = this.state.createdCollection.name;
    const { searchProps, hideCollectionModal } = this.props;

    return (
      <div onClick={hideCollectionModal} className="add-new-collection-container">
        <div className="add-new-collection">
          <div className="header">
            {activeForm === 'addCollectionForm' ? 'ADD NEW COLLECTION' : 'ADD RESTAURANTS'}
            <span className="close-icon">
              <i className="fas fa-times" />
            </span>
          </div>
          <div className="content">
            <div className="backface-visibility">helper</div>

            {activeForm === 'addCollectionForm' && (
              <AddCollectionForm
                handleInputState={this.handleInputState}
                inputValues={this.state.createdCollection}
                tagsInputValue={this.state.createdTags}
                propertyNames={this.state.propertyNames}
                setTagsInputValue={this.setTagsInputValue}
              />
            )}

            {activeForm === 'addCollectionResForm' && (
              <AddCollectionResForm
                searchProps={searchProps}
                autocompleteInput={this.autocompleteInput}
                handleActiveForm={this.handleActiveForm}
                handleInputState={this.handleInputState}
                inputValues={this.state.createdCollection}
                propertyNames={this.state.propertyNames}
                handleRestaurants={{ addRes: this.addRes, removeRes: this.removeRes }}
              />
            )}

            {activeForm === 'inCollectionResForm' && (
              <InCollectionResForm
                handleRestaurants={this.removeRes}
                handleActiveForm={this.handleActiveForm}
                addedRestaurants={this.state.createdCollection.restaurants}
              />
            )}
          </div>
          <div className="actions">
            {showHiddenBtn && (
              <button className="back-btn" onClick={this.handleBackBtn} data-ref-to="addCollectionForm">
                Back
              </button>
            )}
            {!showHiddenBtn ? (
              <button
                data-ref-to="addCollectionResForm"
                onClick={this.handleAddResBtn}
                className={`add-restaurants ${collName.length < 1 ? 'btnDisabled' : ''}`}
                disabled={collName.length < 1 ? true : false}
              >
                Add Restaurants
              </button>
            ) : (
              <button onClick={this.handleCollectionSaving.bind(this)} className="save-collection">
                Save Collection
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
