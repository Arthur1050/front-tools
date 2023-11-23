import styled, { css } from "styled-components";

interface Props {
    viewMore: boolean
}

export const TagTargetStyle = styled.div<Props>`
    display: flex;
    flex-wrap: wrap;
    column-gap: .25rem;
    overflow: hidden;
    line-height: 16px;
    ${props => !props.viewMore && css`
        max-height: 48px;
    `}
    .tagName {
        color: #A1C7E0;
    }
    .tagAttr {
        color: #89D49A;
        .tagValues {
            color: #CCEA8D;
            word-break: break-word;
        }
    }
    & + div {
        text-align: center;
        cursor: pointer;
        span {
            color: #f4f4f4;
            font-size: 12px;
            font-weight: 600;
            opacity: .5;
        };
        &:hover span {
            opacity: 1;
        }
    }
`