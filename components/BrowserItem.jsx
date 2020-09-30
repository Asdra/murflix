import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withContextMenu } from '../components/ContextMenu';
import { useEffect, useState } from 'react';
import * as MusicPlayer from '../lib/musicPlayer.js';
import { marquee } from '../lib/utils.js';

function musicItem(file, token, onContextMenu, downloadURL) {
    return <li onClick={() => MusicPlayer.test(file, token)} onContextMenu={onContextMenu} className={`fileItem ${file.isDir ? "dir" : "file"}`}>
        <img className="fileItem_icon" src={file.iconHref}></img>
        <div className="fileItem_name">
            <div onMouseOver={(e) => { e.stopPropagation; marquee(e.target, true); }}>
                {file.name.replace(/_/g, " ")}
            </div>
        </div>
        <div className="fileItem_download_wrapper">
            <div className="fileItem_download">
                {(!file.isDir && file.extension !== "mfg")
                    &&
                    <a
                        href={downloadURL.toString()}
                        onClick={(e) => {
                            let aElem = e.target;
                            while (aElem.tagName != "A") {
                                aElem = aElem.parentNode;
                            }
                            e.preventDefault();
                            window.open(aElem.href);
                        }}>
                        <FontAwesomeIcon icon="download" alt="Télécharger" />
                    </a>
                }
            </div>
        </div>
    </li>
}

const contextMenu = [{
    libelle: "Renommer",
    action: function () {
        console.log("BI", this.props.file);
    }
}];

export default withContextMenu(({ file, token, onContextMenu, downloadURL }) => {

    if (file.extension == "mp3") {
        return musicItem(file, token, onContextMenu, downloadURL);
    }

    return <Link as={file.href} href={{ pathname: "/", query: { path: file.href, token } }} key={file.href} >
        <li onContextMenu={onContextMenu} className={`fileItem ${file.isDir ? "dir" : "file"}`} onMouseOver={marquee}>
            <img className="fileItem_icon" src={file.iconHref}></img>
            <div className="fileItem_name">
                <div>
                    {file.name.replace(/_/g, " ")}
                </div>
            </div>
            <div className="fileItem_download_wrapper">
                <div className="fileItem_download">
                    {(!file.isDir && file.extension !== "mfg")
                        &&
                        <a
                            href={downloadURL.toString()}
                            onClick={(e) => {
                                let aElem = e.target;
                                while (aElem.tagName != "A") {
                                    aElem = aElem.parentNode;
                                }
                                e.preventDefault();
                                window.open(aElem.href);
                            }}>
                            <FontAwesomeIcon icon="download" alt="Télécharger" />
                        </a>
                    }
                </div>
            </div>
        </li>
    </Link >
},
    contextMenu);