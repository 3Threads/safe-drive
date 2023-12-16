import React from 'react';

interface TextFieldProps {
  type: string;
  className: string;
  id: string;
  placeholder?: string; // Make the placeholder prop optional
}

const TextField: React.FC<TextFieldProps> = ({ type, className, id, placeholder }) => {
  return (
    <input
      type={type}
      className={className}
      id={id}
      placeholder={placeholder} // Render the placeholder if provided
    />
  );
};

export default TextField;