import styled from "styled-components";

export const AutoCompleteListStyle = styled.ul`
    position: absolute;
    max-height: 240px;
    overflow-y: auto;
    top: 100%;
    left: 0;
    list-style: none;
    color: #fff;
    width: max-content;
    min-width: 200px;
    background-color: #1e1e1e;
    z-index: 1;
    border-radius: 0.25rem;
    li {
        padding: 0.25rem 0.5rem;
        cursor: pointer;
        &.sel {
            background-color: #3d3d3d;
        }
    }
`