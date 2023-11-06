import { createRoot } from "react-dom/client";
import Popup from "../components/organisms/Popup";
import SystemProvider from "../systemContext";
let blockMov:boolean;
const container = document.createElement('div');

container.style.position = "absolute"
container.style.transform = "translateX(1rem)"
container.style.zIndex = "9999999"

document.documentElement.appendChild(container);

var targetAux:HTMLElement;

document.addEventListener('mousemove', async (ev) => {
    const target = ev.target as HTMLElement;
    if (!blockMov) {
        container.style.left = `${ev.clientX}px`
        container.style.top = `${ev.clientY}px`

        target != targetAux && createRoot(container).render(
            <SystemProvider >
                <Popup el={target} />
            </SystemProvider>
        );
    }
    targetAux = target;
})

document.addEventListener('keydown', ({key, ctrlKey}) => {
    if ((key == 'q'||key == 'Q') && ctrlKey) blockMov = !blockMov
})