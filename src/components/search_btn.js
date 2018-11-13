import React from 'react';
import { Link } from 'react-router-dom'

export default ({ city, urlPath }) => {
  const splitedCityName = city.cityName.split(' ').join('-');
  if(urlPath === '/' || urlPath === '/:city/:wildcard') {
    return (
      <Link to={{ 
        pathname:`/${splitedCityName}/Restaurants`, 
        state: { categoryId: '', cityName: city.cityName, cityId: city.cityId } }} >
      <button className="search-btn">Search</button>
    </Link>
    )
  } else if( urlPath = '/:city/collections' ) {
    return (
      <Link to={{ pathname:`/${splitedCityName}/collections`, state: { cityName: city.cityName, cityId: city.cityId } }} >
        <button className="search-btn">Search</button>
      </Link>
    )
  }
  return <div>Nijedna opcija</div>
    // <Link to={{ pathname:`/${splitedCityName}/Restaurants`, state: { categoryId: '', cityName: setLocationTerm, cityId: entity_id } }} >
    //   <button className="search-btn">Search</button>
    // </Link>
}