import React from 'react';
import { Link } from 'react-router-dom';

// Import Media
import logoUrl from 'images/zomato-logo.jpg'

export default (props) => {
  const middleBlock = [
    { title: 'About Zomato', links: ['About Us', 'Culture', 'Blog', 'Blog', 'Contact'] },
    { title: 'For Foodies', links: ['Code of Conduct', 'Community', 'Verified Users', 'Blogger Help', 'Developers', 'Mobile Apps'] },
    { title: 'For Restaurants', links: ['Add a Restaurant', 'Claim your Listing', 'Business App', 'Business Owner Guidelines', 'Business Blog', 'Restaurant Widgets', 'Products for Businesses', 'Advertise', 'Order', 'Book', 'Trace', 'Hyperpure'] }
  ];

  const bottomBlock = [{ title: 'Contries', countries: [ 
    'Indonesia',
    'Australia',
    'Ireland',
    'Czech Republic',
    'Italy',
    'Brasil',
    'Canada',
    'Chile',
    'Malaysia',
    'New Zealand',
    'Philippines',
    'Poland',
    'Portugal',
    'India',
    'Singapore',
    'United Kingdom',
    'Slovakia',
    'South Africa',
    'Turkey',
    'Lebanon',
    'Qatar',
    'Sri Lanka',
    'UAE',
    'United States'
  ] }];

  const horizListLeft = [ 'Privacy', 'Terms', 'API Policy', 'CSR', 'Security', 'Sitemap' ];
  const socialIcons = ['fab fa-facebook-f', 'fab fa-instagram', 'fab fa-twitter'];
  const { city: { cityName, cityId } } = props;
  const urlHome = '/';

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="logo-language-block">
          <Link to={{ pathname: urlHome, state: { cityName, cityId } }} >
            <img src = {logoUrl} alt = "zomato logo" />
          </Link>
          <div className="dropdown-lang">
            <span><i className="fas fa-globe"></i></span>
            English
            <span><i className="fas fa-caret-down"></i></span>
          </div>
        </div>
        <div className="middle-block">
          { middleBlock.map( (block, blIndex) => {
            const { title, links } = block;

            return (
              <div key={blIndex} className={`block-${blIndex}`}>
                <div className="bl-title">{title}</div>
                <ul className="links">
                  { links.map( (link, liIndex) => {
                    return <li key={liIndex} className="link-item">{link}</li>
                  } ) }
                </ul>
            </div>
            )
          }) }
        </div>
        <div className="bottom-block">
          { bottomBlock.map( (block, blIndex) => {
            const { title, countries } = block;
            return (
              <React.Fragment key={blIndex}>
                <div className="bl-title">{title}</div>
                <ul className = "links" >
                  { countries.sort().map( (contry, liIndex) => {
                    return <li key={liIndex} className="link-item">{contry}</li>
                  } ) }
                </ul>
              </React.Fragment>
            )} ) }
        </div>
        <div className="horiz-list-block">
          <ul className="list-left">
            { horizListLeft.map( (item, liIndex) => {
              return <li key = {liIndex} className = "link-item">{item}</li>
            } ) }
          </ul>
          <ul className="list-right">
            { socialIcons.map( (className,liIndex) => {
              return <li key = {liIndex} ><span><i className={className}></i></span></li>
            } ) }
          </ul>
        </div>
        <div className="copyright-block">
          By continuing past this page, you agree to our Terms of Service,
          Cookie Policy, Privacy Policy and Content Policies. All trademarks
          are properties of their respective owners. © 2008-2018 - Zomato™ 
          Media Pvt Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  )
}