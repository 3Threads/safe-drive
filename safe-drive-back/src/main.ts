import {fetchInfo, getRoute} from "./map-api";


const tbilisi: string = "41.6938,44.8015;"
const batumi: string = '41.6461,41.6405;'


fetchInfo(tbilisi, batumi)
    .then((fetchedInfo: string[][]) => {
        const points: string[] = getRoute(fetchedInfo, 100)
        points.forEach(point => {
            console.log(point)
        })
    })