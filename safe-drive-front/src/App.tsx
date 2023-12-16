import React, {useState} from 'react';
import './App.css';
import TextField from "./Components/InputField";

function App() {
    const [textFields, setTextFields] = useState([
        <TextField placeholder={"Destination"} name={"destination"}/>
    ]);
    const addNewTextField = ()=>{
        setTextFields(([...textFields, <TextField placeholder={"Destination"} name={"destination"}/>]))
    }
    return (

        <div>
            <form method={"get"} action={"/"} >
                <TextField placeholder={"Source"} name={"source"}/>
                {textFields}
                <input type={"button"} onClick={addNewTextField}></input>
                <input type={"submit"} value={"Submit"}></input>
            </form>

        </div>
    );
}

export default App;
