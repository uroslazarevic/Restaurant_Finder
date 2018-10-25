import React from 'react';
// Import category images
import deliveryImg from '../images/Categories-images/category_1_delivery.png';
import dinnerImg from '../images/Categories-images/category_10_dinner.png';
import dailyMenusImg from '../images/Categories-images/category_7_Dailu_menu.png';
import breakfastImg from '../images/Categories-images/category_8_Breakfast.png';
import lunchImg from '../images/Categories-images/category_9_Lunch.png';
import cafesImg from '../images/Categories-images/category_6_cafes.png';
import dineOutImg from '../images/Categories-images/special_23_Luxury_dining.png';
import catchingUpImg from '../images/Categories-images/special_67_italian.png';
import nightLifeImg from '../images/Categories-images/drinks_and_nightlife.png';

export default function CategoriesList ({ nameList }) {
  
  let imgList = [
    {url: deliveryImg},
    {url: dineOutImg},
    {url: nightLifeImg},
    {url: catchingUpImg},
    {url: cafesImg},
    {url: dailyMenusImg},
    {url: breakfastImg},
    {url: lunchImg},
    {url: dinnerImg}
  ];

  if(nameList.length !== 0) {
    const categoriesObject = createCategoriesObject(imgList, nameList);
    
    return (
      <div className="cuisines-container">
        <label>Suggested Searches</label>
        {categoriesObject.map( cuisine => {
          const {img, name} = cuisine;
          return <li key={name} className="cuisine-item"><img src={img} alt=""/> <span>{name}</span></li>
        })}
      </div>
    )
  }
  return null
}

function createCategoriesObject (imgList, nameList) {
  const cuisineNumber = 9;
  let newObj = [];

  for(let i = 0; i < cuisineNumber; i++) {
    newObj.push({img: imgList[i].url, name: nameList[i].categories.name})
  }
  return newObj
}