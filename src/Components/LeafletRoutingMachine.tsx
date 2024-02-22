import {useEffect} from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import {useMap} from "react-leaflet";
import {PointDescription} from "../Interfaces/point-description";

interface Props {
    data: PointDescription[];
}

const LeafletRoutingMachine = ({data}: Props) => {
    const map = useMap();

    useEffect(() => {
        L.Routing.control({
            waypoints: data.map((d) => L.latLng(parseFloat(d.coordinate.lat), parseFloat(d.coordinate.lng))),
            routeWhileDragging: false,
            addWaypoints: false,
            fitSelectedRoutes: true,
            showAlternatives: true,
        }).addTo(map);
    }, [data]);
    return null;
};


export default LeafletRoutingMachine;