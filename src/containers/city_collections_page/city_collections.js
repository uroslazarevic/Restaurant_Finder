import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import Actions
import { getSearchedCollections } from 'actions';
// Import Components
import { Layout, PageLoader, CollContentDisplay } from 'components'; 

class CityCollections extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      cityName: 'Bratislava',
      cityId: 111,
      entity_type: 'city',
      pageLoader: false,
      showContent: false,
     }
  }

  componentWillReceiveProps(newProps) {
    const { getSearchedCollections } = this.props;
    if(newProps.location.state.cityId !== this.props.location.state.cityId) {
      const { cityName, cityId } = newProps.location.state;

        this.setState({ cityName, cityId, pageLoader: true, showContent: false }, () =>  {
          getSearchedCollections({ 
            city_id: cityId, 
            count : '30' 
          }).then(() => this.setState({ pageLoader: false, showContent: true }))
        })
    }
  }

  componentWillMount() {
    const { getSearchedCollections } = this.props;
    const { cityName, cityId } = this.props.location.state;

    this.setState({ cityId, cityName, pageLoader: true, showContent: false }, () =>  {
      getSearchedCollections({city_id: cityId, count : '30' })
        .then( () =>this.setState({ pageLoader: false, showContent: true }))
    })
  }

  render() {
    const { searchedCollections, savedCollections } = this.props;
    const { cityName, cityId, pageLoader, showContent } = this.state;
    const urlHome = '/';
    // console.log('savedCollections:', savedCollections)
    return (
      <div className="city-collections">
        <Layout showFooter = { showContent } urlPath={ this.props.match.path } city={{ cityName, cityId }}>
          { pageLoader && <PageLoader />}
          { showContent && <div className="city-collections-content">
              <div className="pathway-link container" >
                <Link to={{ pathname: urlHome, state: { cityName, cityId } }} >
                  Home
                </Link> 
                <span> <i className="fas fa-angle-right"></i></span><span> {cityName}</span>  
                <span> <i className="fas fa-angle-right"></i></span><span> Collections</span>
              </div>
              <div className="info container">
                <div className="left">
                  <div className="city-collections-title">Collections - {cityName}</div>
                  <div className="city-collections-subtitle" >Create and browse lists of the finest restaurants</div>
                </div>
                <button className="right">Create Collection</button>
              </div>
              <CollContentDisplay 
                savedCollections = { savedCollections }
                collections = { searchedCollections }
                city={{ cityName, cityId }} />
            </div> }
        </Layout> 
      </div>
    )
  }
}

function mapStateToProps({ searchedTerms: { searchedCollections }, collections: { savedCollections } }) {
  return {
    searchedCollections,
    savedCollections
  }
}

export default connect(mapStateToProps, { getSearchedCollections } )(CityCollections);