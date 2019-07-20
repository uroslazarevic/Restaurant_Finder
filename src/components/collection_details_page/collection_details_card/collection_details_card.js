import React, { Component } from 'react';

import { CollectionDetailsContext } from 'containers/contexts';
class CollectionDetailsCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saved: false,
      requiredCollection: '',
      showTooltip: false,
    };

    this.handleExecCommandOnClick = this.handleExecCommandOnClick.bind(this);
  }

  handleExecCommandOnClick() {
    this.setState({ showTooltip: true }, () => {
      document.execCommand('copy');
    });
  }

  handleCopyUrlOnCopy(event) {
    event.preventDefault();
    event.clipboardData && event.clipboardData.setData('text/plain', event.target.textContent);
  }

  handleSavedCollections = async requiredCollection => {
    const { saveCollection, removeCollection } = this.context;
    try {
      if (this.state.saved) {
        const { collection_id } = requiredCollection.collection;
        await removeCollection(collection_id);
        return this.setState({ saved: false });
      }
      requiredCollection.collection.type = 'saved';
      requiredCollection.collection.tags = '';
      await await saveCollection(requiredCollection.collection);
      this.setState({ saved: true });
    } catch (err) {
      return;
    }
  };

  componentDidMount() {
    const collectionDetails = this.context;
    const { requiredCollectionId, collections } = collectionDetails;
    const savedCollections = collections.reduce((acc, coll) => {
      if (coll.type === 'saved') {
        acc.push({ collection: coll });
      }
      return acc;
    }, []);
    if (savedCollections.length !== 0) {
      const indexFound = savedCollections.findIndex(ele => ele.collection.collection_id === requiredCollectionId);
      indexFound !== -1 ? this.setState({ saved: true }) : this.setState({ saved: false });
    }
  }

  render() {
    const { saved, showTooltip } = this.state;
    return (
      <CollectionDetailsContext.Consumer>
        {collectionDetails => {
          const { searchedCollections, isAuth, setVisibleFM, requiredCollectionId } = collectionDetails;

          if (searchedCollections) {
            const requiredCollection = searchedCollections
              .filter(collectionItem => {
                return collectionItem.collection.collection_id === requiredCollectionId;
              })
              .reduce((acc, collection) => {
                acc = collection;
                return acc;
              }, null);

            const { description, image_url, res_count, share_url, title, url } = requiredCollection.collection;

            return (
              <div className="collection-details-card">
                <div className="collection-header">
                  <div className="bg-coll-image" style={{ backgroundImage: `url("${image_url}")` }} />
                  <div className="collection-url">
                    <div className="show-tooltip">
                      {showTooltip && <span className="tooltipText">Link copied to clipboard!</span>}
                      <div
                        onClick={this.handleExecCommandOnClick}
                        onCopy={this.handleCopyUrlOnCopy}
                        aria-label="copy"
                        className="copy-url"
                      >
                        {url}
                      </div>
                    </div>
                    <a href={share_url} target="_blank" rel="noopener noreferrer" className="share-collection">
                      <span>
                        <i className="fas fa-share-square" />
                      </span>
                      Share
                    </a>
                  </div>
                </div>
                <div className="collection-content">
                  <div className="title">{title}</div>
                  <div className="description">{description}</div>
                  <div className="restaurants-offering-service">{res_count} Places</div>
                  {!isAuth ? (
                    <button onClick={setVisibleFM} className="coll-btn save-collection">
                      Save Collection
                    </button>
                  ) : saved ? (
                    <button
                      onClick={() => this.handleSavedCollections(requiredCollection)}
                      className="coll-btn remove-collection "
                    >
                      Remove From Saved
                    </button>
                  ) : (
                    <button
                      onClick={() => this.handleSavedCollections(requiredCollection)}
                      className="coll-btn save-collection"
                    >
                      Save Collection
                    </button>
                  )}
                </div>
              </div>
            );
          }

          return <div>Collection Details Card</div>;
        }}
      </CollectionDetailsContext.Consumer>
    );
  }
}

CollectionDetailsCard.contextType = CollectionDetailsContext;
export default CollectionDetailsCard;
