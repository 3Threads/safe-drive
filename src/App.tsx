import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OffCanvas from './Components/SearchComponents/OffCanvas';
import logo from './Images/logo.png';
import MapTile from "./Components/MapComponents/MapTile";
import {Coordinates} from "./Interfaces/coordinates";

const App: React.FC = () => {
    const [coordinates, setCoordinates] = useState<Coordinates[]>([]);
    const [releaseDate, setReleaseDate] = useState<Date>(new Date());

    return (

        <div className="bg-dark text-center"> {/* Centering the logo */}
            <div style={{position: "relative", zIndex: "1000"}}>
                <img src={logo} alt="Logo"
                     style={{paddingTop: '20px', width: '300px', position: "absolute", right: "0"}}/>
                <div style={{
                    position: "absolute",
                    right: "0",
                    backgroundColor: "black",
                    opacity: "0.5",
                    width: "300px",
                    height: "100%",
                    top: 0,
                    zIndex: "-1"
                }}></div>
            </div>
            <div> {/* Added pt-4 for padding top */}
                <div>
                    <OffCanvas setReleaseDate={setReleaseDate} setCoordinates={setCoordinates}/>
                </div>
                <MapTile coordinates={coordinates} releaseDate={releaseDate}/>
            </div>
        </div>
    );
};

export default App;
