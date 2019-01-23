import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

// import Actions
import { getSearchedCollections } from 'actions';
import { setVisibleFM } from 'actions/event_bus'
import { debouncedSearchLocations, debouncedSearchRestaurants, saveCollectionInDB } from '../../actions/user_collections';
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
      collectionModal: false
     }
    this.hideCollectionModal = this.hideCollectionModal.bind(this);
    this.showCollectionModal = this.showCollectionModal.bind(this);
    this.hideModalOnSubmit = this.hideModalOnSubmit.bind(this);
  }

  hideCollectionModal(event) {
    const target = event.target;
    if( target.classList.contains('add-new-collection-container') || target.classList.contains('close-icon')) {
      this.setState({ collectionModal: false })
    }
  }

  hideModalOnSubmit() {
    this.setState({ collectionModal: false })
  }

  showCollectionModal() {
    this.setState({ collectionModal: true })
  }

  componentWillReceiveProps(newProps) {
    const { getSearchedCollections } = this.props;
    if(newProps.location.state.cityId !== this.props.location.state.cityId) {
      const { cityName, cityId } = newProps.location.state;

        this.setState({ cityName, cityId, pageLoader: true, showContent: false }, () =>  {
          getSearchedCollections({ 
            city_id: cityId, 
            count : '30' 
          }).then(() => this.setState({ pageLoader: false, showContent: true }))
        })
    }
  }

  componentWillMount() {
    const { getSearchedCollections } = this.props;
    const { cityName, cityId } = this.props.location.state;

    this.setState({ cityId, cityName, pageLoader: true, showContent: false }, () =>  {
      getSearchedCollections({city_id: cityId, count : '30' })
        .then( () =>this.setState({ pageLoader: false, showContent: true }))
    })
  }

  render() {
    const {
      searchedCollections,
      savedCollections,
      searchedLocations,
      searchedRestaurants,
      debouncedSearchLocations,
      debouncedSearchRestaurants,
      personalCollections,
      saveCollectionInDB,
      isAuth, 
      setVisibleFM
    } = this.props;

    const {
      cityName,
      cityId,
      pageLoader,
      showContent,
      collectionModal
    } = this.state;

    const transitionOptions = {
      in: collectionModal,
      timeout: 300,
      classNames :"modal-fade",
      unmountOnExit: true
    }
    
    const urlHome = '/';
    return (
      <div className="city-collections">
        <Layout showFooter = { showContent } urlPath={ this.props.match.path } city={{ cityName, cityId }}>
          { pageLoader && <PageLoader />}
          { showContent && <div className="city-collections-content">
              <div className="pathway-link container" >
                <Link to={{ pathname: urlHome, state: { cityName, cityId } }} >
                  Home
                </Link> 
                <span> <i className="fas fa-angle-right"></i></span><span> {cityName}</span>  
                <span> <i className="fas fa-angle-right"></i></span><span> Collections</span>
              </div>
              <div className="info container">
                <div className="left">
                  <div className="city-collections-title">Collections - {cityName}</div>
                  <div className="city-collections-subtitle" >Create and browse lists of the finest restaurants</div>
                </div>
                <button 
                  onClick = { !isAuth ? setVisibleFM : this.showCollectionModal } 
                  className="right"
                >Create Collection</button>
              </div>
              <CollContentDisplay
                personalCollections = { personalCollections }
                savedCollections = { savedCollections }
                collections = { searchedCollections }
                city={{ cityName, cityId }} />
            </div> }
          <CSSTransition {...transitionOptions} >
            <CreateNewCollection
                hideModalOnSubmit = { this.hideModalOnSubmit }
                hideCollectionModal = { this.hideCollectionModal }
                saveCollectionInDB = { saveCollectionInDB }
                searchProps = {{ 
                  searchedLocations,
                  debouncedSearchLocations,
                  searchedRestaurants,
                  debouncedSearchRestaurants
                }}
              /> 
          </CSSTransition>
        </Layout> 
      </div>
    )
  }
}

function mapStateToProps({ 
  searchedTerms: { searchedCollections },
  authentification: { isAuth },
  userCollections:
    {
    savedCollections,
    searchedLocations,
    searchedRestaurants,
    personalCollections
    }
}) {
  return {
    searchedCollections,
    savedCollections,
    searchedLocations,
    searchedRestaurants,
    personalCollections,
    isAuth
  }
}

export default connect(
  mapStateToProps, 
  {
    getSearchedCollections,
    debouncedSearchLocations,
    debouncedSearchRestaurants,
    saveCollectionInDB,
    setVisibleFM
  })(CityCollections);