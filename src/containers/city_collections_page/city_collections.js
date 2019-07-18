import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

// Context
import { CityCollectionsContext } from 'containers/contexts';

// import Actions
import { getSearchedCollections } from 'actions';
import { setVisibleFM } from 'actions/event_bus';
import { debouncedSearchLocations, debouncedSearchRestaurants, saveCollection } from '../../actions/user_collections';
// Import Components
import { Layout, PageLoader, CollContentDisplay, CreateNewCollection } from 'components';

class CityCollections extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityName: 'Bratislava',
      cityId: 111,
      entity_type: 'city',
      pageLoader: false,
      showContent: false,
      collectionModal: false,
    };
    this.hideCollectionModal = this.hideCollectionModal.bind(this);
    this.showCollectionModal = this.showCollectionModal.bind(this);
    this.hideModalOnSubmit = this.hideModalOnSubmit.bind(this);
  }

  hideCollectionModal(event) {
    const target = event.target;
    if (target.classList.contains('add-new-collection-container') || target.classList.contains('close-icon')) {
      this.setState({ collectionModal: false });
    }
  }

  hideModalOnSubmit() {
    this.setState({ collectionModal: false });
  }

  showCollectionModal() {
    this.setState({ collectionModal: true });
  }

  componentDidUpdate(newProps) {
    const { getSearchedCollections } = this.props;
    if (newProps.location.state.cityId !== this.props.location.state.cityId) {
      const { cityName, cityId } = newProps.location.state;

      this.setState({ cityName, cityId, pageLoader: true, showContent: false }, () => {
        getSearchedCollections({
          city_id: cityId,
          count: '30',
        }).then(() => this.setState({ pageLoader: false, showContent: true }));
      });
    }
  }

  componentDidMount() {
    const { getSearchedCollections } = this.props;
    const { cityName, cityId } = this.props.location.state;

    this.setState({ cityId, cityName, pageLoader: true, showContent: false }, () => {
      getSearchedCollections({ city_id: cityId, count: '30' }).then(() =>
        this.setState({ pageLoader: false, showContent: true })
      );
    });
  }

  render() {
    const {
      collections,
      searchedCollections,
      searchedLocations,
      searchedRestaurants,
      debouncedSearchLocations,
      debouncedSearchRestaurants,
      saveCollection,
      isAuth,
      setVisibleFM,
    } = this.props;

    const { cityName, cityId, pageLoader, showContent, collectionModal } = this.state;

    const transitionOptions = {
      in: collectionModal,
      timeout: 300,
      classNames: 'modal-fade',
      unmountOnExit: true,
    };

    const urlHome = '/';
    const cityCollectionContext = {
      searchedCollections,
      searchedLocations,
      searchedRestaurants,
      collections,
      debouncedSearchLocations,
      debouncedSearchRestaurants,
      saveCollection,
      city: { cityName, cityId },
    };
    return (
      <CityCollectionsContext.Provider value={cityCollectionContext}>
        <div className="city-collections">
          <Layout showFooter={showContent} urlPath={this.props.match.path} city={{ cityName, cityId }}>
            {pageLoader && <PageLoader />}
            {showContent && (
              <div className="city-collections-content">
                <div className="pathway-link container">
                  <Link to={{ pathname: urlHome, state: { cityName, cityId } }}>Home</Link>
                  <span>
                    {' '}
                    <i className="fas fa-angle-right" />
                  </span>
                  <span> {cityName}</span>
                  <span>
                    {' '}
                    <i className="fas fa-angle-right" />
                  </span>
                  <span> Collections</span>
                </div>
                <div className="info container">
                  <div className="left">
                    <div className="city-collections-title">Collections - {cityName}</div>
                    <div className="city-collections-subtitle">Create and browse lists of the finest restaurants</div>
                  </div>
                  <button onClick={!isAuth ? setVisibleFM : this.showCollectionModal} className="right">
                    Create Collection
                  </button>
                </div>
                <CollContentDisplay />
              </div>
            )}
            <CSSTransition {...transitionOptions}>
              <CreateNewCollection
                hideModalOnSubmit={this.hideModalOnSubmit}
                hideCollectionModal={this.hideCollectionModal}
                saveCollection={saveCollection}
                searchProps={{
                  searchedLocations,
                  debouncedSearchLocations,
                  searchedRestaurants,
                  debouncedSearchRestaurants,
                }}
              />
            </CSSTransition>
          </Layout>
        </div>
      </CityCollectionsContext.Provider>
    );
  }
}

function mapStateToProps({
  searchedTerms: { searchedCollections },
  authentification: { isAuth },
  userCollections: { searchedLocations, searchedRestaurants, collections },
}) {
  return {
    searchedCollections,
    collections,
    searchedLocations,
    searchedRestaurants,
    isAuth,
  };
}

export default connect(
  mapStateToProps,
  {
    getSearchedCollections,
    debouncedSearchLocations,
    debouncedSearchRestaurants,
    saveCollection,
    setVisibleFM,
  }
)(CityCollections);
