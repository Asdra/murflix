import App from 'next/app';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'video.js/dist/video-js.css';

library.add([faDownload, faYoutube]);

export default App;
