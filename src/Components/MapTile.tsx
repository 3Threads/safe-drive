import React from 'react';
import {MapContainer, TileLayer} from "react-leaflet";
import LeafletRoutingMachine from "./LeafletRoutingMachine";
import {PointDescription} from "../Interfaces/point-description";

interface Props {
    data: PointDescription[];
}

const MapTile = ({data}: Props) => {
    return (
        <div className="App">
            <MapContainer center={[41.6938, 44.8015]} zoom={13} style={{height: "100vh"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/*  <LeafletGeocoder /> */}
                <LeafletRoutingMachine data={data}/>
            </MapContainer>
        </div>
    );
};

export default MapTile;
