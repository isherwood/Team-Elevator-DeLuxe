import React, {useState} from "react";
import {Button, Col} from "react-bootstrap";

import './styles.css';

const Elevator = () => {
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
        let opacity = 0;

        if (count > 0) {
            levels.forEach(level => {
                if (level.count > highestCount) {
                    highestCount = level.count;
                }
            });

            opacity = count / highestCount * .75;
        }

        return {
            opacity: opacity
        }
    }

    return (
        <Col className='col-auto'>
            <div className='btn-box d-grid text-center text-uppercase'>
                {levels.map((level, index) => (
                    <Button key={index} variant='light' className='level-btn py-0 position-relative overflow-hidden'
                            onClick={() => incrementLevel(index)}>
                        <div className='btn-bg' style={getButtonStyles(level.count)}></div>

                        <div className='btn-count position-absolute end-0 lead' onClick={event => decrementLevel(event, index)}>
                            <b>{level.count > 0 && level.count}</b>
                        </div>

                        <div className='position-relative my-1'>{level.id}</div>
                    </Button>
                ))}
            </div>
        </Col>
    );
}

export default Elevator;
