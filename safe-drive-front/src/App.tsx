import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {PointDescription} from "./interfaces/point-description";
import Table from "./Components/Table";
import OffCanvas from "./Components/OffCanvas"; // Assuming this is your TextField component

const App: React.FC = () => {

    const [data, setData] = useState<PointDescription[]>([]);
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6">
                    <OffCanvas setData={setData}/>
                </div>

                <Table cityData={data}/>
            </div>
        </div>
    );
};

export default App;
