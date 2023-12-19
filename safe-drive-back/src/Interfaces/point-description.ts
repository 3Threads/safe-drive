import {Coordinates} from "./coordinates";
import {WeatherInterface} from "./weatherInterface";

export interface PointDescription {
    date: string,
    coordinate: Coordinates,
    city: string,
    weather: WeatherInterface
}