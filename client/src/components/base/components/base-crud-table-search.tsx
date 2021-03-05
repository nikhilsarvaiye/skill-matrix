import { useEffect, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faEraser,
    faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
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

export interface IBaseCrudTableSearch {
    defaultValues: any;
    criteria: any;
    loading: boolean;
    onSearch: (values: IModel) => void;
    onReset: (values: IModel) => void;
    onHide?: () => void;
    validationSchema: any;
    children?: ReactNode;
}

export const BaseCrudTableSearch = ({
    defaultValues,
    criteria,
    loading,
    onSearch,
    onReset,
    onHide,
    validationSchema,
    children,
}: IBaseCrudTableSearch) => {
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
                                    icon={faSearch}
                                ></FontAwesomeIcon>
                            }
                        >
                            Search
                        </FormSectionHeaderTitle>
                    </FormSection>
                    {onHide && (
                        <FormSection
                            layout={FormSectionLayoutType.Horizontal}
                            align={FormSectionAlignment.Right}
                            autoSpacing={true}
                        >
                            <FontAwesomeIcon
                                icon={faArrowCircleLeft}
                                size="lg"
                                onClick={onHide}
                                style={{ cursor: 'pointer' }}
                            ></FontAwesomeIcon>
                        </FormSection>
                    )}
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
                                            icon={faSearch}
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
