import React, { useEffect, useState } from 'react'
import './style.scss'
import classNames from 'classnames';
import { randomInt } from '../utils';

type CharProps = {
    onItemClick:Function,
    forceStop: boolean,
    isActive?: boolean,
    inActivate: Function
    charPoints?: any;
}

const Character = ({onItemClick, isActive, inActivate, forceStop, charPoints }: CharProps)=>{

    const [ charClass, setCharClass ] = useState('');

    useEffect(() => {

        if(forceStop) return

        let poofTimer;

        if(isActive){

            //The probebility of Fox Non-Fox 50% - 50%
            const nomination = Math.random() >= 0.5  ? 7  :  randomInt(0,6);
            
            setCharClass(`char${nomination}`)

            poofTimer = setTimeout(function(){
                if(isActive) inActivate();
                clearTimeout(poofTimer);
            },1000)

        } else setCharClass('')


        return () => clearTimeout(poofTimer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceStop, isActive]);

    return <div className='box'>
            <div className="charContainer">
                <div 
                    className={classNames('character', {[charClass]: true})} 
                    onClick={(ev) => {

                        ev.stopPropagation();
                        onItemClick(charPoints[charClass]);
                        inActivate()
                        
                    }}
                />
            </div>
            <div className="hole"/>
        </div>
}

const propsAreSameIf = (pre:CharProps,cur:CharProps) => pre.forceStop === cur.forceStop && pre.isActive === cur.isActive

const CharacterContainer = React.memo((props: CharProps) => {

    const charPoints = {
        char0: -1,
        char1: -2,
        char2: -3,
        char3: -1,
        char4: -2,
        char5: -3,
        char6: -1,
        char7: 5,
    }

    return <Character {...props} charPoints={charPoints}/>

},propsAreSameIf)

export default CharacterContainer