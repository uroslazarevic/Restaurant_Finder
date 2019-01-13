import React from 'react';

import { Collections } from 'components'

export default ({ collections, city }) => {

  if(collections) {
    return (
      <div className="collections" >
        <Collections 
          collections={ collections } 
          city= { city } 
        />
      </div>
    )
  }

  return <div className="container">Collections not available</div>
}