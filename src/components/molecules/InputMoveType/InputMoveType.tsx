import { useRef } from "react"
import styled, { css } from "styled-components"

interface Props {
    children: JSX.Element
    label: string
    selected?: boolean
    onclick?: () => void
    name: string
}

export default function InputMoveType({children, label, selected, onclick, name}:Props) {
    const input = useRef<HTMLInputElement>(null)
    return(
        <InputMoveTypeStyle onClick={onclick} selected={input.current?.checked}>
            <input ref={input} checked={selected} type="radio" name={name} />
            {children}
            <span>{label}</span>
        </InputMoveTypeStyle>
    )
}

const InputMoveTypeStyle = styled.label<{selected?: boolean}>`
    width: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-block: 4px;
    border: 2px solid;
    border-radius: 8px;
    justify-content: center;
    gap: 2px;
    transition: 150ms all;
    ${({selected}) => selected ? css`
        color: #a58ae3;
        background-color: #8d6bdd17;
        box-shadow: #8d6bdda3 0 0 6px 1px;
    ` : css`
        cursor: pointer;
        opacity: 0.325;
        &:hover {
            opacity: 0.5;
        }
    `}
    & > *:first-child {
        margin-block: auto;
    }
    span {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .5px;
    };
    input {
        display: none
    }
`