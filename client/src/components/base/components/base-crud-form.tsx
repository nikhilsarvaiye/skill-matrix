import { useEffect, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faEraser } from '@fortawesome/free-solid-svg-icons';
import { ScrollBar } from '@library/scrollbar';
import {
    Form,
    FormSection,
    FormSectionHeader,
    FormSectionHeaderTitle,
    FormSectionBody,
    FormSectionFooter,
    FormSectionTheme,
    FormSectionAlignment,
    FormSectionLayoutType,
    FormAction,
    useForm,
    IForm,
} from '@library/form';
import { Spin } from '@library/spin';
import { Button, ButtonType } from '@library/button';
import { IModel } from '../models';

export interface IBaseCrudForm {
    title: string;
    defaultValues: any;
    model: IModel | null;
    loading: boolean;
    onSave: (values: IModel) => void;
    onCancel: () => void;
    validationSchema: any;
    children?: ReactNode;
}

export const BaseCrudForm = ({
    title,
    defaultValues,
    model,
    loading,
    onSave,
    onCancel,
    validationSchema,
    children,
}: IBaseCrudForm) => {
    const isUpdate = (): boolean => {
        return model && model.id ? true : false;
    };
    const form = useForm({
        defaultValues: isUpdate() ? model : defaultValues,
        validationSchema: validationSchema,
        onSubmit: (values: IModel, form: IForm) => {
            if (onSave) {
                onSave(values);
            }
        },
        onReset: (values: IModel, form: IForm) => {},
    });

    useEffect(() => {
        form.setValues(model);
    }, [model]);

    return (
        <Form form={form}>
            <FormSection theme={FormSectionTheme.White}>
                <FormSectionHeader>
                    <FormSection align={FormSectionAlignment.Left}>
                        <FormSectionHeaderTitle
                            startIcon={
                                <FontAwesomeIcon
                                    icon={isUpdate() ? faEdit : faPlus}
                                ></FontAwesomeIcon>
                            }
                        >
                            {isUpdate() ? 'Edit' : 'Add New'} {title}
                        </FormSectionHeaderTitle>
                    </FormSection>
                </FormSectionHeader>
                <Spin spinning={loading}>
                    <FormSectionBody padding>
                        <ScrollBar autoHeightMax={'calc(100vh - 17.5em)'}>
                            {children}
                        </ScrollBar>
                    </FormSectionBody>
                    <FormSectionFooter>
                        <FormSection
                            layout={FormSectionLayoutType.Horizontal}
                            align={FormSectionAlignment.Center}
                            autoSpacing={true}
                        >
                            <FormAction>
                                <Button
                                    startIcon={
                                        <FontAwesomeIcon
                                            icon={isUpdate() ? faEdit : faPlus}
                                        ></FontAwesomeIcon>
                                    }
                                    type={ButtonType.Primary}
                                    onClick={() => {
                                        form.submitForm();
                                    }}
                                >
                                    {isUpdate() ? 'Update' : 'Add'}
                                </Button>
                            </FormAction>
                            <FormAction>
                                <Button
                                    startIcon={
                                        <FontAwesomeIcon
                                            icon={faEraser}
                                        ></FontAwesomeIcon>
                                    }
                                    type={ButtonType.Secondary}
                                    onClick={() => {
                                        form.resetForm();
                                    }}
                                >
                                    Reset
                                </Button>
                            </FormAction>
                            <FormAction>
                                <Button
                                    startIcon={
                                        <FontAwesomeIcon
                                            icon={faEraser}
                                        ></FontAwesomeIcon>
                                    }
                                    type={ButtonType.Secondary}
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </FormAction>
                        </FormSection>
                    </FormSectionFooter>
                </Spin>
            </FormSection>
        </Form>
    );
};
