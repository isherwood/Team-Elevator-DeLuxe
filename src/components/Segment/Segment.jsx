import React from 'react';

import Utilities from '../Utilities/Utilities';
import './styles.css';

const countStyles = (angle, index, count) => {
    const position = index + 1;

    if (position / count * 360 <= 180) {
        return {
            'transform': 'rotate(' + (angle * position - angle / 2 - 91) + 'deg) ' +
                'translateX(-1.5rem) ' +
                'translateZ(0)'
        };
    }

    return {
        'transform': 'rotate(' + (angle * position - angle / 2 + 92) + 'deg) ' +
            'translateX(calc(-100% + 8rem)) ' +
            'translateZ(0)'
    };
}

const labelStyles = (angle, index, count) => {
    const position = index + 1;

    if (position / count * 360 <= 180) {
        return {
            'transform': 'rotate(' + (angle * position + angle / 2 - 90 - angle) + 'deg) ' +
                'translateX(-1rem) ' +
                'translateZ(0)'
        };
    }

    return {
        'transform': 'rotate(' + (angle * position + angle / 2 + 90 - angle) + 'deg) ' +
            'translateX(calc(-100% + 1rem + 100px)) ' +
            'translateZ(0)'
    };
}

const textAnchor = (index, count) => {
    return (index + 1) / count * 360 <= 180 ? 'end' : 'start'
}

const Segment = props => (
    <g className='segment-g'
       transform={'translate(' + props.radius + ',' + props.radius + ')'}>
        <path d={Utilities.segmentPath(props.degrees, props.radius - 50, props.index + 1)} fill={props.color}
              onClick={props.incrementSegment}/>

        {props.count > 0 &&
            <text className='segment-count' x='450' y='2.9rem' textAnchor={textAnchor(props.index, props.segments)}
                  style={countStyles(props.degrees, props.index, props.segments)}>{props.count}</text>
        }

        <text className='segment-label' x='450' y='.5rem' textAnchor={textAnchor(props.index, props.segments)}
              style={labelStyles(props.degrees, props.index, props.segments)}>{props.label}</text>

        {props.count > 0 &&
            <text className='segment-count segment-count-over'
                  x='450' y='2.9rem' textAnchor={textAnchor(props.index, props.segments)}
                  style={countStyles(props.degrees, props.index, props.segments)}
                  onClick={props.decrementSegment}>{props.count}</text>
        }
    </g>
);

export default Segment;