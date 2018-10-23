import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Actions
import { getSearchedLocation, getSearchedCuisines, getSearchedPlaces } from 'actions';
// Import Components
import CategoriesList from '../components/categories_list';
import PlacesList from '../components/places_list';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationTerm:'Bratislava',
      setLocationTerm:'Bratislava',
      resetLocationTerm: '',
      placesObject:{
        placeTerm: '',
        entity_id : 111,
        entity_type : 'city',
        radius : '' ,
        cuisines : '',
        establishment_type : '',
        collection_id : '',
        category : '',
        count: 9,
        sort : '',
        order : ''
      },
      showLocationList: false,
      showPlacesList: false,
      showCuisineList: false
    }
    this.searchLocationRef = React.createRef();
    this.searchCuisineRef = React.createRef();
    this.debounce;

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

    this.setState({ locationTerm: value }, () => {
      // Get Location Suggestions
    clearTimeout(this.debounce)
    this.debounce = setTimeout(() => this.state.locationTerm.length >= 2 && getSearchedLocation({ locationTerm: this.state.locationTerm }), 250)
    });
    this.state.locationTerm.length >= 2  ? this.setState({ showLocationList: true }) : this.setState({ showLocationList: false });
  }

  renderLocationList() {
    const { searchedLocation } = this.props;

    return searchedLocation ? searchedLocation.map(location => {
      const { id, name } = location;

      const locationTextHighlight = () => { 
        const regExp = new RegExp(this.state.locationTerm +"([a-zA-Z0-9\p{L}]\b)?[,\. -]?", 'ig');
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

  // Handle Cuisines Search

  handleLocationSuggestionClick(location, entity_id) {
    const { searchedCuisines } = this.props;
    
    this.setState({ 
      locationTerm: location,
      setLocationTerm: location, 
      placesObject: {...this.state.placesObject, entity_id: entity_id },
      showLocationList: false,
    }, 
    // Change Parent component state object
    () => {
      this.props.handleParentCityState(this.state.setLocationTerm)
      this.state.placesObject.placeTerm.length !== 0 && getSearchedLocation(this.state.placesObject)
      this.setState({ showPlacesList: true, showCuisineList: false })
    });
    
    // If there are already fetched Cuisine suggestions, stop cuisine request
    searchedCuisines.length === 0 && this.searchCuisioneRequest();
    // if(this.state.placesObject.placeTerm.length !== 0) {
    //   const { getSearchedLocation } = this.props;
    //   getSearchedLocation(this.state.placesObject)
    //   this.setState({ showPlacesList: true, showCuisineList: false })
    // } else this.setState({ showCuisineList: true })
  }

  searchCuisioneRequest() {
    const { getSearchedCuisines } = this.props;
    getSearchedCuisines();
  }
  
  renderCuisinesList() {
    const { searchedCuisines } = this.props;
    return <CategoriesList nameList={searchedCuisines} />
  }

  // Handle Places Search

  handlePlacesTermChange(e) {
    const { value } = e.target;

    this.setState({ 
      placesObject: {...this.state.placesObject, placeTerm: value},
      showPlacesList: true,
      showCuisineList: false
    },() => {
      this.debounceSearchPlaces()
    })
    value.length === 0 && this.setState({ showPlacesList: false, showCuisineList: true });
  }

  debounceSearchPlaces() {
    const { getSearchedPlaces } = this.props;
    const { placeTerm } = this.state.placesObject;
    clearTimeout(this.debounce)
    this.debounce = setTimeout(() => placeTerm.length >= 2 && getSearchedPlaces(this.state.placesObject), 250)
  }

  renderPlacesList() {
    const { searchedPlaces } = this.props;
    return <PlacesList placesList={searchedPlaces} />
  }

  manipulateSearchLists(e) {
    const { showPlacesList, showCuisineList } = this.state;
    const { placeTerm } = this.state.placesObject;

    // If places/cuisine search input is clicked - show cuisine/places list and hide location list
    if( placeTerm.length === 0 && showPlacesList === false && this.searchCuisineRef.current.contains(e.target) ) {
      // If cuisine input is clicked, hide location list and show cuisine list if showPlacesList= false
      this.setState({ showLocationList: false, showCuisineList: true, locationTerm: this.state.setLocationTerm })
      this.searchCuisineRef.current.setAttribute('placeholder', 'Start typing to search...');
    } else if( placeTerm.length !== 0 && showCuisineList === false && this.searchCuisineRef.current.contains(e.target) ) {
      // If cuisine input is clicked, hide location list and show places list if showCuisineList= false
      this.setState({ showLocationList: false, showPlacesList: true, locationTerm: this.state.setLocationTerm })
      this.searchCuisineRef.current.setAttribute('placeholder', 'Start typing to search...');
    } else if( e.target.parentNode.classList.contains('location-list') ) {
      // If location item is clicked, show cuisine list and after, that,
      this.setState({ showCuisineList: true })
    } else if( this.searchLocationRef.current.contains(e.target)){
      // If location search input is clicked - show location list and hide cuisines list
      this.setState({ showLocationList: true, showCuisineList: false, showPlacesList: false, locationTerm: this.state.resetLocationTerm })
    } else {
      this.setState({ showCuisineList: false, showLocationList: false, showPlacesList: false, locationTerm: this.state.setLocationTerm })
      this.searchCuisineRef.current.setAttribute('placeholder', "Search for resturants or cuisines...");
    }
  }

  componentDidMount() {
    document.querySelector('body').addEventListener('click', this.manipulateSearchLists);
    this.props.handleParentCityState(this.state.setLocationTerm);
  }

  componentWillUnmount() {
    document.querySelector('body').removeEventListener('click', this.manipulateSearchLists)
  }

  render() {
    const { searchedCuisines } = this.props;
    return (
      <form className="search-form" type="submit">
        <div className="search-location">
          <span className="fa-arrow"><i className="fas fa-location-arrow"></i></span>
          <input 
            ref={this.searchLocationRef}
            onChange={this.handleLocationTermChange}
            value={this.state.locationTerm}
            placeholder="Please type a location" />
          <span className="fa-caret"><i className="fas fa-caret-down"></i></span>
        </div>
        <div className="search-place" >
          <input
            value={this.state.placesObject.placeTerm}
            onChange={this.handlePlacesTermChange} 
            onClick={() => searchedCuisines.length === 0 && this.searchCuisioneRequest()}
            ref={this.searchCuisineRef}
            placeholder="Search for resturants or cuisines..." />
          <span className="fa-search"><i className="fas fa-search"></i></span>
        </div>
        <button className="search-btn">Search</button>
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
  const { searchedLocation, searchedCuisines, searchedPlaces } = searchedTerms;
  return {
    searchedLocation,
    searchedCuisines,
    searchedPlaces
  }
}

export default connect(mapStateToProps, { getSearchedLocation, getSearchedCuisines, getSearchedPlaces })(SearchForm)