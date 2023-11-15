import {useContext} from 'react';
import { SystemContext } from "../../../systemContext"
import { MarkerDOMStyle } from './style';

interface Props {
    el: HTMLElement
}

export default function MarkerDOM({el}:Props) {
    const [system] = useContext(SystemContext)
    var childs:Element[] = [];

    if (system.viewTargetBorderSel) {
        childs = [...el.querySelectorAll('& > *')];
    }

    const {x, y, height, width} = el.getBoundingClientRect();

    return system.viewTargetSel ? 
        <MarkerDOMStyle border={system.viewTargetBorderSel} height={height} width={width} x={x + scrollX} y={y + scrollY}>
            {childs.map(child => {
                const rects = child.getBoundingClientRect();

                return <div style={{
                    position: 'absolute',
                    width: `${rects.width}px`,
                    height: `${rects.height}px`,
                    left: `${rects.x - x}px`,
                    top: `${rects.y - y}px`,
                }}></div>
            })}
        </MarkerDOMStyle>
        :
        <></>
}

