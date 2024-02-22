import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OffCanvas from './Components/OffCanvas';
import logo from './Images/logo.png';
import {CircularProgress} from "@mui/material";
import MapTile from "./Components/MapTile";
import {Coordinates} from "./Interfaces/coordinates";

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [coordinates, setCoordinates] = useState<Coordinates[]>([]);
    const [releaseDate, setReleaseDate] = useState<Date>(new Date());

    return (

        <div className="bg-dark text-center"> {/* Centering the logo */}
            <div className="container">
                <img src={logo} alt="Logo" style={{paddingTop: '20px', width: '300px'}}/> {/* Adjusting the width */}
                <div className="row pt-4"> {/* Added pt-4 for padding top */}
                    <div className="col-6">
                        <OffCanvas setReleaseDate={setReleaseDate} setCoordinates={setCoordinates}
                                   setIsLoading={setIsLoading}/>
                    </div>
                    <MapTile coordinates={coordinates} releaseDate={releaseDate}/>
                    {!isLoading ? <MapTile coordinates={coordinates} releaseDate={releaseDate}/> :
                        <CircularProgress/>
                    }
                </div>
            </div>
        </div>
    );
};

export default App;
