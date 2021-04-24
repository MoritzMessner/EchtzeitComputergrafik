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
    audio = new Audio();
    audio.src = "audio/24 - Sail - Awolnation.mp3";
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

function pause(){
    audio.pause()

}
