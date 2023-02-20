import {useState} from "react";
import {Button, Col, Container, Offcanvas, Row} from 'react-bootstrap';
import {TfiHelpAlt} from "react-icons/tfi";

import './App.css';
import Elevator from "./components/Elevator/Elevator";

function App() {
    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const handleHideOffCanvas = () => setShowOffCanvas(false);
    const handleShowOffCanvas = () => setShowOffCanvas(true);

    return (
        <Container fluid className='app-container d-flex flex-column vh-100'>
            <Row>
                <Col className='position-relative'>
                    <h1 className='display-5 fst-italic text-center'>Team Elevator De Luxe</h1>

                    <Button variant='link' size='lg' className='position-absolute top-0 end-0' onClick={handleShowOffCanvas}>
                        <TfiHelpAlt/>
                    </Button>
                </Col>

                <Offcanvas placement='end' show={showOffCanvas} onHide={handleHideOffCanvas}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title><h2 className='display-6'>Instructions</h2></Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <p>Click an elevator level to increase its count. Click a number to reduce its count.</p>
                    </Offcanvas.Body>
                </Offcanvas>
            </Row>

            <Row className='flex-grow-1 justify-content-center align-items-center'>
                <Elevator/>
            </Row>
        </Container>
    );
}

export default App;
