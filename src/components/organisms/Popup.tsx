import style from "./style.module.css";

interface Props {
    el: HTMLElement
}

export default function Popup({el}:Props) {
    return(
        <div className={style.popup}>
            <span>{el.tagName}</span>
        </div>
    )
}