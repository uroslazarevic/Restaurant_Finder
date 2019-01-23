import React from 'react';
import { Link } from 'react-router-dom';
import collectionsImg from '../../images/collections_img.webp'

export default ({ collections, city, urlPath, filterOutId, userCollection }) => {
    const { cityName, cityId } = city;
    const splitedCityName = cityName.split(' ').join('-');
    const url = `/${splitedCityName}/collections`;
    
  return (
    <div className="container">
      {urlPath && <div className="collections-header">
        <div className="collections-title">Collections</div>
        <div className="collections-subtitle">Explore Curated lists of top restaurants, cafes in {city.cityName}, based on trends</div>
      </div>}
        <div className="collections-list">
          {createCollectionItems(collections, city, filterOutId, userCollection)}
          {urlPath && 
          <Link 
            to={{ pathname: url.toLowerCase(), state: { cityName, cityId } }} 
            className="collection-item-all">
            <img src={collectionsImg} alt="Slika kolekcija" />
            <div className="collections-link">All collections in Bratislava</div>
          </Link>}
        </div>
    </div>
  );
}

function createCollectionItems(collections, city, filterOutId, userCollection) {
  const { cityName, cityId } = city;
  let collectionsArray;
  // If filterOutId argument is provided, create new array
  collectionsArray = filterOutId ? collections.filter( collection => {
    return collection.collection.collection_id !== filterOutId
  } ) : collections

  return collectionsArray.map(collection => {
    const { title, description, image_url, collection_id } = collection.collection;
    const splitedCityName = cityName.split(' ').join('-');
    const collectionTitle = title.split(' ').join('-')
    const url = `/${splitedCityName}/collections/${collectionTitle}`;
   
    return (
      <Link 
        key={collection_id} 
        className="collection-item"
        to={{ 
          pathname: url.toLowerCase(), 
          state: {
            cityName,
            cityId,
            collectionId: collection_id,
            collectionName: title,
            userCollection: userCollection ? { restaurants: collection.collection.restaurants, personalCollection: collection } : null
          }
        }} >
        <img src= {image_url} alt="" />
        <div className="about-item">
          <div className="title">{title}</div>
          <div className="description">{description}</div>
        </div>
      </Link>
    )
  })
}