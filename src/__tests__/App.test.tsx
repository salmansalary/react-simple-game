import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import App from '../App';

describe('App', () => {

    it('should render App correctly', () => {
        const component = shallow(<App />);
    
        expect(component).toMatchSnapshot();
    });

    it('should navigate correctly after press start with valid NAME input', async () => {
       
        

        await act(async function() {

            const component = mount(<App />);
    
            //Wait for resource preload
            await new Promise(resolve => setTimeout(()=>resolve(true),1000))
            component.update()

            let input = component.find('input.nameInput');
            input.instance().value = "SALMAN"
            input.simulate('change');
    
            const startBtn = component.find('button.btnStart');
            startBtn.simulate('click');
    
            expect(global.window.location.pathname).toEqual('/play');

        });
        
    });

});

