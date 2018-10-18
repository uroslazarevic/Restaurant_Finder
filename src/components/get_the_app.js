import React from 'react';

import getTheApp from 'images/get-the-app-plain.svg'

export default function GetTheApp() {
  return (
    <header>
      <div className="app-link">
        <a href="" target="_blank">
          <img src={getTheApp} alt="get The App img" />
          Get the App
        </a>
      </div>
    </header>
  )
}