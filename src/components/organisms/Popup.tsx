// import style from "./style.module.css";
import styled from "styled-components";
import ElementStyle from "../molecules/ElementStyle/ElementStyle";
import SelectorStyle from "../molecules/SelectorStyle/SelectorStyle";

interface Props {
    el: HTMLElement
}

export default function Popup({el}:Props) {
    const attrs = [...el.attributes];
    const {classList} = el;

    return(
        <PopupStyle>
            <div className="tagTarget">
                <span className="tagName">&lt;{el.tagName.toLowerCase()}</span>
                    {attrs.length ? <Attributes attrs={attrs}/>:''}
                <span className="tagName">/&gt;</span>
            </div>
            {el.style.length ? <ElementStyle el={el}/>:''}
            {classList.length ? [...classList].map(cl => <SelectorStyle selector={cl} el={el} />):''}
        </PopupStyle>
    )
}

function Attributes({attrs}:{attrs:Attr[]}) {
    return attrs.map(attr => (
        <span className="tagAttr">
            {attr.name.toLowerCase()}="
                <span className="tagValues">{attr.value.toLowerCase()}</span>
            "
        </span>
    ))
}



const PopupStyle = styled.div`
    @font-face {
        font-family: 'Inter';
        src: url(${chrome.runtime.getURL("fonts/Inter-VariableFont.ttf")}) format('truetype');
    }
    max-width: 300px;
    font-family: 'Inter';
    font-size: 14px;
    border-radius: .5rem;
    padding: .5rem;
    background-color: #252525;
    .tagTarget {
        display: flex;
        flex-wrap: wrap;
        gap: .25rem;
        .tagName {
            color: #A1C7E0;
        }
        .tagAttr {
            color: #89D49A;
            .tagValues {
                color: #CCEA8D;
                word-break: break-word;
            }
        }
    }
`