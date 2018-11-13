import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

// Import Actions
import { getSearchedLocation, getSearchedCategories, getSearchedPlaces } from 'actions';
// Import Components
import { CategoriesList, PlacesList, SearchPlacesLoader, SearchLocationsLoader, SearchBtn } from 'components';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationTerm: this.props.city.cityName,
      setLocationTerm: this.props.city.cityName,
      resetLocationTerm: '',
      placesObject:{
        placeTerm: '',
        entity_id : this.props.city.cityId,
        entity_type : 'city',
        count: 9
      },
      showLocationList: false,
      showPlacesList: false,
      showCuisineList: false,
      searchPlacesLoader: false,
      searchLocationsLoader: false
    }
    this.searchLocationRef = React.createRef();
    this.searchCuisineRef = React.createRef();
    this.debounce = null;

    this.handleLocationTermChange = this.handleLocationTermChange.bind(this);
    this.manipulateSearchLists = this.manipulateSearchLists.bind(this);
    this.handleLocationSuggestionClick = this.handleLocationSuggestionClick.bind(this);
    this.handlePlacesTermChange = this.handlePlacesTermChange.bind(this);
    this.debounceSearchPlaces = this.debounceSearchPlaces.bind(this);
  }

  // Handle Places Search
  handleLocationTermChange(e) {
    const { getSearchedLocation } = this.props;
    const { value } = e.target;

    this.setState({ locationTerm: value, searchLocationsLoader: true }, () => {
    // Get Location Suggestions
    clearTimeout(this.debounce)
    this.state.locationTerm.length >= 2 ? 
    this.debounce = setTimeout(() => {getSearchedLocation({ locationTerm: this.state.locationTerm })
        .then(() => this.setState({ showLocationList: true, searchLocationsLoader: false }))
    }, 300) : this.setState({ showLocationList: false, searchLocationsLoader: false })
    });
  }

  renderLocationList() {
    const { searchedLocation } = this.props;

    return searchedLocation ? searchedLocation.map(location => {
      const { id, name } = location;
      const locationTextHighlight = () => { 
        const regExp = new RegExp(this.state.locationTerm +"([a-zA-Z0-9]\b)?[, -]?", 'ig');
        const matched = name.match(regExp);
        const newText = name.replace(regExp, `<span style="font-weight: bold">${matched}</span>`)
        return newText;
      }
      return (
        <li 
          onClick={ () => this.handleLocationSuggestionClick(name, id) }
          dangerouslySetInnerHTML={{__html: locationTextHighlight()}}
          key={id}>
        </li>
      )
    }) : null
  }

  handleLocationSuggestionClick(location, entity_id) {
    const { getSearchedPlaces } = this.props;
    this.setState({ 
      locationTerm: location,
      setLocationTerm: location, 
      placesObject: {...this.state.placesObject, entity_id: entity_id },
      showLocationList: false,
      showCuisineList: false
    }, 
    () => {
      // Set City name & ID for parent - MainHome component
      this.props.handleParentCityState({ cityName: this.state.setLocationTerm, cityId: entity_id})
      if(this.state.placesObject.placeTerm.length !== 0){
        this.setState({ searchPlacesLoader: true },
          () => { getSearchedPlaces(this.state.placesObject).then(() => {
            this.setState({ 
              showPlacesList: true,
              showCuisineList: false,
              showLocationList: false,
              searchPlacesLoader: false
            })
          })
        })
      }
    })
  }

  renderCuisinesList() {
    const { searchedCategories } = this.props;
    const { setLocationTerm, placesObject: { entity_id } } = this.state;
    return <CategoriesList city = {{ cityName: setLocationTerm, cityId: entity_id}} nameList={ searchedCategories } />
  }

  // Handle Places Search
  handlePlacesTermChange(e) {
    const { value } = e.target;

    this.setState({ 
      placesObject: {...this.state.placesObject, placeTerm: value},
      showPlacesList: false,
      showCuisineList: false,
      searchPlacesLoader: true
    },() => {
      this.debounceSearchPlaces();
    })
    value.length === 0 && this.setState({ showPlacesList: false, showCuisineList: true, searchPlacesLoader: false });
  }

  debounceSearchPlaces() {
    const { getSearchedPlaces } = this.props;
    const { placeTerm } = this.state.placesObject;
    clearTimeout(this.debounce)
    placeTerm.length >= 2 ? this.debounce = setTimeout(() =>  getSearchedPlaces(this.state.placesObject)
    .then(() => this.setState({ searchPlacesLoader: false, showPlacesList: true })), 300) : this.setState({ searchPlacesLoader: false })
  }

  renderPlacesList() {
    const { searchedPlaces } = this.props;
    return <PlacesList placesList={searchedPlaces} />
  }

  manipulateSearchLists(e) {
    const { placeTerm } = this.state.placesObject;
    if(this.searchLocationRef.current.contains(e.target)) {
      this.setState({ showCuisineList: false, showPlacesList: false, locationTerm: this.state.resetLocationTerm })
    } else if(this.searchCuisineRef.current.contains(e.target)) {
      this.searchCuisineRef.current.setAttribute('placeholder', 'Start typing to search...');
      placeTerm.length >= 2 &&  placeTerm.length > 0 ? this.setState({ showLocationList: false, showCuisineList: false, showPlacesList: true, locationTerm: this.state.setLocationTerm }) : this.setState({ showLocationList: false, showCuisineList: true, showPlacesList: false, locationTerm: this.state.setLocationTerm })
    } else if(e.target.parentNode.className === 'location-list') {
      placeTerm.length >= 2 &&  placeTerm.length > 0 ? this.setState({ showCuisineList: false }) : this.setState({ showCuisineList: true })
    } 
    else if(e.target.className=== 'cuisine-item') {
      return
    } else {
      this.searchCuisineRef.current.setAttribute('placeholder', "Search for resturants or cuisines...");
      this.setState({ showCuisineList: false, showLocationList: false, showPlacesList: false, locationTerm: this.state.setLocationTerm })
    }
  }

  componentDidMount() {
    const { setLocationTerm, placesObject: { entity_id } } = this.state;
    document.querySelector('body').addEventListener('click', this.manipulateSearchLists);
    this.props.handleParentCityState({ cityName: setLocationTerm, cityId: entity_id });
  }

  componentWillUnmount() {
    document.querySelector('body').removeEventListener('click', this.manipulateSearchLists)
  }

  componentWillMount() {
    const { getSearchedCategories } = this.props;
    getSearchedCategories();
  }

  render() {
    const { setLocationTerm, placesObject: { entity_id } } = this.state;
    // const splitedCityName = setLocationTerm.split(' ').join('-');
    return (
      <form className="search-form">
        <div className="search-location">
          <span className="fa-arrow"><i className="fas fa-location-arrow"></i></span>
          <input 
            ref={this.searchLocationRef}
            onChange={this.handleLocationTermChange}
            value={this.state.locationTerm}
            placeholder="Please type a location" />
          <span className="fa-caret"><i className="fas fa-caret-down"></i></span>
          {this.state.searchLocationsLoader && <SearchLocationsLoader />}
        </div>
        <div className="search-place" >
          <input
            value={this.state.placesObject.placeTerm}
            onChange={this.handlePlacesTermChange} 
            ref={this.searchCuisineRef}
            placeholder="Search for resturants or cuisines..." />
          <span className="fa-search"><i className="fas fa-search"></i></span>
          {this.state.searchPlacesLoader && <SearchPlacesLoader />}
        </div>
        <SearchBtn urlPath={ this.props.urlPath } city = {{ cityName: setLocationTerm, cityId: entity_id }} />
        {/* Render Location List */}
        {this.state.locationTerm.length !==0 && this.state.showLocationList && <ul className="location-list">{this.renderLocationList()}</ul>}
        {/* Render Cuisine list */}
        {this.state.showCuisineList && <ul className="cuisine-list">{this.renderCuisinesList()}</ul>}
        {/* Render Places list */}
        { this.state.showPlacesList && <ul className="places-list">{this.renderPlacesList()}</ul>}
      </form>
    );
  };
}

function mapStateToProps ({ searchedTerms }) {
  const { searchedLocation, searchedCategories, searchedPlaces } = searchedTerms;
  return {
    searchedLocation,
    searchedCategories,
    searchedPlaces : searchedPlaces.restaurants
  }
}

export default connect(mapStateToProps, { getSearchedLocation, getSearchedCategories, getSearchedPlaces })(SearchForm)