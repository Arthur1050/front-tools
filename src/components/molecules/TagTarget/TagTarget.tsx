import { updatePosition } from "../../../helpers/movePopup";
import { SystemContext } from "../../../systemContext";
import { TagTargetStyle } from "./style";
import {useState, useRef, useLayoutEffect, useContext} from 'react';

interface Props {
    el:HTMLElement
}

export default function TagTarget({el}:Props) {
    const attrs = [...el.attributes];
    const tagTargetEl = useRef<HTMLDivElement>(null)
    const [viewMore, setViewMore] = useState(false);
    const [height, setHeight] = useState(48);
    const [{container}] = useContext(SystemContext)

    useLayoutEffect(() => {
        tagTargetEl.current && setHeight(tagTargetEl.current.getBoundingClientRect().height)

        if (viewMore) {
            setViewMore(false);
        }
    }, [el])

    useLayoutEffect(() => {
        if (viewMore) {
            console.log('Position updated!')
            updatePosition(container)
        }
    }, [viewMore])

    return(
        <>
            <TagTargetStyle viewMore={viewMore} ref={tagTargetEl}>
                <span className="tagName">&lt;{el.tagName.toLowerCase()}</span>
                    {attrs.length ? <Attributes attrs={attrs}/>:''}
                <span className="tagName">/&gt;</span>
            </TagTargetStyle>
            <div>
                {height >= 48 && !viewMore ? 
                    <span onClick={() => setViewMore(true)}>Ver mais...</span> :''
                }
            </div>
        </>
    )
}

function Attributes({attrs}:{attrs:Attr[]}) {
    return attrs.map(attr => (
        <span className="tagAttr">
            {attr.name.toLowerCase()}="
                <span className="tagValues">{attr.value.toLowerCase()}</span>
            "
        </span>
    ))
}