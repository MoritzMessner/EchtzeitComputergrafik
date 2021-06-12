function fft() {

    let songs = ["audio/24 - Sail - Awolnation.mp3", "audio/Demons - Imagine Dragons.mp3",
        "audio/Never gonna give you up.mp3",
        "audio/The Prodigy - Omen.mp3",
        "audio/Timbaland_-_Apologize_ft._OneRepublic.mp3",
        "audio/Redbone_-_Come_and_Get_Your_Love_Guardians_of_The_Galaxy_Soundtrack.mp3",
        "audio/Maitre_Gims_-_Est-ce_que_tu_maimes__.mp3",
        "audio/Sucker_for_Pain_-_Lil_Wayne_Wiz_Khalifa__Imagine_Dragons_w__Logic__Ty_Dolla_ign_ft_X_Ambassadors.mp3",
        "audio/Snoop_Dogg_feat._Wiz_Khalifa_-_Kush_Ups_Official_Music_Video.mp3",
        "audio/Snoop_Dogg_feat._Wiz_Khalifa_-_Kush_Ups_Official_Music_Video.mp3",
        "audio/The_Script_-_Hall_of_Fame_ft._will.i.am.mp3",
        "audio/Eminem_-_Superman_Explicit.mp3"];
    //let songs = ["audio/24 - Sail - Awolnation.mp3"];
    let song = songs[Math.floor(Math.random() * songs.length)];
    console.log("playing song: " + song);
    audio = new Audio();

    audio.src = song;
    audio.controls = true;
    audio.loop = false;
    audio.autoplay = false;

    document.getElementById("source").appendChild(audio);

    /*var context = new AudioContext();
    analyser = context.createAnalyser();
    analyser.fftSize = 2048;


    let source = context.createMediaElementSource(audio);
    source.connect(analyser);
    source.connect(context.destination);
*/
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    analyser = context.createAnalyser();
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 512;
    var bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    audio.play();
    //animate();
}


function pause() {
    audio.pause();
}
