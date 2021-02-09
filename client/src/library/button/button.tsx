import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface IProps {
    primary: boolean;
}

export const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid palevioletred;
    color: palevioletred;
    margin: 0 1em;
    padding: 0.25em 1em;

    ${(props: IProps) =>
        props.primary &&
        css`
            background: palevioletred;
            color: white;
        `};
`;
