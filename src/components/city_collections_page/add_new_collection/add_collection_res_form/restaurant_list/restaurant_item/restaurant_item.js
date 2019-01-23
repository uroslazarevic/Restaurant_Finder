import React, { Component } from 'react';

export default class ResItem extends Component {
  constructor(props) {
    super(props);

    this.state = { notMatch: true }

    this.handleAddRes = this.handleAddRes.bind(this);
    this.handleRemoveRes = this.handleRemoveRes.bind(this);
  }

  handleAddRes(place) {
    return e => {
      e.preventDefault();
      this.setState({ notMatch : false }, () => this.props.handleRestaurants.addRes(place) )
    }
  }

  handleRemoveRes(place) {
    return e => {
      e.preventDefault();
      this.setState({ notMatch : true }, () => this.props.handleRestaurants.removeRes(place) )
    }
  }

  componentWillMount() {
    const { id } = this.props.resItem.restaurant;
    this.props.addedRestaurants.forEach(res => res.restaurant.id === id && this.setState({ notMatch : false }))
  }

  render() {
    const { name, location: { locality } } = this.props.resItem.restaurant;
    const { notMatch } = this.state;
    
    return (
      <li className="restaurant">
        <span>{name}, {locality}</span>
       { notMatch ? 
        <button 
          onClick = { this.handleAddRes(this.props.resItem) } 
          className="add-res">Add</button>
        : <button 
            onClick = { this.handleRemoveRes(this.props.resItem) } 
            className="remove-res">Remove</button> 
        }
      </li>
    )
  }
}