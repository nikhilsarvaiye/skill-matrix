import { ReactNode, MouseEventHandler, CSSProperties } from 'react';
import classNames from 'classnames';
import { Button as AntdButton } from 'antd';
import styled, { css } from 'styled-components';

export enum ButtonType {
    Default = 'default',
    Primary = 'primary',
    Ghost = 'ghost',
    Dashed = 'dashed',
    Link = 'link',
    Text = 'text',
}

export enum SubmitAction {
    Default = 'default',
    Close = 'close',
    New = 'new',
    Add = 'add',
    Back = 'back',
}

export enum ButtonHTMLType {
    Button = 'button',
    Submit = 'submit',
    Reset = 'reset',
}

export enum ButtonSize {
    Small = 'small',
    Middle = 'middle',
    Large = 'large',
}

interface IProps {
    primary?: boolean;
    type?: ButtonType;
    disabled?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLElement>;
    htmlType?: ButtonHTMLType;
    danger?: boolean;
    loading?: boolean;
    size?: ButtonSize;
    href?: string;
    style?: CSSProperties;
    className?: string;
    tabIndex?: number;
}

const button = (props: IProps) => {
    return (
        <span>
            <AntdButton
                tabIndex={props.tabIndex}
                htmlType={props.htmlType || ButtonHTMLType.Button}
                className={classNames('btn', props.type, props.className)}
                size={props.size}
                loading={props.loading}
                danger={props.danger}
                disabled={props.disabled}
                href={props.href}
                onClick={props.onClick}
                style={props.style}
                type={props.type}
            >
                {props.startIcon ? (
                    <span className="btn-icon start">{props.startIcon}</span>
                ) : null}
                {props.children}
                {props.endIcon ? (
                    <span className="btn-icon end">{props.endIcon}</span>
                ) : null}
            </AntdButton>
        </span>
    );
};

export const Button = styled(button)``;

export const Buttonss = styled(button)`
    color: palevioletred;
    font-weight: normal;
    :focus {
        color: palevioletred;
        border-color: palevioletred;
    }
    :hover {
        color: palevioletred;
        border-color: palevioletred;
    }
    &.ant-btn-clicked:after {
        content: '';
        position: absolute;
        top: -1px;
        left: -1px;
        bottom: -1px;
        right: -1px;
        border-radius: inherit;
        border: 0 solid palevioletred;
        opacity: 0.4;
        -webkit-animation: buttonEffect 0.4s;
        animation: buttonEffect 0.4s;
        display: block;
    }
    ${(props: IProps) =>
        props.primary &&
        css`
            color: ffffff !important;
            background-color: 5e9acf !important;

            &:hover:not([disabled]) {
                background-color: #0e4472 !important;
                cursor: pointer;
            }

            &:focus {
                background-color: #235a8b !important;
            }
        `};
`;
