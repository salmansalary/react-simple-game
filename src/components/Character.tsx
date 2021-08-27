import React, { forwardRef, useImperativeHandle, useState } from "react";
import "./style.scss";
import classNames from "classnames";
import { randomInt, audioObject } from "../utils";

type CharProps = {
	onItemClick: Function;
	initialClass: string;
	charPoints: any;
};

const Character = forwardRef(({ onItemClick, charPoints, initialClass = "" }: CharProps, forwardedRef: any) => {
	const [charClass, setCalss] = useState({ activeClass: initialClass, lastTime: 0 });
	useImperativeHandle(forwardedRef, () => ({
		activate: () => {
			if (charClass.activeClass !== "" && Date.now() - charClass.lastTime <= 1000) return;

			const nomination = Math.random() >= 0.5 ? 7 : randomInt(0, 6);
			setCalss({ activeClass: `char${nomination}`, lastTime: Date.now() });
		},
	}));

	return (
		<div className="box">
			<div className="charContainer">
				<div
					key={`${charClass.activeClass}${charClass.lastTime}`}
					className={classNames("character", { [charClass.activeClass]: true })}
					onClick={(ev) => {
						ev.stopPropagation();
						onItemClick(charPoints[charClass.activeClass]);
						setCalss({ activeClass: "", lastTime: Date.now() });
						audioObject.playSound("SPAWN", 200);
					}}
				/>
			</div>
			<div className="hole" />
		</div>
	);
});

export default Character;
