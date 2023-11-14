// import style from "./style.module.css";
import styled from "styled-components";
//import ElementStyle from "../molecules/ElementStyle/ElementStyle";
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
            <div className="tagStyles">
                {/* el.style.length ? <ElementStyle el={el}/>:'' */}
                {el.style.length ? <SelectorStyle el={el} />:''}
                <SelectorStyle selector={el.tagName} el={el} />
                {el.id ? <SelectorStyle selector={'#'+el.id} el={el} />:''}
                {classList.length ? [...classList].map(cl => <SelectorStyle selector={'.'+cl} el={el} />):''}
            </div>
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
    .tagStyles {
        max-height: 44vh;
        overflow-y: auto;
        margin-top: 12px;
        &::-webkit-scrollbar {
            width: 12px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #888888;
            border: 4px solid #242424;
            border-radius: 99px;
            box-shadow: unset;
            -webkit-box-shadow: unset;
        }
        &::-webkit-scrollbar-track {
            border-radius: 99px;
            background-color: transparent;
            box-shadow: unset;
            -webkit-box-shadow: unset;
        }
    }
`