import { Dispatch, SetStateAction, createContext, useState, useEffect } from "react"

interface Props {
    children: JSX.Element
}

interface System {
    viewTargetSel: boolean,
    viewTargetBorderSel: boolean,
}

export const SystemContext = createContext<[System, Dispatch<SetStateAction<System>>]>([] as any)

export default function SystemProvider({children}:Props) {
    const [system, setSystem] = useState({
        viewTargetSel: false,
        viewTargetBorderSel: false,
    })

    useEffect(() => {
        chrome.storage.local.get(Object.keys(system)).then(val => {
            setSystem(Object(val))
        })
    }, [])

    return <SystemContext.Provider value={[system, setSystem]}>
        {children}
    </SystemContext.Provider>
}