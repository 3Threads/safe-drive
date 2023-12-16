import express, {Request, Response} from 'express';
import {Coordinates} from "../../Interfaces/coordinates";
import {getCoordinate} from "../../weather";
import {getRoute} from "../../map-api";

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

weatherRouter.get('/', function (req: Request, res: Response) {
    const cities: string[] = req.query.city as string[]

    if (cities.length < 2) {
        console.log("error not enough coordinates")
    }

    getCoordinatesList(cities)
        .then((coordinates: Coordinates[]) => {
            getRoute(coordinates, 200)
                .then((routeCoordinates: Coordinates[]) => {
                    res.send({
                        coordinates: coordinates,
                        route: routeCoordinates
                    })
                })
        })

})