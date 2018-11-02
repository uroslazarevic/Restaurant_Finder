import React from 'react';
import { Link } from 'react-router-dom';

export default function Filters( { 
  topCuisines,
  categories,
  establishments,
  changeState,
  allCuisines,
  searchRestaurants,
  city 
  } ) {

  return (
    <div className="filters">
      <div className="filters-title">Filters 
        <span onClick={searchRestaurants} >Search<i className="fas fa-search"></i></span>
      </div>

      <div className="sort-by-category">
        <div className="title">Sort by</div>
        <ul data-filter = "sort" className="sort content">
          <li onClick={changeState} className="item" value="rating">Rating <span>- high to low</span></li>
          <li onClick={changeState} className="item" value="cost">Cost<span>- high to low</span></li>
        </ul>
      </div>

      <div className="categories-category">
        <div className="title">Category</div>
        <ul data-filter = "category" className="categories-content">
          {categories !== undefined ? categories.map( category => {

            const { name, id } = category.categories;
            const { cityName, cityId, categoryNameState } = city;
            const splitedCityName = cityName.split(' ').join('-');
            const categoryName = name.split(' ').join('-');

            return (
              <Link key={id} to={{ pathname:`/${splitedCityName}/${categoryName}`, state: { categoryName, cityName, categoryId: id , cityId } }} >
                <li onClick={changeState}  className={`item ${categoryNameState === name ? 'active-filter-item' : '' }`} value={id}>{name}</li>
              </Link>
            )
          } ) : <div>List of categories...</div>} 
        </ul>
      </div>
      {/* className="item ${this.state.activeCat == name ? 'active' : ''}" */}
      <div className="top-cuisines-category">
        <div className="title">Cuisines</div>
        <ul data-filter = "cuisines" className="cuisines content">

          { allCuisines && topCuisines ?

           allCuisines.reduce((acc, cuisineELe,) => {
            const { cuisine_id, cuisine_name } = cuisineELe.cuisine;

            topCuisines.forEach( topCuisineEle => {
              // Assign ids to top cuisine elements
              cuisine_name === topCuisineEle && acc.push({ id: cuisine_id, name: cuisine_name })
            } )
            return acc;
          }, [])
          .map(topCuisine => {
              const { id, name } = topCuisine;
              return <li onClick={changeState} key={id} className="item" value={id}>{name}</li>
          }): <div>List of top-cuisines...</div> } 
          <li className="item all-cuisines">See all cuisines</li>
        </ul>
      </div>

      <div className="establishments-category">
        <div className="title">Establishment Type</div>
        <ul data-filter = "establishment_type" className="establishment_type content">
          {establishments !== undefined ? establishments.map( ele => {
            const { id, name} = ele.establishment
            return <li onClick={changeState} key={id} className="item" value={id}>{name}</li>
          } ) : <div>List of establishment types...</div>} 
        </ul>
      </div>

      <div className="order-by-category">
        <div className="title">Order by</div>
        <ul data-filter = "order" className="order content">
          <li onClick={changeState} className="item" value="asc">Ascending order</li>
          <li onClick={changeState} className="item" value="desc">Descending order</li>
        </ul>
      </div>

    </div>
  );
}