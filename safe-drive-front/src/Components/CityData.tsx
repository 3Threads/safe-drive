import React, {ReactComponentElement, useState} from 'react';
import {Coordinates} from "../interfaces/coordinates";

interface CityDataProps {
    index: number;
    time: string;
    location: string;
    degree: number
    weather: any
    condition?: any
    visibility: string
    coordinates: Coordinates
}


const CityData: React.FC<CityDataProps> = ({
                                               index,
                                               time,
                                               location,
                                               degree,
                                               weather,
                                               condition,
                                               visibility,
                                               coordinates
                                           }) => {
    return (
        <tr>
            <th scope="row">{index}</th>
            <td>{time}</td>
            <td style={{color: 'white'}}>
                <a href={`https://www.google.com/search?q=${coordinates.lat}+${coordinates.lng}`}
                   style={{color: 'white'}}>
                    {location}
                </a>
            </td>
            <td>{degree}</td>
            <td>{weather}</td>
            <td><img alt="weather-icon" src={condition} /></td>
            <td>{visibility}</td>
        </tr>
    );

};

export default CityData;