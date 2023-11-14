import styled, { css } from "styled-components";

interface Props {
    x: number
    y: number
    width: number
    height: number
    border: boolean
}

export const MarkerDOMStyle = styled.div<Props>`
    position: absolute;
    z-index: 999999;
    background-color: #5d28ff26;
    box-sizing: border-box;
    ${({width, height, x, y}) => css`
        width: ${width}px;
        height: ${height}px;
        left: ${x}px;
        top: ${y}px;
    `}
    ${props => props.border && css`
        border: 1px solid #5d28ff73;
    `}
`