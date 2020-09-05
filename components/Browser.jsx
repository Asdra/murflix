import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withContextMenu } from '../components/ContextMenu';
import BrowserItem from '../components/BrowserItem';

export default withContextMenu(
    ({ files, token, onContextMenu }) => {
        const files_elems = files.map(file => {
            const downloadURL = new URL("/api/browser", location.origin);
            downloadURL.search = new URLSearchParams({
                download: 1,
                token,
                href: file.href
            });

            return <BrowserItem file={file} href={{ pathname: "/", query: { path: file.href, token } }} key={file.href} />

        });

        return (
            <div id="browser_wrapper" onContextMenu={onContextMenu}>
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
    }, [{ libelle: "Browser", action: (props) => console.log("browser", props) }]);
