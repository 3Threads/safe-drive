import axios, {AxiosResponse} from "axios";
import {Coordinates} from "./Interfaces/coordinates";
//
//
// export function get_weather(city: string): Promise<any> {
//     return getCoordinate(city)
//         .then((x: Coordinates) => {
//             const option = {
//                 method: 'GET',
//                 url: "https://api.open-meteo.com/v1/forecast",
//                 params: {
//                     "latitude": x.lat,
//                     "longitude": x.long,
//                     "hourly": ["temperature_2m", "apparent_temperature", "precipitation_probability", "precipitation", "rain", "showers", "snowfall", "visibility", "wind_speed_180m", "wind_direction_180m", "temperature_180m"]
//                 }
//             };
//             // const response = await
//             return axios.request(option)
//                 .then((response: AxiosResponse) => {
//                     return response.data
//                 });
//             // return response.data;
//         });
// }

export function getWeatherByCoordinates(coordinate: Coordinates): Promise<any> {
    const option = {
        method: 'GET',
        url: "https://api.open-meteo.com/v1/forecast",
        params: {
            "latitude": coordinate.lat,
            "longitude": coordinate.long,
            "hourly": ["temperature_2m", "apparent_temperature", "precipitation_probability", "precipitation", "rain", "showers", "snowfall", "visibility", "wind_speed_180m", "wind_direction_180m", "temperature_180m"]
        }
    };
    return axios.request(option)
        .then((response: AxiosResponse) => {
            return response.data
        });
}

export function getCoordinate(city: string): Promise<Coordinates> {
    const option = {
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/geocoding?city=${city}`,
        headers: {
            'X-Api-Key': '9h9nv0dwprO2gCijEsfnjg==LxoD02CHY72NgISw'
        },
    };
    return axios.request(option).then((response: AxiosResponse) => {
        const coordinate: Coordinates = {lat: response.data[0].latitude, long: response.data[0].longitude}
        return coordinate;
    })
}