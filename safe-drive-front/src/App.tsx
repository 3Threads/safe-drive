import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from './Components/InputField'; // Assuming this is your TextField component

const App: React.FC = () => {
    const [textFields, setTextFields] = useState([
        <TextField className={"col-7 mt-2"}/>,
    ]);

    const addNewTextField = () => {
        const newIndex = textFields.length;
        setTextFields([
            ...textFields,
            <TextField className={"col-7 mt0"} key={newIndex}/>,
        ]);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6">
                    {/* Left Side: Source and Destinations Input */}
                    <form method="get" action="/">
                        <input className={"col-6"} placeholder={'Source'} name={'source'}/>
                        <br />
                        {textFields}
                        <button className="btn btn-primary mt-2" type="button" onClick={addNewTextField}>
                            Add Destination
                        </button>
                        <br/>
                        <button className="btn btn-success mt-2" type="submit">
                            Submit
                        </button>
                    </form>
                </div>



                <div className="col-6">
                    {/* Right Side: Table for Information */}
                    <h3>Information Table</h3>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Header 1</th>
                            <th scope="col">Header 2</th>
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
