import { useState } from "react";
import styled from "styled-components";

export type evMod = (React.FocusEvent|React.KeyboardEvent)&{
    target:HTMLSpanElement
}

const ElementStyleStyle = styled.div`
    margin-top: 12px;
    .elementStyle {
        color: #b9b9b9;
        font-size: 14px;
        font-weight: 600;
    }
`

export const CssListAttrs = styled.div`
    padding-block: 4px;
    padding-left: 16px;
    &>div {
        display: flex;
        font-size: 13px;
        color: #fff;
        line-height: 130%;
        span {
            position: relative;
            &:first-of-type {
                color: #6FC8CC;
            }
            p {
                padding-inline: 4px;
                padding-bottom: 2px;
                cursor: text;
                margin: 0;
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
                        <span>
                            <p onBlur={(ev) => setStyleAttribute(ev, key)} 
                                onKeyDown={(ev) => {
                                    if (ev.key == 'Enter') {
                                        ev.preventDefault();
                                        ((ev as any).target.blur())
                                    }}
                                }
                                contentEditable>
                                    {key}
                            </p> 
                        </span>
                        :
                        <span>
                            <p onBlur={(ev) => setStyleValue(ev, key)} 
                                onKeyDown={(ev) => {
                                    if (ev.key == 'Enter') {
                                        ev.preventDefault();
                                        ((ev as any).target.blur())
                                    }}
                                }
                                contentEditable>
                                    {Object(el.style)[key]}
                            </p>
                        </span>
                        ;
                    </div>
                ))}
            </CssListAttrs>
            <div className="elementStyle">&#125;</div>
        </ElementStyleStyle>
    )
}