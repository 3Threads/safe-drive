import axios, {AxiosResponse} from "axios";

export function fetchInfo(startingPoint: string, endingPoint: string): Promise<string[][]> {
    const options = {
        method: 'GET',
        url: 'https://trueway-directions2.p.rapidapi.com/FindDrivingRoute',
        params: {
            stops: startingPoint + endingPoint
        },
        headers: {
            'X-RapidAPI-Key': 'e3fc70ca95msh0c1271a45bc037fp13f1eajsn7c9aa6fa0095',
            'X-RapidAPI-Host': 'trueway-directions2.p.rapidapi.com'
        }
    };

    return axios.request(options)
        .then((response: AxiosResponse) => {
            const coordinates: string[][] = response.data.route.geometry.coordinates
            return coordinates
        })
        .catch((error: any) => {
            console.error(error)
            return []
        })

}


export function getRoute(coordinates: string[][], frequency: number): string[] {
    let filteredCoordinates: string[] = []
    for (let i = 0; i < coordinates.length; i += frequency) {
        filteredCoordinates.push(coordinates[i][0] + " " + coordinates[i][1]);
    }
    return filteredCoordinates;
}