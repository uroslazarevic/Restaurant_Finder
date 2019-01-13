import React from 'react';

export default({ field }) => {
  return (
    <div className="field">
      <label style = { field.style } >{field.label}</label>
      <field.tag 
        value = { field.value }
        name = { field.name }
        onChange = { field.handleInputState }
        type= { field.type ? field.type : null }
      /> 
    </div>
  );
}