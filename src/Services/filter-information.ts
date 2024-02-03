import {Coordinates} from "../Interfaces/coordinates";
import {getCoordinate, getRoadsPoints} from "./map-api";
import {PointDescription} from "../Interfaces/point-description";
import {RoutePoint} from "../Interfaces/route-point";
import {getWeatherByCoordinates} from "./weather-api";

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

export function getPointsDescriptions(cities: string[] | undefined, date: Date = new Date()): Promise<PointDescription[][]> | any {
    date.setHours(date.getHours() + 4)

    if (cities === undefined || cities.length < 2) {
        return []
    }

    return getCoordinatesList(cities)
        .then((coordinates: Coordinates[]) => {
            return getRoadsPoints(coordinates)
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
}
