import {RTCG} from './rtcg-app/RTCG.js';

//Erzeugung der Hauptmethode
function main() {
    //Todo Setup der RTCG-App
    const container = document.querySelector('#scene-container');

    // 1. Instanz der RTCG-App
    const dudarain_RTCG = new RTCG(container);
    dudarain_RTCG.render()
    // 2. Szenen-Rendering
}



// main() Aufruf, um die RTCG-App zu starten
main();
