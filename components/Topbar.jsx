import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as MusicPlayer from '../lib/musicPlayer.js';
import { useState, useEffect, useRef } from 'react';
import { marquee } from '../lib/utils.js';

export default ({ file, token }) => {

    const [musicState, setMusicState] = useState(MusicPlayer.getState());
    const isMobile = false;
    MusicPlayer.suscribe(setMusicState);

    const musicTitleRef = useRef(null);

    useEffect(() => {
        if (musicTitleRef.current != undefined) {
            //marquee(musicTitleRef.current);
        }
    })

    return (
        <>
            <div id="topbar">
                <div id="topbar_left">
                    <Link as="/" href="/"><img id="logo" src="/images/murflix.svg" /></Link>
                </div>
                <div id="topbar_center">
                    <div id="music_name" ref={musicTitleRef}>
                        {musicState ?.currentFile ?.name}
                    </div>
                </div>
                <div id="topbar_right">
                    <a id="music_disc">
                        <div>
                            <FontAwesomeIcon icon={['fa', 'compact-disc']} />
                        </div>
                    </a>
                    {!isMobile &&
                        <div id="topbar_bouton_youtube">
                            <a
                                href={`javascript:fetch('${location.origin}/api/ytdl?token=${token}&url=' + location.href, {mode:'no-cors'});`}
                                onClick={e => e.preventDefault()} onDragEnd={e => console.log("test")}>
                                <FontAwesomeIcon icon={['fab', 'youtube']} id="ytIcon" />
                            </a>
                            <div id="popup_infos_yt_bookmarklet">
                                <h4><span>Youtube-dl</span><FontAwesomeIcon icon={['fab', 'youtube']} /></h4>
                                <span>
                                    Faites glisser l'icone dans votre barre de favoris, puis, sur une vidéo youtube, cliquez sur ce bouton, la piste audio sera enregistrée dans <Link as="/zik/ytdl" href={{ pathname: "/", query: { path: "/zik/ytdl", token } }}><a id="murflink">Murflix</a></Link>
                                </span>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <style jsx>{`
        #topbar {
            width: 100%;
            height: 3.5em;
            background-color: #333;
            align-self: flex-start;
            box-shadow: 0px 0px 1em 0.1em black;
            display: flex;
            flex-direction: row;
            flex-shrink: 0;
            z-index: 2000;
            justify-content: space-between;
        }

        #logo {
            margin-left: 0.8em;
            height: 2.2em;
            cursor: pointer;
        }

        #topbar > div {
            display: flex;
            align-items: center;
        }

        #topbar_left, #topbar_right {
            display: flex;
            align-items: center;
            height: 100%;
        }

        #topbar_center {
            margin: 0 1em 0 2em;
            overflow: hidden;
            cursor: pointer;
        }

        #music_name {
            white-space: nowrap;
        }

        #topbar_right {
            font-size: 1.5rem;
        }

        #topbar_right > * {
            height: 100%;
            line-height: 100%;
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 0 0.5em;
        }

        #topbar_right > *:hover {
            background-color: #111;
        }

                #music_disc > div {
            display: block;
            animation: 2s rotate linear infinite backwards;

        }

        @keyframes rotate {
            from {
                transform: none;
            }
            to {
                transform: rotate(360deg);
            }
        }

        #topbar_bouton_youtube > a {
            font-size: 2rem;
            color: #d5101a;
        }
        
        #popup_infos_yt_bookmarklet {
            position: absolute;
            flex-direction: column;
            justify-content: center;
            display: none;
            width: 14em;
            top: 4em;
            right: 0.5em;
            background-color: #333;
            padding: 1em;
            border-radius: 0.5em;
            box-shadow: 1px 1.5px 5px black;
        }

        #topbar_bouton_youtube:hover #popup_infos_yt_bookmarklet {
            display: flex;
        }

        #murflink {
            color: white;
        }

        #popup_infos_yt_bookmarklet h4 {
            margin: 0.2em 0 0.5em 0;
            display: flex;
            justify-content: space-between;
            color: white;
        }

        #popup_infos_yt_bookmarklet span {
            text-align: justify;
        }

    `}</style>
        </>
    )
};
