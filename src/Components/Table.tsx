import React from 'react';
import CityData from "./CityData";
import {PointDescription} from "../Interfaces/point-description";

interface TableProps {
    cityData: PointDescription[];

}

const Table = (cityDatas: TableProps) => {
    // @ts-ignore
    return (
        <div>
            {/*<div className={"col-1"}> </div>*/}
            <div className="col-12 ">
                <table className="table table-dark table-striped" style={{textAlign: 'center'}}>
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Time</th>
                        <th scope="col">Location</th>
                        <th scope="col">°C</th>
                        <th scope="col">Weather</th>
                        <th scope="col">Condition</th>
                        <th scope="col">Visibility</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*<tr>*/}
                    {/*    <th scope="row">1</th>*/}
                    {/*    <td>15:50</td>*/}
                    {/*    <td>Tbilisi</td>*/}
                    {/*    <td>15</td>*/}
                    {/*    <td>Heavy Rain</td>*/}
                    {/*    <td><img src={sun} alt="" width="24" height="24"/></td>*/}
                    {/*    <td>10%</td>*/}

                    {/*</tr>*/}

                    {/*{cityDatas.cityData.map((item) => (*/}
                    {/*    <CityData*/}
                    {/*        key={item.index}*/}
                    {/*        index={item.index}*/}
                    {/*        time={"123"}*/}
                    {/*        location={item.location}*/}
                    {/*        degree={item.degree}*/}
                    {/*        weather={item.weather}*/}
                    {/*        visibility={item.visibility}*/}
                    {/*    />*/}
                    {/*))}*/}

                    {cityDatas.cityData.map((item, index) => (
                        <CityData
                            key={index + 1}
                            index={index + 1}
                            time={item.date}
                            location={item.city}
                            degree={item.weather.temperature}
                            weather={item.weather.condition}
                            condition={item.weather.condition_img}
                            visibility={item.weather.visibility + "km"}
                            coordinates={item.coordinate}
                        />
                    ))}


                    </tbody>
                </table>
            </div>
        </div>
    );

};
export default Table;