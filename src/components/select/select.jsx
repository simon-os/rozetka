import React from 'react';
import { SelectPicker } from 'rsuite';

const Select = ({ 
  data, name, onChange, cleanable,
  value, placeholder, classList 
}) => {

  return (
    <SelectPicker 
      className={'select' + (classList ? ' '+classList : '')}
      name={name}
      onChange={onChange}
      data={data} 
      searchable={false} 
      cleanable={cleanable}
      value={value || ''}
      placeholder={placeholder}
    />
  );
};

export default Select;
