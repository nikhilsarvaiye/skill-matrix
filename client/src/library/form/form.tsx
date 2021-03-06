import React, { useEffect, cloneElement } from 'react';
import { useForm as useReactHookForm, FormProvider } from 'react-hook-form';
import { UseFormMethods, UseFormOptions } from 'react-hook-form/dist/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormHandlers } from './form.handlers';
import './form.scss';
import { CSSProperties } from 'styled-components';

export interface IFormConfiguration {
    defaultValues: any;
    validationSchema: any;
    queryParams?: any;
    cacheRequest?: any;
    onSubmit: (values: any, form: IForm) => void;
    onReset: (values: any, form: IForm) => void;
}

export interface IForm extends UseFormMethods {
    defaultValues: any;
    validationSchema: any;
    formHandlers: FormHandlers;
    submitForm: () => void;
    resetForm: () => void;
    resetFormArray: (values: any) => void;
    setValues: (values: any, config?: any) => void;
}

export const useForm = (formConfiguration: IFormConfiguration): IForm => {
    const formHandlers = new FormHandlers(formConfiguration);
    formConfiguration.defaultValues = formHandlers.onInitializing(
        formConfiguration.defaultValues,
    );

    const reactHookForm = useReactHookForm({
        defaultValues: formConfiguration.defaultValues,
        resolver: yupResolver(formConfiguration.validationSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const form = {
        ...reactHookForm,
        defaultValues: formConfiguration.defaultValues || {},
        validationSchema: formConfiguration.validationSchema,
        formHandlers: formHandlers,
    } as IForm;

    form.submitForm = () => {
        form.handleSubmit(
            (values: any, e: any) => {
                values = formHandlers.onSubmitting(values, form);
                if (formConfiguration.onSubmit) {
                    formConfiguration.onSubmit(values, form);
                }
            },
            (errors: any, e: any) => console.error(errors, e),
        )();
    };

    const reset = (values: any) => {
        reactHookForm.reset(values);
        values = formHandlers.onResetting(values, reactHookForm);
        if (formConfiguration.onReset) {
            formConfiguration.onReset(values, form);
        }
    };

    form.resetForm = () => {
        reset(formConfiguration.defaultValues);
    };

    form.resetFormArray = (values: any) => {
        reset(values);
    };

    form.setValues = (values: any, config: any) => {
        for (const key in values) {
            form.setValue(key, values[key], config);
        }
    };

    return form;
};

interface IFormProps {
    form: IForm;
    style?: CSSProperties;
    children?: any;
}

export const Form = ({ form, style, children }: IFormProps) => {
    if (form == null) {
        throw new Error('Please provide form');
    }

    /** register fields from default values if it's not already present */
    const registerNonControlFields = () => {
        const fields = form.control.fieldsRef.current;
        for (const key in form.defaultValues) {
            if (!fields[key]) {
                form.register({ name: key });
            }
        }
    };

    const setValue = form.setValue;
    form.setValue = (name: string, value: any, config: any) => {
        /** register field if it's not already present */
        const fields = form.control.fieldsRef.current;
        if (!fields[name]) {
            form.register({ name: name });
        }
        /** end */

        /** rethink
         * if (Array.isArray(value)) {
                for (const subKey in value) {
                    for (const subNestKey in value[parseInt(subKey)]) {
                        const key = `${name}[${subKey}].${subNestKey}`;
                        form.register({
                            name: key,
                        });
                        setValue(key, value[parseInt(subKey)][subNestKey], {
                            shouldValidate: true,
                        });
                    }
                }
            }
         */

        config = config || {};
        setValue(name, value, {
            shouldValidate: config.shouldValidate || true,
        });
    };

    useEffect(() => {
        const onReady = async () => {
            await form.formHandlers.onReady(form.defaultValues, form);
        };
        onReady();
        registerNonControlFields();
        form.resetForm();
    }, []);

    return (
        <div className="form" style={style}>
            <FormProvider {...form}>
                <form autoComplete="nope" onSubmit={form.submitForm}>
                    {children}
                </form>
            </FormProvider>
        </div>
    );
};

const renderChildren = (props: any, children: any) => {
    return children
        ? typeof children === 'function'
            ? children(props)
            : Array.isArray(children)
            ? children.map((child, index) => {
                  return renderChild(props, child, index.toString());
              })
            : renderChild(props, children)
        : null;
};

const renderChild = (props: any, child: any, key?: string) => {
    let cloneChild = cloneElement(child, ...props);
    return <React.Fragment key={key}>{cloneChild}</React.Fragment>;
};
