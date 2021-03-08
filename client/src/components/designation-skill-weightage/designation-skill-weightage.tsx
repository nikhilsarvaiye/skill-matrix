import { Yup } from '@library/yup';
import { Dropdown } from '@library/dropdown';
import {
    FormSection,
    FormSectionLayoutType,
    FormField,
    IForm,
} from '@library/form';
import { BaseCrudForm } from '@components/base/components';
import { DesignationPicker } from '@components/designation';
import { SkillWeightagePicker } from '@components/skill-weightage';
import {
    DesignationSkillWeightagesModel,
    SkillWeightageType,
} from './designation-skill-weightage.types';
import { UserPicker } from '@components/user';
import { ChangeEvent } from 'react';

const errorDesignationOrUserMessage =
    'Please select either Designation or User';
const validationSchema = Yup.object().shape({
    designationId: Yup.string()
        .nullable()
        .test('oneOfRequired', errorDesignationOrUserMessage, function (item) {
            if (!this.parent.designationId && !this.parent.userId) {
                return false;
            } else {
                return true;
            }
        }),
    skillWeightagesId: Yup.string()
        .nullable()
        .required('Skill Weightage is required'),
    userId: Yup.string()
        .nullable()
        .test('oneOfRequired', errorDesignationOrUserMessage, function (item) {
            if (!this.parent.designationId && !this.parent.userId) {
                return false;
            }
            if (this.parent.designationId && this.parent.userId) {
                return false;
            } else {
                return true;
            }
        }),
});

export const DesignationSkillWeightage = ({
    defaultValues,
    model,
    loading,
    onSave,
    onCancel,
}: {
    defaultValues: any;
    model: DesignationSkillWeightagesModel | null;
    loading: boolean;
    onSave: (values: DesignationSkillWeightagesModel) => void;
    onCancel: () => void;
}) => {
    return (
        <BaseCrudForm
            title={'User/Designation Skill Weightage'}
            defaultValues={defaultValues}
            model={model}
            loading={loading}
            onSave={onSave as any}
            onCancel={onCancel}
            validationSchema={validationSchema}
        >
            {({ form }: { form: IForm }) => {
                return (
                    <FormSection
                        layout={FormSectionLayoutType.Horizontal}
                        numberOfRowFields={2}
                    >
                        <FormField name="type" label="Designation">
                            <Dropdown
                                textField={'name'}
                                valueField={'id'}
                                dataItemKey={'id'}
                                loading={loading}
                                data={[
                                    {
                                        id: SkillWeightageType.Designation,
                                        name: 'Designation',
                                    },
                                    {
                                        id: SkillWeightageType.User,
                                        name: 'User',
                                    },
                                ]}
                                onChange={(event: ChangeEvent) => {
                                    var value = (event.target as any)
                                        .item as DesignationSkillWeightagesModel;
                                    if (
                                        value.type ==
                                        SkillWeightageType.Designation
                                    ) {
                                        form.setValue('userId', null);
                                    } else {
                                        form.setValue('designationId', null);
                                    }
                                }}
                            />
                        </FormField>
                        {form.getValues('type') ==
                            SkillWeightageType.Designation && (
                            <FormField name="designationId" label="Designation">
                                <DesignationPicker />
                            </FormField>
                        )}
                        {form.getValues('type') == SkillWeightageType.User && (
                            <FormField name="userId" label="User">
                                <UserPicker />
                            </FormField>
                        )}
                        <FormField
                            name="skillWeightagesId"
                            label="Skill Weightage"
                        >
                            <SkillWeightagePicker />
                        </FormField>
                    </FormSection>
                );
            }}
        </BaseCrudForm>
    );
};
