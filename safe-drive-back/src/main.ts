import {AxiosResponse} from "axios";

import axios from "axios";

const tbilisi: string = "41.6938,44.8015;"
const batumi: string = '41.6461,41.6405;'

const options = {
    method: 'GET',
    url: 'https://trueway-directions2.p.rapidapi.com/FindDrivingRoute',
    params: {
        stops: tbilisi + batumi
    },
    headers: {
        'X-RapidAPI-Key': 'e3fc70ca95msh0c1271a45bc037fp13f1eajsn7c9aa6fa0095',
        'X-RapidAPI-Host': 'trueway-directions2.p.rapidapi.com'
    }
};

axios.request(options)
    .then((response: AxiosResponse) => {
        console.log(response.data.route.legs[0].steps);
    })
    .catch((error: any) => {
            console.error(error)
        }
    )
