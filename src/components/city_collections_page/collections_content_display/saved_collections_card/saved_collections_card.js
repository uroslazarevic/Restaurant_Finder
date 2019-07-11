import React from 'react';

import { Collections } from 'components'

export default ({ savedCollections, city }) => {

  if(savedCollections.length !== 0) {
    return (
      <div className="collections" >
        <Collections 
          collections={ savedCollections } 
          city= { city } 
        />
      </div>
    )
  }
  
  return (
    <div className="saved-coll container">
      <div className="filling-in">
        Login & bookmark collections you love! 
        <br />
        They'll appear here.
      </div>
    </div>
  )
}