import { Component, createRef, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

var htmlRef = null;
var displayedMenu = [];
var currentContextMenuHandle = null;

const ContextMenuContext = createContext({
    menu: []
});


function handleContextMenuClick(e) {
    if (e.target.classList.contains("ctxmenu_item")) {
        const index = e.target.dataset.index
        this.menu[index].action();
    }
    htmlRef.current.style.setProperty("display", "none");
}

/** @param {MouseEvent} */
function handleContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();

    htmlRef.current.innerHTML = `<ul>
    ${this.menu.map((e, i) => `<li class='ctxmenu_item' data-index='${i}'>${e.libelle}</li>`)
            .join('')}
    </ul>`;
    [
        ["top", e.clientY + "px"],
        ["left", e.clientX + "px"],
        ["display", "none"],
        ["display", "block"],
    ].map(([prop, val]) => htmlRef.current.style.setProperty(prop, val));

    document.removeEventListener("click", currentContextMenuHandle);
    currentContextMenuHandle = handleContextMenuClick.bind(this)
    document.addEventListener("click", currentContextMenuHandle, { once: true });
}

export function withContextMenu(WrappedComponent, contextMenu) {
    let handleRef = false;
    if (htmlRef == null) {
        handleRef = true;
        htmlRef = createRef();
    }

    class ContextMenuWrapper extends Component {

        static contextType = ContextMenuContext;
        static displayName = "ContextMenuWrapper<" + WrappedComponent.name + ">";

        render() {
            this.menu = [
                ...(this ?.context ?.menu ?? []),
                ...contextMenu.map(e => ({ ...e, action: e.action.bind(this, this.props) }))
            ]
            return <>
                {handleRef && <>
                    <div id="contextMenu" ref={htmlRef}></div>
                    <style jsx>{`
                       #contextMenu {
                           background-color: #333;
                           position: absolute;
                           top: 100px;
                           left: 100px;
                           z-index: 5000;
                           border-radius: 5px;
                           box-shadow: 2px 2px 8px black;
                           cursor: pointer;
                       }

                       #contextMenu :global(ul) {
                           margin:0;
                           padding:2.5px 2.5px;
                       }

                       #contextMenu :global(ul li) {
                           list-style: none;
                           padding: 0.2em 0.4em;
                           display: flex;
                           align-items: center;
                       }

                       #contextMenu :global(ul li:first-of-type) {
                           border-top-left-radius: 5px;
                           border-top-right-radius: 5px;
                       }

                       #contextMenu :global(ul li:last-of-type) {
                           border-bottom-left-radius: 5px;
                           border-bottom-right-radius: 5px;
                       }

                       #contextMenu :global(ul li:hover) {
                           background-color: #111;
                       }
                    `}</style>
                </>}
                <ContextMenuContext.Provider value={{ menu: this.menu }}>
                    <WrappedComponent onContextMenu={handleContextMenu.bind(this)} {...this.props} />
                </ContextMenuContext.Provider>
            </>
        }
    }

    return ContextMenuWrapper;
}