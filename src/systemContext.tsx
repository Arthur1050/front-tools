import { Dispatch, SetStateAction, createContext, useState, useEffect } from "react"

interface Props {
    children: JSX.Element
}

interface System {
    maxWidth: number,
    maxHeight: number,
    viewTargetSel: boolean,
    viewTargetBorderSel: boolean,
    moveType: number
}

export const SystemContext = createContext<[System, Dispatch<SetStateAction<System>>]>([] as any)

export const SystemObj = {
    maxWidth: 300,
    maxHeight: 0| 0.4 * innerHeight,
    moveType: 1,
    viewTargetSel: false,
    viewTargetBorderSel: false,
}

export default function SystemProvider({children}:Props) {
    const [system, setSystem] = useState(SystemObj)

    useEffect(() => {
        chrome.storage.local.get(Object.keys(system)).then(val => {
            setSystem(Object(val))
        })
    }, [])

    return <SystemContext.Provider value={[system, setSystem]}>
        {children}
    </SystemContext.Provider>
}