export interface WeatherInterface {
    time: string; //+
    temperature: number, //+
    apparent_temperature: number,
    precipitation_probability: number,
    precipitation: number,
    rain: number,
    showers: number,
    snowfall: number,
    visibility: string,
}