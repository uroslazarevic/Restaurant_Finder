import React from 'react';

export default ({ updateDisplayView, currentDisplayView }) => {
  return (
    <nav className="coll-navigation container">
      <ul>
        <li onClick={updateDisplayView} value="handpicked" className={`nav-item ${currentDisplayView === 'handpicked' ? 'active-nav-item': ''}`} >Handpicked</li>
        <li onClick={updateDisplayView} value="following" className={`nav-item ${currentDisplayView === 'following' ? 'active-nav-item': ''}`} >Following</li>
        <li onClick={updateDisplayView} value="saved" className={`nav-item ${currentDisplayView === 'saved' ? 'active-nav-item': ''}`} >Saved Collections</li>
        <li onClick={updateDisplayView} value="personal" className={`nav-item ${currentDisplayView === 'personal' ? 'active-nav-item': ''}`} >My Collections</li>
      </ul>
    </nav>  
  )
}