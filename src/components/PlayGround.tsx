import React, { useEffect, useCallback, useRef } from "react";
import Character from "./Character";
import "./style.scss";
import { randomInt } from "../utils";

type Props = {
	onItemClick: Function;
	forceStop: boolean;
	initialState?: boolean[]; // for testing
	charStates?: any;
	charPoints: any;
	refs?: any;
};

const PlayGround = ({ onItemClick, forceStop, charPoints, refs, charStates }: Props) => {
	useEffect(() => {
		if (forceStop) return;
		const gClock = setInterval(() => refs[randomInt(0, 8)].current.activate(), 400) as any;
		return () => clearInterval(gClock);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [forceStop]);

	const charProps = useCallback(
		(id) =>
			({
				charPoints,
				onItemClick,
				ref: refs[id],
				initialClass: charStates[id],
			} as any),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	return (
		<div className="playGround">
			<div className="row">
				<Character {...charProps(0)} />
				<Character {...charProps(1)} />
				<Character {...charProps(2)} />
			</div>
			<div className="row">
				<Character {...charProps(3)} />
				<Character {...charProps(4)} />
				<Character {...charProps(5)} />
			</div>
			<div className="row">
				<Character {...charProps(6)} />
				<Character {...charProps(7)} />
				<Character {...charProps(8)} />
			</div>
		</div>
	);
};

const propsAreSameIf = (pre: Props, cur: Props) => pre.forceStop === cur.forceStop;

const PlayGroundWrapper = React.memo((props: Props) => {
	const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()] as any;

	return <PlayGround {...props} refs={refs} />;
}, propsAreSameIf);

export default PlayGroundWrapper;
