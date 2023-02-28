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

const segmentPath = (degrees, radius, order) => {
    degrees = parseFloat(degrees);
    return describeSlice(0, 0, radius, degrees * order - degrees, degrees * order) + 'Z';
};

const segmentStyles = (angle, index, count) => {
    if (index / count < 0.5) {
        return {'transform': 'rotate(' + (angle * index + angle / 2 - 90 - angle) + 'deg) ' +
                'translateX(-1rem) ' +
                'translateZ(0)'};
    }

    return {
        'transform': 'rotate(' + (angle * index + angle / 2 + 90 - angle) + 'deg) ' +
            'translateX(calc(-100% + 1rem)) ' +
            'translateZ(0)'
    };
}

const textAnchor = (index, count) => {
    return (index + 1) / count < 0.5 ? 'end' : 'start'
}

const Segment = props =>
    <g className='segment-g'
       transform={'translate(' + props.radius + ',' + props.radius + ')'}
       stroke="props.color" strokeWidth="2">
        <path d={segmentPath(props.degrees, props.radius, props.index + 1)} fill={props.color}/>
        <text className='segment-label' x='500' y='.65rem' textAnchor={textAnchor(props.index, props.count)}
              style={segmentStyles(props.degrees, props.index + 1, props.count)}>{props.label}</text>
    </g>;

export default Segment;