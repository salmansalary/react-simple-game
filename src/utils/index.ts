import poof from "../assets/audio/poof.mp3";

export const randomInt = (min: number, max: number) => {
	return Math.floor(min + Math.random() * (max + 1 - min));
};

export interface IAudioClassType {
	finishAudio: any;
	playFinishAudio: Function;
}

export class GameAudio implements IAudioClassType {
	finishAudio: any;

	constructor() {
		this.finishAudio = new Audio();
		this.finishAudio.src = require("../assets/audio/done.wav").default;

		this.playFinishAudio = this.playFinishAudio.bind(this);

		//@ts-ignore
		global.createjs = window.createjs;
		global.createjs.Sound.registerSound(poof, "POOF");
	}

	playFinishAudio() {
		this.finishAudio.play();
	}
}
