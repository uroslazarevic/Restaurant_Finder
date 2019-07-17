import React, { Component } from 'react';

export default class CuisinesModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInputValue: '',
      showModalMessage: false,
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }

  handleInputValue(e) {
    this.setState({ searchInputValue: e.target.value }, () => {
      document.querySelector('.all-cuisines-container ul .cuisine-item')
        ? this.setState({ showModalMessage: false })
        : this.setState({ showModalMessage: true });
    });
  }

  render() {
    return (
      <div className="all-cuisines-container" onClick={this.props.handleCuisinesModal}>
        <div className="all-cuisine-content">
          <label>
            Select a cuisine
            <span className="hide-cuisine-modal" onClick={this.props.handleCuisinesModal}>
              <i className="fas fa-times" />
            </span>
          </label>
          <div className="search-cuisine">
            <input
              onChange={this.handleInputValue}
              value={this.state.searchInputValue}
              type="text"
              placeholder="Start typing to search..."
            />
          </div>
          <ul className="all-cuisine-list">
            {this.props.allCuisines.map(cuisine => {
              const { cuisine_id, cuisine_name } = cuisine.cuisine;
              const regExp = new RegExp(`^${this.state.searchInputValue}`, 'ig');
              return cuisine_name.match(regExp) ? (
                <li
                  onClick={e => this.props.handleCuisinesModal(e, { cuisineId: cuisine_id, cuisineName: cuisine_name })}
                  key={cuisine_id}
                  className="cuisine-item"
                >
                  {cuisine_name}
                </li>
              ) : null;
            })}
            {this.state.showModalMessage && <li className="modal-message">No match found</li>}
          </ul>
        </div>
      </div>
    );
  }
}
