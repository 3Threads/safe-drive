import React from 'react';
import {MapContainer, TileLayer} from "react-leaflet";
import LeafletRoutingMachine from "./LeafletRoutingMachine";
import {PointDescription} from "../Interfaces/point-description";
import L from "leaflet";

interface Props {
    data: PointDescription[];
}

const MapTile = ({data}: Props) => {
    L.Marker.prototype.options.icon = L.icon({
        iconUrl: require("../Images/location.png"),
        iconSize: [20, 20],
        popupAnchor: [2, -40],
    });

    return (
        <div className="App">
            <MapContainer center={[41.6938, 44.8015]} zoom={13} style={{height: "100vh"}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/*  <LeafletGeocoder /> */}
                <LeafletRoutingMachine data={data}/>
            </MapContainer>
        </div>
    );
};

export default MapTile;
