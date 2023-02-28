import React, {useState} from "react";
import {Col} from "react-bootstrap";

import './styles.css';
import Segment from "../Segment/Segment";

const Ring = () => {
    const [levels] = useState([
        {id: 'grateful', color: 'pink'},
        {id: 'wise, insightful', color: 'orange'},
        {id: 'creative, innovative', color: 'blue'},
        {id: 'resourceful', color: 'yellow'},
        {id: 'hopeful, optimistic', color: 'red'},
        {id: 'appreciative', color: 'green'},
        {id: 'patient, understanding', color: 'lightblue'},
        {id: 'sense of humor', color: 'lightgray'},
        {id: 'flexible, adaptive', color: 'brown'},
        {id: 'curious, interested', color: 'tan'},
        {id: 'impatient, frustrated', color: 'salmon'},
        {id: 'irritated, bothered', color: 'teal'},
        {id: 'worried, anxious', color: 'lightgreen'},
        {id: 'defensive, insecure', color: 'gray'},
        {id: 'judgemental, blaming', color: 'wheat'},
        {id: 'self-righteous', color: 'purple'},
        {id: 'stressed, burned-out', color: 'lightyellow'},
        {id: 'angry, hostile', color: 'darkgray'},
        {id: 'depressed', color: 'violet'}
    ]);

    // const incrementLevel = level => {
    //     const newLevels = [...levels];
    //
    //     if (newLevels[level]['count']) {
    //         newLevels[level].count++;
    //     } else {
    //         newLevels[level]['count'] = 1;
    //     }
    //
    //     setLevels(newLevels);
    // };
    //
    // const decrementLevel = (event, level) => {
    //     event.stopPropagation();
    //     const newLevels = [...levels];
    //
    //     if (newLevels[level]['count'] > 0) {
    //         newLevels[level].count--;
    //         setLevels(newLevels);
    //     }
    // };
    //
    // const getButtonStyles = count => {
    //     let highestCount = 0;
    //     let opacity = 0.15;
    //
    //     if (count > 0) {
    //         levels.forEach(level => {
    //             if (level.count > highestCount) {
    //                 highestCount = level.count;
    //             }
    //         });
    //
    //         opacity = count / highestCount * .5 + .15;
    //     }
    //
    //     return {
    //         opacity: opacity
    //     }
    // }

    return (
        <>
            <Col className='elevator-col position-relative overflow-hidden'>
                <div className='position-absolute start-0 end-0 h-100 p-3'>
                    <svg width='100%' height='100%' viewBox='0 0 1000 1000'>
                        <circle cx='500' cy='500' r='50%' fill='#eee'></circle>
                        {levels.map((level, index) => (
                            <Segment key={level.id} degrees={360 / levels.length} radius='500' index={index}
                                     color={level.color} label={level.id}></Segment>
                        ))}
                    </svg>
                </div>
            </Col>
        </>
    );
}

export default Ring;
