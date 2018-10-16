import React from 'react';


export default function (props) {
  return (
    <div className="test">
      <h3>Project Start</h3>
      {props.children}
    </div>
  );
};