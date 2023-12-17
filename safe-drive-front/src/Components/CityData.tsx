import React, {useState} from 'react';
import {Coordinates} from "../interfaces/coordinates";

interface CityDataProps {
    index: number;
    time: string;
    location: string;
    degree: number
    weather: string
    condition?: string
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
            <td><a href={'https://www.google.com/search?q=' + coordinates.lat + '+' + coordinates.lng}>{location}</a>
            </td>
            <td>{degree}</td>
            <td>{weather}</td>
            <td><img src={condition} alt="Thunderstorm Weather" width="24" height="24"/></td>
            <td>{visibility}</td>
        </tr>
    );

};

export default CityData;