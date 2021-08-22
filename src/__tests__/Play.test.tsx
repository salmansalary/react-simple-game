import React from 'react';
import { act } from 'react-dom/test-utils';

import { shallow, mount } from 'enzyme';
import Play from '../routes/play';

describe('Play', () => {
    
    window.HTMLMediaElement.prototype.load = () => { /* do nothing */ };
    window.HTMLMediaElement.prototype.play = () => { return {}  as any;/* do nothing */ };
    window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };

    it('should render App correctly', () => {
        const component = shallow(<Play initialGameTime={4} charStates = {{0:'char7'}}/>);
    
        expect(component).toMatchSnapshot();
    });

    it('should score change after clicking on characters', async () => {

        let component;

        await act(async function() {
            component = mount(<Play initialGameTime={5} charStates = {{0:'char7'}}/>);
    
            // Clicking on all the Characters to capture at lease one of the active Characters
            await new Promise(resolve => setTimeout(()=>resolve(true),300))

            component.find('div.character').map((char,index)=>{
                index == 0 ? char.simulate('click') : {}
                return char
            })
            
        })
        
        expect(component.find('label.score').text()).not.toBe('0')
    });
});

