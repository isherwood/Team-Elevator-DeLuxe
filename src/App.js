import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Modal, Offcanvas, Row} from 'react-bootstrap';
import {TfiHelpAlt} from "react-icons/tfi";

import './App.css';
import Elevator from "./components/Elevator/Elevator";

function App() {

    // get property from local storage object
    const getItem = key => {
        const data = JSON.parse(localStorage.getItem('TeamElevatorDeLuxe'));
        return data ? data[key] : null;
    }

    const origLevels = [
        {label: 'grateful'},
        {label: 'wise, insightful'},
        {label: 'creative, innovative'},
        {label: 'resourceful'},
        {label: 'hopeful, optimistic'},
        {label: 'appreciative'},
        {label: 'patient, understanding'},
        {label: 'sense of humor'},
        {label: 'flexible, adaptive'},
        {label: 'curious, interested'},
        {label: 'impatient, frustrated'},
        {label: 'irritated, bothered'},
        {label: 'worried, anxious'},
        {label: 'defensive, insecure'},
        {label: 'judgemental, blaming'},
        {label: 'self-righteous'},
        {label: 'stressed, burned-out'},
        {label: 'angry, hostile'},
        {label: 'depressed'}
    ];

    const [levels, setLevels] = useState(getItem('levels') || origLevels);
    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const [showElevator, setShowElevator] = useState(false);
    const [showContinueModal, setShowContinueModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleHideOffCanvas = () => setShowOffCanvas(false);
    const handleShowOffCanvas = () => setShowOffCanvas(true);

    const handleIncrementLevel = level => {
        const newLevels = [...levels];

        if (newLevels[level]['count']) {
            newLevels[level].count++;
        } else {
            newLevels[level]['count'] = 1;
        }

        setLevels(newLevels);
    };

    const handleDecrementLevel = (event, level) => {
        event.stopPropagation();
        const newLevels = [...levels];

        if (newLevels[level]['count'] > 0) {
            newLevels[level].count--;
            setLevels(newLevels);
        }
    };

    const handleContinueModalYes = () => {
        setShowContinueModal(false);
    }

    const handleContinueModalNo = () => {
        setShowContinueModal(false);
        localStorage.removeItem('TeamElevatorDeLuxe');
        const resetLevels = levels;

        resetLevels.forEach((level, i) => {
            level.label = origLevels[i].label;
            level.count = undefined;
        });

        setLevels(resetLevels);
    }

    const updateLevel = (e, i) => {
        let newLevels = [...levels];
        newLevels[i].label = e.currentTarget.value;
        newLevels[i].labelChanged = e.currentTarget.value !== levels[i].label;

        setLevels(newLevels);
    }

    useEffect(() => {

        // set state data in local storage
        window.localStorage.setItem('TeamElevatorDeLuxe', JSON.stringify({
            levels: levels
        }))
    }, [levels]);


    useEffect(() => {
        // check for saved game and prompt for continuation
        if (getItem('levels').filter(l => l.count > 0 || l.labelChanged).length > 0) {
            setShowContinueModal(true);
        }
    }, []);

    return (
        <>
            <Container fluid className='app-container d-flex flex-column vh-100'>
                <Row>
                    <Col className='position-relative'>
                        <h1 className='display-5 fst-italic text-center mt-2'>Team Elevator De Luxe</h1>

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
                            <p>Click an elevator level to increase its count. Click a count to reduce it.</p>

                            <Form.Group className='mb-3'>
                                <Form.Check type="checkbox" id='randomizePlayersCheckbox' label="Show team elevation"
                                            defaultChecked={showElevator}
                                            onClick={e => setShowElevator(e.currentTarget.checked)}></Form.Check>
                            </Form.Group>

                            <Button type='primary' onClick={() => setShowEditModal(true)}>Edit Levels</Button>
                        </Offcanvas.Body>
                    </Offcanvas>
                </Row>

                <Row className='flex-grow-1 justify-content-center align-items-center'>
                    <Elevator levels={levels}
                              showElevator={showElevator}
                              incrementLevel={handleIncrementLevel}
                              decrementLevel={handleDecrementLevel}
                    />
                </Row>

                <Row>
                    <Col className='pb-3'>
                        <div className='text-nowrap text-muted text-center'>A SeaBee Software Production</div>
                    </Col>
                </Row>
            </Container>

            <Modal show={showContinueModal} onHide={handleContinueModalNo}>
                <Modal.Header closeButton>
                    <Modal.Title>Elevator Data Found</Modal.Title>
                </Modal.Header>

                <Modal.Body>Would you like to continue where you left off?</Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleContinueModalYes}>Yes</Button>
                    <Button variant="secondary" onClick={handleContinueModalNo}>No</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Elevator Levels</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {levels.map((level, index) => (
                        <Form.Control defaultValue={level.label}
                                      key={index}
                                      size='sm'
                                      className='mb-1'
                                      onChange={event => updateLevel(event, index)}/>
                    ))}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Done</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default App;
