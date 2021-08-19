import React,{ useState, useCallback } from 'react';
import './play.scss';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../hooks/appHook';
import PlayGround from '../../components/PlayGround';
import Timer from '../../components/Timer';
import { GameAudio, IAudioClassType } from '../../utils/index';

type PlayProps = {
    initialGameTime: number,
    initialState?: boolean[]
    audioObject: IAudioClassType
}

type PlayWrapperProps = {
    initialGameTime: number,
    initialState?: boolean[]
}

function Play({initialGameTime = 30, initialState, audioObject }:PlayProps){

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
        <PlayGround onItemClick={onItemClick} forceStop = {stop} initialState={initialState}/>
    </div>
}


function PlayWrapper(props :PlayWrapperProps) {
    const audioObject = new GameAudio() as IAudioClassType;
   return  <Play {...props} audioObject={audioObject}/>
}

const MemoizedPlay = React.memo(PlayWrapper);

export default MemoizedPlay