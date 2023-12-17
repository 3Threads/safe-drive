import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FormControl from './FormControl';

interface FormProps {
  setData: any;
  handleClose: () => void; // Add handleClose prop type
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
          transform: 'translateY(-50%) rotate(-90deg)', // Rotate the button
          left: -31,
          zIndex: 1000,
        }}
      >
        <Button variant="secondary" onClick={toggleShow}>
          {name}
        </Button>
      </div>
      <Offcanvas show={show} onHide={handleClose} scroll={scroll} backdrop={backdrop}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Plan departure safely</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FormControl setData={props.setData} handleClose={handleClose} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvasComponent;
