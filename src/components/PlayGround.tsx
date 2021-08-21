import React, {useEffect, useState, useCallback } from 'react';
import Character from './Character';
import './style.scss'
import { randomInt } from '../utils';

type Props = {
    onItemClick:Function,
    forceStop: boolean,
    initialState?: boolean[],// for testing
    charStates: any

}

type CharProps = {
    onItemClick:Function,
    forceStop: boolean,
    isActive?: boolean,
    inActivate: Function
}

const PlayGround = ({onItemClick, forceStop,charStates}:Props) => {

    const [ active_0, setActive_0 ] = useState(charStates[0]);
    const [ active_1, setActive_1 ] = useState(charStates[1]);
    const [ active_2, setActive_2 ] = useState(charStates[2]);
    const [ active_3, setActive_3 ] = useState(charStates[3]);
    const [ active_4, setActive_4 ] = useState(charStates[4]);
    const [ active_5, setActive_5 ] = useState(charStates[5]);
    const [ active_6, setActive_6 ] = useState(charStates[6]);
    const [ active_7, setActive_7 ] = useState(charStates[7]);
    const [ active_8, setActive_8 ] = useState(charStates[8]);

    const setCharState = useCallback(function(id,st){
        switch(id) {
            case 0:
                setActive_0(st);
                break;
            case 1:
                setActive_1(st);
                break;
            case 2:
                setActive_2(st);
                break;
            case 3:
                setActive_3(st);
                break;
            case 4:
                setActive_4(st);
                break;
            case 5:
                setActive_5(st);
                break;
            case 6:
                setActive_6(st);
                break;
            case 7:
                setActive_7(st);
                break;
            case 8:
                setActive_8(st);
                break;
            default:
          }
    },[]);

    useEffect(() => {

        const gClock = setInterval(() => setCharState(randomInt(0,8),true), 500) as any;
        return () => clearInterval(gClock)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const getCharProps = (id:number) => {
    
        return {
            forceStop,
            onItemClick,
            inActivate: setCharState.bind({},id,false)
        } as CharProps;

    }

    return <div className="playGround">
        <div className="row">
            <Character  isActive = {active_0} {...getCharProps(0)} />
            <Character  isActive = {active_1} {...getCharProps(1)} />
            <Character  isActive = {active_2} {...getCharProps(2)} />
        </div>
        <div className="row">
            <Character  isActive = {active_3} {...getCharProps(3)} />
            <Character  isActive = {active_4} {...getCharProps(4)} />
            <Character  isActive = {active_5} {...getCharProps(5)} />
        </div>
        <div className="row">
            <Character  isActive = {active_6} {...getCharProps(6)} />
            <Character  isActive = {active_7} {...getCharProps(7)} />
            <Character  isActive = {active_8} {...getCharProps(8)} />
        </div>
    </div>
}

export default PlayGround;