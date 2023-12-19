import axios, {AxiosResponse} from "axios";
import {Coordinates} from "./Interfaces/coordinates";
import {WeatherInterface} from "./Interfaces/weatherInterface";
import {PointDescription} from "./Interfaces/point-description";

export function getWeatherByCoordinates(coordinate: Coordinates, date: string, time: string): Promise<PointDescription> {
    const option = {
        method: 'GET',
        url: "http://api.weatherapi.com/v1/forecast.json",
        params: {
            "key": "851bbeea69c140d9abf165156231912",
            "q": `${coordinate.lat},${coordinate.lng}`,
            "days": 2,
            "aqi": "no",
            "alerts": "yes"
        }
    };
    return axios.request(option)
        .then((response: AxiosResponse) => {
            var weath: WeatherInterface = {
                precipitation: 0,
                temperature: 0,
                time: "",
                visibility: "",
                condition: "",
                condition_img: "",
            };
            // console.log(response)

            for (let i = 0; i < response.data.forecast.forecastday.length; i++) {
                if (response.data.forecast.forecastday[i].date === date) {
                    for (let j = 0; j < response.data.forecast.forecastday[i].hour.length; j++) {
                        if (response.data.forecast.forecastday[i].hour[j].time.split(" ")[1] == time) {
                            weath.time = response.data.forecast.forecastday[i].hour[j].time;
                            weath.precipitation = response.data.forecast.forecastday[i].hour[j].precip_mm;
                            weath.temperature = response.data.forecast.forecastday[i].hour[j].feelslike_c
                            weath.visibility = response.data.forecast.forecastday[i].hour[j].vis_km;
                            weath.condition = response.data.forecast.forecastday[i].hour[j].condition.text;
                            weath.condition_img = response.data.forecast.forecastday[i].hour[j].condition.icon;
                        }
                    }
                    break;
                }
            }
            const city:string = response.data.location.name+" ("+response.data.location.country
            const point :PointDescription={coordinate: coordinate, weather: weath, city: city, date: time};
            return point
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
        const coordinate: Coordinates = {lat: response.data[0].latitude, lng: response.data[0].longitude}
        return coordinate;
    })
}