import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Actions
import { getSearchedCollections, getLocationDetails } from 'actions';
// Import Components
import { Collections, CategoriesList, PopularRestaurants } from 'components'; 

class HomeBottom extends Component {
  constructor(props) {
    super(props);

    this.state = { entity_type: 'city' }
  }

  componentWillMount() {
    const { getSearchedCollections, getLocationDetails, cityID } = this.props;
    getSearchedCollections({city_id: cityID});
    getLocationDetails({ entity_id: cityID })
  }

  componentWillReceiveProps(newProps) {
    const { getSearchedCollections, getLocationDetails, cityID } = this.props;
    if(newProps.cityID !== cityID) {
      // Get New Collections
      getSearchedCollections({city_id: newProps.cityID});
      // Get New Location Details
      getLocationDetails({ entity_id: newProps.cityID });
    } 
  }
  
  renderCollections() {
    const { searchedCollections, cityName } = this.props;
    return searchedCollections ? <Collections collections={searchedCollections} cityName={cityName} /> : <div className="container">Collections not available</div>
  }

  renderCuisinesList() {
    const { searchedCuisines } = this.props;
    return (
    <div className="container" >
      <div className="cuisine-title">Quick Searches</div>
      <div className="cuisine-subtitle">Discover restaurants by type of meal</div>
      <CategoriesList nameList={searchedCuisines} />
    </div>)
  }

  renderPopularRestoraunts() {
    const { searchedLocationDetails } = this.props;
    return searchedLocationDetails.length !== 0 ? <PopularRestaurants data={searchedLocationDetails} cityName={this.props.cityName} /> : <div className="container">Popular Restaurants not available</div>
  }

  render() {
    return (
      <div className="bottom-home-bg">
        <div className="collections">{this.renderCollections()}</div>
        <div className="cuisine-list">{this.renderCuisinesList()}</div>
        <div className="popular-restaurants-list">{this.renderPopularRestoraunts()}</div>
      </div>
    )
  }
}

function mapStateToProps({ searchedTerms }) {
  const { searchedCollections, searchedCuisines, searchedLocationDetails } = searchedTerms;
  return {
    searchedCollections,
    searchedCuisines,
    searchedLocationDetails
  }
}

export default connect(mapStateToProps, { getSearchedCollections, getLocationDetails } )(HomeBottom);