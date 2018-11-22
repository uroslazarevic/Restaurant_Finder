import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import Actions
import { getSearchedCollections } from 'actions';
// Import Components
import { Collections, Layout, PageLoader } from 'components'; 

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
    newProps.location.state.cityId !== this.props.location.state.cityId &&
      this.setState({ pageLoader: true, showContent: false }, () =>  {
        getSearchedCollections({ 
          city_id: newProps.location.state.cityId, 
          count : '30' 
        }).then(() => this.setState({ pageLoader: false, showContent: true }))
      })
  }

  componentWillMount() {
    const { getSearchedCollections, cityId } = this.props;
    this.setState({ pageLoader: true, showContent: false }, () =>  {
      getSearchedCollections({city_id: cityId, count : '30' })
        .then( () =>this.setState({ pageLoader: false, showContent: true }))
    })
  }

  renderCollections() {
    const { searchedCollections } = this.props;
    const { cityName, cityId } = this.props.location.state;
    return searchedCollections ? 
    <Collections 
      collections={searchedCollections} 
      city={{ cityName: cityName, cityId: cityId }} 
    />  : <div className="container">Collections not available</div>
  }

  render() {
    let city_Name, city_Id;
    if(this.props.location.state) {
      const { cityName, cityId } = this.props.location.state;
      city_Name = cityName;
      city_Id = cityId
    } else {
      city_Name = this.state.cityName;
      city_Id =this.state.cityId
    }

    return (
      <div className="city-collections">
        <Layout city={{ cityName: city_Name, cityId: city_Id }}>
          {this.state.pageLoader && <PageLoader />}
          {this.state.showContent && <div className="city-collections-content">
              <div className="pathway-link container" >
                <Link to={{ pathname:`/`, state: { cityName: city_Name, cityId: city_Id } }} >
                  Home
                </Link> 
                <span> <i className="fas fa-angle-right"></i></span><span> {city_Name}</span>  
                <span> <i className="fas fa-angle-right"></i></span><span> Collections</span>
              </div>
              <div className="container">
                <div className="city-collections-title">Collections - {city_Name}</div>
                <div className="city-collections-subtitle" >Browse list of the finest restaurants collections</div>
              </div>
              <div className="collections">{this.renderCollections()}</div>
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