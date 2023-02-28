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

const countStyles = (angle, index, count) => {
    const position = index + 1;

    if (position / count * 360 < 180) {
        return {
            'transform': 'rotate(' + (angle * position + angle / 2 - 90 - angle) + 'deg) ' +
                'translateX(-2rem) ' +
                'translateZ(0)'
        };
    }

    return {
        'transform': 'rotate(' + (angle * position + angle / 2 + 90 - angle) + 'deg) ' +
            'translateX(calc(-100% + 2rem)) ' +
            'translateZ(0)'
    };
}

const labelStyles = (angle, index, count) => {
    const position = index + 1;

    if (position / count * 360 < 180) {
        return {
            'transform': 'rotate(' + (angle * position + angle / 2 - 90 - angle) + 'deg) ' +
                'translateX(-1rem) ' +
                'translateZ(0)'
        };
    }

    return {
        'transform': 'rotate(' + (angle * position + angle / 2 + 90 - angle) + 'deg) ' +
            'translateX(calc(-100% + 1rem)) ' +
            'translateZ(0)'
    };
}

const textAnchor = (index, count) => {
    return (index + 1) / count * 360 < 180 ? 'end' : 'start'
}

const Segment = props =>
    <g className='segment-g'
       transform={'translate(' + props.radius + ',' + props.radius + ')'}
       stroke="props.color" strokeWidth="2">
        <path d={segmentPath(props.degrees, props.radius, props.index + 1)} fill={props.color}
              onClick={props.incrementSegment}/>
        {props.count > 0 &&
            <text className='segment-count' x='500' y='2.9rem' textAnchor={textAnchor(props.index, props.segments)}
                  style={countStyles(props.degrees, props.index, props.segments)}>{props.count}</text>
        }
        <text className='segment-label' x='500' y='.65rem' textAnchor={textAnchor(props.index, props.segments)}
              style={labelStyles(props.degrees, props.index, props.segments)}>{props.label}</text>
        {props.count > 0 &&
            <text className='segment-count segment-count-over'
                  x='500' y='2.9rem' textAnchor={textAnchor(props.index, props.segments)}
                  style={countStyles(props.degrees, props.index, props.segments)}
                  onClick={props.decrementSegment}>{props.count}</text>
        }
    </g>;

export default Segment;