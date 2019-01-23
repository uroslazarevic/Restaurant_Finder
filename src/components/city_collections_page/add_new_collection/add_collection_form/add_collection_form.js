import React, { Component } from 'react';
import _ from 'lodash';

import { FormField } from 'components'

export default class AddCollectionForm extends Component {
 constructor(props) {
   super(props);

   this.state = {
     inputNames: {
       name:this.props.propertyNames.name,
       description:this.props.propertyNames.description,
       tags:this.props.propertyNames.tags,
     }
   }
 }
 
  render () {
    const {
      inputValues,
      handleInputState,
      tagsInputValue
    } = this.props;
    const { inputNames } = this.state;

    const FIELDS = {
      name: {
        name: inputNames.name,
        label: 'NAME OF COLLECTION*',
        value: inputValues.name,
        tag: 'input',
        placeholder: 'e.g. Best Brunches',
        type: 'text',
        handleInputState,
        autoComplete: "off"
      },
      description: {
        name: inputNames.description,
        placeholder: 'e.g. My favorite places for Sunday brunch',
        label: 'DESCRIPTION',
        value: inputValues.description,
        tag: 'textarea',
        type: 'text',
        handleInputState,
        autoComplete: "off"
      },
      tags: {
        name: inputNames.tags,
        label: 'TAGS',
        value: tagsInputValue,
        tag: 'input',
        placeholder: 'e.g. #sunday #brunch #top10 #waffles',
        type: 'text',
        handleInputState,
        autoComplete: "off"
      }
    }

    return (
      <div>
          {/* Render Form Fields */}
          { _.map( FIELDS, field => {
            return <FormField key = {field.name} field = { field } />
          } )  }
      </div>
    )
  }
}
