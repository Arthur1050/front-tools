import { MutableRefObject, useEffect, useState, KeyboardEvent as KeyboardEventR } from "react"
import { getCSSProperties } from "../../../helpers/getCssProperties";
import { AutoCompleteListStyle } from "./style";

interface Props {
    AttrKey?: string,
    inputEl: EventTarget & Element
    selected: MutableRefObject<string>
}

export default function AutoCompleteList({AttrKey='', inputEl, selected}:Props) {
    const [list, setList] = useState([] as string[]);
    const [select, setSelect] = useState(0);

    const loadList = async (text:string) => {
        const cssProperties = await getCSSProperties();

        if (cssProperties) {
            // RETORNA VAZIO CASO O CAMPO NÃO FOR UM DE "VALUE" E ESTIVER VAZIO
            if (!text.trim() && !AttrKey) {
                return setList([]);
            };

            setList(() => {
                const listItems:string[] = [];

                // CASO A LISTA DE SUGESTÕES FOR NO CAMPO DE VALUE
                if (AttrKey) {
                    cssProperties[AttrKey].values.forEach(value => value.includes(text) && listItems.push(value))
                } else {
                    for (let key in cssProperties) {
                        if (key.includes(text)) {
                            // INCLUINDO TAMBÉM SUGESTÕES DE PROPRIEDADES JÁ COM VALORES SETADOS
                            cssProperties[key].values.forEach(value => {
                                /(^[A-Za-z\s]*$)/.test(value)&&
                                listItems.push(`${key}: ${value}`);
                            })
                            listItems.push(key)
                        } 
                    };
                }
                const ordenedList = [...listItems.sort((a) => a.startsWith(text.trim())?-1:1)]

                selected.current = ordenedList.length ? ordenedList[0] :'';

                return ordenedList;
            })
        }
    }

    const keyPress = (event:KeyboardEvent&KeyboardEventR) => {
        switch(event.key) {
            case 'ArrowDown':
                event.preventDefault();
                setSelect(val => {
                    const numberSel = val == (list.length - 1) ?
                    0 : val+1;

                    selected.current = list[numberSel]||'';

                    return numberSel;
                })
            break;
            case 'ArrowUp':
                event.preventDefault();
                setSelect(val => {
                    const numberSel = !val ?
                    list.length - 1 : val-1;

                    selected.current = list[numberSel]||'';

                    return numberSel;
                })
            break;
            default: 
                setSelect(0);
                loadList(event.currentTarget.textContent||'');
                !list.length && (selected.current = '');
        }
    }

    useEffect(() => {
        inputEl.addEventListener('keyup', keyPress as EventListenerOrEventListenerObject);
    
        return () => {
            inputEl.removeEventListener('keyup', keyPress as EventListenerOrEventListenerObject)
        }
    })

    useEffect(() => {
        AttrKey && loadList('');
    }, [])

    return (
        <AutoCompleteListStyle>
            {list.map((item, i) => <li className={i == select ? 'sel':''} spellCheck="false" >{item}</li>)}
        </AutoCompleteListStyle>
    )
}