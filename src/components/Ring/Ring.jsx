import React, {useState} from "react";
import {Col} from "react-bootstrap";

import './styles.css';
import Segment from "../Segment/Segment";

const Ring = () => {
    const [segments, setSegments] = useState([
        {id: 'calm, grateful', color: '#e9eca1'},
        {id: 'present, grounded', color: '#e8ec77'},
        {id: 'accepting, kind', color: '#e8ed51'},
        {id: 'inspired, moved', color: '#a1e9ec'},
        {id: 'in awe, proud', color: '#77e9ec'},
        {id: 'challenged, motivated', color: '#51e9ed'},
        {id: 'avoiding, averse', color: '#a1ecba'},
        {id: 'awful, nauseous', color: '#77ec9e'},
        {id: 'uncomfortable, self-conscious', color: '#51ed82'},
        {id: 'lost, purposeless', color: '#a1cbec'},
        {id: 'tired, exhausted', color: '#77b8ec'},
        {id: 'bored, numb', color: '#51abed'},
        {id: 'worried, anxious', color: '#c7a1ec'},
        {id: 'busy, overwhelmed', color: '#b277ec'},
        {id: 'insignificant, unappreciated', color: '#a251ed'},
        {id: 'reactive, defensive', color: '#ecaba1'},
        {id: 'frustrated, irritated', color: '#f08776'},
        {id: 'tense, angry', color: '#ed6851'}
    ]);

    const incrementSegment = index => {
        const newSegments = [...segments];

        if (newSegments[index]['count']) {
            newSegments[index].count++;
        } else {
            newSegments[index]['count'] = 1;
        }

        setSegments(newSegments);
    };

    const decrementSegment = (event, index) => {
        event.stopPropagation();
        const newSegments = [...segments];

        if (newSegments[index]['count'] > 0) {
            newSegments[index].count--;
            setSegments(newSegments);
        }
    };

    return (
        <Col className='elevator-col position-relative overflow-hidden'>
            <div className='position-absolute start-0 end-0 h-100 p-4'>
                <svg className='ring-svg' width='100%' height='100%' viewBox='0 0 1000 1000'>
                    <circle cx='500' cy='500' r='50%' fill='#eee'></circle>
                    {segments.map((segment, index) => (
                        <Segment key={segment.id} degrees={360 / segments.length} radius='500' index={index}
                                 segments={segments.length} count={segment.count}
                                 color={segment.color} label={segment.id}
                                 incrementSegment={() => incrementSegment(index)}
                                 decrementSegment={event => decrementSegment(event, index)}></Segment>
                    ))}
                    <circle cx='500' cy='500' r='5%' fill='#fff'></circle>
                </svg>
            </div>
        </Col>
    );
}

export default Ring;
