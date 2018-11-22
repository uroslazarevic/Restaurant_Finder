import React from 'react';
import { Link } from 'react-router-dom';
// Import category images
import deliveryImg from '../images/Categories-images/category_1_delivery.png';
import dinnerImg from '../images/Categories-images/category_10_dinner.png';
import dailyMenusImg from '../images/Categories-images/category_7_Dailu_menu.png';
import breakfastImg from '../images/Categories-images/category_8_Breakfast.png';
import lunchImg from '../images/Categories-images/category_9_Lunch.png';
import cafesImg from '../images/Categories-images/category_6_cafes.png';
import dineOutImg from '../images/Categories-images/special_23_Luxury_dining.png';
import takeAwayImg from '../images/Categories-images/special_67_italian.png';
import nightLifeImg from '../images/Categories-images/drinks_and_nightlife.png';

export default function CategoriesList ({ nameList, city }) {
  
  let imgList = [
    {url: deliveryImg},
    {url: dineOutImg},
    {url: nightLifeImg},
    {url: takeAwayImg},
    {url: cafesImg},
    {url: breakfastImg},
    {url: lunchImg},
    {url: dinnerImg},
    {url: dailyMenusImg}
  ];

  if(nameList !== undefined && nameList.length !== 0) {
    const categoriesObject = createCategoriesObject(imgList, nameList);
    
    const { cityName, cityId } = city;
    const splitedCityName = cityName.split(' ').join('-');

    return (
      <div className="cuisines-container">
        <label>Suggested Searches</label>
        {categoriesObject.map( cuisine => {
          const {img, name, id} = cuisine;
          const categoryName = name.split(' ').join('-');
          return (
            <Link key={name} to={{ pathname:`/${splitedCityName}/${categoryName}`, state: { categoryName: name , cityName, categoryId: id , cityId } }} >
              <li className="cuisine-item"><img src={img} alt=""/> <span>{name}</span></li>
            </Link>
          )})}
      </div>
    )
  }
  return null
}

function createCategoriesObject (imgList, nameList) {
  const cuisineNumber = 9;
  const newList = nameList.filter(category => {
    return category.categories.name !== 'Catching-up' &&  category.categories.name !== 'Daily Menus' ? category: null
  })
  let newObj = [];
  
  for(let i = 0; i < cuisineNumber; i++) {
    const { name, id } = newList[i].categories;
    newObj.push({img: imgList[i].url, name, id})
  }
  return newObj
}