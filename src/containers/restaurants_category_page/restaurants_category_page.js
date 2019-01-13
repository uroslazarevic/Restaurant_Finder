import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

// Import Actions
import { getSearchedRestaurants, getLocationDetails, getSearchedCategories, getSearchedEstablishments, getSearchedCuisines } from 'actions';
// Import Components
import { RestaurantCard, Filters, Layout, PageLoader, Pagination, CuisinesModal } from 'components';

class RestaurantsCategoryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wildcard: 'Restaurants',
      cityName: 'Bratislava',
      showCuisinesModal: false,
      cuisineModalItem: { cuisineId: '', cuisineName: '' },
      pageLoader: false,
      showContent: false,
      filterObjChange: false,
      
      filterObject:{
        placeTerm: '',
        entity_id : 111,
        entity_type : 'city',
        start: '',
        radius : '' ,
        cuisines : '',
        establishment_type : '',
        collection_id : '',
        category : '',
        count: 10,
        sort : 'rating',
        order : 'desc'
      },
    }

    this.handleFilterObjStateChange = this.handleFilterObjStateChange.bind(this);
    this.handleOnClickSearchFilter = this.handleOnClickSearchFilter.bind(this);
    this.handleCuisinesModal = this.handleCuisinesModal.bind(this);
    this.removeCuisineModalItem = this.removeCuisineModalItem.bind(this);
    this.handlePaginationPageClick = this.handlePaginationPageClick.bind(this);
  }

  handlePaginationPageClick({ selected }) {
    const page = selected;
    this.setState({ 
      filterObject: { ...this.state.filterObject, 
      start: (page+1) * this.state.filterObject.count } }, () => {
      this.props.getSearchedRestaurants(this.state.filterObject)
        .then(this.paintActiveListItems())
    })
  }
  
  handleCuisinesModal(e, cuisine=null) {
    const body = document.querySelector('body');
    const ele = e.target;
    !ele.classList.contains('all-cuisines-container') && !ele.classList.contains('hide-cuisine-modal') ?
      this.setState({ showCuisinesModal: true }, () => body.style.overflow = "hidden")
      : this.setState({ showCuisinesModal: false }, () =>  body.style.overflow = "initial")

    if(cuisine !== null) {
      this.setState({filterObjChange: true, showCuisinesModal: false, pageLoader: true,  showContent: false,
        filterObject: { ...this.state.filterObject, cuisines: cuisine.cuisineId },
        cuisineModalItem: { cuisineId: cuisine.cuisineId, cuisineName: cuisine.cuisineName } }, () => {
        this.props.getSearchedRestaurants( this.state.filterObject )
          .then(()=> {
            this.setState({ filterObjChange: false, showCuisinesModal: false, pageLoader: false, showContent: true }, () => {
              this.paintActiveListItems()
              body.style.overflow = "initial";
            })
          })
      })
    }
  }

  removeCuisineModalItem(e) {
    const cuisineModalItem = e.target;
    const stateKey = cuisineModalItem.parentNode.getAttribute('data-filter');
    this.setState({ filterObjChange: false, filterObject: { ...this.state.filterObject, [stateKey]: ''},
    pageLoader: true,  showContent: false, cuisineModalItem: { cuisineId: '', cuisineName: '' } }, () => {
      this.props.getSearchedRestaurants( this.state.filterObject )
        .then(this.setState({ pageLoader: false,  showContent: true }, 
          () => this.paintActiveListItems()
        ))
    })
  }

  handleOnClickSearchFilter() {
    if(this.state.filterObjChange) {

      this.state.cuisineModalItem.cuisineId  !== this.state.filterObject.cuisines && this.state.filterObject.cuisines !== '' ? 
      (
        this.setState({ cuisineModalItem: { cuisineId: '', cuisineName: '' }, pageLoader: true, showContent: false }, () => {
          this.props.getSearchedRestaurants( this.state.filterObject )
            .then(() => {
              this.setState({filterObjChange: false, pageLoader: false, showContent: true })
              this.paintActiveListItems()});
        }) 
      ) : (
        this.setState({   
          pageLoader: true, showContent: false
        }, () => {
          this.props.getSearchedRestaurants( this.state.filterObject )
            .then(() => {
              this.setState({ filterObjChange: false, pageLoader: false, showContent: true })
              this.paintActiveListItems()});
        }) 
      )
    }
  }
  
  paintActiveListItems() {
    const listItems = document.querySelectorAll('.filters .content li')
    listItems.forEach( li => {
      const stateKey = li.parentNode.getAttribute('data-filter');
      const liValue = li.getAttribute('value');
      if(liValue == this.state.filterObject[stateKey]) {
        li.className = ('item active-filter-item');
      } else {
        li.className = ('item');
      }
    })
  }

  handleFilterObjStateChange(e) {
    const ele = e.target;
    const value = ele.getAttribute('value');
    const stateKey = ele.parentNode.getAttribute('data-filter');
    const listItems = document.querySelectorAll(`.${stateKey} li`);

    if(ele.classList.contains('active-filter-item') && ele.parentNode.getAttribute('data-filter')) {
      // Remove current active filter item class
      this.setState({filterObjChange: false, filterObject: {...this.state.filterObject, [stateKey]: ''}, pageLoader: true, showContent: false }, () =>  {
        ele.classList.remove('active-filter-item')
        this.props.getSearchedRestaurants(this.state.filterObject)
          .then( this.setState({ pageLoader: false, showContent: true }, 
            () => this.paintActiveListItems()) )
      })
    } else if(ele.classList.contains('next-active-filter-item')) {
      // Remove next active filter item class
      this.setState({ filterObjChange: true, filterObject: {...this.state.filterObject, [stateKey]: ''}}, () => ele.classList.remove('next-active-filter-item'))
    } else {
       // Add active filter item class and remove it from rest items
      listItems.forEach( li => {
        li === ele ? li.classList.add('next-active-filter-item') : li.classList.remove('next-active-filter-item')})
      this.setState({filterObjChange: true, filterObject: {...this.state.filterObject, [stateKey]: value}})
    }
  }

  componentWillMount() {
    const { getLocationDetails,  getSearchedRestaurants, getSearchedCategories, getSearchedEstablishments, getSearchedCuisines } = this.props;
    const wildcard = this.props.location.state ? this.props.match.params.wildcard : this.state.wildcard;
    const cityName = this.props.location.state ? this.props.location.state.cityName : this.state.cityName;
    const cityId = this.props.location.state ? this.props.location.state.cityId : this.state.filterObject.entity_id;
    const categoryId = this.props.location.state ? this.props.location.state.categoryId : this.state.filterObject.category;
     
    this.setState({ 
      pageLoader: true, showContent: false, cityName: cityName, wildcard: wildcard,
      filterObject: { ...this.state.filterObject, 
      category: categoryId, entity_id: cityId } 
    }, () => {
        axios.all([
          getSearchedRestaurants(this.state.filterObject),
          getLocationDetails({ entity_id: cityId }),
          getSearchedCategories(),
          getSearchedEstablishments({ city_id: cityId }),
          getSearchedCuisines({ city_id: cityId })
      ]).then( () => {
        this.setState({ pageLoader: false, showContent: true })
        this.paintActiveListItems()
        } );
    }) 
  }

  componentWillReceiveProps(newProps) {
    const { getSearchedRestaurants } = this.props;

    if( newProps.match.params.wildcard !== this.props.match.params.wildcard 
      || newProps.match.params.city !== this.props.match.params.city ) {
      const wildcard = newProps.match.params.wildcard;
      const categoryId = newProps.location.state.categoryId;
      const cityId = newProps.location.state ? newProps.location.state.cityId: this.state.filterObject.entity_id;
      const cityName = this.props.location.state ? newProps.location.state.cityName : this.state.cityName;

      this.setState({ 
        pageLoader: true, showContent: false,
        cityName: cityName, wildcard: wildcard, 
        filterObject: { ...this.state.filterObject, category: categoryId,
        entity_id: cityId }
      }, () => {
        getSearchedRestaurants(this.state.filterObject)
          .then(() => {
            this.setState({ pageLoader: false, showContent: true, wildcard: this.props.match.params.wildcard })
            this.paintActiveListItems();
          })
      })
    }
  }
  
  renderRestaurantCard(city) {
    const { searchedRestaurants } = this.props;

    return searchedRestaurants.restaurants !== undefined ? 
      <RestaurantCard 
        city= { city }
        restaurants = {searchedRestaurants.restaurants} /> : null;
  }

  capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
  }
  
  render() {
    const { searchedLocationDetails: { top_cuisines }, searchedCategories, searchedEstablishments, searchedCuisines, searchedRestaurants } = this.props;
    const { wildcard, cityName, filterObject: { cityId }, showCuisinesModal, pageLoader, showContent } = this.state;
    let pageCount;
    const urlHome = '/';
    const wildcardCap = this.capitalize(wildcard)
    // console.log(wildcardCap)

    searchedRestaurants ? (
      pageCount = Math.ceil(searchedRestaurants.results_found / this.state.filterObject.count)
    ) : 50
    
    const transitionOptions = {
      in: showCuisinesModal,
      timeout: 300,
      classNames :"modal-fade",
      unmountOnExit: true
    }

    return(
      <div className="browse-by-category-wrapper">
        <Layout 
          showFooter = { showContent }
          urlPath={this.props.match.path}
          city={{ cityName, cityId }} >
          {pageLoader && <PageLoader/>}
          { showContent && 
            <React.Fragment>
              <div className="container">
                <div className="pathway-link" >
                  <Link to={{ pathname: urlHome, state: { cityName, cityId } }} >Home</Link>
                  <span><i className="fas fa-angle-right"></i></span> <span>{cityName} </span>
                  <span><i className="fas fa-angle-right"></i></span> <span>{wildcardCap}</span>
                </div>
                <div className = "title">{wildcardCap} in {cityName}</div>
                <div className = "content-div">
                  <Filters
                    removeCuisineModalItem={this.removeCuisineModalItem}
                    cuisineModalItem = {this.state.cuisineModalItem}
                    handleCuisinesModal={this.handleCuisinesModal}
                    city = {{ cityName, cityId, categoryNameState: wildcardCap }}
                    searchRestaurants = {this.handleOnClickSearchFilter}
                    changeState = {this.handleFilterObjStateChange}
                    allCuisines = {searchedCuisines}
                    topCuisines = {top_cuisines}
                    categories = {searchedCategories}
                    establishments = {searchedEstablishments} 
                  />
                  <ul className="restaurant-list" >
                    {this.renderRestaurantCard({ cityName, cityId })}
                  </ul>
                </div>
                <Pagination
                  handlePageClick={this.handlePaginationPageClick}
                  pageCount={pageCount}
                />
              </div>
              <CSSTransition {...transitionOptions} >
                <CuisinesModal
                  handleCuisinesModal={this.handleCuisinesModal}
                  allCuisines={searchedCuisines}
                />
              </CSSTransition>
            </React.Fragment>
          }
        </Layout>
      </div>
    );
  }
}

function mapStateToProps ({ searchedTerms }) {
  const { searchedRestaurants, searchedLocationDetails, searchedCategories, searchedEstablishments, searchedCuisines } = searchedTerms;
  return {
    searchedLocationDetails,
    searchedRestaurants,
    searchedCategories,
    searchedEstablishments,
    searchedCuisines
  }
}

export default connect(mapStateToProps, { getSearchedRestaurants, getLocationDetails, getSearchedCategories, getSearchedEstablishments, getSearchedCuisines })(RestaurantsCategoryPage)