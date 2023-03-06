import Utilities from '../Utilities/Utilities';
import './styles.css';

const Sector = props => (
    <g className='sector-g'
       transform={'translate(' + props.radius + ',' + props.radius + ')'}>
        <path id={'sectorPath_' + props.index}
              d={Utilities.segmentPath(props.degrees, props.radius, props.index + 1, props.reverse)}
              fill={props.color}
              onClick={props.incrementSegment}/>

        <text className='sector-label' x='0' y='0'>
            <textPath href={'#sectorPath_' + props.index}
                      startOffset='50%'
                      textAnchor='middle'
                      dominantBaseline='hanging'
                      baselineShift={props.index === 2 || props.index === 3 ? '38px' : '-10px'}>{props.label}</textPath>
        </text>
    </g>
);

export default Sector;