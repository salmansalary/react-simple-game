import React, { forwardRef, useImperativeHandle, useState } from "react";
import "./style.scss";
import classNames from "classnames";
import { randomInt } from "../utils";

type CharProps = {
	onItemClick: Function;
	forceStop: boolean;
	audioObject: any;
	initialClass: string;
	charPoints: any;
};

const Character = forwardRef(({ onItemClick, forceStop, audioObject, charPoints, initialClass = "" }: CharProps, forwardedRef: any) => {
	const [charClass, setCalss] = useState({ activeClass: initialClass, key: Math.random(), lastTime: 0 });
	useImperativeHandle(forwardedRef, () => ({
		activate: () => {
			if (forceStop) return;

			if (charClass.activeClass !== "" && Date.now() - charClass.lastTime <= 1000) return;

			const nomination = Math.random() >= 0.5 ? 7 : randomInt(0, 6);
			setCalss({ activeClass: `char${nomination}`, key: Math.random(), lastTime: Date.now() });
		},
	}));

	return (
		<div className="box">
			<div className="charContainer">
				<div
					key={charClass.key}
					className={classNames("character", { [charClass.activeClass]: true })}
					onClick={(ev) => {
						audioObject.playPoofAudio();
						ev.stopPropagation();
						setCalss({ activeClass: "", key: Math.random(), lastTime: 0 });
						onItemClick(charPoints[charClass.activeClass]);
					}}
				/>
			</div>
			<div className="hole" />
		</div>
	);
});

const propsAreSameIf = (pre: CharProps, cur: CharProps) => pre.forceStop === cur.forceStop;

export default React.memo(Character, propsAreSameIf);
