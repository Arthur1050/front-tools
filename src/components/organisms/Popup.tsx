import styled from "styled-components";
import SelectorStyle from "../molecules/SelectorStyle/SelectorStyle";
import { SystemContext, SystemObj } from "../../systemContext";
import TagTarget from "../molecules/TagTarget/TagTarget";
import {useLayoutEffect, useContext} from 'react'
import { movePopup } from "../../helpers/movePopup";

interface Props {
    el: HTMLElement
}

export default function Popup({el}:Props) {
    const [{container, moveType}] = useContext(SystemContext)
    const {classList} = el;
    
    useLayoutEffect(() => {
        if (container && moveType && moveType == 1) {
            container.style.transition = '100ms all ease-out'
            movePopup({popup: container, target: el, moveType})
        }
    }, [el])

    return(
        <PopupStyle>
            <TagTarget el={el} />
            ${
                haveStyles(el) ? 
                <div className="tagStyles">
                    {/* el.style.length ? <ElementStyle el={el}/>:'' */}
                    {el.style.length ? <SelectorStyle el={el} />:''}
                    <SelectorStyle selector={el.tagName} el={el} />
                    {el.id ? <SelectorStyle selector={'#'+el.id} el={el} />:''}
                    {classList.length ? [...classList].map(cl => <SelectorStyle selector={'.'+cl} el={el} />):''}
                </div> : ''
            }
            
        </PopupStyle>
    )
}

function haveStyles(element:HTMLElement) {
    return !!(element.style.length || element.id || element.classList.length)
}

const PopupStyle = styled.div`
    @font-face {
        font-family: 'Inter';
        src: url(${chrome.runtime.getURL("fonts/Inter-VariableFont.ttf")}) format('truetype');
    }
    max-width: ${SystemObj.maxWidth}px;
    font-family: 'Inter';
    font-size: 14px;
    border-radius: .5rem;
    padding: .5rem;
    background-color: #252525;
    .tagStyles {
        max-height: ${SystemObj.maxHeight}px;
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