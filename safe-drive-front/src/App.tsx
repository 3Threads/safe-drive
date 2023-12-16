import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from './Components/InputField'; // Assuming this is your TextField component

const App: React.FC = () => {

    const [textFields, setTextFields] = useState([
        <TextField key={0} type="destination" className={"mt-2 form-control"} id={"destination"}
                   placeholder={`Destination #${1}`}/>,
    ]);

    const addNewTextField = () => {
        const newIndex = textFields.length;
        setTextFields([
            ...textFields,
            <TextField key={newIndex} type="destination" className={"mt-2 form-control"} id={"destination"}
                       placeholder={`Destination #${newIndex + 1}`}/>,
        ]);
    };

    const removeTextField = (index: number) => {
        const updatedTextFields = textFields.filter((_, i) => i !== index);
        setTextFields(
            updatedTextFields.map((textField, idx) => {
                return React.cloneElement(textField, {
                    placeholder: `Destination #${idx + 1}`,
                    key: idx,
                });
            })
        );
    };

    const allTextFieldsExceptLast = textFields.slice(0, -1); // Get all text fields except the last one
    const lastTextField = textFields[textFields.length - 1]; // Get the last text field


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6">
                    <form method="get" action="/">
                        <div className="mb-4 col-4">
                            <label htmlFor="source" className="form-label">Source location</label>
                            <TextField type="source" className="form-control" id="source"/>
                        </div>

                        <div className="mb-4 col-10">
                            <label htmlFor=" destination" className=" form-label">Destination</label>
                            {allTextFieldsExceptLast.map((textField, index) => (
                                <React.Fragment key={textField.key}>
                                    <div key={index} className="input-group">
                                        <div className={"col-7"}>{textField}</div>
                                        <div className="col-1"></div>
                                        <div className="col-4">
                                            <button
                                                className="col-12 btn btn-danger col-auto mt-2"
                                                type="button"
                                                onClick={() => removeTextField(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}

                            <div className="input-group">
                                <div className={"col-7"}>{lastTextField}</div>
                                <div className="col-1"></div>
                                <div className="col-4">
                                    <button className="col-12 btn btn-primary col-auto mt-2" type="button"
                                            onClick={addNewTextField}>
                                        Add Destination
                                    </button>
                                </div>
                            </div>

                        </div>
                        <button className=" btn btn-success mt-2" type="submit">
                            Submit
                        </button>
                    </form>

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
