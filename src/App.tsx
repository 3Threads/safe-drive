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
            <div className="container">
                <img src={logo} alt="Logo" style={{paddingTop: '20px', width: '300px'}}/> {/* Adjusting the width */}
                <div className="row pt-4"> {/* Added pt-4 for padding top */}
                    <div className="col-6">
                        <OffCanvas setReleaseDate={setReleaseDate} setCoordinates={setCoordinates}/>
                    </div>
                    <MapTile coordinates={coordinates} releaseDate={releaseDate}/>
                </div>
            </div>
        </div>
    );
};

export default App;
