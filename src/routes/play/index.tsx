import React,{ useEffect, useState, useCallback } from 'react';
import './play.scss';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../hooks/appHook';
import PlayGround from '../../components/PlayGround';
import Timer from '../../components/Timer';

let clickAudio,finishAudio;

const playPoof = () => function(){
        clickAudio.currentTime = 0;
        clickAudio.play();
};


type PlayProps = {
    initialGameTime: number,
    initialState?: boolean[]
}

function Play({initialGameTime = 30, initialState }:PlayProps){

    const history = useHistory();
    const { dispatch } = useStore();
    const [ score, setScore ] = useState(0)
    const [ stop, setStop ] = useState(false)

    const onStop = function() {

        setStop(true);

        history.push('/home');
        finishAudio.play();

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

        playPoof();
        setScore(pre=>pre + point);

    },[]);
    
    useEffect(() => {
        
        clickAudio = new Audio();
        clickAudio.src = require('../../assets/audio/poof.mp3').default

        finishAudio = new Audio()
        finishAudio.src = require('../../assets/audio/done.wav').default

    },[]);

    return <div className="playContainer">
        <div className="header">
            <label className="score">{score}</label>
            <Timer onStop={onStop} initialGameTime={initialGameTime}/>
        </div>
        <PlayGround onItemClick={onItemClick} forceStop = {stop} initialState={initialState}/>
    </div>
}

const MemoizedPlay = React.memo(Play);

export default MemoizedPlay