import React from 'react';

import logoUrl from 'images/zomato-logo.jpg'
import { SearchForm } from 'components';

export default function MainSearchContainer(){
  return (
    <div className="search-container">
      <img src={logoUrl} />
      <div className="city-home-title">Find the best restaurants, cafés, and bars in City</div>
      <SearchForm />
    </div>
  );
};