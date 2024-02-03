import React, {useState} from 'react';
import TextField from './InputField';
import {PointDescription} from "../Interfaces/point-description";
import DropDownButton from "./DropDownButton";
import {getPointsDescriptions} from "../Services/filter-information";

interface FormPros {
    setData: any;
    handleClose: () => void; // Add handleClose prop type
}

const FormControl = (pros: FormPros) => {
    const [destinationFields, setDestinationFields] = useState(['']); // Initial state with an empty destination field
    const [startField, setStartField] = useState(''); // Initial state with an empty destination field
    const [selectedDateTime, setSelectedDateTime] = useState(undefined);

    const addNewTextField = () => {
        setDestinationFields(prevFields => [...prevFields, '']);
    };

    const removeTextField = (index: number) => {
        if (destinationFields.length === 1) return;
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
        setStartField(() => {
            return value;
        });
    };


    const fetchData = async () => {
        try {
            let date = new Date();
            if (selectedDateTime !== undefined) {
                date = new Date(selectedDateTime["$y"], selectedDateTime["$M"], selectedDateTime["$D"], selectedDateTime["$H"], selectedDateTime["$m"]);
            }
            getPointsDescriptions([startField, ...destinationFields], date)
                .then((pointsDescriptions: PointDescription[][]) => {
                    pros.setData(pointsDescriptions[0]); // mxolod erti gzisas vsetav. only one way
                })

            // const result = (await response.json()).weathers as PointDescription[][];
            // pros.setData(result[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleSubmit = (e: any) => {
        pros.handleClose();
        e.preventDefault();
        fetchData();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4 col-8">
                <label htmlFor="source" className="form-label" style={{color: 'white'}}>
                    Source location
                </label>
                <TextField type="source" className="form-control" id="source" value={startField}
                           onChange={(e: any) => handleStartChange(e.target.value)}
                />
            </div>
            <DropDownButton selectedDateTime={selectedDateTime}
                            setSelectedDateTime={setSelectedDateTime}></DropDownButton>
            <div className="mb-4 col-12">
                <label htmlFor="destination" className="form-label" style={{color: 'white'}}>
                    Destination
                </label>
                {destinationFields.map((value, index) => (
                    <div key={index} className="input-group">
                        <div className={"col-9"}>
                            <TextField
                                type="destination"
                                className="form-control mt-2"
                                value={value}
                                onChange={(e: any) => handleDestinationChange(index, e.target.value)}
                                id={'destination'}/>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-2">
                            <button
                                className="col-12 btn btn-danger col-auto mt-2"
                                type="button"
                                onClick={() => removeTextField(index)}
                            >
                                -
                            </button>
                        </div>
                    </div>
                ))}

                <div className="input-group">
                    <div className={"col-9"}>

                    </div>
                    <div className="col-1"></div>
                    <div className="col-2">
                        <button
                            className="col-12 btn btn-primary col-auto mt-2"
                            type="button"
                            onClick={addNewTextField}
                        >
                            +
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
