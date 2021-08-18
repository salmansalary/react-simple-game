import { useRef,useState } from 'react';
import './home.scss';
import classNames from 'classnames';
import { useStore } from '../../hooks/appHook';
import { useHistory } from 'react-router-dom';


type ScoreRecord = {
    time: number,
    name: String,
    score: number
}

export default function Home(){ 

    const history = useHistory();
    const ref = useRef() as any;
    const { store, dispatch } = useStore();
    const [warn, setWarn ] = useState(false);
    const [ shake , setShake ] = useState(false)

    return <div className="homeContainer">
            <span className="titleWrapper">
                <label className="titleMessage">Catch the FOXiii !</label>
                <span className="fox" />
            </span>
            <input 
                ref = {ref} 
                type="text"
                name="nameInput" 
                className={classNames('nameInput', { 'warning': warn, 'shake' : warn && !shake, 'shake-alt' : warn && shake})} 
                placeholder="Enter Your Name" 
                onChange = {ev=> !!ev.target.value ? setWarn(false) : {}}
            />
            {
                store?.records?.length > 0 &&
                <div className="scoreBoardContainer">
                    <div className="scoreRecord">
                        <div className="rankDiv">
                            <label className="scoreColumnTitle">Rank</label>
                        </div>
                        <div className="nameDiv">
                            <label className="scoreColumnTitle">Name</label>
                        </div>
                        <div className="scoreDiv">
                            <label className="scoreColumnTitle">Time</label>
                        </div>
                        <div className="scoreDiv">
                            <label className="scoreColumnTitle">Score</label>
                        </div>
                    </div>
                    {
                        store?.records?.sort((b:ScoreRecord,a:ScoreRecord) => { return a.score - b.score; } ).map((rc: ScoreRecord,index:number)=>{

                            const { time, name , score } = rc;

                            const date = new Date(time);

                            return <div className="scoreRecord" key={time}>
                                <div className="rankDiv">
                                    <label className="rankLabel">{index + 1}</label>
                                </div>
                                <div className="nameDiv">
                                    <label className="nameLabel">{name}</label>
                                </div>
                                <div className="scoreDiv">
                                    <label className="scoreLabel">{`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</label>
                                </div>
                                <div className="scoreDiv">
                                    <label className="scoreLabel">{score}</label>
                                </div>
                            </div>
                        })
                    }
                </div>
            }
            <button 
                className="btnStart" 
                onClick={()=>{
                    if(!ref?.current?.value || ref?.current?.value === '') {
                        setWarn(true)
                        setShake(!shake)
                        return;
                    } 
                    dispatch({
                        type: 'SET_CURRENT_PLAYER',
                        payload: ref?.current?.value
                    });

                    history.push('/play');
                }}
            >Start the FUN</button>
    </div>

}