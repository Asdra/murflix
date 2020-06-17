import Link from 'next/link';

export default ({ path, token }) => {

    if (path.length == 0) {
        return null;
    }

    const pathPrev = (path.length < 1) ? "/" : "/" + path.slice(0, -1).join("/");

    const elems = [];
    let elemPath = "/";
    for (let elem of path) {
        elemPath += elem;
        elems.push(<Link as={elemPath} href={{ pathname: "/", query: { path: elemPath, token } }} key={elemPath}>
            <div className="arianne_item">
                <span>{elem.replace(/\_/g, " ")}</span>
            </div>
        </Link>);
        elemPath += "/";
    }

    return (
        <div id="arianne" >
            <Link as={pathPrev} href={{ pathname: "/", query: { path: pathPrev, token } }}>
                <div id="arianne_first">
                    <span>◄</span>
                </div>
            </Link>
            <div id="arianne_items">
                {elems}
            </div>
            <style jsx>{`
                #arianne {
                    margin-top: 0;
                    display: flex;
                    align-items: center;
                    background-color: #464646;
                    box-shadow: 0em 0.1em 1em black;
                    overflow: hidden;
                    z-index: 1000;
                    flex-shrink: 0;
                }

                #arianne_first {
                    background-color: #333;
                    height: 100%;
                    width: 2.5em;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-right: 1px solid black;
                    z-index: 1000;
                    cursor: pointer;
                }

                #arianne_items {
                    position: relative;
                    display: flex;
                    flex-wrap: wrap;
                    margin-left: -1em;
                    margin-right: -1.5em;
                    overflow-x: hidden;
                }

                #arianne_items :global(.arianne_item:first-of-type) {
                    padding-left: 1.75em;
                }
                #arianne_items :global(.arianne_item:last-of-type) {
                    margin-right: 1em;
                }

                #arianne_items :global(.arianne_item) {
                    background-color: #464646;
                    height: 2em;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-grow: 1;
                    padding: 0 1em;
                    padding-top: 0.15em;
                    transform: skew(-20deg, 0);
                    cursor: pointer;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                #arianne_first:hover, #arianne_items :global(.arianne_item:hover) {
                    mix-blend-mode: hard-light;
                }

                #arianne_items :global(.arianne_item) :global(span) {
                    transform: skew(20deg, 0);
                }

                #arianne_items :global(.arianne_item:nth-child(even)) {
                    background-color: #333;
                }


                `}</style>
        </div >
    );
}