import React, {useEffect, useRef, useState} from "react";
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
import {Button, Col, Container, Form, Modal, Offcanvas, OverlayTrigger, Row, Tooltip} from 'react-bootstrap';
import {TfiHelpAlt} from "react-icons/tfi";
import {GiHamburgerMenu} from "react-icons/gi";
import {GrClose} from "react-icons/gr";
import {IoColorPalette} from "react-icons/io5";

import './App.css';
import Elevator from './components/Elevator/Elevator';
import SortableLevel from './components/SortableLevel/SortableLevel';
import origLevels from './services/OriginalLevels';
import presets from './services/PresetThemes';

function App() {

    // get property from local storage object
    const getItem = key => {
        const data = JSON.parse(localStorage.getItem('TeamElevatorDeLuxe'));
        return data ? data[key] : null;
    }

    const origColors = ['569BFB', '6FFF5C'];

    const [levels, setLevels] = useState(getItem('levels') || origLevels);
    const [newLevel, setNewLevel] = useState('');
    const [levelsChanged, setLevelsChanged] = useState(getItem('levelsChanged') || false);
    const [colors, setColors] = useState(getItem('colors') || origColors);
    const [colorsChanged, setColorsChanged] = useState(getItem('colorsChanged') || false);
    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const [showElevator, setShowElevator] = useState(false);
    const [showContinueModal, setShowContinueModal] = useState(false);
    const [showLabelModal, setShowLabelModal] = useState(false);
    const [showThemeModal, setShowThemeModal] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const gradientDemoStyles = {
        background: 'linear-gradient(to right, #' + colors[0] + ', #' + colors[1] + ')'
    };

    const getPresetStyles = preset => {
        return {
            background: 'linear-gradient(to right, #' + preset.start + ', #' + preset.end + ')'
        }
    };

    const levelInputRef = useRef();

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

    const addLevel = event => {
        event.preventDefault();

        if (newLevel !== '' && levels.filter(l => l.label === newLevel).length === 0) {
            const newLevels = [...levels];
            const newLevelId = Math.max(...levels.map(l => l.id)) + 1;

            newLevels.unshift({id: newLevelId, label: newLevel});
            setLevels(newLevels);
            levelInputRef.current.value = '';
        }
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

    const setPreset = (event, preset) => {
        setColors([preset.start, preset.end]);
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
                        <Offcanvas.Header closeButton/>

                        <Offcanvas.Body>
                            <h2 className='display-6'>Instructions</h2>
                            <p>Click an elevator level to increase its count. Click a count to reduce it.</p>

                            <h2 className='display-6'>Options</h2>

                            <Form.Group className='my-3'>
                                <Form.Check type="checkbox" id='randomizePlayersCheckbox' label="Show team elevation"
                                            defaultChecked={showElevator}
                                            onClick={e => setShowElevator(e.currentTarget.checked)}/>
                            </Form.Group>

                            <div className='d-flex align-items-end mt-4 mb-4'>
                                <div className='px-2 text-center'>
                                    <Form.Label htmlFor='startColorInput'>Start color</Form.Label>
                                    <Form.Control
                                        type="color"
                                        id='startColorInput'
                                        value={'#' + colors[0]}
                                        onChange={event => setStartColor(event)}
                                        className='mx-auto'
                                    />
                                </div>

                                <div style={gradientDemoStyles} className='flex-fill mb-2 py-2'></div>

                                <div className='px-2 text-center'>
                                    <Form.Label htmlFor='endColorInput'>End color</Form.Label>
                                    <Form.Control
                                        type="color"
                                        id='endColorInput'
                                        value={'#' + colors[1]}
                                        onChange={event => setEndColor(event)}
                                        className='mx-auto'
                                    />
                                </div>
                            </div>

                            <Button variant='secondary' className='mt-2 w-100'
                                    onClick={() => setShowThemeModal(true)}>
                                Select a Theme Preset <IoColorPalette className='ms-2 mb-1'/>
                            </Button>

                            <Button variant='secondary' className='mt-2 w-100'
                                    onClick={() => setShowLabelModal(true)}>
                                Edit Levels <GiHamburgerMenu className='ms-2 mb-1'/>
                            </Button>
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

            <Modal show={showThemeModal}
                   onHide={() => setShowThemeModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select a Theme Preset</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="d-flex flex-wrap justify-content-between">
                        {presets.map(preset => (
                            <div className="w-50 px-1">
                                <Button variant='outline-light' key={preset.name}
                                        style={getPresetStyles(preset)}
                                        onClick={(event) => setPreset(event, preset)}
                                        className='preset-btn w-100 my-1 py-3'>
                                    <b className='text-white'>{preset.name}</b>
                                </Button>
                            </div>
                        ))}
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowThemeModal(false)}>Done</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showLabelModal} onHide={() => setShowLabelModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Levels</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={event => addLevel(event)}>
                        <Form.Control ref={levelInputRef}
                                      placeholder='Enter a new level label'
                                      className='bg-body-secondary mb-3'
                                      defaultValue={newLevel}
                                      autoCapitalize='none'
                                      onKeyDown={event => setNewLevel(event.currentTarget.value)}/>
                    </Form>

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

                                        <OverlayTrigger
                                            delay='500'
                                            overlay={<Tooltip>Remove this level</Tooltip>}>
                                            <Button variant='light' size='sm' className='ms-1'
                                                    onClick={event => {
                                                        removeLevel(event, index)
                                                    }}><GrClose/>
                                            </Button>
                                        </OverlayTrigger>
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
        </>
    );
}

export default App;
