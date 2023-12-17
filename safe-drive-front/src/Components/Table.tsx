import React from 'react';
import sun from "../Images/sun.png";
import CityData from "./CityData";
import {PointDescription} from "../interfaces/point-description";
// @ts-ignore
import {WiDaySunny, WiDayShowers, WiDayRain, WiDaySnow, WiSnow, WiRain} from 'weather-icons-react';
interface TableProps {
    cityData: PointDescription[];

}

const Table = (cityDatas: TableProps) => {
    // @ts-ignore
    return (
        <div>
            {/*<div className={"col-1"}> </div>*/}
            <div className=" col-12 ">
                <table className="table table-striped" style={{textAlign: 'center'}}>
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Time</th>
                        <th scope="col">Location</th>
                        <th scope="col">°C</th>
                        <th scope="col">weather</th>
                        <th scope="col">Conditions</th>
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
                            key={index+1}
                            index={index+1}
                            time={item.date}
                            location={item.city}
                            degree={item.weather.temperature}
                            weather={(item.weather.rain && "Rain") ||
                                (item.weather.snowfall && "Snowfall") ||
                                (item.weather.showers && "Heavy Rain") || "Sunny"
                        }
                            condition={(item.weather.rain && <WiDayShowers size={30} color='#000' />) ||
                                (item.weather.showers && <WiDayRain size={30} color='#000' />) ||
                                (item.weather.snowfall && <WiSnow size={30} color='#000' />) ||
                                <WiDaySunny size={30} color='#000' />}
                            visibility={Math.round(parseInt(item.weather.visibility)).toString()+'%'}
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