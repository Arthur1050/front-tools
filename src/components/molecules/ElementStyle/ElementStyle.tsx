import { useState } from "react";
import styled from "styled-components";

export type evMod = (React.FocusEvent|React.KeyboardEvent)&{
    target:HTMLSpanElement
}

const ElementStyleStyle = styled.div`
    margin-top: .75rem;
    .elementStyle {
        color: #b9b9b9;
        font-size: .825rem;
        font-weight: 600;
    }
`

export const CssListAttrs = styled.div`
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
`

export default function ElementStyle({el}:{el: HTMLElement}) {
    const [style, setStyle] = useState([...el.style])

    function setStyleAttribute(ev:evMod, oldKey:string) {
        ev.preventDefault();
        const newKey = ev.target.textContent;

        setStyle(() => {
            if (newKey) {
                Object(el.style)[newKey] = Object(el.style)[oldKey];
                newKey != oldKey && (Object(el.style)[oldKey] = '');
            } 
            else Object(el.style)[oldKey] = '';
            ev.target.blur();
            return [...el.style];
        })
    }

    function setStyleValue(ev:evMod, key:string) {
        ev.preventDefault();
        const {textContent} = ev.target;

        setStyle(() => {
            Object(el.style)[key] = textContent;
            ev.target.blur()
            return [...el.style]
        })
    }

    return (
        <ElementStyleStyle>
            <div className="elementStyle">element.style  &#123;</div>
            <CssListAttrs>
                {style.map((key) => (
                    <div>
                        <span onBlur={(ev) => setStyleAttribute(ev, key)} 
                            onKeyDown={(ev) => {
                                if (ev.key == 'Enter') {
                                    ev.preventDefault();
                                    ((ev as any).target.blur())
                                }}
                            }
                            contentEditable>
                                {key}
                        </span>: 
                        <span onBlur={(ev) => setStyleValue(ev, key)} 
                            onKeyDown={(ev) => {
                                if (ev.key == 'Enter') {
                                    ev.preventDefault();
                                    ((ev as any).target.blur())
                                }}
                            }
                            contentEditable>
                                {Object(el.style)[key]}
                        </span>;
                    </div>
                ))}
            </CssListAttrs>
            <div className="elementStyle">&#125;</div>
        </ElementStyleStyle>
    )
}