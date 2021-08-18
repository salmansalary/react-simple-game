import React, { useEffect, useState } from 'react'
import './style.scss'

type TimerProps = {
    onStop:Function;
    initialGameTime: number;
}

const Timer = ({ onStop, initialGameTime } : TimerProps)=>{
    const [timer, setTime ] = useState(initialGameTime)

    useEffect(()=>{

        const keepTime = setTimeout(function(){
            if(timer < 1){
                onStop()
                clearTimeout(keepTime)
                return;
            }
            setTime(timer - 1);
        },1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[timer])

    return <label className="timer">{"0" + Math.floor(timer/60) + " : " + timer % 60}</label>
}

const MemoizedTimer = React.memo(Timer);

export default MemoizedTimer