import React from 'react';
import sun from "../Images/sun.png";
import CityData from "./CityData";
import cityData from "./CityData";

interface TableProps{
    cityData: any[];

}
const Table = (cityDatas: TableProps) => {
    return (
        <div className=" col-6">
            <table className="table table-striped" style={{textAlign: 'center'}}>
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Time</th>
                    <th scope="col">Location</th>
                    <th scope="col">°C</th>
                    <th scope="col">weather</th>
                    <th scope="col">Conditions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>15:50</td>
                    <td>Tbilisi</td>
                    <td>15</td>
                    <td>Heavy Rain</td>
                    <td><img src={sun} alt="Thunderstorm Weather" width="24" height="24"/></td>
                </tr>

                {cityDatas.cityData.map((item) => (
                    <CityData
                        key={item.index}
                        index={item.index}
                        time={"123"}
                        location={item.location}
                        degree={item.degree}
                        weather={item.weather}
                    />
                ))}


                </tbody>
            </table>
        </div>
    );

};

export default Table;