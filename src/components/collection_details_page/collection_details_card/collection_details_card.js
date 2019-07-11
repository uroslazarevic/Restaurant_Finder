import React, { Component } from 'react';

import { user_Collections } from './../../../shared/data_naming/data_naming'
export default class CollectionDetailsCard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      saved: false,
      requiredCollection: '',
      showTooltip: false
    }

    this.handleExecCommandOnClick = this.handleExecCommandOnClick.bind(this);
    this.handleSavedCollections = this.handleSavedCollections.bind(this);
  }

  handleExecCommandOnClick() {
    this.setState({ showTooltip: true }, () => {
      document.execCommand('copy');
    })
  }

  handleCopyUrlOnCopy(event) {
    event.preventDefault();
    event.clipboardData && event.clipboardData.setData("text/plain", event.target.textContent);
  }

  handleSavedCollections(requiredCollection) {
    const { saveCollectionInDB, removeCollectionFromDB } = this.props;
    this.state.saved ? this.setState({ saved: false },
      () => removeCollectionFromDB(requiredCollection,  
        { 
          DBEndpoint: [user_Collections.saved.DBEndpoint],
          state: [user_Collections.saved.state]
        }
      ))
    : this.setState({ saved: true }, () => saveCollectionInDB(requiredCollection,
      { 
        DBEndpoint: [user_Collections.saved.DBEndpoint],
        state: [user_Collections.saved.state]
      }
    ))
  }

  componentWillMount() {
    const { savedCollections, requiredCollectionId } = this.props;

    if(savedCollections.length !== 0 ) {
      const indexFound = savedCollections.findIndex( ele =>  ele.collection.collection_id === requiredCollectionId );
      indexFound !== -1 ? this.setState({ saved: true }): this.setState({ saved: false });
    } 
  }
  
  render() {
    const { collectionsArray, requiredCollectionId, isAuth, setVisibleFM } = this.props;
    const { saved, showTooltip } = this.state;

    if( collectionsArray !== undefined )  {
      const requiredCollection = collectionsArray.filter( collectionItem => {
        return collectionItem.collection.collection_id === requiredCollectionId
      } ).reduce((acc, collection) => {
        acc = collection;
        return acc;
      }, null)
      
      const {  description, image_url, res_count, share_url, title, url } = requiredCollection.collection;

      return (
        <div className="collection-details-card">
          <div className="collection-header">
            <div className="bg-coll-image" style={{ backgroundImage:`url("${image_url}")` }} ></div>
            <div className= "collection-url">
              <div className="show-tooltip">
                {showTooltip && <span className="tooltipText">Link copied to clipboard!</span>}
                <div 
                  onClick = { this.handleExecCommandOnClick } 
                  onCopy = { this.handleCopyUrlOnCopy } 
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
            { !isAuth ? 
              <button 
                onClick = { setVisibleFM } 
                className="coll-btn save-collection"
              >
                Save Collection
              </button>
              : 
              saved ? 
              <button 
                onClick = {() => this.handleSavedCollections(requiredCollection) } 
                className="coll-btn remove-collection "
              >Remove  From Saved</button> 
              : 
              <button 
                onClick = { () => this.handleSavedCollections(requiredCollection) } 
                className="coll-btn save-collection"
              >Save Collection</button>
            }
          </div>
        </div>
      )
    }

    return <div>Collection Details Card</div>
  }
}