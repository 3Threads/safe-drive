import React from 'react';

interface TextFieldProps {
    type: string;
    className: string;
    id: string;
    value: string;
    onChange: any;
    placeholder?: string;
}

const TextField: React.FC<TextFieldProps> = ({ type, className, id, placeholder, value, onChange }) => {
    // Define custom styles for the text field
    const customStyles = {
        backgroundColor: '#212529', // Set the background color to black
        color: 'white', // Set the text color to white
        // Add any additional styles as needed
    };

    // Combine the provided className with custom styles
    const combinedClassName = `${className} custom-textfield`;

    return (
        <input
            type={type}
            value={value}
            className={combinedClassName}
            onChange={onChange}
            id={id}
            placeholder={placeholder}
            style={customStyles} // Apply custom styles
        />
    );
};

export default TextField;
