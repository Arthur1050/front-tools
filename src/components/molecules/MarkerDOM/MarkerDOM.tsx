import {useContext} from 'react';
import { SystemContext } from "../../../systemContext"
import { MarkerDOMStyle } from './style';

interface Props {
    el: HTMLElement
}

export default function MarkerDOM({el}:Props) {
    const [system] = useContext(SystemContext)

    const {x, y, height, width} = el.getBoundingClientRect();

    return system.viewTargetSel ? 
        <MarkerDOMStyle border={system.viewTargetBorderSel} height={height} width={width} x={x} y={y} />
        :
        <></>
}

