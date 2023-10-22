import { createRoot } from "react-dom/client";
import Popup from "../components/organisms/Popup";

const container = document.createElement('div');

container.style.position = "absolute"

document.documentElement.appendChild(container);

document.addEventListener('mousemove', (ev) => {
    const target = ev.target as HTMLElement;

    container.style.left = `${ev.clientX}px`
    container.style.top = `${ev.clientY}px`

    createRoot(container).render(
        <Popup el={target}/>
    );
})