import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from './Components/InputField';
import FormControl from "./Components/FormControl"; // Assuming this is your TextField component

const App: React.FC = () => {

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6">
                    <FormControl />
                </div>


                <div className=" col-6">
                    {/* Right Side: Table for Information */}
                    <h3>Information Table</h3>
                    <table className=" table">
                        <thead>
                        <tr>
                            <th scope=" col">Header 1</th>
                            <th scope=" col">Header 2</th>
                            {/* Add more headers as needed */}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Data 1</td>
                            <td>Data 2</td>
                            {/* Add more data cells as needed */}
                        </tr>
                        {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default App;
