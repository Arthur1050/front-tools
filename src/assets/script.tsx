import { createRoot } from "react-dom/client";
import Popup from "../components/organisms/Popup";

document.addEventListener('mousemove', (ev) => {
    const target = ev.target as HTMLElement;
    const container = document.createElement('div');

    createRoot(container).render(
        <Popup />
    );

    target.appendChild(container);
})