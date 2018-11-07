import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Import Actions
import { getSearchedRestaurants, getLocationDetails, getSearchedCategories, getSearchedEstablishments, getSearchedCuisines } from 'actions';
// Import Components
import { RestaurantCard, Filters, Layout, PageLoader, Pagination } from 'components';

class BrowseByCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryName: 'Deliver',
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
        category : 1,
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
      pageLoader: true, showContent: false,
      filterObject: { ...this.state.filterObject, 
      start: (page+1) * this.state.filterObject.count } }, () => {
      this.props.getSearchedRestaurants(this.state.filterObject)
        .then(this.setState({ pageLoader: false, showContent: true, }, () => {
          this.paintActiveListItems()
        }))
    })
  }
  
  handleCuisinesModal(e, cuisine=null) {
    const body = document.querySelector('body');
    e.target.className !== 'all-cuisines-container' && e.target.className !== 'hide-cuisine-modal' ?
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
        .then(this.setState({ pageLoader: false,  showContent: true }))
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
          .then( this.setState({ pageLoader: false, showContent: true }) )
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
    // State params
    const { entity_id } = this.state.filterObject
    
    if( this.props.location.state ) {
      // Props params
      const {categoryId, cityId} = this.props.location.state;
     
      this.setState({ pageLoader: true, showContent: false, filterObject: { ...this.state.filterObject, 
        category: categoryId, entity_id: cityId } }, () => {
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
    } else {
      this.setState({ pageLoader: true, showContent: false }, () => {
        axios.all([
          getSearchedRestaurants(this.state.filterObject),
          getLocationDetails({ entity_id }),
          getSearchedCategories(),
          getSearchedEstablishments({ city_id: entity_id }),
          getSearchedCuisines({ city_id: entity_id })
        ]).then( () => {
          this.setState({ pageLoader: false, showContent: true })
          this.paintActiveListItems()
         } );
      })
    }
  }

  componentWillReceiveProps(newProps) {
    const { getSearchedRestaurants } = this.props;
    const newCategoryId =  newProps.location.state && newProps.location.state.categoryId;
    const oldCategoryId = this.props.location.state.categoryId;
    const newCityId = newProps.location.state.cityId;
    const oldCityId = this.props.location.state.cityId;
    newCategoryId !== oldCategoryId || newCityId !== oldCityId ? (

      // If there is selected next-active-cuisine-iten, on restaurants search, remove active cuisineModalItem
      this.state.cuisineModalItem.cuisineId  !== this.state.filterObject.cuisines ? this.setState({ cuisineModalItem: { cuisineId: '', cuisineName: '' } }): null,
     
      this.setState({ pageLoader: true, showContent: false, filterObject: { ...this.state.filterObject, category: newCategoryId, entity_id: newCityId  }}, () => {
        getSearchedRestaurants(this.state.filterObject).then(() => {
          this.setState({ pageLoader: false, showContent: true, categoryName: newProps.location.state.categoryName })
          this.paintActiveListItems();
        })
      })): null
  }
  
  renderRestaurantCard() {
    const { searchedRestaurants } = this.props;
    return searchedRestaurants.restaurants !== undefined ? <RestaurantCard restaurants = {searchedRestaurants.restaurants} /> : null;
  }
  
  render() {
    console.log('this.props: ', this.props)
    const { searchedLocationDetails: { top_cuisines }, searchedCategories, searchedEstablishments, searchedCuisines, searchedRestaurants } = this.props;
    let pageCount;

    searchedRestaurants ? (
      pageCount = Math.ceil(searchedRestaurants.results_found / this.state.filterObject.count)
    ) : 50

    let category_Name, city_Name, city_Id;
    if(this.props.location.state) {
      const { categoryName, cityName, cityId } = this.props.location.state;
      category_Name = categoryName;
      city_Name = cityName;
      city_Id = cityId
    } else {
      category_Name = this.state.categoryName;
      city_Name = this.state.cityName;
      city_Id =this.state.entity_id
    }

    return(
      <div className="browse-by-category-wrapper">
        <Layout 
          handleCuisinesItemClick={this.handleCuisinesItemClick}
          handleCuisinesModal={this.handleCuisinesModal}
          showModal = { this.state.showCuisinesModal }
          allCuisines = {searchedCuisines}
          city={{ cityName: city_Name, cityId: city_Id }} >
          {this.state.pageLoader && <PageLoader/>}
          {this.state.showContent && <div className="container">
            <div className="pathway-link" >
              <Link to={{ pathname:`/`, state: { cityName: city_Name, cityId: city_Id } }} >Home
              </Link> <span><i className="fas fa-angle-right"></i></span> <span>{category_Name}</span>
            </div>
            <div className = "title">{category_Name} in {city_Name}</div>
            <div className = "content-div">
              <Filters
                removeCuisineModalItem={this.removeCuisineModalItem}
                cuisineModalItem = {this.state.cuisineModalItem}
                handleCuisinesModal={this.handleCuisinesModal}
                city = {{ cityName:city_Name, cityId:city_Id, categoryNameState: category_Name }}
                searchRestaurants = {this.handleOnClickSearchFilter}
                changeState = {this.handleFilterObjStateChange}
                allCuisines = {searchedCuisines}
                topCuisines = {top_cuisines}
                categories = {searchedCategories}
                establishments = {searchedEstablishments} 
              />
              <ul className="restaurant-list" >{this.renderRestaurantCard()}</ul>
            </div>
            <Pagination 
              handlePageClick={this.handlePaginationPageClick}
              pageCount={pageCount}
            />
          </div>}
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

export default connect(mapStateToProps, { getSearchedRestaurants, getLocationDetails, getSearchedCategories, getSearchedEstablishments, getSearchedCuisines })(BrowseByCategory)