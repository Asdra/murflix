import Topbar from "../components/Topbar";
import Browser from "../components/Browser";
import Arianne from '../components/Arianne';
import FileHandler from '../components/FileHandler';
import Login from '../components/Login';
import MusicControls from '../components/MusicControls';
import * as MusicPlayer from "../lib/musicPlayer.js";
import { withRouter } from 'next/router';
import { withContextMenu } from '../components/ContextMenu';
import { useState, useEffect, createContext } from 'react';

const Main = ({ router, onContextMenu }) => {

    const [token, setToken] = useState((typeof sessionStorage === "object") ? sessionStorage.getItem("murflix_token") : null);
    const [file, setFile] = useState(null);
    const [mpState, setMpState] = useState(MusicPlayer.getState());
    MusicPlayer.suscribe(setMpState);

    if (file == null || router.asPath !== file.asPath) {
        fetch("/api/browser?path=" + router.asPath + "&token=" + token).then((resp, err) => {
            if (err) {
                location.href = "/";
                return;
            }
            if (resp.status == 405) {
                setToken(null);
                return;
            }
            resp.json().then(file => {
                setFile({
                    asPath: router.asPath,
                    ...file
                });
            });
        });
    }

    let displayMe = <><Topbar token={token} />
        {file && <Arianne path={file.arrayPath} token={token} />}
    </>;
    if (token == null) {
        displayMe = <Login setToken={setToken} />;
    } else if (file !== null && file.asPath == router.asPath) {
        displayMe = (<>
            {displayMe}
            {(file.isDir) ?
                <Browser files={file.children} token={token} />
                :
                <FileHandler file={file} token={token} />}
            <MusicControls />
        </>);
    }

    const contextMenu = ["Main"];

    return (
        <div id="wrapper" onContextMenu={onContextMenu}>
            {displayMe}

            <style jsx>{`
            #wrapper {
                display: flex;
                flex-direction: column;
                height: 100%;
                width: 100%;
            }
            `}</style>

            <style jsx global>{`
                        html, body, #__next {
                            width: 100%;
                            height: 100%;
                            margin: 0;
                            padding: 0;
                            background-color: #484546;
                            font-family: Calibri;
                            color: #ccc;
                        }

                        /* width */
                        ::-webkit-scrollbar {
                          width: 10px;
                        }

                        /* Track */
                        ::-webkit-scrollbar-track {
                          background: #eee;
                          box-shadow: 0 0.2em 1em 0em black inset;
                        }

                        /* Handle */
                        ::-webkit-scrollbar-thumb {
                          background: #333;
                        }

                        /* Handle on hover */
                        ::-webkit-scrollbar-thumb:hover {
                          background: #111;
                        }
                    `}</style>
        </div>
    );
}


export default withRouter(withContextMenu(Main, [{ libelle: "Main", action: () => console.log("Main") }]));