import { useState, useEffect } from 'react';
import videojs from 'video.js';

export default ({ file, token }) => {

    const [videoNode, setVideoNode] = useState(null);
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        if (videoNode !== null) {

            const options = {
                autoplay: true,
                controls: true,
                sources: [{
                    src: `/api/browser?href=${file.href}&token=${token}`,
                    type: 'video/mp4'
                }]
            };

            setPlayer(videojs(videoNode, options, function onPlayerReady() {
                console.log('onPlayerReady', this)
            }));
        }

        return () => {
            if (player !== null) {
                player.dispose();
            }
        }

    }, [videoNode]);

    return (<>
        <div data-vjs-player id="video_wrapper">
            <video ref={node => setVideoNode(node)} id="video_wrapper" className="video-js" controls>
                {/* <source src={`/api/browser?href=${file.href}&token=${token}`} type="video/mp4"></source> */}
            </video>
        </div>
        <style jsx>{`
            #video_wrapper {
                flex-shrink: 1;
                flex-grow: 1;
                width:100%!important;
            }

            video {
                outline: none;
                background-color: black;
                max-width: 100%;
            }
            `}</style>
    </>);
}