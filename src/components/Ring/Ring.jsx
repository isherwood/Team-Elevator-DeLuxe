import React, {useState} from "react";
import {Col} from "react-bootstrap";

import './styles.css';
import Segment from "../Segment/Segment";

const Ring = () => {
    const [segments, setSegments] = useState([
        {id: 'calm, grateful', color: 'pink'},
        {id: 'present, grounded', color: 'orange'},
        {id: 'accepting, kind', color: 'blue'},
        {id: 'inspired, moved', color: 'yellow'},
        {id: 'in awe, proud', color: 'red'},
        {id: 'challenged, motivated', color: 'green'},
        {id: 'avoiding, averse', color: 'lightblue'},
        {id: 'awful, nauseous', color: 'lightgray'},
        {id: 'uncomfortable, self-conscious', color: 'brown'},
        {id: 'lost, purposeless', color: 'tan'},
        {id: 'tired, exhausted', color: 'salmon'},
        {id: 'bored, numb', color: 'teal'},
        {id: 'worried, anxious', color: 'lightgreen'},
        {id: 'busy, overwhelmed', color: 'gray'},
        {id: 'insignificant, unappreciated', color: 'wheat'},
        {id: 'reactive, defensive', color: 'purple'},
        {id: 'frustrated, irritated', color: 'maroon'},
        {id: 'tense, angry', color: 'violet'}
    ]);

    const incrementSegment = segment => {
        const newSegments = [...segments];

        if (newSegments[segment]['count']) {
            newSegments[segment].count++;
        } else {
            newSegments[segment]['count'] = 1;
        }

        setSegments(newSegments);
    };

    // const decrementSegment = (event, segment) => {
    //     event.stopPropagation();
    //     const newSegments = [...segments];
    //
    //     if (newSegments[segment]['count'] > 0) {
    //         newSegments[segment].count--;
    //         setSegments(newSegments);
    //     }
    // };

    return (
        <Col className='elevator-col position-relative overflow-hidden'>
            <div className='position-absolute start-0 end-0 h-100 p-4'>
                <svg className='ring-svg' width='100%' height='100%' viewBox='0 0 1000 1000'>
                    <circle cx='500' cy='500' r='50%' fill='#eee'></circle>
                    {segments.map((segment, index) => (
                        <Segment key={segment.id} degrees={360 / segments.length} radius='500' index={index}
                                 count={segments.length} color={segment.color} label={segment.id}
                                 onClick={incrementSegment}></Segment>
                    ))}
                </svg>
            </div>
        </Col>
    );
}

export default Ring;
