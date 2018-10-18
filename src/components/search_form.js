import React, { Component } from 'react';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <form className="search-form" type="submit">
        <div className="search-location">
          <span className="fa-arrow"><i class="fas fa-location-arrow"></i></span>
          <input  placeholder="Please type a location" />
          <span className="fa-caret"><i class="fas fa-caret-down"></i></span>
        </div>
        <div className="search-place">
          <input placeholder="Search for resturants or cuisines..." />
          <span className="fa-search"><i class="fas fa-search"></i></span>
        </div>
        <button className="search-btn">Search</button>
      </form>
    );
  };
}