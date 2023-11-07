import { useRef, useState, KeyboardEvent } from "react";
import { CssListAttrs } from "../ElementStyle/ElementStyle"
import AutoCompleteList from "../AutoCompleteList/AutoCompleteList";

export default function AttrsListStyle({cssStyle}:{cssStyle: CSSStyleDeclaration}) {
    const [style, setStyle] = useState([...cssStyle]);
    const [keyHint, setKeyHint] = useState<[string, EventTarget & Element, string]>([] as any);
    const selected = useRef('')

    const setStyleAttribute = (target:EventTarget&HTMLElement, oldKey:string) => {

        // O VALOR DE ATRIBUTO (TAMBÉM DO "VALUE" SE FOR O CASO) PODE VIR TANTO DA LISTA DE SUGESTÕES QUANTO DO INPUT
        const [newKey, newValue] = selected.current ?
            selected.current.split(': ')
            :
            [target.textContent, null];
            
        if (newKey) {
            if (Object(cssStyle)[newKey] == undefined) {
                // PENDENTE: ADICIONAR UM "WARN" AO LADO DO ATRIBUTO
                // return console.log('ATRIBUTO NÃO EXISTENTE!')
            }
            Object(cssStyle)[newKey] = newValue || Object(cssStyle)[oldKey];
            newKey != oldKey && (Object(cssStyle)[oldKey] = '');
        } 
        else Object(cssStyle)[oldKey] = '';
        
        // target.blur();
        console.log("Rodei1", newKey, oldKey, selected);
        setStyle([])
        setStyle([...cssStyle])
        setKeyHint([] as any);
    }

    const setStyleValue = (target:EventTarget&Element, key:string) => {
        setKeyHint([] as any);
        const {textContent} = target;

        Object(cssStyle)[key] = selected.current || textContent;

        (target as HTMLElement).blur();
        setStyle([...cssStyle])
    }

    const keyPressDown = (ev:KeyboardEvent, key:string) => {
        if (ev.key == 'Enter') {
            ev.preventDefault();

            if ((ev.target as HTMLElement).dataset.desc == 'attr') {
                setStyleAttribute(ev.target as EventTarget&HTMLElement, key)
                ev.currentTarget
                    .parentElement
                    ?.nextElementSibling
                    ?.querySelector('p')?.focus()
            } else {
                setStyleValue(ev.target as EventTarget&Element, key)
            }
        } else {
            const desc = (ev.target as HTMLElement).dataset.desc as string;

            (!keyHint||!keyHint.length) && key != keyHint[0] && desc != keyHint[2] && setKeyHint([key, ev.currentTarget, desc]);
        }
    }
    
    return <CssListAttrs>
            {style.map((key) => {
                return (
                <div>
                    <span>
                        <p spellCheck="false"
                            data-desc="attr"
                            onBlur={(ev) => setStyleAttribute(ev.target, key)} 
                            onKeyDown={(ev) => keyPressDown(ev, key)}
                            contentEditable>
                                {key}
                        </p>
                        {keyHint.length&&keyHint[0] == key&&keyHint[2] == 'attr' ? <AutoCompleteList selected={selected} inputEl={keyHint[1]} />:''}
                    </span>
                    :
                    <span>
                        <p spellCheck="false"
                            data-desc="value"
                            onBlur={(ev) => setStyleValue(ev.target, key)} 
                            onKeyDown={(ev) => keyPressDown(ev, key)}
                            contentEditable>
                                {Object(cssStyle)[key]}
                        </p>
                        {keyHint.length&&keyHint[0] == key&&keyHint[2] == 'value'? <AutoCompleteList AttrKey={key} selected={selected} inputEl={keyHint[1]} />:''}
                    </span>
                    ;
                </div>
            )})}
    </CssListAttrs>
}