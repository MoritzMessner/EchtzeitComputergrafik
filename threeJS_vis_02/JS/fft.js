var canvas,
    ctx,
    source,
    context,
    analyser,
    fbc_array,
    bar_count,
    bar_pos,
    bar_width,
    bar_height,
audio;


function fft() {

    let songs = ["audio/24 - Sail - Awolnation.mp3","audio/Demons - Imagine Dragons.mp3","audio/Never gonna give you up.mp3"];
    let song = songs[Math.floor(Math.random() * songs.length)];
    console.log("playing song: "+song)
    audio = new Audio();

    audio.src =song;
    audio.controls = true;
    audio.loop = false;
    audio.autoplay = false;

    document.getElementById("source").appendChild(audio);

    var context = new AudioContext();
    analyser = context.createAnalyser();
    analyser.fftSize = 2048;


    let source = context.createMediaElementSource(audio);
    source.connect(analyser);
    source.connect(context.destination);

    animate();
    audio.play()
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


function pause(){
    audio.pause()

}
