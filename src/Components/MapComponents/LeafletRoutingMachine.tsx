import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import {useMap} from "react-leaflet";
import {PointDescription} from "../../Interfaces/point-description";
import {RoutePoint} from "../../Interfaces/route-point";
import {Coordinates} from "../../Interfaces/coordinates";
import {getWeatherByCoordinates} from "../../Services/weather-api";
import {useEffect} from "react";

interface Props {
    coordinates: Coordinates[];
    releaseDate: Date;
}

const LeafletRoutingMachine = ({coordinates, releaseDate}: Props) => {
    const map = useMap();

    useEffect(() => {
        const control = L.Routing.control({
            waypoints: coordinates.map((coordinate) => L.latLng(parseFloat(coordinate.lat), parseFloat(coordinate.lng))),
            routeWhileDragging: true,
            addWaypoints: true,
            fitSelectedRoutes: true,
            showAlternatives: true,
            show: false,
        }).addTo(map);
        const routingContainer = document.querySelector('.leaflet-routing-container');

        // Check if the container exists before attempting to remove it
        if (routingContainer) {
            // Remove the container from the DOM
            routingContainer.remove();
        }

        control.on('routesfound', async function (e) {
            // Clear previous route overlays
            // map.eachLayer(function (layer) {
            //     if (!(layer instanceof L.TileLayer)) {
            //         map.removeLayer(layer);
            //     }
            // });

            const routes = e.routes;
            const routeCoordinates: RoutePoint[] = []
            routes.forEach((route: any) => {
                const instructions = route.instructions;
                const polyline = route.coordinates;
                let totalDistanceCovered = 0; // Track the total distance covered by instructions
                let totalTime = 0;
                let distanceFromLast = 0;
                instructions.forEach((instruction: any) => {
                    const distance = instruction.distance;
                    distanceFromLast += distance
                    if (distanceFromLast >= 5000) {
                        // console.log(distanceFromLast)
                        distanceFromLast = 0;
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
                    }
                });
            });

            getWeatherInfo(routeCoordinates, releaseDate)
                .then((weatherInfo: PointDescription[]) => {
                    weatherInfo.map((point: PointDescription) => {
                        return L.marker([parseFloat(point.coordinate.lat), parseFloat(point.coordinate.lng)]).addTo(map)
                            .bindPopup(`<div class="row"><div class="col-4"><img alt=${point.weather.condition_img} src=${point.weather.condition_img} /></div><div class="col-8"><div class="row">${point.weather.temperature}°C</div><div class="row">${point.weather.visibility}km</div></div></div><div class="row">${point.date}</div>`);
                    });
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