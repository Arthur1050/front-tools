import styled from "styled-components";
import { CssListAttrs, evMod } from "../ElementStyle/ElementStyle";
import { useContext, useState } from "react";
import { SystemContext } from "../../../systemContext";

interface Props {
    selector: string
    el: HTMLElement
}

type CSSRuleMod = CSSRule&{
    selectorText?:string;
    style?: CSSStyleDeclaration
}


function getSelectorStyle(selector:string) {
    const sheets = document.styleSheets;
    const styles:[string, CSSStyleDeclaration][] = [];

    [...sheets].forEach(sheet => {
        // EVITANDO ERRO AO BUSCAR CSS DE STYLESHEETS EXTERNOS (CORS)
        if (!sheet.href || sheet.href.includes(window.location.origin)) {
            const cssRules:CSSRuleMod[] = [...sheet.cssRules].filter((cssRule) => {
                const {selectorText} = (cssRule as CSSRuleMod);
                if(selectorText) {
                    return selectorText.split(',').reduce((acc, curr) => {
                        const arraySelector = curr.split(' ');
                        const exp = '([\\w\\d\\s\\W\\D]|^)\\'+selector+'(?=(\\.|#|\\[|\\:)|$)';

                        return acc || (new RegExp(exp)).test(arraySelector[arraySelector.length-1])
                    }, false)
                    //const arraySelector = selectorText.split(' ');
                    //return selectorText.includes(`${selector},`) || arraySelector[arraySelector.length-1].includes(selector)
                } else return false;
            })
    
            cssRules.length && cssRules.forEach(cssRule => {
                cssRule.style && cssRule.selectorText && 
                    styles.push([cssRule.selectorText, cssRule.style])
            }) 
        }
    })

    return styles;
}

export default function SelectorStyle({selector, el}:Props) {
    const [{cssProperties}] = useContext(SystemContext)
    const styles = getSelectorStyle(selector);

    console.log(cssProperties)

    return styles.map(([selectorText, cssStyle]) => {
        if ([...document.querySelectorAll(selectorText)].includes(el)) {
            return(
                <SelectorStyleStyle>
                    <div><span className="selectorName">{selectorText}</span>  &#123;</div>
                    <AttrsListStyle cssStyle={cssStyle}/>
                    <div className="elementStyle">&#125;</div>
                </SelectorStyleStyle>
            ) 
        } 
        else return false;
    })
        
}

function AttrsListStyle({cssStyle}:{cssStyle: CSSStyleDeclaration}) {
    const [style, setStyle] = useState([...cssStyle]);

    function setStyleAttribute(ev:evMod, oldKey:string) {
        ev.preventDefault();
        const newKey = ev.target.textContent;

        setStyle(() => {
            if (newKey) {
                Object(cssStyle)[newKey] = Object(cssStyle)[oldKey];
                newKey != oldKey && (Object(cssStyle)[oldKey] = '');
            } 
            else Object(cssStyle)[oldKey] = '';
            ev.target.blur();
            return [...cssStyle];
        })
    }

    function setStyleValue(ev:evMod, key:string) {
        ev.preventDefault();
        const {textContent} = ev.target;

        setStyle(() => {
            Object(cssStyle)[key] = textContent;
            ev.target.blur()
            return [...cssStyle]
        })
    }
    return <CssListAttrs>
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
                            {Object(cssStyle)[key]}
                    </span>;
                </div>
            ))}
    </CssListAttrs>
}

const SelectorStyleStyle = styled.div`
    margin-top: .75rem;
    color: #b9b9b9;
    .selectorName {
        color: #89D49A;
        font-size: .825rem;
        font-weight: 600;
    }
`