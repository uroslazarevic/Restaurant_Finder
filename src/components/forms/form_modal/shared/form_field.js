import React from 'react';

export default({ field }) => {
  return (
    <div className="field">
      <label style = { field.style } >{field.label}</label>
      <field.tag 
        value = { field.value }
        name = { field.name }
        onChange = { field.handleInputState ? field.handleInputState : null }
        type= { field.type ? field.type : null }
        placeholder = { field.placeholder ? field.placeholder : null }
        autoComplete ={ field.autoComplete ? field.autoComplete : null }
      /> 
    </div>
  );
}