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
    const { getSearchedCollections, getLocationDetails, cityId } = this.props;
    getSearchedCollections({city_id: cityId});
    getLocationDetails({ entity_id: cityId })
  }

  componentWillReceiveProps(newProps) {
    const { getSearchedCollections, getLocationDetails, cityId } = this.props;
    if(newProps.cityId !== cityId) {
      // Get New Collections
      getSearchedCollections({city_id: newProps.cityId});
      // Get New Location Details
      getLocationDetails({ entity_id: newProps.cityId });
    } 
  }
  
  renderCollections() {
    const { searchedCollections, cityName, cityId } = this.props;
    return searchedCollections ? 
    <Collections 
      urlPath={this.props.urlPath}
      collections={searchedCollections} 
      city = {{ cityName, cityId}} /> : <div className="container">Collections not available</div>
  }

  renderCuisinesList() {
    const { searchedCategories, cityName, cityId } = this.props;
    return (
    <div className="container" >
      <div className="cuisine-title">Quick Searches</div>
      <div className="cuisine-subtitle">Discover restaurants by type of meal</div>
      <CategoriesList city = {{ cityName, cityId}} nameList={searchedCategories} />
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
  const { searchedCollections, searchedCategories, searchedLocationDetails } = searchedTerms;
  return {
    searchedCollections,
    searchedCategories,
    searchedLocationDetails
  }
}

export default connect(mapStateToProps, { getSearchedCollections, getLocationDetails } )(HomeBottom);