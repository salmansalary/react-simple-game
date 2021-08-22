import React, { useEffect } from 'react'
import './style.scss'
import classNames from 'classnames';

type CharProps = {
    onItemClick:Function,
    forceStop: boolean,
    activeClass: string,
    id: number
}
const Character = ({id, onItemClick, activeClass, forceStop }: CharProps)=>{

    useEffect(() => {

        if(forceStop) return

        let poofTimer;

        if(activeClass !== ''){

            poofTimer = setTimeout(function(){
                onItemClick(id);
                clearTimeout(poofTimer);
            },1000)

        }

        return () => clearTimeout(poofTimer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceStop, activeClass]);

    return <div className='box'>
            <div className="charContainer">
                <div 
                    className={classNames('character', {[activeClass]: true})} 
                    onClick={(ev) => {

                        ev.stopPropagation();
                        onItemClick(id,activeClass);
                        
                    }}
                />
            </div>
            <div className="hole"/>
        </div>
}

const propsAreSameIf = (pre:CharProps,cur:CharProps) => pre.forceStop === cur.forceStop && pre.activeClass === cur.activeClass

export default React.memo(Character,propsAreSameIf)