import React from 'react';
import {MapContainer, TileLayer} from "react-leaflet";
import LeafletRoutingMachine from "./LeafletRoutingMachine";
import L from "leaflet";
import {Coordinates} from "../../Interfaces/coordinates";

interface Props {
    coordinates: Coordinates[];
    releaseDate: Date;
}

const MapTile = ({coordinates, releaseDate}: Props) => {
    L.Marker.prototype.options.icon = L.icon({
        iconUrl: require("../../Images/location.png"),
        iconSize: [20, 20],
        popupAnchor: [2, -40],
    });

    return (
        <div className="App">
            <MapContainer center={[41.6938, 44.8015]} zoom={13} style={{height: "100vh"}}>
                <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                />
                <LeafletRoutingMachine coordinates={coordinates} releaseDate={releaseDate}/>
            </MapContainer>
        </div>
    );
};

export default MapTile;
