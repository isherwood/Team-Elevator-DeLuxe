import {shallow} from 'enzyme';
import Segment from './Segment';

describe('Segment component', () => {
    let component;

    beforeEach(() => {
        // build the component
        component = shallow(<Segment/>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders successfully', () => {
        expect(component).not.toBeNull();
    });
});
