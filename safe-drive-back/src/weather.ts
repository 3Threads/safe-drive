import axios, {AxiosResponse} from "axios";
import {Coordinates} from "./Interfaces/coordinates";
import {WeatherInterface} from "./Interfaces/weatherInterface";
import {PointDescription} from "./Interfaces/point-description";

export function getWeatherByCoordinates(coordinate: Coordinates, date: string, time: string): Promise<PointDescription> {
    const option = {
        method: 'GET',
        url: "https://api.weatherapi.com/v1/forecast.json",
        params: {
            "key": "851bbeea69c140d9abf165156231912",
            "q": `${coordinate.lat},${coordinate.lng}`,
            "dt": date,
            "hour": time.split(':')[0]
        }
    };
    return axios.request(option)
        .then((response: AxiosResponse) => {
            const weather: WeatherInterface = {
                precipitation: 0,
                temperature: 0,
                time: "",
                visibility: "",
                condition: "",
                condition_img: "",
            };
            // console.log(response.data.forecast.forecastday)

            weather.time = response.data.forecast.forecastday[0].hour[0].time;
            weather.precipitation = response.data.forecast.forecastday[0].hour[0].precip_mm;
            weather.temperature = response.data.forecast.forecastday[0].hour[0].feelslike_c
            weather.visibility = response.data.forecast.forecastday[0].hour[0].vis_km;
            weather.condition = response.data.forecast.forecastday[0].hour[0].condition.text;
            weather.condition_img = response.data.forecast.forecastday[0].hour[0].condition.icon;

            const city: string = response.data.location.name + " (" + response.data.location.country + ")"
            const point: PointDescription = {
                coordinate: coordinate,
                weather: weather,
                city: city,
                date: date + ' (' + time + ')'
            };
            return point
        });
}