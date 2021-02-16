import React, { useState, useEffect, useRef, ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input } from '@progress/kendo-react-inputs';
import { useDebounce } from '@util/debounce';
import { EventKeys } from '@util/event-keys';
import './input.scss';

export const InputAction = Object.freeze({
    Text: 'text',
    Hidden: 'hidden',
});

export const InputSize = Object.freeze({
    Small: 'small',
    Medium: 'medium',
    Large: 'large',
});

interface IProps {
    id: string;
    type: string;
    name: string;
    value: any;
    setValue: (value: any) => {};
    maxLength: number;
    className: string;
    size: InputSize;
    placeholder: string;
    onChange: (event: MouseEvent) => {};
    onTextChange: (value: any) => {};
    onDebouncedValueChange: (value: any) => {};
    onFocus: (event: MouseEvent) => {};
    onBlur: (event: MouseEvent) => {};
    onKeyUp: (event: KeyboardEvent) => {};
    onKeyDown: (event: KeyboardEvent) => {};
    disabled: boolean;
    preEndIcon: ReactNode;
    onPreEndIconClick: (event: MouseEvent) => {};
    endIcon: ReactNode;
    onEndIconClick: (event: MouseEvent) => {};
    tabIndex: number;
    alwaysVisiblePlaceholder: boolean;
    lock: boolean;
    autoFocus: boolean;
    onRef: createRe;
    register: string;
}

export const input = ({
    id,
    type,
    name,
    value,
    setValue,
    maxLength,
    className,
    size,
    placeholder,
    onChange,
    onTextChange,
    onDebouncedValueChange,
    onFocus,
    onBlur,
    onKeyUp,
    onKeyDown,
    disabled,
    preEndIcon,
    onPreEndIconClick,
    endIcon,
    onEndIconClick,
    tabIndex,
    alwaysVisiblePlaceholder,
    lock,
    autoFocus,
    onRef,
    register,
}: IProps) => {
    placeholder = placeholder || 'Enter text';
    const [visiblePlaceholder, setVisiblePlaceholder] = useState(true);
    const control = useRef();
    const isFirstRun = useRef(true);
    const debouncedValue = useDebounce(value, 300);

    const handleFocus = (event) => {
        if (!alwaysVisiblePlaceholder) {
            setVisiblePlaceholder(false);
        }
        if (onFocus) {
            onFocus(event);
        }
    };

    const handleBlur = (event) => {
        setVisiblePlaceholder(true);
        if (onBlur) {
            onBlur(event);
        }
    };

    const handleKeydown = (event) => {
        if (lock && !EventKeys.isTab(event)) {
            event.preventDefault();
            return;
        }
        if (EventKeys.isDelete(event)) {
            if (setValue) {
                setValue('');
            }
        }
        if (onKeyDown) {
            onKeyDown(event);
        }
    };

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        if (onDebouncedValueChange) {
            onDebouncedValueChange(debouncedValue);
        }
    }, [debouncedValue]);

    useEffect(() => {
        if (autoFocus) {
            control.current.focus();
        }
        if (onRef) {
            onRef(control);
        }
    }, [autoFocus]);

    return (
        <div
            className={classNames(
                !value ? 'no-value' : '',
                'text-box',
                endIcon ? 'ellipsis' : '',
                className,
            )}
        >
            <Input
                ref={control}
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={visiblePlaceholder ? placeholder : null}
                maxLength={maxLength}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeydown}
                onKeyUp={onKeyUp}
                disabled={disabled}
                className={classNames(size ? size : '')}
                autoComplete="off"
                type="text"
                tabIndex={tabIndex}
                autoFocus={autoFocus}
            />
            {preEndIcon ? (
                <span
                    className="input-icon end pre"
                    onClick={onPreEndIconClick}
                >
                    {preEndIcon}
                </span>
            ) : null}
            {endIcon ? (
                <span className="input-icon end post" onClick={onEndIconClick}>
                    {endIcon}
                </span>
            ) : null}
        </div>
    );
};
