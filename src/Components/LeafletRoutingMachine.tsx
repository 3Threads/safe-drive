import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import {useMap} from "react-leaflet";
import {PointDescription} from "../Interfaces/point-description";
import {RoutePoint} from "../Interfaces/route-point";
import {Coordinates} from "../Interfaces/coordinates";
import {getWeatherByCoordinates} from "../Services/weather-api";
import {useEffect, useState} from "react";

interface Props {
    coordinates: Coordinates[];
    releaseDate: Date;
}

const LeafletRoutingMachine = ({coordinates, releaseDate}: Props) => {
    const map = useMap();
    const [markers, setMarkers] = useState<L.Marker[]>([])

    useEffect(() => {
        const control = L.Routing.control({
            waypoints: coordinates.map((coordinate) => L.latLng(parseFloat(coordinate.lat), parseFloat(coordinate.lng))),
            routeWhileDragging: false,
            addWaypoints: true,
            fitSelectedRoutes: true,
            showAlternatives: true,
        }).addTo(map);


        control.on('routesfound', async function (e) {
            const routes = e.routes;
            const routeCoordinates: RoutePoint[] = []
            routes.forEach((route: any) => {
                const instructions = route.instructions;
                const polyline = route.coordinates;
                let totalDistanceCovered = 0; // Track the total distance covered by instructions
                let totalTime = 0;
                instructions.forEach((instruction: any) => {
                    const distance = instruction.distance;

                    let distanceCovered = 0;
                    let coordinates;
                    for (let i = 0; i < polyline.length; i++) {
                        if (i === polyline.length - 1) {
                            coordinates = polyline[i];
                            break;
                        }
                        distanceCovered += L.latLng(polyline[i]).distanceTo(L.latLng(polyline[i + 1]));
                        if (distanceCovered >= totalDistanceCovered) {
                            coordinates = polyline[i];
                            break;
                        }
                    }

                    totalTime += instruction.time;
                    totalDistanceCovered += distance;

                    routeCoordinates.push({
                        duration: totalTime,
                        coordinate: {
                            lat: coordinates.lat,
                            lng: coordinates.lng
                        }
                    })
                });
            });

            getWeatherInfo(routeCoordinates, releaseDate)
                .then((weatherInfo: PointDescription[]) => {

                    const innerMarkers = weatherInfo.map((point: PointDescription) => {
                        return L.marker([parseFloat(point.coordinate.lat), parseFloat(point.coordinate.lng)]).addTo(map).bindPopup(`${point.city} - ${point.weather.temperature}°C`);
                    });
                    setMarkers(innerMarkers);
                    console.log(weatherInfo)
                })
        });
    }, [coordinates, releaseDate]);

    function getWeatherInfo(routeCoordinates: RoutePoint[], date: Date) {
        let promises: Promise<PointDescription>[] = [];

        for (let i = 0; i < routeCoordinates.length; i++) {
            const currDate = roundToHour(new Date(date.getTime() + routeCoordinates[i].duration * 1000 + 4 * 60 * 60 * 1000));
            let dateArr: string[] = currDate.toISOString().split("T");
            promises.push(getWeatherByCoordinates(routeCoordinates[i].coordinate, dateArr[0], dateArr[1].substring(0, 5)));
        }

        return Promise.all(promises);
    }

    function roundToHour(date: Date): Date {
        let p: number = 60 * 60 * 1000; // milliseconds in an hour
        return new Date(Math.round(date.getTime() / p) * p);
    }

    return null;
}


export default LeafletRoutingMachine;