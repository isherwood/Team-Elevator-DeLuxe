import React, {useEffect, useState} from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {Button, Col, Container, Form, Modal, Offcanvas, Row} from 'react-bootstrap';
import {TfiHelpAlt} from "react-icons/tfi";
import {IoIosColorPalette} from "react-icons/io";
import {GiHamburgerMenu} from "react-icons/gi";
import {GrClose} from "react-icons/gr";

import './App.css';
import Elevator from './components/Elevator/Elevator';
import SortableLevel from './components/SortableLevel/SortableLevel';

function App() {

    // get property from local storage object
    const getItem = key => {
        const data = JSON.parse(localStorage.getItem('TeamElevatorDeLuxe'));
        return data ? data[key] : null;
    }

    const origLevels = [
        {id: 1, label: 'grateful'},
        {id: 2, label: 'wise, insightful'},
        {id: 3, label: 'creative, innovative'},
        {id: 4, label: 'resourceful'},
        {id: 5, label: 'hopeful, optimistic'},
        {id: 6, label: 'appreciative'},
        {id: 7, label: 'patient, understanding'},
        {id: 8, label: 'sense of humor'},
        {id: 9, label: 'flexible, adaptive'},
        {id: 10, label: 'curious, interested'},
        {id: 11, label: 'impatient, frustrated'},
        {id: 12, label: 'irritated, bothered'},
        {id: 13, label: 'worried, anxious'},
        {id: 14, label: 'defensive, insecure'},
        {id: 15, label: 'judgemental, blaming'},
        {id: 16, label: 'self-righteous'},
        {id: 17, label: 'stressed, burned-out'},
        {id: 18, label: 'angry, hostile'},
        {id: 19, label: 'depressed'}
    ];

    const origColors = ['569BFB', '6FFF5C'];

    const [levels, setLevels] = useState(getItem('levels') || origLevels);
    const [levelsChanged, setLevelsChanged] = useState(getItem('levelsChanged') || false);
    const [colors, setColors] = useState(getItem('colors') || origColors);
    const [colorsChanged, setColorsChanged] = useState(getItem('colorsChanged') || false);
    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const [showElevator, setShowElevator] = useState(false);
    const [showContinueModal, setShowContinueModal] = useState(false);
    const [showLabelModal, setShowLabelModal] = useState(false);
    const [showColorModal, setShowColorModal] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

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

        setLevels(origLevels);
        setLevelsChanged(false);
        setColors(origColors);
        setColorsChanged(false);
    }

    const updateLevel = (e, i) => {
        let newLevels = [...levels];
        newLevels[i].label = e.currentTarget.value;

        setLevels(newLevels);
        setLevelsChanged(true);
    }

    const removeLevel = (event, index) => {
        const newLevels = [...levels];
        newLevels.splice(index, 1);

        setLevels(newLevels);
        setLevelsChanged(true);
    }

    const setStartColor = event => {
        const newColors = [...colors];
        newColors[0] = event.currentTarget.value.replace('#', '');

        setColors(newColors);
        setColorsChanged(true);
    }

    const setEndColor = event => {
        const newColors = [...colors];
        newColors[1] = event.currentTarget.value.replace('#', '');

        setColors(newColors);
        setColorsChanged(true);
    }

    const handleDragEnd = event => {
        const {active, over} = event;

        if (active.id !== over.id) {
            setLevels(levels => {
                const oldIndex = levels.findIndex(lev => lev.id === active.id);
                const newIndex = levels.findIndex(lev => lev.id === over.id);

                return arrayMove(levels, oldIndex, newIndex);
            });
        }
    }

    useEffect(() => {

        // set state data in local storage
        window.localStorage.setItem('TeamElevatorDeLuxe', JSON.stringify({
            colors: colors,
            colorsChanged: colorsChanged,
            levels: levels,
            levelsChanged: levelsChanged
        }))
    }, [colors, colorsChanged, levels, levelsChanged]);

    useEffect(() => {
        // check for saved game and prompt for continuation
        if (getItem('levels').filter(l => l.count > 0).length > 0 ||
            getItem('levelsChanged') === true ||
            getItem('colorsChanged') === true) {
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

                            <div className='d-flex justify-content-evenly gap-2 mt-4'>
                                <Button type='primary' className='w-100'
                                        onClick={() => setShowLabelModal(true)}>
                                    Edit Levels <GiHamburgerMenu className='ms-2 mb-1'/>
                                </Button>

                                <Button type='primary' className='w-100'
                                        onClick={() => setShowColorModal(true)}>
                                    Edit Colors <IoIosColorPalette className='ms-2 mb-1'/>
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
                    <Modal.Title>Edit Levels</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={levels}
                            strategy={verticalListSortingStrategy}
                        >
                            {levels.map((level, index) => (
                                <SortableLevel key={level.id} id={level.id}>
                                    <div className='d-flex align-items-start flex-fill'>
                                        <Form.Control defaultValue={level.label}
                                                      size='sm'
                                                      className='bg-body-secondary mb-1'
                                                      onChange={event => updateLevel(event, index)}/>

                                        <Button variant='light' size='sm' className='ms-1'
                                                title='Remove this level'
                                                onClick={event => {
                                                    removeLevel(event, index)
                                                }}><GrClose />
                                        </Button>
                                    </div>
                                </SortableLevel>
                            ))}
                        </SortableContext>
                    </DndContext>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLabelModal(false)}>Done</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showColorModal} onHide={() => setShowColorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Colors</Modal.Title>
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
