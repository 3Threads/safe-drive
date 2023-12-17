import React from 'react';

interface TextFieldProps {
  type: string;
  className: string;
  id: string;
  value: string;
  onChange: any
  placeholder?: string; // Make the placeholder prop optional
}

const TextField: React.FC<TextFieldProps> = ({ type, className, id, placeholder, value ,onChange}) => {
  return (
    <input
      type={type}
      value={value}
      className={className}
      onChange={onChange}
      id={id}
      placeholder={placeholder} // Render the placeholder if provided
    />
  );

};

export default TextField;