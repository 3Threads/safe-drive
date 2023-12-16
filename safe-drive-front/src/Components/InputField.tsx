// TextField.js
import React from 'react';


interface InputProps {
    className: string
}

const TextField = ({className}: InputProps) => {
    return (
        <input className={className} placeholder="Destination" type="text" id="city" name="city"/>
    )
}
export default TextField;