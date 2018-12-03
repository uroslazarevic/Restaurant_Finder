import React from 'react';

export default ({ 
  collectionsArray,
  requiredCollectionId,
  handleExecCommandOnClick,
  handleCopyUrlOnCopy,
  showTooltip
     }) => {

  if( collectionsArray !== undefined )  {
    const requiredCollection = collectionsArray.filter( collectionItem => {
     return collectionItem.collection.collection_id === requiredCollectionId
    } ).reduce((acc, collection) => {
      acc = collection.collection
      return acc;
    }, null);

    const { description, image_url, res_count, share_url, title, url } = requiredCollection;

    return (
      <div className="collection-details-card">
        <div className="collection-header">
          <div className="bg-coll-image" style={{ backgroundImage:`url("${image_url}")` }} ></div>
          <div className= "collection-url">
            <div className="show-tooltip">
             {showTooltip && <span className="tooltipText">Link copied to clipboard!</span>}
              <div 
                onClick = { handleExecCommandOnClick } 
                onCopy = { handleCopyUrlOnCopy } 
                aria-label="copy" 
                className="copy-url">
                {url}
              </div>
            </div>
            <a href={share_url} target="_blank" className="share-collection"><span><i className="fas fa-share-square"></i></span>Share</a>
          </div>
        </div>
        <div className="collection-content">
          <div className="title">{title}</div>
          <div className="description">{description}</div>
          <div className="restaurants-offering-service">{res_count} Places</div>
          <button className="save-collection">Save Collection</button>
        </div>
      </div>
    )
  }

  return <div>Collection Details Card</div>
}