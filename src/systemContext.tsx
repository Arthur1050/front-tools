import { Dispatch, SetStateAction, createContext, useState, useEffect } from "react"

interface Props {
    children: JSX.Element
    container?: HTMLDivElement
}

interface System {
    container: null|HTMLDivElement
    maxWidth: number,
    maxHeight: number,
    viewTargetSel: boolean,
    viewTargetBorderSel: boolean,
    moveType: number
}

export const SystemContext = createContext<[System, Dispatch<SetStateAction<System>>]>([] as any)

export const SystemObj:System = {
    container: null,
    maxWidth: 300,
    maxHeight: 0| 0.4 * innerHeight,
    moveType: 0,
    viewTargetSel: false,
    viewTargetBorderSel: false,
}

export default function SystemProvider({children, container}:Props) {
    const [system, setSystem] = useState(SystemObj)

    useEffect(() => {
        chrome.storage?.local.get(Object.keys(system)).then(val => {
            setSystem(Object(val))
        })
    }, [])

    return <SystemContext.Provider value={[{...system, container: container||null}, setSystem]}>
        {children}
    </SystemContext.Provider>
}