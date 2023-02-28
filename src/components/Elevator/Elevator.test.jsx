import {shallow} from 'enzyme';
import Elevator from './Elevator';

describe('Elevator component', () => {
    let component;

    beforeEach(() => {
        // build the component
        component = shallow(<Elevator/>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders successfully', () => {
        expect(component).not.toBeNull();
    });
});
