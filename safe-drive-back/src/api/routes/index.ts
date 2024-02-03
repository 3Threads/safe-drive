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
    let date = new Date()
    const hour = req.query.hour as string
    if (hour !== undefined) {
        const minute = req.query.minute as string
        const year = req.query.year as string
        const month = req.query.month as string

        const day = req.query.day as string
        date = new Date(parseInt(year), parseInt(month), parseInt(day), parseInt(hour), parseInt(minute))

    }
    date.setHours(date.getHours() + 4)

    if (cities == undefined || cities.length < 2) {
        res.send({error: "Not enough coordinates"})
        return
    }

    getCoordinatesList(cities)
        .then((coordinates: Coordinates[]) => {
            return getPoints(coordinates)
        })
        .then((routeCoordinates: RoutePoint[][]) => {
            let allPromises: Promise<PointDescription[]>[] = [];

            for (let i = 0; i < routeCoordinates.length; i++) {
                let promises: Promise<PointDescription>[] = [];

                for (let j = 0; j < routeCoordinates[i].length; j++) {
                    const currDate = roundToHour(new Date(date.getTime() + routeCoordinates[i][j].duration * 1000));
                    let dateArr: string[] = currDate.toISOString().split("T");
                    promises.push(getWeatherByCoordinates(routeCoordinates[i][j].coordinate, dateArr[0], dateArr[1].substring(0, 5)));
                }

                allPromises.push(Promise.all(promises));
            }

            return Promise.all(allPromises);
        })
        .then((weather: PointDescription[][]) => {

            res.send({
                weathers: weather
            })
        })
})
