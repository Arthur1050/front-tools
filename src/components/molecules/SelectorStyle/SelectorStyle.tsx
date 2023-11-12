import { getStyleSelector } from "../../../helpers/getStyleSelector";
import AttrsListStyle from "../AttrsListStyle/AttrsListStyle";
import { SelectorStyleStyle } from "./style";

interface Props {
    selector?: string
    el: HTMLElement
}

export default function SelectorStyle({selector, el}:Props) {
    const styles = selector ? getStyleSelector(selector) : [['element.style', el.style]] as [string, CSSStyleDeclaration][];

    return styles.map(([selectorText, cssStyle]) => {
        if (!selector || [...document.querySelectorAll(selectorText)].includes(el)) {
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