import React, {ReactComponentElement, useState} from 'react';

interface CityDataProps {
    index: number;
    time: string;
    location: string;
    degree: number
    weather: string
    condition?: any
    visibility: string
}


const CityData: React.FC<CityDataProps> = ({ index, time, location, degree, weather, condition , visibility}) => {
    return (
        <tr>
            <th scope="row">{index}</th>
            <td>{time}</td>
            <td>{location}</td>
            <td>{degree}</td>
            <td>{weather}</td>
            <td>{condition}</td>
            <td>{visibility}</td>
        </tr>
    );

};

export default CityData;