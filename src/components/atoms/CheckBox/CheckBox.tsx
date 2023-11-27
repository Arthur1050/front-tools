import styled, { css } from "styled-components"
import { useRef } from "react"

interface Props {
    label: string
    selected?: boolean
    onchange?: () => void
}

export default function CheckBox({label, onchange, selected}:Props) {
    const input = useRef<HTMLInputElement>(null);
    console.log(input.current?.checked)
    console.log(selected)
    return (
        <CheckBoxStyle checked={selected}>
            <div>
                <span></span>
            </div>
            <input defaultChecked={selected} checked={selected} onChange={onchange} ref={input} type="checkbox" />
            <p>{label}</p>
        </CheckBoxStyle>
    )
}

const CheckBoxStyle = styled.label<{checked?:boolean}>`
    display: flex;
    align-items: center;
    gap: 6px;
    padding-inline: 4px;
    margin-block: 6px;
    transition: 150ms all;
    cursor: pointer;
    ${({checked}) => !checked && css`
        opacity: 0.75;
        &:hover {
            opacity: 0.875;
        }
    `}
    &> div {
        --width: 12px;
        --transition-time: 150ms;
        border: 1px solid #f4f4f4;
        border-radius: 4px;
        width: var(--width);
        aspect-ratio: 1/1;
        display: grid;
        place-items: center;
        transition: var(--transition-time) border-color;
        ${({checked}) => checked && css`
            border-color: #a58ae3;
        `}
        span {
            background-color: #a58ae3;
            transition: var(--transition-time) width ease-in-out;
            border-radius: 2px;
            aspect-ratio: 1/1;
            ${({checked}) => checked ? css`
                width: calc(var(--width) - 4px);
            ` : css`
                width: 0;
            `}
        }
    }
    input {
        display: none;
    }
    
    p {
        user-select: none;
        margin: 0;
    }
`