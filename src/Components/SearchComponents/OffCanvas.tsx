import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FormControl from './FormControl';
import {Coordinates} from "../../Interfaces/coordinates";

interface FormProps {
    setCoordinates: React.Dispatch<React.SetStateAction<Coordinates[]>>;
    setReleaseDate: React.Dispatch<React.SetStateAction<Date>>;
}

function OffCanvasComponent(props: FormProps) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    const scroll = true;
    const backdrop = true;
    const name = 'departure';

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    transform: 'translateY(-50%) rotate(-90deg)',
                    left: -31,
                    zIndex: 1000,
                }}
            >
                <Button variant="secondary" onClick={toggleShow}>
                    {name}
                </Button>
            </div>

            <Offcanvas style={{height: '100%'}} show={show} onHide={handleClose} scroll={scroll} backdrop={backdrop}>
                <div className="bg-dark" style={{height: '100%'}}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                            <div style={{color: 'white'}}>Plan departure safely</div>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <FormControl setReleaseDate={props.setReleaseDate} setCoordinates={props.setCoordinates}
                                     handleClose={handleClose}/>
                    </Offcanvas.Body>
                </div>
            </Offcanvas>
        </>
    );
}

export default OffCanvasComponent;
