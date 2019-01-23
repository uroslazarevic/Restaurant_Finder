import React, { Component } from 'react';
import { AddedResList } from 'components'

export default class AddCollectionResForm extends Component {

  handleRemoveRes(place) {
    return e => {
      e.preventDefault();
      this.setState({ notMatch : true }, () => this.props.handleRestaurants(place) )
    }
  }
  
  render () {
    const { handleActiveForm, addedRestaurants } = this.props;

    return (
      <React.Fragment>
        <form className="add-collection-res-form">
          <div className="add-coll-ress-btns">
            <div
              onClick= { handleActiveForm }
              data-ref-to="addCollectionResForm"
              className="add-restaurants"
            >
              Add restaurants
            </div>
            <div
              onClick= { handleActiveForm }
              data-ref-to="inCollectionResForm"
              className="in-collection active-btn"
            >
              in Collection {addedRestaurants.length > 0 && `(${addedRestaurants.length})`}
            </div>
          </div>
          <AddedResList 
            addedRestaurants = { addedRestaurants } 
            handleRemoveRes = { this.handleRemoveRes.bind(this)} 
          />
        </form>
      </React.Fragment>
    )
  }
}
