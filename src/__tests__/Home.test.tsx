import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Home from '../routes/home';

describe('Home', () => {

    it('should render HOME correctly', () => {
        const component = shallow(<Home />);
    
        expect(component).toMatchSnapshot();
    });

    it('should stop navigating to play if NAME input is empty and show warning', () => {
        const component = mount(<Home />);
        component
        .find('button.btnStart')
        .simulate('click');

        expect(component.find('input.warning').length).toBe(1);
    });

});
