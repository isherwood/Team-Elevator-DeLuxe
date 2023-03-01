import {shallow} from 'enzyme';
import Sector from './Sector';

describe('Sector component', () => {
    let component;

    beforeEach(() => {
        // build the component
        component = shallow(<Sector/>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders successfully', () => {
        expect(component).not.toBeNull();
    });
});
