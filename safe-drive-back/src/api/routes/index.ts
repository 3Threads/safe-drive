import express, {Request, Response} from 'express';
import {Coordinates} from "../../Interfaces/coordinates";
import {getWeatherByCoordinates} from "../../weather";
import {getCoordinate, getPoints} from "../../map-api";
import {RoutePoint} from "../../Interfaces/route-point";
import {PointDescription} from "../../Interfaces/point-description";

export const weatherRouter = express.Router();

function getCoordinatesList(cities: string[]): Promise<Coordinates[]> {
    let coordinatesList: Promise<Coordinates>[] = []
    for (let i = 0; i < cities.length; i++) {
        coordinatesList.push(getCoordinate(cities[i]))
    }
    return Promise.all(coordinatesList)
}

function roundToHour(date: Date): Date {
    let p: number = 60 * 60 * 1000; // milliseconds in an hour
    return new Date(Math.round(date.getTime() / p) * p);
}

weatherRouter.get('/', function (req: Request, res: Response) {
    const cities: string[] = req.query.city as string[]

    if (cities == undefined || cities.length < 2) {
        res.send({error: "Not enough coordinates"})
        return
    }

    getCoordinatesList(cities)
        .then((coordinates: Coordinates[]) => {
            return getPoints(coordinates)
        })
        .then((routeCoordinates: RoutePoint[]) => {
            const date = new Date(new Date().getTime() + 4 * 60 * 60 * 1000);

            let promises: Promise<PointDescription>[] = []
            for (let i = 0; i < routeCoordinates.length; i++) {
                const currDate = roundToHour(new Date(date.getTime() + routeCoordinates[i].duration * 1000))
                let dateArr: string[] = currDate.toISOString().split("T")
                promises.push(getWeatherByCoordinates(routeCoordinates[i].coordinate, dateArr[0], dateArr[1].substring(0, 5)))
            }
            return Promise.all(promises)
        })
        .then((weather: PointDescription[]) => {

            res.send({
                weathers: weather
            })
        })
})
