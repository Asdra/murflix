const queue = [];
var state = {
    currentFile: null,
    currentHREF: null,
    playback: false,
};


const suscribes = [];

/**
 * @type HTMLAudioElement
 */
const audio = new Audio;
audio.autoplay = 0;
audio.volume = 0.15;

export function suscribe(cb) {
    suscribes.push(cb);
}

function setState(newState) {
    state = { ...state, ...newState };
    window.musicState = state;
    suscribes.forEach(e => e(state));
}

export function test(file, token) {
    setState({
        currentHREF: `/api/browser?href=${file.href}&token=${token}`,
        currentFile: file,
        playback: true
    });

    audio.src = state.currentHREF;
    audio.load();
    audio.onloadeddata = () => {
        audio.play();
    }
}


export function enqueue(file) {
    queue.push(file);
}

export async function play() {
    await audio.play();
    return true;
}

export function pause() {
    audio.pause();
};

export function stop() {
    audio.src = null;
    setState({
        currentFile: null,
        currentHREF: null,
        playback: false
    });
}

export function getState() {
    return state;
}

export async function togglePlayback() {

    (state.playback == false) && (await play()) || pause();
    setState({ playback: !state.playback });
}

window.play = audio.play.bind(audio);
window.pause = audio.pause.bind(audio);
window.audioTest = audio;

