import { createRoot } from "react-dom/client";
import Popup from "../components/organisms/Popup";
import SystemProvider from "../systemContext";
import { movePopup } from "../helpers/movePopup";
let blockMov:boolean;
const container = document.createElement('div');

container.style.position = "absolute"
container.style.zIndex = "9999999"
container.style.pointerEvents = "none"

document.documentElement.appendChild(container);

var targetAux:HTMLElement;

document.addEventListener('mousemove', async (ev) => {
    const target = ev.target as HTMLElement;

    container.style.pointerEvents = blockMov ? "all" : "none";

    if (!blockMov && !container.contains(target)) {
        target != targetAux && createRoot(container).render(
            <SystemProvider >
                <Popup el={target} />
            </SystemProvider>
        );

        movePopup({popup: container, x: ev.pageX, y: ev.pageY})
    }

    targetAux = target;
})

document.addEventListener('keydown', ({key, ctrlKey}) => {
    if ((key == 'q'||key == 'Q') && ctrlKey) blockMov = !blockMov
})