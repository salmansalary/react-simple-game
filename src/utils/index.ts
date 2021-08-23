export const randomInt = (min:number, max: number) => {
    return Math.floor(min + Math.random()*(max+1 - min))
}


export interface IAudioClassType {
    clickAudio : any;
    finishAudio: any;
    playPoofAudio: Function;
    playFinishAudio: Function;
}

export class GameAudio implements IAudioClassType{ 

    clickAudio: any;
    finishAudio: any;

    constructor() {
        this.clickAudio = new Audio();
        this.clickAudio.src = require('../assets/audio/poof.mp3').default

        this.finishAudio = new Audio()
        this.finishAudio.src = require('../assets/audio/done.wav').default

        this.playPoofAudio = this.playPoofAudio.bind(this);
        this.playFinishAudio = this.playFinishAudio.bind(this);
    }
    


    playPoofAudio(){
        this.clickAudio.currentTime = 0;
        this.clickAudio.play();
    };

    playFinishAudio(){
        this.finishAudio.play();
    };

}
