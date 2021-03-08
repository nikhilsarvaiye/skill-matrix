import { Yup } from '@library/yup';
import { FormSection, FormSectionLayoutType, FormField } from '@library/form';
import { Input } from '@library/input';
import { BaseCrudForm } from '@components/base/components';
import { DesignationPicker } from '@components/designation';
import { SkillWeightagePicker } from '@components/skill-weightage';
import { User } from './user.types';

const validationSchema = Yup.object().shape({
    name: Yup.string().nullable().required('Name is required'),
});

export const UserEdit = ({
    defaultValues,
    model,
    loading,
    onSave,
    onCancel,
}: {
    defaultValues: any;
    model: User | null;
    loading: boolean;
    onSave: (values: User) => void;
    onCancel: () => void;
}) => {
    return (
        <BaseCrudForm
            title={'User'}
            defaultValues={defaultValues}
            model={model}
            loading={loading}
            onSave={onSave as any}
            onCancel={onCancel}
            validationSchema={validationSchema}
        >
            <FormSection
                layout={FormSectionLayoutType.Horizontal}
                numberOfRowFields={2}
            >
                <FormField name="userId" label="User Id">
                    <Input disabled={model?.id as any} />
                </FormField>
                <FormField name="firstName" label="First Name">
                    <Input />
                </FormField>
                <FormField name="lastName" label="Last Name">
                    <Input />
                </FormField>
                <FormField name="email" label="Email">
                    <Input />
                </FormField>
                <FormField name="designationId" label="Designation">
                    <DesignationPicker />
                </FormField>
                <FormField name="skillWeightagesId" label="Skill Weightage">
                    <SkillWeightagePicker />
                </FormField>
            </FormSection>
        </BaseCrudForm>
    );
};
