export const randomInt = (min: number, max: number) => {
	return Math.floor(min + Math.random() * (max + 1 - min));
};

class AudioClass {
	createjs;
	constructor() {
		//@ts-ignore
		this.createjs = window.createjs;
		this.loadFiles = this.loadFiles.bind(this);
		this.playPoof = this.playPoof.bind(this);
		this.playDone = this.playDone.bind(this);
	}

	async loadFiles() {
		const poof = await (await import("../assets/audio/poof.mp3")).default;
		const done = await (await import("../assets/audio/done.wav")).default;

		this.createjs.Sound.registerSound(poof, "POOF", 3);
		this.createjs.Sound.registerSound(done, "DONE");

		var resumeAudioContext = () => {
			// handler for fixing suspended audio context in Chrome
			try {
				if (this.createjs.WebAudioPlugin.context && this.createjs.WebAudioPlugin.context.state === "suspended") {
					this.createjs.WebAudioPlugin.context.resume();
				}
			} catch (e) {
				// SoundJS context or web audio plugin may not exist
				console.error("There was an error while trying to resume the SoundJS Web Audio context...");
				console.error(e);
			}
			// Should only need to fire once
			window.removeEventListener("click", resumeAudioContext);
		};
		window.addEventListener("click", resumeAudioContext);
	}

	playPoof() {
		this.createjs.Sound.play("POOF", { interrupt: this.createjs.Sound.INTERRUPT_ANY, startTime: 0, duration: 300 });
	}

	playDone() {
		this.createjs.Sound.play("DONE", { interrupt: this.createjs.Sound.INTERRUPT_ANY, startTime: 0, duration: 1000 });
	}
}

export const audioObject = new AudioClass();
