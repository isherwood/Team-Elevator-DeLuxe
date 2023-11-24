import React, {useEffect, useState} from "react";
import {Button, Col} from "react-bootstrap";
import {GiElevator} from "react-icons/gi";

import './styles.css';
import ColorGradientService from "../../services/ColorGradient";

const Elevator = props => {
    const [elevatorHeight, setElevatorHeight] = useState(0);
    const [colorArr, setColorArr] = useState(ColorGradientService.generateColors(
        props.colors[0], props.colors[1], props.levels.length));

    const getButtonStyles = (index, count) => {
        let highestCount = 0;
        let opacity = 0.15;

        props.levels.forEach(level => {
            if (level.count > highestCount) {
                highestCount = level.count;
            }
        });

        if (highestCount === 0) {
            opacity = 1;
        } else {
            if (count > 0) {
                opacity = 0.3 + 0.7 * count / highestCount;
            } else {
                opacity = 0.15;
            }
        }

        return {
            opacity: opacity,
            backgroundColor: '#' + colorArr[index]
        }
    }

    const getElevatorStyles = () => {
        return {
            bottom: elevatorHeight + '%'
        }
    }

    useEffect(() => {
        let totalCount = 0;
        let totalWeight = 0;
        let height;

        props.levels.forEach((level, index) => {
            if (level.count > 0) {
                totalCount += level.count;
                totalWeight += (props.levels.length - index - 1) * level.count;
            }
        });

        height = totalWeight / totalCount / props.levels.length * 100;
        if (isNaN(height) || height < 0) height = 0;

        setElevatorHeight(height);
    }, [props.levels]);

    useEffect(() => {
        setColorArr(ColorGradientService.generateColors(props.colors[0], props.colors[1], props.levels.length));
    }, [props.colors, props.levels]);

    return (
        <>
            <Col className='elevator-col col-auto d-flex'>
                <div className='elevator-list d-grid text-center'>
                    {props.levels.map((level, index) => (
                        <Button key={index} variant='light'
                                className='level-btn py-0 position-relative overflow-hidden'
                                onClick={() => props.incrementLevel(index)}>
                            <div className='btn-bg' style={getButtonStyles(index, level.count)}></div>

                            <div className='btn-count position-absolute lead'
                                 onClick={event => props.decrementLevel(event, index)}>
                                <b className='count-pill badge pill text-dark'>{level.count > 0 && level.count}</b>
                            </div>

                            <div className='position-relative my-1'>{level.label}</div>
                        </Button>
                    ))}
                </div>

                {props.showElevator &&
                    <div className='elevator-shaft ms-2 bg-secondary rounded-2'>
                        <div className='position-relative h-100'>
                            <GiElevator className='elevator display-5 text-dark opacity-75 position-absolute'
                                        style={getElevatorStyles()}/>
                        </div>
                    </div>
                }
            </Col>
        </>
    );
}

export default Elevator;
