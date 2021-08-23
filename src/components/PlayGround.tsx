import React, {useEffect, useState, useCallback, useMemo } from 'react';
import Character from './Character';
import './style.scss'
import { randomInt, GameAudio } from '../utils';

type Props = {
    onItemClick:Function,
    forceStop: boolean,
    initialState?: boolean[],// for testing
    charStates: any,
    charPoints: any

}

const PlayGround = ({onItemClick: clickFunction , forceStop, charStates, charPoints }:Props) => {

    const [ activeClasses, setActive ] = useState(charStates);

    const  audioObject = useMemo(() => new GameAudio(),[]);
    const setCharState = useCallback((id,active) => setActive(pre=> { 

        if(active && pre[id] === ''){
            //The probebility of Fox Non-Fox 50% - 50%
            const nomination = Math.random() >= 0.5  ? 7  :  randomInt(0,6);
            return {...pre,[id]:`char${nomination}`}
        } 
        else if(!active) return {...pre,[id]:''}
        else return pre

    }) ,[]);

    const onItemClick = useCallback((id,activeClass?) => {

        if(activeClass && activeClass !== '') clickFunction(charPoints[activeClass])
        setCharState(id,false)
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } ,[]);

    useEffect(() => {
        if(forceStop) return
        const gClock = setInterval(() => setCharState(randomInt(0,8),true), 500) as any;
        return () => clearInterval(gClock)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div className="playGround">
        <div className="row">
            <Character id={0} forceStop={forceStop} onItemClick={onItemClick} activeClass={activeClasses[0]} audioObject={audioObject} />
            <Character id={1} forceStop={forceStop} onItemClick={onItemClick} activeClass={activeClasses[1]} audioObject={audioObject} />
            <Character id={2} forceStop={forceStop} onItemClick={onItemClick} activeClass={activeClasses[2]} audioObject={audioObject} />
        </div>
        <div className="row">
            <Character id={3} forceStop={forceStop} onItemClick={onItemClick} activeClass={activeClasses[3]} audioObject={audioObject} />
            <Character id={4} forceStop={forceStop} onItemClick={onItemClick} activeClass={activeClasses[4]} audioObject={audioObject} />
            <Character id={5} forceStop={forceStop} onItemClick={onItemClick} activeClass={activeClasses[5]} audioObject={audioObject} />
        </div>
        <div className="row">
            <Character id={6} forceStop={forceStop} onItemClick={onItemClick} activeClass={activeClasses[6]} audioObject={audioObject} />
            <Character id={7} forceStop={forceStop} onItemClick={onItemClick} activeClass={activeClasses[7]} audioObject={audioObject} />
            <Character id={8} forceStop={forceStop} onItemClick={onItemClick} activeClass={activeClasses[8]} audioObject={audioObject} />
        </div>
    </div>
}

const propsAreSameIf = (pre:Props,cur:Props) => pre.forceStop === cur.forceStop

export default React.memo(PlayGround,propsAreSameIf);