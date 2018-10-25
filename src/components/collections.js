import React from 'react';
import collectionsImg from '../images/collections_img.webp'

export default ({ collections, cityName }) => {
  return (
    <div className="container">
      <div className="collections-header">
        <div className="collections-title">Collections</div>
        <div className="collections-subtitle">Explore Curated lists of top restaurants, cafes in {cityName}, based on trends</div>
      </div>
        <div className="collections-list">
          {createCollectionItems(collections)}
          <div className="collection-item-all">
            <img src={collectionsImg} alt="Slika kolekcija" />
            <div className="collections-link">All collections in Bratislava</div>
          </div>
        </div>
    </div>
  );
}

function createCollectionItems(collections) {
  return collections.map(collection => {
    const { title, description, image_url, collection_id } = collection.collection;
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