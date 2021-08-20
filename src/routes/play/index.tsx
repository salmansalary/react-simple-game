import React,{ useState, useCallback } from 'react';
import './play.scss';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../hooks/appHook';
import PlayGround from '../../components/PlayGround';
import Timer from '../../components/Timer';
import { GameAudio, IAudioClassType } from '../../utils/index';

type PlayProps = {
    initialGameTime: number,
    audioObject: IAudioClassType,
    charStates: any;
}

type PlayWrapperProps = {
    initialGameTime: number,
    charStates: any;
}

function Play({initialGameTime = 30, audioObject, charStates }:PlayProps){

    const history = useHistory();
    const { dispatch } = useStore();
    const [ score, setScore ] = useState(0)
    const [ stop, setStop ] = useState(false)

    const onStop = function() {

        setStop(true);

        history.push('/home');
        audioObject.playFinishAudio();

        dispatch({
            type : 'ADD_SCORE',
            payload : {
                time: Date.now(),
                score: score
            }
        })

        dispatch({
            type: 'SET_CURRENT_PLAYER',
            payload: ''
        });

    }

    const onItemClick = useCallback(function(point) {

        audioObject.playPoofAudio();
        setScore(pre=>pre + point);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    

    return <div className="playContainer">
        <div className="header">
            <label className="score">{score}</label>
            <Timer onStop={onStop} initialGameTime={initialGameTime}/>
        </div>
        <PlayGround onItemClick={onItemClick} forceStop = {stop} charStates={charStates}/>
    </div>
}


function PlayWrapper({charStates ={
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false
} ,...props} :PlayWrapperProps) {
    const audioObject = new GameAudio() as IAudioClassType;

    return  <Play {...props} audioObject={audioObject} charStates={charStates}/>
}

const MemoizedPlay = React.memo(PlayWrapper);

export default MemoizedPlay