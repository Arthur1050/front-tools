import styled, { css } from "styled-components"
import { useRef } from "react"

interface Props {
    label: string
    selected?: boolean
    onchange?: () => void
}

export default function CheckBox({label, onchange, selected}:Props) {
    const input = useRef<HTMLInputElement>(null)
    return (
        <CheckBoxStyle checked={input.current?.checked}>
            <input defaultChecked={selected} checked={input.current?.checked} onChange={onchange} ref={input} type="checkbox" />
            <p>{label}</p>
        </CheckBoxStyle>
    )
}

const CheckBoxStyle = styled.label<{checked?:boolean}>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding-inline: 4px;
    margin-block: 4px;
    transition: 150ms all;
    ${({checked}) => checked ? css`
        
    `: css`
        opacity: 0.75;
        &:hover {
            opacity: 0.875;
        }
    `}
    p {
        margin: 0;
    }
`