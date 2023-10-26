import { createRoot } from "react-dom/client";
import Popup from "../components/organisms/Popup";
let blockMov:boolean;
const container = document.createElement('div');

container.style.position = "absolute"
container.style.transform = "translateX(1rem)"
container.style.zIndex = "9999999"

document.documentElement.appendChild(container);

document.addEventListener('mousemove', (ev) => {
    if (!blockMov) {
        const target = ev.target as HTMLElement;

        container.style.left = `${ev.clientX}px`
        container.style.top = `${ev.clientY}px`

        createRoot(container).render(
            <Popup el={target}/>
        );
    }
})

document.addEventListener('keydown', ({key, ctrlKey}) => {
    if ((key == 'q'||key == 'Q') && ctrlKey) blockMov = !blockMov
})