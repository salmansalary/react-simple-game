import React, { useEffect, useState } from 'react'
import './style.scss'
import classNames from 'classnames';
import { randomInt } from '../utils';

type CharProps = {
    onItemClick:Function,
    forceStop: boolean,
    isActive?: boolean,
    inActivate: Function
}

const charPoints = [-1,-2,-3,-1,-2,-3,-1,5];

const Character = ({onItemClick, isActive, inActivate, forceStop }: CharProps)=>{

    const [ char, setChar ] = useState({ className : '', point: 0 });

    useEffect(() => {

        if(forceStop) return

        let poofTimer, lock;

        if(isActive && !lock){

            lock = true;
            //The probebility of Fox Non-Fox 50% - 50%
            const nomination = Math.random() >= 0.5  ? 7  :  randomInt(0,6);
            
            setChar({
                className: `char${nomination}`,
                point: charPoints[nomination]
            })

            //remove the active state for this hole after 2 second for next random nomination
            poofTimer = setTimeout(function(){
                if(isActive) inActivate();
                lock = false;
                clearTimeout(poofTimer);
            },1100)

        } else setChar({ className: '', point: 0 })


        return () => clearTimeout(poofTimer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceStop, isActive]);

    return <div className='box'>
            <div className="charContainer">
                <div 
                    className={classNames('character', {[char.className]: true})} 
                    onClick={(ev) => {

                        ev.stopPropagation();
                        onItemClick(char?.point);
                        
                        if(isActive) inActivate()             
                        
                    }}
                />
            </div>
            <div className="hole"/>
        </div>
}

const propsAreSameIf = (pre:CharProps,cur:CharProps) => pre.forceStop === cur.forceStop && pre.isActive === cur.isActive

export default React.memo(Character,propsAreSameIf);