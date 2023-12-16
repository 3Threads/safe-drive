import axios, {AxiosResponse} from "axios";
import {Coordinates} from "./Interfaces/coordinates";

function fetchInfo(coordinates: string, frequency: number): Promise<Coordinates[]> {
    const options = {
        method: 'GET',
        url: 'https://trueway-directions2.p.rapidapi.com/FindDrivingRoute',
        params: {
            stops: coordinates
        },
        headers: {
            'X-RapidAPI-Key': 'e3fc70ca95msh0c1271a45bc037fp13f1eajsn7c9aa6fa0095',
            'X-RapidAPI-Host': 'trueway-directions2.p.rapidapi.com'
        }
    };

    return axios.request(options)
        .then((response: AxiosResponse) => {
            const coordinates: string[][] = response.data.route.geometry.coordinates
            let routeCoordinates: Coordinates[] = []
            for (let i = 0; i < coordinates.length; i += frequency) {
                const coordinate: Coordinates = {lat: coordinates[i][0], long: coordinates[i][1]}
                routeCoordinates.push(coordinate)
            }
            return routeCoordinates
        })
        .catch((error: any) => {
            console.error(error)
            return []
        })

}


export function getRoute(coordinates: Coordinates[], frequency: number = 100): Promise<Coordinates[]> {
    let coordinatesString: string = ''
    for (let i = 0; i < coordinates.length; i++) {
        coordinatesString += coordinates[i].lat + "," + coordinates[i].long + ";";
    }
    return fetchInfo(coordinatesString, frequency)
}