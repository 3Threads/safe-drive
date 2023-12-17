import React, {useState} from 'react';

interface CityDataProps {
    index: number;
    time: string;
    location: string;
    degree: number
    weather: string
    condition?: string
}


const CityData: React.FC<CityDataProps> = ({ index, time, location, degree, weather, condition }) => {
    return (
        <tr>
            <th scope="row">{index}</th>
            <td>{time}</td>
            <td>{location}</td>
            <td>{degree}</td>
            <td>{weather}</td>
            <td><img src={condition} alt="Thunderstorm Weather" width="24" height="24"/></td>
        </tr>
    );

};

export default CityData;
