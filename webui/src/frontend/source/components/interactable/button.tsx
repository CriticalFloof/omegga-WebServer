import React from "react";
import styled from "styled-components";

const FunctionalButton = ({ children = null, ...attributes }: any) => {
    return <div {...attributes}>{children}</div>;
};

export default styled(FunctionalButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-transform: uppercase;
    height: ${(props) => props.theme.sizes.px.elementHeight}px;
    font-size: ${(props) => props.theme.sizes.px.elementFont}px;
    border-radius: ${(props) => props.theme.sizes.px.elementHeight / 2}px;
    box-sizing: border-box;
    color: ${(props) => props.theme.colors.foreground.primary};
    font-weight: bold;
    padding: 0 ${(props) => props.theme.sizes.px.elementHeight / 2}px;
    cursor: pointer;
    user-select: none;
    background-color: ${(props) => props.theme.colors.background.primary};
    border-radius: 0;

    &.boxy {
        border-radius: 0;
        padding: 0 8px;
    }

    &.icon {
        border-radius: 0;
        padding: 0;
        width: ${(props) => props.theme.sizes.px.elementHeight};
    }

    &.disabled {
        opacity: 50%;
        cursor: default;
        pointer-events: none;
    }
`;
