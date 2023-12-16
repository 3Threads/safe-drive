// TextField.js
import React from 'react';


interface InputProps{
    placeholder: string
    name: String
}

const TextField = ({placeholder}: InputProps) => {
    return(
        <input placeholder={placeholder} type="text" id="source" name="name"/>
    )
}
export default TextField;