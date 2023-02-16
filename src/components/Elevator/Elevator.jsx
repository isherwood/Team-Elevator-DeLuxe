import React, {useState} from "react";
import {Badge, Col, ListGroup, ListGroupItem} from "react-bootstrap";

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

    return (
        <Col className='col-auto'>
            <ListGroup variant='flush' className='text-center text-uppercase snug'>
                {levels.map((level, index) => (
                    <ListGroupItem key={level.id} action
                                   onClick={() => incrementLevel(index)}>
                        {level.id}
                        <Badge pill className='ms-2' onClick={event => decrementLevel(event, index)}>
                            {level.count > 0 && level.count}</Badge>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Col>
    );
}

export default Elevator;
