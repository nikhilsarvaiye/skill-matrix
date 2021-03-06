import React, {
    ChangeEventHandler,
    cloneElement,
    FocusEventHandler,
    useEffect,
    useState,
} from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import { Label } from '@library/label';
import { FormFieldHandlers } from './form-field.handlers';
import { FormFieldError } from './form-field-error';
import { formFieldExcludeWatchComponents } from './form-field.watch.config';
import './form-field.scss';

export interface IFormFieldProps {
    name: string;
    className?: string;
    label?: string;
    endLabel?: string;
    required?: string;
    children?: any;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
}

export const FormField = ({
    name,
    className,
    label,
    endLabel,
    required,
    children,
    onChange,
    onBlur,
    ...props
}: IFormFieldProps) => {
    const formContext = useFormContext();
    const formFieldHandlers = new FormFieldHandlers(children.props);
    const [touched, setTouched] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const properties: any = {};

    const setDataProps = () => {
        if (!children.props.data) {
            properties.data = formFieldHandlers.getValues(name);
        }
    };

    setDataProps();

    const isDirty = (value: any) => {
        return value !== null || value !== undefined || value !== '';
    };

    const reRender = (e: any) => {
        const isValueChanged = formContext.getValues(name) !== e.target.value;
        if (!formContext.errors[name] && !watchField()) {
            formContext.unregister(name);
            formContext.register({ name: name });
            return true;
        }
        return false;
    };

    const watchField = () => {
        const componentName = children.type.name;
        return !formFieldExcludeWatchComponents.includes(componentName);
    };

    const registerOnChange = () => {
        const existingOnChange = children.props.onChange;
        properties.onChange = (e: any) => {
            if (!touched) {
                setTouched(true);
            }
            if (existingOnChange) {
                existingOnChange(e);
            }

            const value =
                e.target.type === 'checkbox'
                    ? e.target.checked
                    : e.target.value;

            if (!inputValue && !value) {
                return;
            } else if (inputValue !== value) {
                setFormContextValue(value);
            }
        };
    };

    const registerOnBlur = () => {
        const existingOnBlur = children.props.onBlur;
        properties.onBlur = (e: any) => {
            if (!touched) {
                setTouched(true);
            }
            if (existingOnBlur) {
                existingOnBlur(e);
            }

            const type = e.target.type;
            const value =
                type === 'checkbox' ? e.target.checked : e.target.value;

            formFieldHandlers.setValues(name, value);
            setDataProps();

            if (required || type === 'tel') {
                setFormContextValue(value);
            }
        };
    };

    const setFormContextValue = (value: any) => {
        setInputValue(value);
        formContext.setValue(name, value, {
            shouldValidate: true,
            shouldDirty: typeof value === 'boolean' ? value : isDirty(value),
        });
    };

    registerOnChange();
    registerOnBlur();

    (props as any).name = name;
    (props as any).value = inputValue;
    (props as any).setValue = (value: any) => {
        formContext.setValue(name, value);
    };
    (props as any).form = formContext;
    (props as any).register = formContext.register;

    if (watchField()) {
        (props as any).watch = formContext.watch(name);
    }

    children = cloneElement(children, {
        ...props,
        ...children.props,
        ...properties,
    });

    useEffect(() => {
        formContext.register({ name: name });
    }, [formContext.register]);

    useEffect(() => {
        formContext.unregister(name);
    }, [formContext.unregister]);

    useEffect(() => {
        setInputValue(formContext.getValues(name));
    }, [formContext.getValues(name)]);

    return (
        <div
            className={classNames(
                'form-field' +
                    (touched && formContext.errors[name] ? ' invalid' : ''),
                className,
            )}
        >
            {!endLabel ? (
                <RenderLabel name={name} label={label} required={required} />
            ) : null}
            {/* <pre>{children.type.name}</pre> */}
            <div className="form-control">
                <div className="form-input">{renderChildren(children)}</div>
            </div>
            <FormFieldError
                key={name}
                name={name}
                error={formContext.errors[name]}
                showIcon={true}
            />
        </div>
    );
};

const RenderLabel = ({
    name,
    label,
    required,
}: {
    name: string;
    label: any;
    required: any;
}) => {
    return (
        <div className="form-label">
            <Label name={name} title={label} required={required} />
        </div>
    );
};

const renderChildren = (children: any) => {
    return children ? (
        typeof children === 'function' ? (
            children(children.props)
        ) : Array.isArray(children) ? (
            children.map((child, index) => {
                return renderChild(child, index.toString());
            })
        ) : (
            renderChild(children)
        )
    ) : (
        <input
            type="text"
            {...children.props.field}
            placeholder={children.props.title}
        />
    );
};

const renderChild = (child: any, key?: string) => {
    return <React.Fragment key={key}>{child}</React.Fragment>;
};
