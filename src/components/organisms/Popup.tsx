import style from "./style.module.css";

interface Props {
    el: HTMLElement
}

export default function Popup({el}:Props) {

    return(
        <div className={style.popup}>
            <div className="tagTarget">
                <span className="tagName">{el.tagName.toLowerCase()}</span>
                {[...el.classList].map(name => (
                    <span className="tagClass">.{name.toLowerCase()}</span>
                ))}
            </div>
        </div>
    )
}