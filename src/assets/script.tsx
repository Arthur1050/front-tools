import { createRoot } from "react-dom/client";
import Popup from "../components/organisms/Popup";
import SystemProvider from "../systemContext";
import { movePopup } from "../helpers/movePopup";
import MarkerDOM from "../components/molecules/MarkerDOM/MarkerDOM";
import {Root} from 'react-dom/client';

class CreatePopup {
    static container:HTMLDivElement;
    marker = document.createElement('div')
    moveType:number = 1;

    rootContainer:Root
    rootMarker: Root
    blockMov: boolean
    targetAux:HTMLElement|null = null

    constructor() {
        CreatePopup.container ||= document.createElement('div');
        this.rootContainer = createRoot(document.documentElement.appendChild(CreatePopup.container));
        this.rootMarker = createRoot(document.documentElement.appendChild(this.marker));
        this.blockMov = false;

        this.moveTypeDefine();
        this.styleElements();

        document.addEventListener("mousemove", (ev) => this.renderAll(ev))

        document.addEventListener('keydown', ({key, ctrlKey}) => {
            if ((key == 'q'||key == 'Q') && ctrlKey) this.blockMov = !this.blockMov
        })

        chrome.storage.onChanged.addListener((changes, namespace) => {
            if (namespace == 'local') {
                for (let [key, { newValue }] of Object.entries(changes)) {
                  key == 'moveType' && newValue == 2 && (CreatePopup.container.style.transition = '')
                }
            }
        });
    }

    renderAll(ev:MouseEvent) {
        const {moveType, rootContainer, rootMarker, blockMov} = this;
        const target = ev.target as HTMLElement;

        CreatePopup.container.style.pointerEvents = blockMov ? "all" : "none";

        if (!blockMov && !CreatePopup.container.contains(target)) {
            if (target != this.targetAux) {
                rootContainer.render(
                    <SystemProvider container={this.container}>
                        <Popup el={target} />
                    </SystemProvider>
                );
    
                rootMarker.render(
                    <SystemProvider container={this.container}>
                        <MarkerDOM el={target} />
                    </SystemProvider>
                );
            } 
            moveType && moveType == 2 && movePopup({popup: CreatePopup.container, target, moveType})
        }

        this.targetAux = target;
    }

    get container() {
        CreatePopup.container ||= document.createElement('div');
        return CreatePopup.container;
    }

    styleElements() {
        CreatePopup.container.style.position = "absolute";
        CreatePopup.container.style.zIndex = "9999999";
        CreatePopup.container.style.pointerEvents = "none";

        this.marker.style.zIndex = "999999";
        this.marker.style.pointerEvents = "none"
    }

    async moveTypeDefine() {
        this.moveType = await getMoveType();
    }
}

async function getMoveType() {
    return await (await chrome.storage.local.get('moveType')).moveType
}

if (!CreatePopup.container) {
    new CreatePopup();
}

/* let blockMov:boolean;
const container = document.createElement('div');
const marker = document.createElement('div');

const rootContainer = createRoot(document.documentElement.appendChild(container));
const rootMarker = createRoot(document.documentElement.appendChild(marker));

container.style.position = "absolute"
container.style.zIndex = "9999999"
container.style.pointerEvents = "none"

marker.style.zIndex = "999999"
marker.style.pointerEvents = "none"



var targetAux:HTMLElement;
var moveType:number;

(
    async () => {
        moveType = (await chrome.storage.local.get('moveType')).moveType;
        moveType == 1 && (container.style.transition = '100ms all ease-out');
    }
)()


document.addEventListener('mousemove', async (ev) => {
    const target = ev.target as HTMLElement;

    container.style.pointerEvents = blockMov ? "all" : "none";

    if (!blockMov && !container.contains(target)) {
        if (target != targetAux) {
            rootContainer.render(
                <SystemProvider >
                    <Popup el={target} />
                </SystemProvider>
            );
            
            rootMarker.render(
                <SystemProvider >
                    <MarkerDOM el={target} />
                </SystemProvider>
            );

            if (moveType && moveType == 1) {
                movePopup({popup: container, target, moveType})
            }
        } 
        moveType && moveType == 2 && movePopup({popup: container, target, moveType})
    }

    targetAux = target;
})

document.addEventListener('keydown', ({key, ctrlKey}) => {
    if ((key == 'q'||key == 'Q') && ctrlKey) blockMov = !blockMov
})

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace == 'local') {
        for (let [key, { newValue }] of Object.entries(changes)) {
          key == 'moveType' && newValue == 2 && (container.style.transition = '')
        }
    }
}); */