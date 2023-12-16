import axios, {AxiosResponse} from "axios";


export function get_weather(lat: number, lon: number) {
    const option = {
        method: 'GET',
        url: "https://api.open-meteo.com/v1/forecast",
        params: {
            "latitude": lat,
            "longitude": lon,
            "hourly": ["temperature_2m", "apparent_temperature", "precipitation_probability", "precipitation", "rain", "showers", "snowfall", "visibility", "wind_speed_180m", "wind_direction_180m", "temperature_180m"]
        }
    };
    return axios.request(option).then((response: AxiosResponse) => {
        return response.data;
    })
}
export function get_lat_and_lon(city: string) {

    const option = {
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/geocoding?city=${city}`,
        headers: {
            'X-Api-Key': '9h9nv0dwprO2gCijEsfnjg==LxoD02CHY72NgISw'
        },
    };
    return axios.request(option).then((response: AxiosResponse) => {
        return response.data;
    })
}