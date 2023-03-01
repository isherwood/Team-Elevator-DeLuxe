import Utilities from '../Utilities/Utilities';
import './styles.css';

const Sector = props => (
    <g className='sector-g'
       transform={'translate(' + props.radius + ',' + props.radius + ')'}>
        <path id={'sectorPath_' + props.index}
              d={Utilities.segmentPath(props.degrees, props.radius, props.index + 1)}
              fill={props.color}
              onClick={props.incrementSegment}/>

        <text className='sector-label' x='0' y='0'>
            <textPath href={'#sectorPath_' + props.index}
                      startOffset='50%'
                      textAnchor='middle'
                      dominantBaseline='hanging'
                      baselineShift='38px'>{props.label}</textPath>
        </text>
    </g>
);

export default Sector;