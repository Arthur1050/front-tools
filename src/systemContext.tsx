import { Dispatch, SetStateAction, createContext, useState } from "react"
import { CSSPropertie } from "../types/css.type"

interface Props {
    children: JSX.Element
    cssProperties: CSSPropertie
}

interface System {
    cssProperties: CSSPropertie
}

export const SystemContext = createContext({} as [System, Dispatch<SetStateAction<System>>])

export default function SystemProvider({children, cssProperties}:Props) {
    const [system, setSystem] = useState({
        cssProperties
    })

    return <SystemContext.Provider value={[system, setSystem]}>
        {children}
    </SystemContext.Provider>
}