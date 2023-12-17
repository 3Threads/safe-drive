import React, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import BasicDateTimePicker from "./BasicDateTimePicker";

function DropDownButton() {
    const [selectedItem, setSelectedItem] = useState<string>('now');

    const handleSelect = (eventKey: string | null) => {
        if (eventKey) {
            setSelectedItem(eventKey);
        }
    };

    return (
        <div>
            <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Departure time
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="now" active={selectedItem === 'now'}>
                        Now
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="notNow" active={selectedItem === 'notNow'}>
                        Choose the time
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {selectedItem === 'now' && <div className={"col-12 mb-2"}></div>}
            {selectedItem === 'notNow' && <div className={"col-12 mb-2"}><BasicDateTimePicker/></div>}
        </div>
    );
}

export default DropDownButton;
