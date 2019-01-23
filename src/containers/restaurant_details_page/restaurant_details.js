import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

// Import Actions
import { getRestaurantDetails, getRestaurantReviews } from 'actions';

// Import Components
import { Layout, ResContentDisplay, PageLoader, ReviewsLoader } from 'components';


class RestaurantDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      cityName: 'Bratislava',
      cityId: '111',
      resName: 'Soho',
      pageLoader: false,
      reviewsLoader: false,
      showContent: false,
      showNotification: false,
      multiple : 1,
    }

    this.debounce = null;
    this.handleReviewsFetchScroll = this.handleReviewsFetchScroll.bind(this);
  }

  handleReviewsFetchScroll() {
    const { getRestaurantReviews } = this.props;

    clearTimeout(this.debounce); 
    this.debounce = setTimeout(() => {
      if(document.querySelector('.restaurant-reviews-card')) {
        const containerHeight = document.querySelector('.layout').getBoundingClientRect().height;
        const footerHeight = document.querySelector('.footer').getBoundingClientRect().height
        const bottomScrolledViewpoint = window.scrollY + window.innerHeight;
        const scrollHeight = containerHeight - bottomScrolledViewpoint - footerHeight;
        
        if (scrollHeight < 10 && this.state.showNotification === false ) {
          this.setState({ multiple: this.state.multiple + 1, reviewsLoader: true }, () => {
            document.body.style.overflow = 'hidden';
              getRestaurantReviews({ res_id: this.props.location.state.resId, count: 5* (this.state.multiple) })
              .then(() => this.setState({ reviewsLoader: false, showNotification: true }, () => {
                document.body.style.overflow = 'initial';
              }))
          })
        } else if(scrollHeight > 60) {
          this.setState({ showNotification: false } )
        }
      }
    }, 150)
  }

  componentWillMount() {
    document.addEventListener('scroll', this.handleReviewsFetchScroll)
    const { getRestaurantDetails,getRestaurantReviews } = this.props;
    this.setState({ 
      pageLoader: true,
      showContent: false,
      cityName: this.props.location.state.cityName,
      cityId: this.props.location.state.cityId,
      resName: this.props.location.state.resName
     }, () => {
       axios.all([
         getRestaurantDetails({ res_id: this.props.location.state.resId }),
         getRestaurantReviews({ res_id: this.props.location.state.resId, count: 5 })
       ]).then(() => this.setState({ pageLoader: false, showContent: true }))
     })
  }

  componentWillReceiveProps(newProps) {
    const { getRestaurantDetails,getRestaurantReviews } = this.props;

    newProps.location.state.resId !== this.props.location.state.resId && (
      this.setState({ 
        pageLoader: true,
        showContent: false,
        cityName: newProps.location.state.cityName,
        cityId: newProps.location.state.cityId,
        resName: newProps.location.state.resName
       }, () => {
         axios.all([
           getRestaurantDetails({ res_id: newProps.location.state.resId }),
           getRestaurantReviews({ res_id: newProps.location.state.resId, count: 5 })
         ]).then(() => this.setState({ pageLoader: false, showContent: true }))
       })
    )
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleReviewsFetchScroll);
  }

  render() {
    const { cityName, cityId, resName, showNotification, reviewsLoader, pageLoader, showContent } = this.state;
    const { searchedRestaurantDetails, searchedRestaurantReviews } = this.props;
    const urlHome = '/';
    const splitedCityName = cityName.split(' ').join('-');
    const urlRestaurants = `/${splitedCityName}/restaurants`;

    return (
      <div className="restaurant-details">
        <Layout showFooter = { showContent } urlPath={ this.props.match.path } city={{ cityName, cityId }} >
        { pageLoader && <PageLoader />}
        { showContent && <div className="restaurant-details-content container">
            <div className="pathway-link container" >
              <Link to={{ pathname: urlHome, state: { cityName, cityId } }} >Home</Link> 
              <span> <i className="fas fa-angle-right"></i></span><span> {cityName}</span>
              <span> <i className="fas fa-angle-right"></i> </span>  
              <Link to={{ pathname: urlRestaurants.toLowerCase(), state: { cityName, cityId } }} >Restaurants</Link>
              <span> <i className="fas fa-angle-right"></i></span><span> {resName}</span>
            </div>
            <ResContentDisplay 
              resInfo = { searchedRestaurantDetails } 
              resReviews = { searchedRestaurantReviews }
              showWarning = { this.state.showWarning } 
            />
            { reviewsLoader && <ReviewsLoader />}
            <CSSTransition
              in={showNotification}
              timeout={200}
              classNames="notification"
              unmountOnExit >
              <div className="notification">No Reviews Available... :/</div>
            </CSSTransition>
          </div>}
        </Layout>
      </div>
    )
  }
}

function mapStateToProps ({ searchedTerms }) {
  const { searchedRestaurantDetails, searchedRestaurantReviews } = searchedTerms;
  return {
    searchedRestaurantDetails,
    searchedRestaurantReviews
  }
}

export default connect(mapStateToProps, { getRestaurantDetails, getRestaurantReviews })(RestaurantDetails)