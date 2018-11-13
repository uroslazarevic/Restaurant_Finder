import React from 'react';
import { Link } from 'react-router-dom';
import collectionsImg from '../images/collections_img.webp'

export default ({ collections, city, urlPath }) => {
    const { cityName, cityId } = city;
    const splitedCityName = cityName.split(' ').join('-');
  return (
    <div className="container">
      {urlPath && <div className="collections-header">
        <div className="collections-title">Collections</div>
        <div className="collections-subtitle">Explore Curated lists of top restaurants, cafes in {city.cityName}, based on trends</div>
      </div>}
        <div className="collections-list">
          {createCollectionItems(collections, city)}
          {urlPath && <div className="collection-item-all">
            <img src={collectionsImg} alt="Slika kolekcija" />
            <Link to={{ pathname:`/${splitedCityName}/collections`, state: { cityName, cityId } }} className="collections-link">All collections in Bratislava</Link>
          </div>}
        </div>
    </div>
  );
}

function createCollectionItems(collections, city) {
  return collections.map(collection => {
    const { title, description, image_url, collection_id } = collection.collection;
    // const { cityName, cityId } = city;
    // const splitedCityName = cityName.split(' ').join('-');
    // <Link to={{ pathname:`/${splitedCityName}/collections`, state: { cityName, cityId, collectionId: collection_id } }}
    // key={collection_id} className="collection-item"></Link>
    return (
      <div key={collection_id} className="collection-item">
        <img src= {image_url} alt="" />
        <div className="about-item">
          <div className="title">{title}</div>
          <div className="description">{description}</div>
        </div>
      </div>
    )
  })
}