import React from 'react';

const Input = ({ 
  id, required, autoComplete,
  placeholder, type, label
}) => {
  
  return (
    <div className="form-input"> 
      { 
        label && <label 
          className="form-input__label"
          htmlFor={id}
        >
          { label }
        </label>
      }
 
      <input 
        className="input"
        id={id}
        name={id}
        type={type ?? 'text'}
        placeholder={placeholder}
        autoComplete={autoComplete ?? 'off'} 
        required={required}
      />
    </div>
  );
};

export default Input;
