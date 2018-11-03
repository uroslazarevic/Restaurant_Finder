import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Import Actions
import { getSearchedRestaurants, getLocationDetails, getSearchedCategories, getSearchedEstablishments, getSearchedCuisines } from 'actions';
// Import Components
import { RestaurantCard, Filters, Layout } from 'components';

class BrowseByCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryName: 'Deliver',
      cityName: 'Bratislava',
      
      filterObject:{
        placeTerm: '',
        entity_id : 111,
        entity_type : 'city',
        radius : '' ,
        cuisines : '',
        establishment_type : '',
        collection_id : '',
        category : 1,
        count: 15,
        sort : 'rating',
        order : 'desc'
      },
    }

    this.handleFilterObjStateChange = this.handleFilterObjStateChange.bind(this);
    this.handleOnClickRestaurantsSearch = this.handleOnClickRestaurantsSearch.bind(this);
  }

  handleOnClickRestaurantsSearch() {
    this.props.getSearchedRestaurants( this.state.filterObject )
      .then(() => this.paintActiveListItems());
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
      this.setState({ filterObject: {...this.state.filterObject, [stateKey]: ''}}, () => ele.classList.remove('active-filter-item'))
    } else if(ele.classList.contains('next-active-filter-item')) {
      // Remove next active filter item class
      this.setState({ filterObject: {...this.state.filterObject, [stateKey]: ''}}, () => ele.classList.remove('next-active-filter-item'))
    } else {
       // Add active filter item class and remove it from rest items
      listItems.forEach( li => {
        li === ele ? li.classList.add('next-active-filter-item') : li.classList.remove('next-active-filter-item')})
      this.setState({ filterObject: {...this.state.filterObject, [stateKey]: value}})
    }
    console.log(this.state.filterObject)
  }

  componentWillMount() {
    const { getLocationDetails,  getSearchedRestaurants, getSearchedCategories, getSearchedEstablishments, getSearchedCuisines } = this.props;
    // State params
    const { entity_id, category, sort, order } = this.state.filterObject
    
    if( this.props.location.state ) {
      // Props params
      const {categoryId, cityId} = this.props.location.state;

      this.setState({ filterObject: { ...this.state.filterObject, 
        category: categoryId, entity_id: cityId } }, () => {
          axios.all([
            getSearchedRestaurants({ entity_id: cityId, category: categoryId, sort, order, count: 15}),
            getLocationDetails({ entity_id: cityId }),
            getSearchedCategories(),
            getSearchedEstablishments({ city_id: cityId }),
            getSearchedCuisines({ city_id: cityId })
        ]).then( () => this.paintActiveListItems() );
      }) 
    } else {
        axios.all([
          getSearchedRestaurants({ entity_id, category, sort, order, count: 15}),
          getLocationDetails({ entity_id }),
          getSearchedCategories(),
          getSearchedEstablishments({ city_id: entity_id }),
          getSearchedCuisines({ city_id: entity_id })
        ]).then( () => this.paintActiveListItems() );
    }
  }

  componentWillReceiveProps(newProps) {
    const { getSearchedRestaurants } = this.props;
    const newCategoryId = newProps.location.state.categoryId;
    const oldCategoryId = this.props.location.state.categoryId;
    const newCityId = newProps.location.state.cityId;
    const oldCityId = this.props.location.state.cityId;
    newCategoryId !== oldCategoryId || newCityId !== oldCityId ? 
      this.setState({ filterObject: { ...this.state.filterObject, category: newCategoryId, entity_id: newCityId  }}, () => {
        getSearchedRestaurants(this.state.filterObject).then(() => {
          this.setState({ categoryName: newProps.location.state.categoryName })
          this.paintActiveListItems();
        })
      }): null
  }
  
  renderRestaurantCard() {
    const { searchedRestaurants } = this.props;
    return searchedRestaurants.restaurants !== undefined ? <RestaurantCard restaurants = {searchedRestaurants.restaurants} /> : null;
  }
  
  render() {
    // console.log(this.props.location.state)
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
    const { searchedLocationDetails: { top_cuisines }, searchedCategories, searchedEstablishments, searchedCuisines } = this.props;

    return(
      <div className="browse-by-category-wrapper">
        <Layout city={{ cityName: city_Name, cityId: city_Id }} >
          <div className="container">
            <div className="pathway-link" >
              <Link to={{ pathname:`/`, state: { cityName: city_Name, cityId: city_Id } }} >Home
              </Link> <span><i className="fas fa-angle-right"></i></span> <span>{category_Name}</span>
            </div>
            <div className = "title">{category_Name} in {city_Name}</div>
            <div className = "content-div">
              <Filters
                catStates = {this.state.filterObject}
                city = {{ cityName:city_Name, cityId:city_Id, categoryNameState: category_Name }}
                searchRestaurants = {this.handleOnClickRestaurantsSearch}
                changeState = {this.handleFilterObjStateChange}
                allCuisines = {searchedCuisines}
                topCuisines = {top_cuisines}
                categories = {searchedCategories}
                establishments = {searchedEstablishments} 
              />
              <ul className="restaurant-list" >{this.renderRestaurantCard()}</ul>
            </div>
          </div>
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