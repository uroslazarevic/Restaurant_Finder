import Home from './home_page/home';
import Layout from './shared/layout';
import GetTheApp from './shared/get_the_app';
import LoginNavigation from './shared/login_navigation';
import MainHome from './home_page/main_home/main_home';
import CategoriesList from './shared/categories_list';
import PlacesList from './shared/places_list';
import Collections from './shared/collections';
import PopularRestaurants from './home_page/main_home/home_bottom/popular_restaurants/popular_restaurants';
import RestaurantCard from './restaurants_category_page/restaurant_card/restaurant_card_basics';
import Filters from './restaurants_category_page/filters/filters';
import CuisinesModal from './restaurants_category_page/cuisines_list_modal/cuisines_list_modal';
import Pagination from './restaurants_category_page/pagination/pagination';
import SearchBtn from './shared/search_btn';
import FormModal from './forms/form_modal/form_modal';
import StartForm from './forms/form_modal/start_form/start_form';
import LoginForm from './forms/form_modal/login_form/login_form';
import SignupForm from './forms/form_modal/signup_form/signup_form.js';
import FormField from './forms/form_modal/shared/form_field.js';
import PasswordResetForm from './forms/form_modal/password_reset_form/password_reset_form.js';
import RestaurantOverviewDisplay from './restaurant_details_page/restaurant_content_display/restaurant_overview_display/restaurant_overview_display';
import RestaurantMenuDisplay from './restaurant_details_page/restaurant_content_display/restaurant_menu_display/restaurant_menu_display';
import RestaurantReviewsDisplay from './restaurant_details_page/restaurant_content_display/restaurant_reviews_display/restaurant_reviews_display';
import RestaurantPhotosDisplay from './restaurant_details_page/restaurant_content_display/restaurant_photos_display/restaurant_photos_display';
import ResContentDisplay from './restaurant_details_page/restaurant_content_display/restaurant_content_display';
import ResContactCard from './restaurant_details_page/restaurant_content_display/shared/restaurant_contact_card';
import ResNavigationCard from './restaurant_details_page/restaurant_content_display/shared/restaurant_navigation_card';
import ResMenuCard from './restaurant_details_page/restaurant_content_display/shared/restaurant_menu_card';
import ResPhotosCard from './restaurant_details_page/restaurant_content_display/shared/restaurant_photos_card';
import ResReviewsCard from './restaurant_details_page/restaurant_content_display/shared/restaurant_reviews_card';
import ResGeneralCard from './restaurant_details_page/restaurant_content_display/shared/restaurant_general_card';
import CollectionDetailsCard from './collection_details_page/collection_details_card/collection_details_card';
import CollectionRestaurantsList from './collection_details_page/collection_restaurants_list/collection_restaurants_list';
import CollectionRestaurantItem from './collection_details_page/collection_restaurants_list/collection_restaurant_item/collection_restaurant_item';
import CollContentDisplay from './city_collections_page/collections_content_display/collections_content_display';
import HandpickedCollCard from './city_collections_page/collections_content_display/handpicked_collections_card/handpicked_collections_card';
import NavigationCollCard from './city_collections_page/collections_content_display/navigation_collections_card/navigation_collections_card';
import FollowingCollCard from './city_collections_page/collections_content_display/following_collections_card/following_collections_card';
import SavedCollCard from './city_collections_page/collections_content_display/saved_collections_card/saved_collections_card';
import Footer from './shared/footer';
import ShowNote from './shared/show_note';
import { SearchPlacesLoader, SearchLocationsLoader, PageLoader, ReviewsLoader } from './shared/loaders';

export {
  // Components
  Home,
  Layout,
  GetTheApp,
  LoginNavigation,
  MainHome,
  CategoriesList,
  PlacesList,
  Collections,
  PopularRestaurants,
  SearchPlacesLoader,
  PageLoader,
  ReviewsLoader,
  SearchLocationsLoader,
  RestaurantCard,
  Filters,
  CuisinesModal,
  Pagination,
  SearchBtn,
  FormModal,
  StartForm,
  LoginForm,
  SignupForm,
  FormField,
  PasswordResetForm,
  RestaurantOverviewDisplay,
  RestaurantMenuDisplay,
  RestaurantReviewsDisplay,
  RestaurantPhotosDisplay,
  ResContentDisplay,
  ResContactCard,
  ResNavigationCard,
  ResMenuCard,
  ResPhotosCard,
  ResReviewsCard,
  ResGeneralCard,
  CollectionDetailsCard,
  CollectionRestaurantsList,
  CollectionRestaurantItem,
  CollContentDisplay,
  HandpickedCollCard,
  NavigationCollCard,
  FollowingCollCard,
  SavedCollCard,
  ShowNote,
  Footer
  
}