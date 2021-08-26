import React, { useEffect, useCallback, useMemo, useRef } from "react";
import Character from "./Character";
import "./style.scss";
import { randomInt, GameAudio } from "../utils";

type Props = {
	onItemClick: Function;
	forceStop: boolean;
	initialState?: boolean[]; // for testing
	charStates?: any;
	charPoints: any;
	refs?: any;
};

const PlayGround = ({ onItemClick: onCLick, forceStop, charPoints, refs }: Props) => {
	const audioObject = useMemo(() => new GameAudio(), []);

	const onItemClick = useCallback((activeClass?) => (activeClass && activeClass !== "" ? onCLick(charPoints[activeClass]) : {}), [charPoints, onCLick]);

	useEffect(() => {
		if (forceStop) return;
		const gClock = setInterval(() => refs[randomInt(0, 8)].current.activate(), 500) as any;
		return () => clearInterval(gClock);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="playGround">
			<div className="row">
				<Character ref={refs[0]} forceStop={forceStop} onItemClick={onItemClick} audioObject={audioObject} />
				<Character ref={refs[1]} forceStop={forceStop} onItemClick={onItemClick} audioObject={audioObject} />
				<Character ref={refs[2]} forceStop={forceStop} onItemClick={onItemClick} audioObject={audioObject} />
			</div>
			<div className="row">
				<Character ref={refs[3]} forceStop={forceStop} onItemClick={onItemClick} audioObject={audioObject} />
				<Character ref={refs[4]} forceStop={forceStop} onItemClick={onItemClick} audioObject={audioObject} />
				<Character ref={refs[5]} forceStop={forceStop} onItemClick={onItemClick} audioObject={audioObject} />
			</div>
			<div className="row">
				<Character ref={refs[6]} forceStop={forceStop} onItemClick={onItemClick} audioObject={audioObject} />
				<Character ref={refs[7]} forceStop={forceStop} onItemClick={onItemClick} audioObject={audioObject} />
				<Character ref={refs[8]} forceStop={forceStop} onItemClick={onItemClick} audioObject={audioObject} />
			</div>
		</div>
	);
};

const propsAreSameIf = (pre: Props, cur: Props) => pre.forceStop === cur.forceStop;

const PlayGroundWrapper = React.memo(({ charStates, ...props }: Props) => {
	const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

	return <PlayGround {...props} refs={refs} />;
}, propsAreSameIf);

export default PlayGroundWrapper;
