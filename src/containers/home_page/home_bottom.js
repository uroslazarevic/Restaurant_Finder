import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// import Actions
import { getSearchedCollections, getLocationDetails } from 'actions';
// Import Components
import { Collections, CategoriesList, PopularRestaurants, PageLoader, Footer } from 'components';

class HomeBottom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entity_type: 'city',
      pageLoader: false,
      showContent: false,
    };
  }

  componentDidMount() {
    const {
      getSearchedCollections,
      getLocationDetails,
      city: { cityId },
    } = this.props;
    this.setState({ pageLoader: true, showContent: false }, () => {
      axios
        .all([getSearchedCollections({ city_id: cityId }), getLocationDetails({ entity_id: cityId })])
        .then(() => this.setState({ pageLoader: false, showContent: true }));
    });
  }

  componentDidUpdate(newProps) {
    const {
      getSearchedCollections,
      getLocationDetails,
      city: { cityId },
    } = this.props;
    if (newProps.city.cityId !== cityId) {
      this.setState({ pageLoader: true, showContent: false }, () => {
        axios
          .all([
            // Get New Collections
            getSearchedCollections({ city_id: newProps.cityId }),
            // Get New Location Details
            getLocationDetails({ entity_id: newProps.cityId }),
          ])
          .then(() => this.setState({ pageLoader: false, showContent: true }));
      });
    }
  }

  renderCollections = () => {
    const {
      searchedCollections,
      city: { cityId, cityName },
    } = this.props;
    return searchedCollections ? (
      <Collections urlPath={this.props.urlPath} collections={searchedCollections} city={{ cityName, cityId }} />
    ) : (
      <div className="container">Collections not available</div>
    );
  };

  renderCuisinesList() {
    const {
      searchedCategories,
      city: { cityId, cityName },
    } = this.props;
    return (
      <div className="container">
        <div className="cuisine-title">Quick Searches</div>
        <div className="cuisine-subtitle">Discover restaurants by type of meal</div>
        <CategoriesList city={{ cityName, cityId }} nameList={searchedCategories} />
      </div>
    );
  }

  renderPopularRestoraunts() {
    const {
      searchedLocationDetails,
      city: { cityId, cityName },
    } = this.props;
    return searchedLocationDetails.length !== 0 ? (
      <PopularRestaurants data={searchedLocationDetails} city={{ cityId, cityName }} />
    ) : (
      <div className="container">Popular Restaurants not available</div>
    );
  }

  render() {
    const {
      city: { cityId, cityName },
    } = this.props;
    const { pageLoader, showContent } = this.state;

    return (
      <React.Fragment>
        {pageLoader && <PageLoader />}
        {showContent && (
          <div className="bottom-home-bg">
            <div className="collections">{this.renderCollections()}</div>
            <div className="cuisine-list">{this.renderCuisinesList()}</div>
            <div className="popular-restaurants-list">{this.renderPopularRestoraunts()}</div>
          </div>
        )}
        {showContent && <Footer city={{ cityName, cityId }} />}
      </React.Fragment>
    );
  }
}

function mapStateToProps({ searchedTerms }) {
  const { searchedCollections, searchedCategories, searchedLocationDetails } = searchedTerms;
  return {
    searchedCollections,
    searchedCategories,
    searchedLocationDetails,
  };
}

export default connect(
  mapStateToProps,
  { getSearchedCollections, getLocationDetails }
)(HomeBottom);
