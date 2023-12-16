// TextField.js
import React from 'react';


interface InputProps {
    className: string
    placeholder: string
    name: String
}

const TextField = ({className}: InputProps, {placeholder}: InputProps) => {
    return (
        <input className={className} placeholder={placeholder} type="text" id="source" name="name"/>
    )
}
export default TextField;