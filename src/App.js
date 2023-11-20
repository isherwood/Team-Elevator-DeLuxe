import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Modal, Offcanvas, Row} from 'react-bootstrap';
import {TfiHelpAlt} from "react-icons/tfi";
import {IoIosColorPalette} from "react-icons/io";
import {GiHamburgerMenu} from "react-icons/gi";

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

    const origColors = ['0567F2', 'FA49D7'];

    const [levels, setLevels] = useState(getItem('levels') || origLevels);
    const [colors, setColors] = useState(getItem('colors') || origColors);
    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const [showElevator, setShowElevator] = useState(false);
    const [showContinueModal, setShowContinueModal] = useState(false);
    const [showLabelModal, setShowLabelModal] = useState(false);
    const [showColorModal, setShowColorModal] = useState(false);
    const [colorChanged, setColorChanged] = useState(getItem('colorChanged') || false);

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
        setColors(origColors);
        setColorChanged(false);
    }

    const updateLevel = (e, i) => {
        let newLevels = [...levels];
        newLevels[i].label = e.currentTarget.value;
        newLevels[i].labelChanged = e.currentTarget.value !== levels[i].label;

        setLevels(newLevels);
    }

    const setStartColor = event => {
        const newColors = [...colors];
        newColors[0] = event.currentTarget.value.replace('#', '');

        setColors(newColors);
        setColorChanged(true);
    }

    const setEndColor = event => {
        const newColors = [...colors];
        newColors[1] = event.currentTarget.value.replace('#', '');

        setColors(newColors);
        setColorChanged(true);
    }

    useEffect(() => {

        // set state data in local storage
        window.localStorage.setItem('TeamElevatorDeLuxe', JSON.stringify({
            colors: colors,
            colorChanged: colorChanged,
            levels: levels
        }))
    }, [colors, colorChanged, levels]);

    useEffect(() => {
        // check for saved game and prompt for continuation
        if (getItem('levels').filter(l => l.count > 0 || l.labelChanged).length > 0 ||
            getItem('colorChanged') === true) {
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
                                            onClick={e => setShowElevator(e.currentTarget.checked)}/>
                            </Form.Group>

                            <div className='d-flex justify-content-evenly gap-2'>
                                <Button type='primary' className='w-100'
                                        onClick={() => setShowLabelModal(true)}>
                                    Edit Level Labels <GiHamburgerMenu className='ms-2 mb-1'/>
                                </Button>

                                <Button type='primary' className='w-100'
                                        onClick={() => setShowColorModal(true)}>
                                    Edit Level Colors <IoIosColorPalette className='ms-2 mb-1'/>
                                </Button>
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>
                </Row>

                <Row className='flex-grow-1 justify-content-center align-items-center'>
                    <Elevator levels={levels}
                              colors={colors}
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

            <Modal show={showContinueModal}
                   backdrop="static"
                   onHide={handleContinueModalNo}>
                <Modal.Header closeButton>
                    <Modal.Title>Elevator Data Found</Modal.Title>
                </Modal.Header>

                <Modal.Body>Would you like to continue where you left off?</Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleContinueModalYes}>Yes</Button>
                    <Button variant="secondary" onClick={handleContinueModalNo}>No</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showLabelModal} onHide={() => setShowLabelModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Elevator Levels</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {levels.map((level, index) => (
                        <Form.Control defaultValue={level.label}
                                      key={index}
                                      size='sm'
                                      className='bg-body-secondary mb-1'
                                      onChange={event => updateLevel(event, index)}/>
                    ))}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLabelModal(false)}>Done</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showColorModal} onHide={() => setShowColorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Elevator Colors</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='d-flex justify-content-evenly'>
                        <div className='text-center'>
                            <Form.Label htmlFor='startColorInput'>Select a start color</Form.Label>
                            <Form.Control
                                type="color"
                                id='startColorInput'
                                defaultValue={'#' + colors[0]}
                                onChange={event => setStartColor(event)}
                                className='mx-auto'
                            />
                        </div>

                        <div>
                            <Form.Label htmlFor='endColorInput'>Select an end color</Form.Label>
                            <Form.Control
                                type="color"
                                id='endColorInput'
                                defaultValue={'#' + colors[1]}
                                onChange={event => setEndColor(event)}
                                className='mx-auto'
                            />
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowColorModal(false)}>Done</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default App;
