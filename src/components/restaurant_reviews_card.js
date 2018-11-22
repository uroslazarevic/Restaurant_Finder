import React from 'react';
import userAvatar from '../images/restaurant_imgs/res_photos_imgs/user_avatar.png'

export default ({ resReviews, name }) => {
  const { reviews_count, user_reviews } = resReviews;
  
  if(user_reviews !== undefined) {
    const headerProfileImgs = user_reviews.reduce((acc, user, index) => {
     index < 3 && acc.push({ profile_image: user.review.user.profile_image, name: user.review.user.name })
     return acc;
    }, [])

    return (
      <div className="restaurant-reviews-card">
  
        <form className="reviews-form">
          <label htmlFor="add-a-review-input">Write a Review</label>
          <div className="review-input">
            <span><i className="fas fa-pencil-alt"></i></span>
            <input type="text" placeholder={`Help other foodies by sharing your review of ${name}`} />
          </div>
          <button disabled="disabled" className="add-review-btn">Add Your Review</button>
        </form>
  
        <div className="reviews">
          <div className="reviews-header">
            <div className="title">Reviews</div>
            <div className="reviewed-by">
              {headerProfileImgs.map( (reviewer, index) => {
                return <div key={index} className="famouse-reviewers"><img src={reviewer.profile_image} alt="profile-img" /></div>
              })}
              <div className="reviewed-by-who">
                <span>{headerProfileImgs[0].name}</span> and <span>{reviews_count} others</span> have reviewed this place
              </div>
            </div>
          </div>

          <div className="selectors">
            <div className="option reviews-top">Popular <span>x</span></div>
            <div className="option reviews-top">Following <span>x</span></div>
            <div className="option reviews-top active-option">All Reviews <span>{reviews_count}</span></div>
            <div className="option reviews-top">Blogs <span>x</span></div>
          </div>

          <ul className="reviews-body">
           { resReviews.user_reviews.map( revItem => {
            const { id, comments_count, likes, rating, rating_color, review_text, review_time_friendly, user: { name, profile_image, profile_url } } = revItem.review;
            const ratingStyle = {
              backgroundColor: `#${rating_color}`
            }
            return (
              <li key={id} className="review-item">

                <div className="review-wrapper">

                  <div className="reviewer-profile">
                    <img src={profile_image} alt='reviewer-img' />
                    <div className="info">
                      <a href={profile_url} target="_blank" className="name">{name}</a>
                      <div className="social">49 Reviews, 41 Followers</div>
                      <div className="follow">Follow</div>
                    </div>
                  </div>

                  <div className="review-time">{review_time_friendly}</div>

                  <div className="rev-text">
                    <span className="rated-text">Rated</span>
                    <span style={ratingStyle} className="rated-mark">{rating}</span> 
                    {review_text}
                  </div>

                  <div className="share-opinion">
                    <div className="your-impression">
                      <div className="rate">
                        <div className="express-btn like"><span><i className="far fa-heart"></i></span>Like</div>
                        <span className="count">{likes}</span>
                      </div>
                      <div className="rate">
                        <div className="express-btn comment"><span><i className="far fa-comment"></i></span>Comment</div>
                        <span className="count">{comments_count}</span>
                      </div>
                    </div>
                    <div className="share-review"><span><i className="fas fa-share-square"></i></span>Share</div>
                  </div>

                </div>

                <div className="write-a-comment">
                  <div className="comment-wrapper">
                    <img src={userAvatar} alt='wriTe a comment'/>
                    <div className="input-div"><input placeholder="Write a comment... Use @ to tag friends" /></div>
                  </div>
                </div>

              </li>
            )
            }) }
          </ul>
        </div>
  
      </div>
    )
  }
  return <div>Bilosta</div>
}