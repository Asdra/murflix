import * as MusicPlayer from "../lib/musicPlayer.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';


export default function () {

    const [state, setState] = useState(MusicPlayer.getState());

    MusicPlayer.suscribe(setState);

    if (!state.currentFile) {
        return null;
    }

    return <>
        <div id="mpControls">
            <div>
                <FontAwesomeIcon icon={['fa', 'angle-left']} />
            </div>
            <div id="btn_play_pause" onClick={MusicPlayer.togglePlayback}>
                <FontAwesomeIcon icon={['fa', (state ?.playback) ? 'pause' : 'play']} />
            </div>
            <div>
                <FontAwesomeIcon icon={['fa', 'angle-right']} />
            </div>
        </div>
        <style jsx>{`
            #mpControls {
                width: 100%;
                height: 4em;
                display: flex;
                justify-content: space-evenly;
                margin-top: 0.7em;
                align-items: center;
                background-color: #333;
                box-shadow: 0px 0px 1em 0.1em black;
                font-size: 2em;
            }
        `}
        </style>
    </>;
}