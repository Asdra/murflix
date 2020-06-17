import Topbar from "../components/Topbar";
import Browser from "../components/Browser";
import Arianne from '../components/Arianne';
import FileHandler from '../components/FileHandler';
import Login from '../components/Login';
import { withRouter } from 'next/router';

import { useState, useEffect } from 'react';

const Main = ({ router }) => {

    const [token, setToken] = useState((typeof sessionStorage === "object") ? sessionStorage.getItem("murflix_token") : null);
    const [file, setFile] = useState(null);
    const [path, setPath] = useState(router.asPath ?? "/");

    router.events.on('routeChangeComplete', function(url) {
        if (url) {
            setPath(decodeURIComponent(url));
        }
    });

    useEffect(() => {
        if (file === null || file.href != path) {
            fetch("/api/browser?path=" + path + "&token=" + token).then((resp, err) => {
                if (err) {
                    location.href = "/";
                    return;
                }
                if (resp.status == 405) {
                    setToken(null);
                    return;
                }
                resp.json().then(file => {
                    setFile(file);
                });
            });
        }
    }, [path, token]);

    let displayMe = null;

    if (token == null) {
        displayMe = <Login setToken={setToken} />;
    } else if (file !== null) {
        displayMe = (<>
            <Topbar token={token} />
            <Arianne path={file.arrayPath} token={token} />


            {(file.isDir) ?
                <Browser files={file.children} token={token} />
                :
                <FileHandler file={file} token={token} />}
        </>);
    }

    return (
        <div id="wrapper">

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
                            background-color: #444;
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

export default withRouter(Main);