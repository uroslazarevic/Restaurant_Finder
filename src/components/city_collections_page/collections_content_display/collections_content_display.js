import React, { Component } from 'react';

import { HandpickedCollCard, NavigationCollCard, FollowingCollCard, SavedCollCard, PersonalCollCard } from 'components';

export default class CollContentDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayView: 'handpicked',
    };

    this.updateDisplayView = this.updateDisplayView.bind(this);
  }

  updateDisplayView(e) {
    const value = e.target.getAttribute('value');
    this.setState({ displayView: value });
  }

  render() {
    const { displayView } = this.state;

    return (
      <div className="coll-content-display">
        <NavigationCollCard currentDisplayView={displayView} updateDisplayView={this.updateDisplayView} />
        {displayView === 'handpicked' && <HandpickedCollCard />}
        {displayView === 'following' && <FollowingCollCard />}

        {displayView === 'saved' && <SavedCollCard />}
        {displayView === 'personal' && <PersonalCollCard />}
      </div>
    );
  }
}
