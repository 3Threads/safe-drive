import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {PointDescription} from './Interfaces/point-description';
import Table from './Components/Table';
import OffCanvas from './Components/OffCanvas';
import logo from './Images/logo.png';
import {CircularProgress} from "@mui/material";
import MapTile from "./Components/MapTile";
import {useMap} from "react-leaflet";
import L from "leaflet";

const App: React.FC = () => {
    const [data, setData] = useState<PointDescription[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (

        <div className="bg-dark text-center"> {/* Centering the logo */}
            <div className="container">
                <MapTile data={data}/>
                <img src={logo} alt="Logo" style={{paddingTop: '20px', width: '300px'}}/> {/* Adjusting the width */}
                <div className="row pt-4"> {/* Added pt-4 for padding top */}
                    <div className="col-6">
                        <OffCanvas setData={setData} setIsLoading={setIsLoading}/>
                    </div>
                    {!isLoading ? <Table cityData={data}/> :
                        <CircularProgress/>
                    }
                </div>
            </div>
        </div>
    );
};

export default App;
