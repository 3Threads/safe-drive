import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FormControl from "./FormControl";


interface FormPros{
    setData:any
}

function OffCanvasComponent(pros : FormPros) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    const scroll = true;
    const backdrop = true;
    const name = 'Enable both scrolling & backdrop';

    return (
        <>
            <Button variant="primary" onClick={toggleShow} className="me-2">
                {name}
            </Button>
            <Offcanvas show={show} onHide={handleClose} scroll={scroll} backdrop={backdrop}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Plan departure safely</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                     <FormControl setData={pros.setData}/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffCanvasComponent;
