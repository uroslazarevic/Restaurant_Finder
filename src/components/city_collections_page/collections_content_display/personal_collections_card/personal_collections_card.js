import React from 'react';

import personalEmpty from '../../../../images/my_collection_empty.png'
import { Collections } from 'components'

export default ({ personalCollections, city }) => {

  if(personalCollections.length !== 0) {
    return (
      <div className="collections" >
        <Collections 
          collections={ personalCollections } 
          city= { city } 
          userCollection = { true }
        />
      </div>
    )
  }
  
  return (
    <div className="personal-coll container">
      <img src= {personalEmpty} alt="" />
      <div className="filling-in">
        Got favorite dessert places? Bars? Date spots? 
        <br></br>
        Login to create your very own Collections!
      </div>
    </div>
  )
}