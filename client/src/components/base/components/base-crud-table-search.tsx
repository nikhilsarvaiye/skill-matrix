import { useEffect, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEraser } from '@fortawesome/free-solid-svg-icons';
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

export const BaseCrudTableSearch = ({
    defaultValues,
    criteria,
    loading,
    onSearch,
    onReset,
    validationSchema,
    children,
}: {
    defaultValues: any;
    criteria: any;
    loading: boolean;
    onSearch: (values: IModel) => void;
    onReset: (values: IModel) => void;
    validationSchema: any;
    children?: ReactNode;
}) => {
    const form = useForm({
        defaultValues: defaultValues,
        validationSchema: validationSchema,
        onSubmit: (values: IModel, form: IForm) => {
            if (onSearch) {
                onSearch(values);
            }
        },
        onReset: (values: IModel, form: IForm) => {
            if (onReset) {
                onReset(values);
            }
        },
    });

    useEffect(() => {
        form.setValues(criteria);
    }, [criteria]);

    return (
        <Form form={form}>
            <FormSection theme={FormSectionTheme.White}>
                <FormSectionHeader>
                    <FormSection align={FormSectionAlignment.Left}>
                        <FormSectionHeaderTitle
                            startIcon={
                                <FontAwesomeIcon
                                    icon={faPlus}
                                ></FontAwesomeIcon>
                            }
                        >
                            Search
                        </FormSectionHeaderTitle>
                    </FormSection>
                </FormSectionHeader>
                <Spin spinning={loading}>
                    <FormSectionBody padding>{children}</FormSectionBody>
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
                                            icon={faPlus}
                                        ></FontAwesomeIcon>
                                    }
                                    type={ButtonType.Primary}
                                    onClick={() => {
                                        form.submitForm();
                                    }}
                                >
                                    Search
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
                        </FormSection>
                    </FormSectionFooter>
                </Spin>
            </FormSection>
        </Form>
    );
};
