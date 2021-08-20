import React, {useEffect } from 'react';
import Character from './Character';
import './style.scss'
import { randomInt } from '../utils';

type Props = {
    onItemClick:Function,
    forceStop: boolean,
    initialState?: boolean[]// for testing
    charStates: any;

}

type CharProps = {
    id: number;
    onItemClick:Function,
    forceStop: boolean,
    charStates: any;
}

const PlayGround = ({onItemClick, forceStop, charStates}:Props) => {

    useEffect(() => {

        const gClock = setInterval(() => charStates[randomInt(0,8)] = true, 500) as any;
        return () => clearInterval(gClock)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const getCharProps = (id:number) => {
    
        return {
            forceStop,
            onItemClick,
            charStates,
            id
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