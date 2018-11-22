import React from 'react';
import Sticky from 'react-sticky-el';

export default ({ resReviews, updateDisplayView, currentDisplayView }) => {
  return (
    <Sticky>
      <nav className="restaurant-navigation-card">
        <ul>
          <li onClick={updateDisplayView} value="overview" className={`nav-item ${currentDisplayView === 'overview' ? 'active-nav-item': ''}`} >Overview</li>
          <li onClick={updateDisplayView} value="menu" className={`nav-item ${currentDisplayView === 'menu' ? 'active-nav-item': ''}`}>Menu</li>
          <li onClick={updateDisplayView} value="reviews" className={`nav-item ${currentDisplayView === 'reviews' ? 'active-nav-item': ''}`}>Reviews ({resReviews.reviews_count})</li>
          <li onClick={updateDisplayView} value="photos" className={`nav-item ${currentDisplayView === 'photos' ? 'active-nav-item': ''}`}>Photos</li>
        </ul>
      </nav>  
    </Sticky>
  )
}