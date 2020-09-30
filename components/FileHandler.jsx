import GameFrame from './GameFrame';
import VideoPlayer from './VideoPlayer';
import PDF from './PDF';
import Image from './Image';
import { useRouter } from 'next/router';

const mfgs = ["mfg"];
const pdfs = ["pdf"];
const images = ["jpeg", "jpg", "bmp", "png", "tiff"];
const videos = ["avi", "mkv", "mp4", "mpeg", "mov", "webm"];

export default ({ router, file, token }) => {

    switch (true) {
        case mfgs.includes(file.extension):
            return <GameFrame file={file} token={token} />;
            break;
        case pdfs.includes(file.extension):
            return <PDF file={file} token={token} />;
            break;
        case images.includes(file.extension):
            return <Image file={file} token={token} />
            break;
        case videos.includes(file.extension):
            return <VideoPlayer file={file} token={token} />
            break;
    }

};