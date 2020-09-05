import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ file, token }) => {
    return (
        <>
            <div id="topbar">
                <div id="topbar_left">
                    <Link as="/" href="/"><img id="logo" src="/images/murflix.svg" /></Link>
                </div>
                <div id="topbar_right">
                    <div id="topbar_bouton_menu">
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

        #topbar_left, #topbar_right {
            display: flex;
            align-items: center;
            height: 100%;
        }

        #topbar > div {
            display: flex;
            align-items: center;
        }

        #topbar_recherche_wrapper {
            margin-left: 1em;
            padding-top: 0.2em;
        }

        #topbar_bouton_menu > a {
            font-size: 2em;
            color: #d5101a;
        }

        #topbar_bouton_menu {
            height: 100%;
            cursor: pointer;
            display: flex;
            align-items: center;
            padding: 0 0.7em;
        }

        #topbar_bouton_menu:hover {
            background-color: #111;
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

        #topbar_bouton_menu:hover #popup_infos_yt_bookmarklet {
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
