import { useRef, useState, KeyboardEvent, useLayoutEffect } from "react";
import { CssListAttrs } from "../ElementStyle/ElementStyle"
import AutoCompleteList from "../AutoCompleteList/AutoCompleteList";

export default function AttrsListStyle({cssStyle}:{cssStyle: CSSStyleDeclaration}) {
    const [style, setStyle] = useState([...cssStyle]);
    const [keyHint, setKeyHint] = useState<[string, EventTarget & Element, string]>([] as any);
    const selected = useRef('')
    const newAttrEl = useRef<HTMLParagraphElement|null>(null);

    useLayoutEffect(() => {
        console.log(style, cssStyle)
        newAttrEl.current && newAttrEl.current.focus();
    })

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

            target.textContent = newKey;

            style[style.indexOf(oldKey)] = newKey
        } else {
            Object(cssStyle)[oldKey] = '';
            style[style.indexOf(oldKey)] = '';
        };

        setStyle(updateListStyle(style))
        setKeyHint([] as any);
    }

    const setStyleValue = (target:EventTarget&Element, key:string) => {
        setKeyHint([] as any);
        const {textContent} = target;

        Object(cssStyle)[key] = selected.current || textContent;

        target.textContent = selected.current || textContent;

        selected.current = ''
    }

    const keyPressDown = (ev:KeyboardEvent, key:string) => {
        if (ev.key == 'Enter') {
            ev.preventDefault();

            if ((ev.target as HTMLElement).dataset.desc == 'attr') {
                setStyleAttribute(ev.target as EventTarget&HTMLElement, key)

                ev.currentTarget.textContent && ev.currentTarget.parentElement
                    ?.nextElementSibling
                    ?.querySelector('p')?.focus()
                
                selected.current = '';
            } else {
                setStyleValue(ev.target as EventTarget&Element, key);
                (ev.target as HTMLElement).blur();
            }
        } else {
            const desc = (ev.target as HTMLElement).dataset.desc as string;

            (!keyHint||!keyHint.length) && key != keyHint[0] && desc != keyHint[2] && setKeyHint([key, ev.currentTarget, desc]);
        }
    }

    const updateListStyle = (list:string[]) => {
        const filtered = [...cssStyle].filter(attr => !list.includes(attr))

        return [...list.filter(li => li), ...filtered];
    }

    const newAttr = (target:EventTarget&HTMLElement, i:number) => {
        if (target.classList.contains('cssListItem')) {
            /* if (!newAttrEl.current) { */
                i++;
                setStyle(val => [
                    ...val.slice(0, i), 
                    '',
                    ...val.slice(i)
                ]);
            /* } else {
                newAttrEl.current = null;
            } */
        }

    }
     
    return <CssListAttrs className="cssListAttrs">
            {style.map((key, i) => {
                return (
                    <div className="cssListItem" onClick={ev => newAttr(ev.target as EventTarget&HTMLElement, i)}>
                        <span>
                            <p spellCheck="false"
                                ref={!key ? newAttrEl : null}
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
                );
            })}
    </CssListAttrs>
}