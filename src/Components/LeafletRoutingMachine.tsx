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
        var marker1 = L.marker([36.8065, 10.1815]).addTo(
            map
        );

        L.Routing.control({
            waypoints: data.map((d) => L.latLng(parseFloat(d.coordinate.lat), parseFloat(d.coordinate.lng))),
            routeWhileDragging: false,
            addWaypoints: false,
            fitSelectedRoutes: true,
            showAlternatives: true,
        })
            .on("routesfound", function (e) {
                e.routes[0].coordinates.forEach((c: any, i: any) => {
                    setTimeout(() => {
                        marker1.setLatLng([c.lat, c.lng]);
                    }, 1000 * i);
                });
            })
            .addTo(map);

    }, [data]);
    return null;
};

let DefaultIcon = L.icon({
    iconUrl: require("../Images/location.png"),
    iconSize: [20, 20],
    popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default LeafletRoutingMachine;