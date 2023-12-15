import axios, {AxiosResponse} from "axios";

var options = {
    method: 'GET',
    url: 'https://trueway-directions2.p.rapidapi.com/FindDrivingRoute',
    params: {
        stops: ""
    },
    headers: {
        'X-RapidAPI-Key': 'e3fc70ca95msh0c1271a45bc037fp13f1eajsn7c9aa6fa0095',
        'X-RapidAPI-Host': 'trueway-directions2.p.rapidapi.com'
    }
};

export var route = {
    bounds: { south: 0, west: 0, north: 0, east: 0 },
    distance: 0,
    duration: 0,
    geometry: Array<any>
}

export function get_road(start_point: string, end_point: string) {
    options.params.stops = start_point + end_point;
    axios.request(options)
        .then((response: AxiosResponse) => {
            route.distance=response.data.route.distance
            route.duration=response.data.route.duration;
            route.geometry=response.data.route.geometry;
            route.bounds=response.data.route.bounds;
            return route;
        })
        .catch((error: any) => {
                console.error(error)
            }
        )
}