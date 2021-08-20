import React, { useEffect, useState } from 'react'
import './style.scss'
import classNames from 'classnames';
import { randomInt } from '../utils';

type CharProps = {
    onItemClick:Function,
    forceStop: boolean,
    id: number,
    charStates: any
}

const charPoints = [-1,-2,-3,-1,-2,-3,-1,5];

const Character = ({onItemClick, id, charStates , forceStop }: CharProps)=>{

    const [ char, setChar ] = useState({ className : '', point: 0 });

    useEffect(() => {

        if(forceStop) return

        let poofTimer, lock;

        const checkingTime = randomInt(4,7) * 100;

        const gClock = setInterval(() => {
            
            if(charStates[id] && !lock){

                lock = true;
                //The probebility of Fox Non-Fox 50% - 50%
                const nomination = Math.random() >= 0.5  ? 7  :  randomInt(0,6);
                
                setChar({
                    className: `char${nomination}`,
                    point: charPoints[nomination]
                })

                //remove the active state for this hole after 2 second for next random nomination
                poofTimer = setTimeout(function(){
                    charStates[id] = false;
                    setChar({ className: '', point: 0 });
                    lock = false;
                    clearTimeout(poofTimer);
                },1500)

            }
        }, checkingTime) as any;

        return () => {
            clearInterval(gClock)
            clearTimeout(poofTimer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceStop]);

    return <div className='box'>
            <div className="charContainer">
                <div 
                    className={classNames('character', {[char.className]: true})} 
                    onClick={(ev) => {

                        ev.stopPropagation();
                        onItemClick(char?.point);
                        
                        if(charStates[id] && !forceStop) setChar({ className: '', point: 0 })             
                        
                    }}
                />
            </div>
            <div className="hole"/>
        </div>
}

const propsAreSameIf = (pre:CharProps,cur:CharProps) => pre.forceStop === cur.forceStop

export default React.memo(Character,propsAreSameIf);