import axios, {AxiosResponse} from "axios";
import {Coordinates} from "./Interfaces/coordinates";
import {RoutePoint} from "./Interfaces/route-point";

function fetchRouteCoordinates(coordinates: string, frequency: number): Promise<Coordinates[]> {
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
                const coordinate: Coordinates = {lat: coordinates[i][0], lng: coordinates[i][1]}
                routeCoordinates.push(coordinate)
            }
            return routeCoordinates
        })
        .catch((error: any) => {
            console.error(error)
            return []
        })

}

function fetchPoints(coordinates: string): Promise<RoutePoint[]> {
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
            const points: any[] = response.data.route.legs[0].steps
            let distance = 0
            let time = 0

            let routeCoordinates: RoutePoint[] = []
            routeCoordinates.push({
                duration: 0,
                coordinate: {lat: points[0].start_point.lat, lng: points[0].start_point.lng}
            })
            for (let i = 0; i < points.length - 1; i++) {
                time += points[i].duration
                distance += points[i].distance
                if (distance >= 10000) {
                    distance = 0
                    const point: RoutePoint = {
                        duration: time,
                        coordinate: {lat: points[i].end_point.lat, lng: points[i].end_point.lng}
                    }
                    routeCoordinates.push(point)
                }
            }
            routeCoordinates.push({
                duration: time + points[points.length - 1].duration,
                coordinate: {lat: points[points.length - 1].end_point.lat, lng: points[points.length - 1].end_point.lng}
            })
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
        coordinatesString += coordinates[i].lat + "," + coordinates[i].lng + ";";
    }
    return fetchRouteCoordinates(coordinatesString, frequency)
}

export function getPoints(coordinates: Coordinates[]): Promise<RoutePoint[]> {
    let coordinatesString: string = ''
    for (let i = 0; i < coordinates.length; i++) {
        coordinatesString += coordinates[i].lat + "," + coordinates[i].lng + ";";
    }
    return fetchPoints(coordinatesString)
}

export function getCity(lat: string, lon: string): Promise<string> {
    const option = {
        method: 'GET',
        url: `https://api-bdc.net/data/reverse-geocode?latitude=${lat}&longitude=${lon}&localityLanguage=en&key=bdc_c044b1614636419e9cdfacd4be4a48f6`
    };
    return axios.request(option).then((response: AxiosResponse) => {
        return response.data.city
    })
}