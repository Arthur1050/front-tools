import { Dispatch, SetStateAction, createContext, useState } from "react"

interface Props {
    children: JSX.Element
}

interface System {
}

export const SystemContext = createContext({} as [System, Dispatch<SetStateAction<System>>])

export default function SystemProvider({children}:Props) {
    const [system, setSystem] = useState({
        
    })

    return <SystemContext.Provider value={[system, setSystem]}>
        {children}
    </SystemContext.Provider>
}