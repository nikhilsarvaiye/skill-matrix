import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEraser } from '@fortawesome/free-solid-svg-icons';
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
    FormField,
    useForm,
    IForm,
} from '@library/form';
import { validationSchema } from './skill.validator';
import { Spin } from '@library/spin';
import { Input } from '@library/input';
import { Button, ButtonHTMLType, ButtonType } from '@library/button';
import { useEffect } from 'react';
import { SkillModel } from './skill.model';

export const Skill = ({
    initialState,
    skill,
    loading,
    onSave,
}: {
    initialState: any;
    skill: SkillModel | null;
    loading: boolean;
    onSave: (values: SkillModel) => void;
}) => {
    const form = useForm({
        defaultValues: initialState,
        validationSchema: validationSchema,
        onSubmit: (values: SkillModel, form: IForm) => {
            if (onSave) {
                onSave(values);
            }
        },
        onReset: (values: SkillModel, form: IForm) => {},
    });

    useEffect(() => {
        form.setValues(skill);
    }, [skill]);

    return (
        <div className="skill">
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
                                Add New Skill
                            </FormSectionHeaderTitle>
                        </FormSection>
                    </FormSectionHeader>
                    <Spin spinning={loading}>
                        <FormSectionBody padding>
                            {JSON.stringify(form.getValues(), null, 4)}
                            <ScrollBar autoHeightMax={'calc(100vh - 200px)'}>
                                <FormSection
                                    layout={FormSectionLayoutType.Horizontal}
                                    numberOfRowFields={2}
                                >
                                    <FormField name="name" label="Name" key="0">
                                        <Input />
                                    </FormField>
                                    <FormField
                                        name="skill"
                                        label="Skill"
                                        key="1"
                                    >
                                        <Input />
                                    </FormField>
                                </FormSection>
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
                                                icon={faPlus}
                                            ></FontAwesomeIcon>
                                        }
                                        type={ButtonType.Primary}
                                        onClick={() => {
                                            form.submitForm();
                                        }}
                                    >
                                        Add
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
                                        Clear
                                    </Button>
                                </FormAction>
                            </FormSection>
                        </FormSectionFooter>
                    </Spin>
                </FormSection>
            </Form>
        </div>
    );
};
