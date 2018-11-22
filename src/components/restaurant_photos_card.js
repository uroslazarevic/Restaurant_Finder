import React from 'react';
import photo1 from '../images/restaurant_imgs/res_photos_imgs/photo1.jpg'
import photo2 from '../images/restaurant_imgs/res_photos_imgs/photo2.jpg'
import photo3 from '../images/restaurant_imgs/res_photos_imgs/photo3.jpg'
import photo4 from '../images/restaurant_imgs/res_photos_imgs/photo4.jpg'
import photoAvatar from '../images/restaurant_imgs/res_photos_imgs/photo_avatar.png'

export default ({ photosUrl }) => {
  return (
    <div className="restaurant-photos-card">
      <div className="card-title">Photos</div>
      <ul>
        <li ><img src={photo1} alt ='res-menu-img'></img></li>
        <li ><img src={photo2} alt ='res-menu-img'></img></li>
        <li ><img src={photo3} alt ='res-menu-img'></img></li>
        <li ><a href={photosUrl} target="_blank" >Number of photos</a><img src={photo4} alt ='numAvatar'></img></li>
        <div className="add-a-photo" ><img src={photoAvatar} alt="phAvatar" ></img>
        <div >Add a photo</div></div>
      </ul>
    </div>
  )
}