import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import {useMap} from "react-leaflet";
import {PointDescription} from "../Interfaces/point-description";
import {RoutePoint} from "../Interfaces/route-point";

interface Props {
    data: PointDescription[];
}

const LeafletRoutingMachine = ({data}: Props) => {
    const map = useMap();

    const control = L.Routing.control({
        // waypoints: data.map((d) => L.latLng(parseFloat(d.coordinate.lat), parseFloat(d.coordinate.lng))),
        waypoints: [L.latLng(41.6938, 44.8015), L.latLng(55.7558, 37.6173)],
        routeWhileDragging: false,
        addWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: true,
    }).addTo(map);


    control.on('routesfound', function (e) {
        const routes = e.routes;
        const routeCoordinates: RoutePoint[] = []
        routes.forEach((route: any, index: number) => {
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
        console.log(routeCoordinates)
    });

    return null;
}


export default LeafletRoutingMachine;