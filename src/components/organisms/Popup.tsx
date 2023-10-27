// import style from "./style.module.css";
import { useState } from "react";
import styled from "styled-components";

interface Props {
    el: HTMLElement
}

export default function Popup({el}:Props) {
    const attrs = [...el.attributes];

    return(
        <PopupStyle>
            <div className="tagTarget">
                <span className="tagName">&lt;{el.tagName.toLowerCase()}</span>
                    {attrs.length ? <Attributes attrs={attrs}/>:''}
                <span className="tagName">/&gt;</span>
            </div>
            {el.style.length ? <ElementStyle el={el}/>:''}
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

function ElementStyle({el}:{el: HTMLElement}) {
    const [style, setStyle] = useState([...el.style])

    function setStyleAttribute({target}:React.FocusEvent, oldKey:string) {
        const newKey = target.textContent;

        setStyle(style => {
            if (newKey) {
                Object(el.style)[newKey] = Object(el.style)[oldKey];
                newKey != oldKey && (Object(el.style)[oldKey] = '');
            } 
            else Object(style)[oldKey] = '';
        
            return [...el.style];
        })
    }

    return (
        <ElementStyleStyle>
            <div className="elementStyle">element.style  &#123;</div>
            <div className="cssListAttrs">
                {style.map((key) => (
                    <div>
                        <span onBlur={ev => setStyleAttribute(ev, key)} contentEditable>{key}</span>: 
                        <span onBlur={({target}) => {
                            Object(el.style)[key] = target.textContent;
                        }} contentEditable>{Object(el.style)[key]}</span>;
                    </div>
                ))}
            </div>
            <div className="elementStyle">&#125;</div>
        </ElementStyleStyle>
    )
}

const PopupStyle = styled.div`
    @font-face {
        font-family: 'Inter';
        src: url(${chrome.runtime.getURL("fonts/Inter-VariableFont.ttf")}) format('truetype');
    }
    max-width: 300px;
    font-family: 'Inter';
    font-size: 16px;
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

const ElementStyleStyle = styled.div`
    margin-top: .75rem;
    .elementStyle {
        color: #b9b9b9;
        font-size: .825rem;
        font-weight: 600;
    }
    .cssListAttrs {
        padding-block: .25rem;
        padding-left: 1rem;
        &>div {
            font-size: .875rem;
            color: #fff;
            line-height: 130%;
            span {
                padding-inline: .25rem;
                padding-bottom: .125rem;
                cursor: text;
                &:first-of-type {
                    color: #6FC8CC;
                }
            }
        }
    }
`