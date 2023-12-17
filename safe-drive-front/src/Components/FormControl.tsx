import React, {useState} from 'react';
import TextField from './InputField'; // Replace with the actual import

const FormControl = () => {
    const [destinationFields, setDestinationFields] = useState(['']); // Initial state with an empty destination field
    const [startField, setStartField] = useState(''); // Initial state with an empty destination field

    const addNewTextField = () => {
        setDestinationFields(prevFields => [...prevFields, '']);
    };

    const removeTextField = (index: number) => {
        setDestinationFields(prevFields => prevFields.filter((_, i) => i !== index));
    };

    const handleDestinationChange = (index: number, value: string) => {
        setDestinationFields(prevFields => {
            const newFields = [...prevFields];
            newFields[index] = value;
            return newFields;
        });
    };

    const handleStartChange = (value: string) => {
        setStartField(prevFields => {
            return value;
        });
    };


    const [data, setData] = useState(null);
    const [cityValues, setCityValues] = useState(['', '', '', '', '']);

    const fetchData = async () => {
        try {
            // Construct the URL with the values from the array
            const queryString = `city=${startField}&` + destinationFields.map(city => `city=${city}`).join('&');
            const response = await fetch(`http://localhost:3636/?${queryString}`);
            const result = await response.json();
            setData(result);
            console.log(result)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleSubmit = (e: any) => {
        e.preventDefault();
        fetchData();

    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4 col-4">
                <label htmlFor="source" className="form-label">
                    Source location
                </label>
                <TextField type="source" className="form-control" id="source" value={startField}
                           onChange={(e: any) => handleStartChange(e.target.value)}
                />
            </div>

            <div className="mb-4 col-10">
                <label htmlFor="destination" className="form-label">
                    Destination
                </label>
                {destinationFields.map((value, index) => (
                    <div key={index} className="input-group">
                        <div className={"col-7"}>
                            <TextField
                                type="destination"
                                className="form-control"
                                value={value}
                                onChange={(e: any) => handleDestinationChange(index, e.target.value)}
                                id={'destination'}/>
                        </div>
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
                ))}

                <div className="input-group">
                    <div className={"col-7"}>

                    </div>
                    <div className="col-1"></div>
                    <div className="col-4">
                        <button
                            className="col-12 btn btn-primary col-auto mt-2"
                            type="button"
                            onClick={addNewTextField}
                        >
                            Add Destination
                        </button>
                    </div>
                </div>
            </div>

            <button className="btn btn-success mt-2" type="submit">
                Submit
            </button>
        </form>
    );
};

export default FormControl;
