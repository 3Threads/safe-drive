import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PointDescription } from './Interfaces/point-description';
import Table from './Components/Table';
import OffCanvas from './Components/OffCanvas';
import logo from './Images/logo.png';
import LoadingIcons, {Oval} from 'react-loading-icons'

const App: React.FC = () => {
  const [data, setData] = useState<PointDescription[]>([]);

  return (

    <div className="bg-dark text-center"> {/* Centering the logo */}
      <div className="container">
        <img src={logo} alt="Logo" style={{ paddingTop:'20px', width: '300px' }} /> {/* Adjusting the width */}
        <div className="row pt-4"> {/* Added pt-4 for padding top */}
          <div className="col-6">
            <OffCanvas setData={setData} handleClose={() => {}} />
          </div>
          <Table cityData={data} />
        </div>
      </div>
    </div>
  );
};

export default App;
