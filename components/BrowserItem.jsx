import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withContextMenu } from '../components/ContextMenu';
import { useEffect, useState } from 'react';

function marquee({ target }) {

    const elem = target.closest(".fileItem").querySelector(".fileItem_name");

    if (elem ?.scrollIntervalId == null) {
        elem.scrollIntervalId = 0;
        setTimeout(() => {
            elem.scrollIntervalId = setInterval(function () {
                this.scroll(this.scrollLeft + 1, 0);

                if (!this.parentNode.matches(':hover')) {
                    clearInterval(this.scrollIntervalId);
                    this.scrollIntervalId = null;
                    this.scroll(0, 0);
                }

            }.bind(elem), 6);
        },
            1000);
    }
}

const contextMenu = [{
    libelle: "Renommer",
    action: function () {
        console.log("BI", this.props.file);
    }
}];

export default withContextMenu(({ file, token, onContextMenu }) => {

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
                    {!file.isDir && (file.extension !== "mfg")
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