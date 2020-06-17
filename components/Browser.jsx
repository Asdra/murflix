import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function marquee({ target }) {

    const elem = target.closest(".fileItem").querySelector(".fileItem_name");

    if (elem?.scrollIntervalId == null) {
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

export default ({ files, token }) => {
    const files_elems = files.map(file => {
        const downloadURL = new URL("/api/browser", location.origin);
        downloadURL.search = new URLSearchParams({
            download: 1,
            token,
            href: file.href
        });

        return (
            <Link as={file.href} href={{ pathname: "/", query: { path: file.href, token } }} key={file.href}>
                <li className={`fileItem ${file.isDir ? "dir" : "file"}`} onMouseOver={marquee}>
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
            </Link>
        );
    });


    return (
        <div id="browser_wrapper">
            <ul id="browser">
                {files_elems}
            </ul>
            <style jsx>{`

                #browser_wrapper {
                    overflow-x: auto;
                    padding: 1em 0.5em 0;
                    height: 100%;
                }

                #browser {
                    margin: 0;
                    padding:0;


                    max-width: 100%;

                    column-width: 50rem;
                    column-count: auto;
                    column-fill: auto;

                    min-height: 100%;
                }

                #browser :global(a) {
                    text-decoration: none;
                    color: #ccc;
                }

                #browser :global(.fileItem) {

                    line-height: 2.5em;

                    display: flex;
                    align-items: center;
                    justify-content: flex-start;

                    list-style-type: none;
                    padding: 0 1em;
                    font-size: 1.5em;
                    cursor: pointer;
                }

                #browser :global(.fileItem:not(:hover)) :global(.fileItem_download_wrapper) {
                    display: none;
                }
                #browser :global(.fileItem_download_wrapper) {
                    flex-grow: 1;
                    display: flex;
                    justify-content: flex-end;
                    padding-left: 1em;
                }
                

                #browser :global(.fileItem:hover) {
                    background-color: #333;
                    border-radius: 0.5em;
                }

                #browser :global(.fileItem_icon) {
                    height: 1.5em;
                    padding-right: 1em;
                }

                #browser :global(.fileItem_name) {
                    flex-shrink: 1;
                    flex-grow: 1;
                    white-space: nowrap;
                    width: 100%;
                    overflow-x: hidden;
                    text-overflow: ellipsis;
                }

                #browser :global(.fileItem_name) :global(div) {
                    width: 100%;
                }
            `}</style>

        </div>
    )
}
