import React from 'react';

export default (props) => {
  const { text, className, children } = props;

  return (
    <div className="note">
    <span className = { className ? `noteText ${className}`: 'noteText' }>{ text }</span>
      {children}
    </div>
  )
}