import React, { forwardRef, useImperativeHandle, useState } from "react";
import "./style.scss";
import classNames from "classnames";
import { randomInt } from "../utils";

type CharProps = {
	onItemClick: Function;
	forceStop: boolean;
	audioObject: any;
};

const Character = forwardRef(({ onItemClick, forceStop, audioObject }: CharProps, forwardedRef: any) => {
	const [charClass, setCalss] = useState({ activeClass: "", key: Math.random(), lastTime: 0 });
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
						ev.stopPropagation();
						audioObject.playPoofAudio();
						setCalss({ activeClass: "", key: Math.random(), lastTime: 0 });
						onItemClick(charClass.activeClass);
					}}
				/>
			</div>
			<div className="hole" />
		</div>
	);
});

const propsAreSameIf = (pre: CharProps, cur: CharProps) => pre.forceStop === cur.forceStop;

export default React.memo(Character, propsAreSameIf);
