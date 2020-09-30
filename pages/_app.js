import App from 'next/app';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faDownload,
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause,
    faStop,
    faCompactDisc,
} from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'video.js/dist/video-js.css';


library.add([
    faDownload,
    faYoutube,
    faYoutubeSquare,
    faPlay,
    faPause,
    faAngleLeft,
    faAngleRight,
    faPause,
    faStop,
    faCompactDisc
]);

export default App;
