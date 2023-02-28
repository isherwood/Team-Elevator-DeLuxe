import {shallow} from 'enzyme';
import Ring from './Ring';

describe('Ring component', () => {
    let component;

    beforeEach(() => {
        // build the component
        component = shallow(<Ring/>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders successfully', () => {
        expect(component).not.toBeNull();
    });
});
