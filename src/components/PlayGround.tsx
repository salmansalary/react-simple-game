import React, { useState,useEffect } from 'react';
import Character from './Character';
import './style.scss'
import { randomInt } from '../utils';

const initial =  [false,false,false,false,false,false,false,false,false];

type Props = {
    onItemClick:Function,
    forceStop: boolean,
    initialState?: boolean[]// for testing

}

type CharProps = {
    onItemClick:Function,
    active: boolean,
    inActivate: Function,
    forceStop: boolean
}

const PlayGround = ({onItemClick, forceStop, initialState =  initial}:Props) => {

    const [activeState, setActiveState] = useState(initialState);

    const setActive = (id,value) => setActiveState(pre=>{ 

        if(forceStop){
            return [...initialState];
        }
        if(value === pre[id]) { return pre; }
        const temp = [...pre];
        temp[id] = value;

        return temp;

    })

    useEffect(() => {

        const gClock = setInterval(() => setActive(randomInt(0,8), true), 500) as any;
        return () => clearInterval(gClock)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const getCharProps = (id:number) => {
    
        return {
            forceStop,
            onItemClick,
            active: activeState[id],
            inActivate: ()=>setActive(id,false)
        } as CharProps;

    }

    return <div className="playGround">
        <div className="row">
            <Character {...getCharProps(0)} />
            <Character {...getCharProps(1)} />
            <Character {...getCharProps(2)} />
        </div>
        <div className="row">
            <Character {...getCharProps(3)} />
            <Character {...getCharProps(4)} />
            <Character {...getCharProps(5)} />
        </div>
        <div className="row">
            <Character {...getCharProps(6)} />
            <Character {...getCharProps(7)} />
            <Character {...getCharProps(8)} />
        </div>
    </div>
}

export default PlayGround;