import {useState} from "react";
import {Button, Col, Container, Offcanvas, Row} from 'react-bootstrap';
import {TfiHelpAlt} from "react-icons/tfi";

import './App.css';
import Ring from "./components/Ring/Ring";

function App() {
    const [showOffCanvas, setShowOffCanvas] = useState(false);

    const handleHideOffCanvas = () => setShowOffCanvas(false);
    const handleShowOffCanvas = () => setShowOffCanvas(true);

    return (
        <Container fluid className='app-container d-flex flex-column vh-100'>
            <Row className='flex-shrink-0'>
                <Col className='position-relative'>
                    <h1 className='display-5 fst-italic text-center mt-2'>Mood Ring De Luxe</h1>

                    <Button variant='link' size='lg' className='help-btn position-absolute top-0 mt-sm-2 mt-md-3'
                            onClick={handleShowOffCanvas}>
                        <TfiHelpAlt/>
                    </Button>
                </Col>

                <Offcanvas placement='end' show={showOffCanvas} onHide={handleHideOffCanvas}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title><h2 className='display-6'>Instructions</h2></Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <p>Click a ring segment to increase its count. Click a count to reduce it.</p>

                        {/*<Form.Group className='mb-3'>*/}
                        {/*    <Form.Check type="checkbox" id='randomizePlayersCheckbox' label="Show team elevation"*/}
                        {/*                defaultChecked={showElevator}*/}
                        {/*                onClick={e => setShowElevator(e.currentTarget.checked)}></Form.Check>*/}
                        {/*</Form.Group>*/}
                    </Offcanvas.Body>
                </Offcanvas>
            </Row>

            <Row className='flex-fill'>
                <Ring/>
            </Row>

            <Row className='flex-shrink-0'>
                <Col className='pb-3'>
                    <div className='text-nowrap text-muted text-center'>A SeaBee Software Production</div>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
