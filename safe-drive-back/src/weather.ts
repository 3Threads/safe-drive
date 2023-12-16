import axios, {AxiosResponse} from "axios";
import {Coordinates} from "./Interfaces/coordinates";
import {WeatherInterface} from "./Interfaces/weatherInterface";
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
//                     "longitude": x.lng,
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

export function getWeatherByCoordinates(coordinate: Coordinates, date: string, time: string): Promise<WeatherInterface> {
    const option = {
        method: 'GET',
        url: "https://api.open-meteo.com/v1/forecast",
        params: {
            "latitude": coordinate.lat,
            "longitude": coordinate.lng,
            "hourly": ["temperature_2m", "apparent_temperature", "precipitation_probability", "precipitation", "rain", "showers", "snowfall", "visibility", "wind_speed_180m", "wind_direction_180m", "temperature_180m"]
        }
    };
    return axios.request(option)
        .then((response: AxiosResponse) => {
            var d : string = get_full_date(date, time)
            var weath: WeatherInterface = {
                apparent_temperature: 0,
                precipitation: 0,
                precipitation_probability: 0,
                rain: 0,
                showers: 0,
                snowfall: 0,
                temperature_180m: 0,
                temperature_2m: 0,
                time: "",
                visibility: 0,
                wind_direction_180m: 0,
                wind_speed_180m: 0
            };
            for(let i = 0; i<response.data.hourly.time.length; i++) {
                if(response.data.hourly.time[i] === d) {
                    weath.time = response.data.hourly.time[i];
                    weath.apparent_temperature =  response.data.hourly.apparent_temperature[i];
                    weath.precipitation = response.data.hourly.precipitation[i];
                    weath.precipitation_probability = response.data.hourly.precipitation_probability[i];
                    weath.rain = response.data.hourly.rain[i];
                    weath.showers = response.data.hourly.showers[i];
                    weath.snowfall = response.data.hourly.snowfall[i];
                    weath.temperature_180m = response.data.hourly.temperature_180m[i];
                    weath.temperature_2m =  response.data.hourly.temperature_2m[i];
                    weath.visibility = response.data.hourly.visibility[i];
                    weath.wind_direction_180m = response.data.hourly.wind_direction_180m[i];
                    weath.wind_speed_180m = response.data.hourly.wind_speed_180m[i];
                    break;
                }
            }
            return weath;
        });
}
function get_full_date(date: string, time: string) {
    return date + "T" + time;
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
        const coordinate: Coordinates = {lat: response.data[0].latitude, lng: response.data[0].longitude}
        return coordinate;
    })
}