import GameFrame from './GameFrame';
import Player from './Player';
import PDF from './PDF';
import Image from './Image';

export default ({ file, token }) => {

    switch (file.extension) {
        case "mfg":
            return <GameFrame file={file} token={token} />;
            break;
        case "pdf":
            return <PDF file={file} token={token} />;
            break;
        case "jpeg":
        case "jpg":
        case "bmp":
        case "png":
        case "tiff":
            return <Image file={file} token={token} />
            break;

        default:
            return <Player file={file} token={token} />;
    }

}