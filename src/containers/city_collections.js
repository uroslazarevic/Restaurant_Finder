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
    const { searchedCollections } = this.props;
    const { cityName, cityId, pageLoader, showContent } = this.state;
    const urlHome = '/';

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
              <div className="container">
                <div className="city-collections-title">Collections - {cityName}</div>
                <div className="city-collections-subtitle" >Browse list of the finest restaurants collections</div>
              </div>
              <CollContentDisplay collections = { searchedCollections } city={{ cityName, cityId }} />
            </div> }
        </Layout> 
      </div>
    )
  }
}

function mapStateToProps({ searchedTerms }) {
  const { searchedCollections } = searchedTerms;
  return {
    searchedCollections
  }
}

export default connect(mapStateToProps, { getSearchedCollections } )(CityCollections);