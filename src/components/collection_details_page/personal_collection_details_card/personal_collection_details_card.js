import React, { Component } from 'react';

import { user_Collections } from './../../../shared/data_naming/data_naming';
export default class PersonalCollectionDetailsCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTooltip: false,
      saved: true,
    };

    this.handleExecCommandOnClick = this.handleExecCommandOnClick.bind(this);
    this.handleSavedCollections = this.handleSavedCollections.bind(this);
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

  handleSavedCollections(personalCollection) {
    const { saveCollectionInDB, removeCollectionFromDB } = this.props;

    this.state.saved
      ? this.setState({ saved: false }, () =>
          removeCollectionFromDB(personalCollection, {
            DBEndpoint: [user_Collections.personal.DBEndpoint],
            state: [user_Collections.personal.state],
          })
        )
      : this.setState({ saved: true }, () =>
          saveCollectionInDB(personalCollection, {
            DBEndpoint: [user_Collections.personal.DBEndpoint],
            state: [user_Collections.personal.state],
          })
        );
  }

  render() {
    const { showTooltip, saved } = this.state;
    const { personalCollection } = this.props;
    const {
      description,
      image_url,
      res_count,
      title,
      share_url,
      tags,
    } = personalCollection.collection;

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
                {share_url}
              </div>
            </div>
            <div className="share-collection">
              <span>
                <i className="fas fa-share-square" />
              </span>
              Share
            </div>
          </div>
        </div>
        <div className="collection-content">
          <div className="title">{title}</div>
          <div className="description">{description}</div>
          <div className="tags">{tags}</div>
          <div className="restaurants-offering-service">{res_count} Places</div>
          {saved ? (
            <button
              onClick={() => this.handleSavedCollections(personalCollection)}
              className="coll-btn remove-collection "
            >
              Remove From Saved
            </button>
          ) : (
            <button
              onClick={() => this.handleSavedCollections(personalCollection)}
              className="coll-btn save-collection"
            >
              Save Collection
            </button>
          )}
        </div>
      </div>
    );
  }
}
