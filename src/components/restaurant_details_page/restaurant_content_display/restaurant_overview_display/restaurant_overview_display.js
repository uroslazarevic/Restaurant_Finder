import React from 'react';

// Import Components
import { ShowNote, ResContactCard, ResNavigationCard, ResMenuCard, ResPhotosCard, ResReviewsCard } from 'components';

// Import images
import featuredImgAvatar from '../../../../images/restaurant_imgs/res_photos_imgs/featuredImgAvatar.png';
import thumbImgAvatar from '../../../../images/restaurant_imgs/res_photos_imgs/thumbImgAvatar.png';

export default ({ resInfo, resReviews, updateDisplayView, currentDisplayView }) => {
  if (resInfo.length !== 0) {
    const {
      thumb,
      featured_image,
      user_rating: { aggregate_rating, rating_color, votes, rating_text },
      location: { locality, address },
      photos_url,
      name,
      cuisines,
      currency,
      average_cost_for_two,
    } = resInfo;

    const ratingStyle = {
      backgroundColor: `#${rating_color}`,
    };

    return (
      <div className="restaurant-overview-display">
        <div className="restaurant-top-content">
          <div className="main-img">
            <img src={featured_image ? featured_image : featuredImgAvatar} alt="restaurant-img" />
            <a href={photos_url} target="_blank">
              <img src={thumb ? thumb : thumbImgAvatar} alt="restaurant-img" />
              <span className="photos-link">All Photos</span>
            </a>
          </div>
          <div className="info">
            <div className="main-info">
              <div className="title">{name}</div>
              <div className="restaurant-mark">
                <ShowNote text={rating_text}>
                  <div style={ratingStyle} className="rating">
                    <span className="rating-mark">{aggregate_rating}</span>
                    <span className="rating-max-mark"> /5</span>
                  </div>
                </ShowNote>
                <div className="votes">{votes} votes</div>
              </div>
            </div>
            <div className="offers">
              <span className="locality">{locality} </span>
              <li className="categories">
                {' '}
                <span className="grey-dot" /> Category1, Category2
              </li>
            </div>
            <div className="do-options">
              <button className="option-btn">
                <span>
                  <i className="fas fa-bookmark" />
                </span>
                Bookmark
              </button>

              <button className="option-btn">
                <span>
                  <i className="far fa-flag" />
                </span>
                Been Here
              </button>

              <button className="option-btn">
                <span>
                  <i className="far fa-comment-alt" />
                </span>
                Add a Review
              </button>

              <button className="option-btn">
                <span>
                  <i className="far fa-star" />
                </span>
                Rate
              </button>

              <button className="option-btn">
                <span>
                  <i className="far fa-plus-square" />
                </span>
                Add to collection
              </button>
            </div>
          </div>
        </div>
        <ResNavigationCard
          resReviews={resReviews}
          updateDisplayView={updateDisplayView}
          currentDisplayView={currentDisplayView}
        />
        <ResContactCard restaurant={{ cuisines, currency, average_cost_for_two, address }} />
        <ResMenuCard />
        <ResPhotosCard photosUrl={photos_url} />
        <ResReviewsCard resReviews={resReviews} name={name} />
      </div>
    );
  }
  return <div>Restaurant Details Card</div>;
};
