import React, { useState, useCallback } from "react";
import "./play.scss";
import { useHistory } from "react-router-dom";
import { useStore } from "../../hooks/appHook";
import PlayGround from "../../components/PlayGround";
import Timer from "../../components/Timer";
import { audioObject } from "../../utils";

type PlayProps = {
	initialGameTime: number;
	charStates: any;
	charPoints: any;
};

type PlayWrapperProps = {
	initialGameTime: number;
	charStates?: any;
	charPoints?: any;
};

function Play({ initialGameTime = 30, ...props }: PlayProps) {
	const history = useHistory();
	const { dispatch } = useStore();
	const [score, setScore] = useState(0);
	const [stop, setStop] = useState(false);

	const onStop = function () {
		setStop(true);

		history.push("/home");
		audioObject.playDone();

		dispatch({
			type: "ADD_SCORE",
			payload: {
				time: Date.now(),
				score: score,
			},
		});

		dispatch({
			type: "SET_CURRENT_PLAYER",
			payload: "",
		});
	};

	const onItemClick = useCallback(function (point) {
		setScore((pre) => pre + point);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="playContainer">
			<div className="header">
				<label className="score">{score}</label>
				<Timer onStop={onStop} initialGameTime={initialGameTime} />
			</div>
			<PlayGround onItemClick={onItemClick} forceStop={stop} {...props} />
		</div>
	);
}

export default function PlayWrapper(props: PlayWrapperProps) {
	const charStates = {
		0: "",
		1: "",
		2: "",
		3: "",
		4: "",
		5: "",
		6: "",
		7: "",
		8: "",
	};

	const charPoints = {
		char0: -1,
		char1: -2,
		char2: -3,
		char3: -1,
		char4: -2,
		char5: -3,
		char6: -1,
		char7: 5,
	};

	return <Play charStates={charStates} charPoints={charPoints} {...props} />;
}
