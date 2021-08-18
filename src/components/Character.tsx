import React, { useEffect, useState } from 'react'
import './style.scss'
import classNames from 'classnames';
import { randomInt } from '../utils';

type CharProps = {
    onItemClick:Function,
    active: boolean,
    inActivate: Function,
    forceStop: boolean
}

const charPoints = [-1,-2,-3,-1,-2,-3,-1,5];

const Character = ({onItemClick, active, inActivate, forceStop }: CharProps)=>{

    const [ char, setChar ] = useState({ className : '', point: 0 });

    useEffect(() => {

        let hideTimer, poofTimer;

        if(active && !forceStop) {

            //The probebility of Fox Non-Fox 50% - 50%
            const nomination = randomInt(0,1) === 1  ? 7  :  randomInt(0,6);
            
            setChar({
                className: `char${nomination}`,
                point: charPoints[nomination]
            })

            //Start going back to the hole after 1 sec show
            hideTimer = setTimeout(function(){
                setChar({
                    className: `char${nomination} nochar`,
                    point: charPoints[nomination]
                })
                clearTimeout(hideTimer);
            },1000)

            //remove the active state for this hole after 2 second for next random nomination
            poofTimer = setTimeout(function(){
                if(active && !forceStop) inActivate();
                clearTimeout(poofTimer);
            },2000)

        } else if(!forceStop) {
            //set char class empty incase of user clicking or 2 second removal
            setChar({
                className: ``,
                point: 0
            })
        }

        return () => {
            clearTimeout(hideTimer);
            clearTimeout(poofTimer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, forceStop])

    return <div className='box'>
            <div className="charContainer">
                <div 
                    className={classNames('character', {[char.className]: true})} 
                    onClick={(ev)=>{

                        ev.stopPropagation();
                        onItemClick(char?.point);
                        if(active && !forceStop) inActivate();

                    }}
                />
            </div>
            <div className="hole"/>
        </div>
}

const propsAreSameIf = (pre:CharProps,cur:CharProps) => pre.active === cur.active && pre.forceStop === cur.forceStop

export default React.memo(Character,propsAreSameIf);