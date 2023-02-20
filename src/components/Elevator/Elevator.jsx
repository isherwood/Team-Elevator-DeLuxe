import React, {useEffect, useState} from "react";
import {Button, Col} from "react-bootstrap";
import {GiElevator} from "react-icons/gi";

import './styles.css';

const Elevator = props => {
    const [levels, setLevels] = useState([
        {id: 'grateful'},
        {id: 'wise, insightful'},
        {id: 'creative, innovative'},
        {id: 'resourceful'},
        {id: 'hopeful, optimistic'},
        {id: 'appreciative'},
        {id: 'patient, understanding'},
        {id: 'sense of humor'},
        {id: 'flexible, adaptive'},
        {id: 'curious, interested'},
        {id: 'impatient, frustrated'},
        {id: 'irritated, bothered'},
        {id: 'worried, anxious'},
        {id: 'defensive, insecure'},
        {id: 'judgemental, blaming'},
        {id: 'self-righteous'},
        {id: 'stressed, burned-out'},
        {id: 'angry, hostile'},
        {id: 'depressed'}
    ]);
    const [elevatorHeight, setElevatorHeight] = useState(0);

    const incrementLevel = level => {
        const newLevels = [...levels];

        if (newLevels[level]['count']) {
            newLevels[level].count++;
        } else {
            newLevels[level]['count'] = 1;
        }

        setLevels(newLevels);
    };

    const decrementLevel = (event, level) => {
        event.stopPropagation();
        const newLevels = [...levels];

        if (newLevels[level]['count'] > 0) {
            newLevels[level].count--;
            setLevels(newLevels);
        }
    };

    const getButtonStyles = count => {
        let highestCount = 0;
        let opacity = 0.15;

        if (count > 0) {
            levels.forEach(level => {
                if (level.count > highestCount) {
                    highestCount = level.count;
                }
            });

            opacity = count / highestCount * .5 + .15;
        }

        return {
            opacity: opacity
        }
    }

    const getElevatorStyles = () => {
        return {
            bottom: elevatorHeight + '%'
        }
    }

    useEffect(() => {
        let lowestLevel = 0;
        let totalCount = 0;
        let totalWeight = 0;
        let height;

        levels.forEach((level, index) => {
            if (level.count > 0) {
                if (!lowestLevel) lowestLevel = index;
            }
        });

        levels.forEach((level, index) => {
            if (level.count > 0) {
                totalCount += level.count;
                totalWeight += (levels.length - index - 1) * level.count;
            }
        });

        height = totalWeight / totalCount / levels.length * 100;
        if (isNaN(height) || height < 0) height = 0;

        setElevatorHeight(height);
    }, [levels]);

    return (
        <>
            <Col className='elevator-col col-auto d-flex'>
                <div className='elevator-list d-grid text-center'>
                    {levels.map((level, index) => (
                        <Button key={index} variant='light' className='level-btn py-0 position-relative overflow-hidden'
                                onClick={() => incrementLevel(index)}>
                            <div className='btn-bg' style={getButtonStyles(level.count)}></div>

                            <div className='btn-count position-absolute lead'
                                 onClick={event => decrementLevel(event, index)}>
                                <b className='count-pill badge pill text-dark'>{level.count > 0 && level.count}</b>
                            </div>

                            <div className='position-relative my-1'>{level.id}</div>
                        </Button>
                    ))}
                </div>

                {props.showElevator &&
                    <div className='elevator-shaft ms-2 bg-secondary rounded-2'>
                        <div className='position-relative h-100'>
                            <GiElevator className='elevator display-5 text-white opacity-75 position-absolute'
                                        style={getElevatorStyles()}/>
                        </div>
                    </div>
                }
            </Col>
        </>
    );
}

export default Elevator;
