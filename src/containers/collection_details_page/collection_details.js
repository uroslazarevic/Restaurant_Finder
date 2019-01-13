import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Import Actions
import { getCollectionDetails, getSearchedCollections } from 'actions';
import { removeCollectionFromDB, saveCollectionInDB } from 'actions/user_collections'
import { setVisibleFM } from 'actions/event_bus'
// Import Components
import {
  Collections,
  Layout,
  PageLoader,
  CollectionDetailsCard,
  CollectionRestaurantsList
} from 'components'; 


class CollectionDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      cityName: 'Bratislava',
      cityId: '111',
      collectionName: '',
      collectionId: '',
      pageLoader: false,
      reviewsLoader: false,
      showContent: false,
    } 
  }

  componentWillMount() {
    
    const { getCollectionDetails, getSearchedCollections } = this.props;
    this.setState({ 
      pageLoader: true,
      showContent: false,
      cityName: this.props.location.state.cityName,
      cityId: this.props.location.state.cityId,
      collectionName: this.props.location.state.collectionName,
      collectionId: this.props.location.state.collectionId
     }, () => {
       const { cityId, collectionId } = this.state;

       axios.all([
        getCollectionDetails({ entity_id: cityId, collection_id: collectionId }),
        getSearchedCollections({city_id: cityId, count : '30' })
       ]).then(() => this.setState({ pageLoader: false, showContent: true }))
     })
  }

  componentWillReceiveProps(newProps) {
    const { 
      getCollectionDetails,
      getSearchedCollections
    } = this.props;

    newProps.location.state.collectionId !== this.props.location.state.collectionId &&
      this.setState({ 
        pageLoader: true,
        showContent: false,
        cityName: newProps.location.state.cityName,
        cityId: newProps.location.state.cityId,
        collectionName: newProps.location.state.collectionName,
        collectionId: newProps.location.state.collectionId
      }, () => {
        const { cityId, collectionId } = this.state;

        axios.all([
          getCollectionDetails({ entity_id: cityId, collection_id: collectionId }),
          getSearchedCollections({city_id: cityId, count : '30' })
        ]).then(() => this.setState({ pageLoader: false, showContent: true }))
      })
  }

  render() {
    const { 
      searchedCollections,
      searchedCollectionDetails,
      saveCollectionInDB,
      savedCollections,
      removeCollectionFromDB,
      isAuth,
      setVisibleFM
    } = this.props;
    
    const { 
      cityName,
      cityId,
      collectionName,
      collectionId,
      showTooltip,
      pageLoader,
      showContent
    } = this.state;

    const splitedCityName = cityName.split(' ').join('-');
    const urlHome = '/';
    const urlCollections = `/${splitedCityName}/collections`;

    return (
      <div className="collection-details">
        <Layout showFooter = { showContent } urlPath={ this.props.match.path } city={{ cityName, cityId }} >
          { pageLoader && <PageLoader />}
          { showContent && 
          <div className="collection-details-content container">
            <div className="pathway-link container" >
              <Link to={{ pathname: urlHome, state: { cityName, cityId } }} >
                Home
              </Link> 
              <span> <i className="fas fa-angle-right"></i></span><span> {cityName}</span> 
              <span> <i className="fas fa-angle-right"></i> </span> 
              <Link  to={{ pathname: urlCollections.toLowerCase(), state: { cityName, cityId } }} >Collections</Link>
              <span> <i className="fas fa-angle-right"></i> {collectionName}</span>
            </div>
            <CollectionDetailsCard 
              setVisibleFM = { setVisibleFM }
              isAuth = { isAuth }
              removeCollectionFromDB = { removeCollectionFromDB }
              savedCollections = { savedCollections }
              saveCollectionInDB = { saveCollectionInDB }
              showTooltip = { showTooltip }
              collectionsArray = { searchedCollections } 
              requiredCollectionId = {collectionId} />
            <CollectionRestaurantsList 
              city = {{ cityName, cityId }}
              restaurants = { searchedCollectionDetails } />
            <div className="collections">
              <div className="more-collections">More Collections</div>
              <Collections 
                collections={searchedCollections} 
                city={{ cityName, cityId }} 
                filterOutId = { collectionId }
              />
            </div>
          </div>}
        </Layout>
      </div>
    )
  }
}

function mapStateToProps ({ searchedTerms, collections, authentification }) {
  const { searchedCollectionDetails, searchedCollections } = searchedTerms;
  return {
    searchedCollectionDetails,
    searchedCollections,
    savedCollections: collections.savedCollections,
    isAuth: authentification.isAuth,
  }
}

export default connect(
  mapStateToProps,
  { 
    getCollectionDetails,
    getSearchedCollections,
    saveCollectionInDB,
    removeCollectionFromDB,
    setVisibleFM
  })(CollectionDetails)