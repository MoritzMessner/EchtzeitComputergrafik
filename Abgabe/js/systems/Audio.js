class Audio {

    static getAnalyser() {
        return this.analyser;
    }

    static setAnalyser(value) {
        this.analyser = value;
    }

    static getDataArray() {
        return this.dataArray;
    }

    static setDataArray(value) {
        this.dataArray = value;
    }

    static init() {
        this.audio = document.getElementById("audio");
        let context = new AudioContext();
        let src = context.createMediaElementSource(this.audio);
        this.analyser = context.createAnalyser();
        src.connect(this.analyser);
        this.analyser.connect(context.destination);
        this.analyser.fftSize = 512;
        let bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
    }

    static pause() {
        this.audio.pause();
    }

    static play() {
        this.audio.play();
    }

    static getLowerHalf() {
        return this.getDataArray().slice(0, (this.getDataArray().length / 2) - 1);
    }

    static getUpperHalf() {
        return this.getDataArray().slice((this.getDataArray().length / 2) - 1, this.getDataArray().length - 1);
    }

}

export {Audio}