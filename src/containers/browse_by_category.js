import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Import Actions
import { getSearchedPlaces, getLocationDetails, getSearchedCategories, getSearchedEstablishments, getSearchedCuisines } from 'actions';
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
    this.props.getSearchedPlaces( this.state.filterObject )
      .then(() => {
        this.paintActiveListItems()
      });
  }
  

  paintActiveListItems() {
    const listItems = document.querySelectorAll('.filters .content li')
    listItems.forEach( li => {
      const stateKey = li.parentNode.getAttribute('data-filter');
      const liValue = li.getAttribute('value');
      console.log()
      if(liValue == this.state.filterObject[stateKey]) {
        li.className = ('item active-filter-item');
      } else {
        li.className = ('item');
      }
    })
  }

  handleFilterObjStateChange(e) {
    console.log('eventTarget: ',e.target)
    const value = e.target.getAttribute('value');
    const stateKey = e.target.parentNode.getAttribute('data-filter');
    const listItems = document.querySelectorAll(`.${stateKey} li`);

    if(e.target.classList.contains('active-filter-item') && e.target.parentNode.getAttribute('data-filter')) {
      // Remove current active filter item class
      e.target.classList.remove('active-filter-item');
      this.setState({ filterObject: {...this.state.filterObject, [stateKey]: ''}}, () => {
        this.props.getSearchedPlaces( this.state.filterObject )
      })
    }
    else if(e.target.classList.contains('next-active-filter-item')) {
      // Remove next active filter item class
      e.target.classList.remove('next-active-filter-item')
      this.setState({ filterObject: {...this.state.filterObject, [stateKey]: ''}})
    } else {
       // Add active filter item class and remove it from rest items
      listItems.forEach( li => {
        li === e.target ? li.classList.add('next-active-filter-item') : li.classList.remove('next-active-filter-item')
      })
      this.setState({ filterObject: {...this.state.filterObject, [stateKey]: value}})
    }
  }

  componentWillMount() {
    const { getLocationDetails,  getSearchedPlaces, getSearchedCategories, getSearchedEstablishments, getSearchedCuisines } = this.props;
    // State params
    const { entity_id, category, sort, order } = this.state.filterObject
    
    if( this.props.location.state ) {
      // Props params
      const {categoryId, cityId} = this.props.location.state;

      this.setState({ filterObject: { ...this.state.filterObject, 
        category: categoryId, entity_id: cityId } }, () => {
          axios.all([
            getSearchedPlaces({ entity_id: cityId, category: categoryId, sort, order, count: 15}),
            getLocationDetails({ entity_id: cityId }),
            getSearchedCategories(),
            getSearchedEstablishments({ city_id: cityId }),
            getSearchedCuisines({ city_id: cityId })
        ]).then( () => this.paintActiveListItems() );
      }) 
    } else {
        axios.all([
          getSearchedPlaces({ entity_id, category, sort, order, count: 15}),
          getLocationDetails({ entity_id }),
          getSearchedCategories(),
          getSearchedEstablishments({ city_id: entity_id }),
          getSearchedCuisines({ city_id: entity_id })
        ]).then( () => this.paintActiveListItems() );
    }
  }

  componentWillReceiveProps(newProps) {
    const { getSearchedPlaces } = this.props;
    const newCategoryId = newProps.location.state.categoryId
    const oldCategoryId = this.props.location.state.categoryId

    newCategoryId !== oldCategoryId ? 
      this.setState({ filterObject: { ...this.state.filterObject, category: newCategoryId }}, () => {
        getSearchedPlaces(this.state.filterObject).then(() => {
          this.setState({ categoryName: newProps.location.state.categoryName })
          this.paintActiveListItems();
        })
      }) : null
  }
  
  renderRestaurantCard() {
    const { searchedPlaces } = this.props;
    return searchedPlaces.restaurants !== undefined ? <RestaurantCard restaurants = {searchedPlaces.restaurants} /> : null;
  }
  
  render() {

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
        <Layout>
          <div className="container">
            <div className="pathway-link" >
              <Link to={`/`} >Home</Link> <span><i className="fas fa-angle-right"></i></span> <span>{category_Name}</span>
            </div>
            <div className = "title">{category_Name} in {city_Name}</div>
            <div className = "content-div">
              <Filters 
                city = {{ cityName:city_Name, cityId:city_Id, categoryNameState: category_Name }}
                searchRestaurants = {this.handleOnClickRestaurantsSearch}
                changeState = {this.handleFilterObjStateChange}
                allCuisines = {searchedCuisines}
                topCuisines = {top_cuisines}
                categories = {searchedCategories}
                establishments = {searchedEstablishments} 
              />
              <ul className="restaurant-list" >{this.renderRestaurantCard()}</ul>
              {/* <div className="other-categories">Other Categories</div> */}
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps ({ searchedTerms }) {
  const { searchedPlaces, searchedLocationDetails, searchedCategories, searchedEstablishments, searchedCuisines } = searchedTerms;
  return {
    searchedLocationDetails,
    searchedPlaces,
    searchedCategories,
    searchedEstablishments,
    searchedCuisines
  }
}

export default connect(mapStateToProps, { getSearchedPlaces, getLocationDetails, getSearchedCategories, getSearchedEstablishments, getSearchedCuisines })(BrowseByCategory)