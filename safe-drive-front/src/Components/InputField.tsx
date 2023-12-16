// TextField.js
import React from 'react';


interface InputProps {
    className: string;
    placeholder: string;
    name: string;
}

const TextField: React.FC<InputProps> = ({className, placeholder}) => {
    return (
        <input type="text" className={className} placeholder={placeholder} id="source" name="name"/>
    )
};

export default TextField;