import React from 'react';
import menu1 from '../images/restaurant_imgs/res_menu_imgs/menu1.jpg'
import menu2 from '../images/restaurant_imgs/res_menu_imgs/menu2.jpg'
import menu3 from '../images/restaurant_imgs/res_menu_imgs/menu3.jpg'

export default () => {
  return (
    <div className="restaurant-menu-card">
      <div className="card-title">Menu</div>
      <ul>
        <li ><img src={menu1} alt ='res-menu-img'></img></li>
        <li ><img src={menu2} alt ='res-menu-img'></img></li>
        <li ><img src={menu3} alt ='res-menu-img'></img></li>
      </ul>
    </div>
  )
}