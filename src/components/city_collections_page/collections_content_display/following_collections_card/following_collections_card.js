import React from 'react';

import noFollowing from '../../../../images/no_following.png'

export default () => {
  
  return (
    <div className="following-coll container">
      <img src = {noFollowing} alt = "no following" />
      <div className="filling-in">
        Nothing here yet 
        <br />
        Collections created by people you follow will appear here.
      </div>
    </div>
  )
}