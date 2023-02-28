import React from 'react';

import './styles.css';

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
};

const describeSlice = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        "M", 0, 0, start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
};

const path = (degrees, radius, order) => {
    degrees = parseFloat(degrees);
    return describeSlice(0, 0, radius, degrees * order, degrees * order + degrees) + 'Z';
};

const segmentStyles = (angle, index) => {
    return {'transform': 'rotate(' + (angle * index + angle / 2 - 90) + 'deg)'};
}

export const Segment = props =>
    <g className='segment-g'
       transform={'translate(' + props.radius + ',' + props.radius + ')'}
       stroke="props.color" strokeWidth="2">
        <path d={path(props.degrees, props.radius, props.index + 1)} fill={props.color}/>
        <text className='segment-label' x='490' y='.75rem' textAnchor='end'
              style={segmentStyles(props.degrees, props.index + 1)}>{props.label}</text>
    </g>;

export default Segment;