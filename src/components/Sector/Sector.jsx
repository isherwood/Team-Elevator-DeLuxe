import Utilities from '../Utilities/Utilities';

const labelStyles = (angle, index, count) => {
    const position = index + 1;

    if (position / count * 360 <= 180) {
        return {
            'transform': 'rotate(' + (angle * position - angle / 2 - 90) + 'deg) ' +
                'translateX(-1.5rem) ' +
                'translateZ(0)'
        };
    }

    return {
        'transform': 'rotate(' + (angle * position - angle / 2 + 90) + 'deg) ' +
            'translateX(calc(-100% + 1.5rem)) ' +
            'translateZ(0)'
    };
}

const Sector = props =>
    <g className='sector-g'
       transform={'translate(' + props.radius + ',' + props.radius + ')'}>
        <path id="sectorPath" d={Utilities.segmentPath(props.degrees, props.radius, props.index + 1)} fill={props.color}
              onClick={props.incrementSegment}/>

        <text className='segment-label' x='500' y='0' textAnchor='middle' writingMode="tb"
              style={labelStyles(props.degrees, props.index, props.segments)}>
            {props.label}
        </text>
    </g>;

export default Sector;