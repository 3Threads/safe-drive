import express, {Request, Response} from 'express';
import {Coordinates} from "../../Interfaces/coordinates";
import {getCoordinate, getWeatherByCoordinates} from "../../weather";
import {getCity, getPoints, getRoute} from "../../map-api";
import {RoutePoint} from "../../Interfaces/route-point";
import {WeatherInterface} from "../../Interfaces/weatherInterface";
import {PointDescription} from "../../Interfaces/point-description";

export const weatherRouter = express.Router();

function getCoordinatesList(cities: string[]): Promise<Coordinates[]> {
    let coordinatesList: Promise<Coordinates>[] = []
    for (let i = 0; i < cities.length; i++) {
        coordinatesList.push(getCoordinate(cities[i]))
    }
    return Promise.all(coordinatesList)
        .then((values: Coordinates[]) => {
            return values
        })
}

function roundToHour(date: Date): Date {
    let p: number = 60 * 60 * 1000; // milliseconds in an hour
    return new Date(Math.round(date.getTime() / p) * p);
}

weatherRouter.get('/', function (req: Request, res: Response) {
    const cities: string[] = req.query.city as string[]

    if (cities.length < 2) {
        console.log("error not enough coordinates")
    }

    getCoordinatesList(cities)
        .then((coordinates: Coordinates[]) => {
            getPoints(coordinates)
                .then((routeCoordinates: RoutePoint[]) => {
                    const date = new Date(new Date().getTime() + 4 * 60 * 60 * 1000);

                    let promises: Promise<WeatherInterface>[] = []
                    for (let i = 0; i < routeCoordinates.length; i++) {
                        const currDate = roundToHour(new Date(date.getTime() + routeCoordinates[i].duration * 1000))
                        let dateArr: string[] = currDate.toISOString().split("T")
                        promises.push(getWeatherByCoordinates(routeCoordinates[i].coordinate, dateArr[0], dateArr[1].substring(0, 5)))
                    }
                    Promise.all(promises)
                        .then((weather: WeatherInterface[]) => {
                            let citiesPromises: Promise<string>[] = []
                            for (let i = 0; i < weather.length; i++) {
                                citiesPromises.push(getCity(routeCoordinates[i].coordinate.lat, routeCoordinates[i].coordinate.lng))
                            }
                            Promise.all(citiesPromises)
                                .then((values: string[]) => {
                                    let points: PointDescription[] = []
                                    for (let i = 0; i < values.length; i++) {
                                        const pointDescription: PointDescription = {
                                            coordinate: routeCoordinates[i].coordinate,
                                            date: weather[i].time,
                                            city: values[i],
                                            weather: weather[i]
                                        }
                                        points.push(pointDescription)
                                    }
                                    res.send({
                                        weathers: points
                                    })
                                })
                        })

                })
        })

})