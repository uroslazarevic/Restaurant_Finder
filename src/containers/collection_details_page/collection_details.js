import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Import Context
import { CollectionDetailsContext } from 'containers/contexts';
// Import Actions
import { getCollectionDetails, getSearchedCollections } from 'actions';
import { removeCollection, saveCollection } from 'actions/user_collections';
import { setVisibleFM } from 'actions/event_bus';
// Import Components
import {
  Collections,
  Layout,
  PageLoader,
  CollectionDetailsCard,
  PersonalCollectionDetailsCard,
  CollectionRestaurantsList,
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
    };
  }

  componentDidMount() {
    const { getCollectionDetails, getSearchedCollections } = this.props;

    this.setState(
      {
        pageLoader: true,
        showContent: false,
        cityName: this.props.location.state.cityName,
        cityId: this.props.location.state.cityId,
        collectionName: this.props.location.state.collectionName,
        collectionId: this.props.location.state.collectionId,
      },
      () => {
        const { cityId, collectionId } = this.state;

        if (!this.props.location.state.userCollection) {
          axios
            .all([
              getCollectionDetails({ entity_id: cityId, collection_id: collectionId }),
              getSearchedCollections({ city_id: cityId, count: '30' }),
            ])
            .then(() => this.setState({ pageLoader: false, showContent: true }));
        } else {
          getSearchedCollections({ city_id: cityId, count: '30' }).then(() =>
            this.setState({ pageLoader: false, showContent: true })
          );
        }
      }
    );
  }

  componentDidUpdate(newProps) {
    const { getCollectionDetails, getSearchedCollections } = this.props;

    newProps.location.state.collectionId !== this.props.location.state.collectionId &&
      this.setState(
        {
          pageLoader: true,
          showContent: false,
          cityName: newProps.location.state.cityName,
          cityId: newProps.location.state.cityId,
          collectionName: newProps.location.state.collectionName,
          collectionId: newProps.location.state.collectionId,
        },
        () => {
          const { cityId, collectionId } = this.state;

          axios
            .all([
              getCollectionDetails({ entity_id: cityId, collection_id: collectionId }),
              getSearchedCollections({ city_id: cityId, count: '30' }),
            ])
            .then(() => this.setState({ pageLoader: false, showContent: true }));
        }
      );
  }

  render() {
    const {
      searchedCollections,
      searchedCollectionDetails,
      saveCollection,
      removeCollection,
      isAuth,
      setVisibleFM,
      collections,
    } = this.props;

    const { cityName, cityId, collectionName, collectionId, pageLoader, showContent } = this.state;

    const splitedCityName = cityName.split(' ').join('-');
    const urlHome = '/';
    const urlCollections = `/${splitedCityName}/collections`;

    const collectionDetails = {
      searchedCollections,
      searchedCollectionDetails,
      saveCollection,
      collections,
      removeCollection,
      isAuth,
      setVisibleFM,
      requiredCollectionId: collectionId,
    };
    return (
      <CollectionDetailsContext.Provider value={collectionDetails}>
        <div className="collection-details">
          <Layout showFooter={showContent} urlPath={this.props.match.path} city={{ cityName, cityId }}>
            {pageLoader && <PageLoader />}
            {showContent && (
              <div className="collection-details-content container">
                <div className="pathway-link container">
                  <Link to={{ pathname: urlHome, state: { cityName, cityId } }}>Home</Link>
                  <span>
                    {' '}
                    <i className="fas fa-angle-right" />
                  </span>
                  <span> {cityName}</span>
                  <span>
                    {' '}
                    <i className="fas fa-angle-right" />{' '}
                  </span>
                  <Link to={{ pathname: urlCollections.toLowerCase(), state: { cityName, cityId } }}>Collections</Link>
                  <span>
                    {' '}
                    <i className="fas fa-angle-right" /> {collectionName}
                  </span>
                </div>
                {!this.props.location.state.userCollection ? (
                  <CollectionDetailsCard />
                ) : (
                  <PersonalCollectionDetailsCard
                    personalCollection={this.props.location.state.userCollection.personalCollection}
                  />
                )}
                {!this.props.location.state.userCollection ? (
                  <CollectionRestaurantsList city={{ cityName, cityId }} restaurants={searchedCollectionDetails} />
                ) : (
                  <CollectionRestaurantsList
                    city={{ cityName, cityId }}
                    restaurants={this.props.location.state.userCollection.restaurants}
                  />
                )}
                <div className="collections">
                  <div className="more-collections">More Collections</div>
                  <Collections
                    collections={searchedCollections}
                    city={{ cityName, cityId }}
                    filterOutId={collectionId}
                  />
                </div>
              </div>
            )}
          </Layout>
        </div>
      </CollectionDetailsContext.Provider>
    );
  }
}

function mapStateToProps({ searchedTerms, userCollections, authentification }) {
  const { searchedCollectionDetails, searchedCollections } = searchedTerms;
  return {
    searchedCollectionDetails,
    searchedCollections,
    collections: userCollections.collections,
    isAuth: authentification.isAuth,
  };
}

export default connect(
  mapStateToProps,
  {
    getCollectionDetails,
    getSearchedCollections,
    saveCollection,
    removeCollection,
    setVisibleFM,
  }
)(CollectionDetails);
