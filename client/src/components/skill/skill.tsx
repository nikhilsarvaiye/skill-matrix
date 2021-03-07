import { Yup } from '@library/yup';
import { FormSection, FormSectionLayoutType, FormField } from '@library/form';
import { Input } from '@library/input';
import { BaseCrudForm } from '@components/base/components';
import { SkillPicker } from './skill.picker';
import { SkillModel } from './skill.types';

const validationSchema = Yup.object().shape({
    name: Yup.string().nullable().required('Name is required'),
});

export const Skill = ({
    defaultValues,
    model,
    loading,
    onSave,
    onCancel,
}: {
    defaultValues: any;
    model: SkillModel | null;
    loading: boolean;
    onSave: (values: SkillModel) => void;
    onCancel: () => void;
}) => {
    return (
        <BaseCrudForm
            title={'Skill'}
            defaultValues={defaultValues}
            model={model}
            loading={loading}
            onSave={onSave}
            onCancel={onCancel}
            validationSchema={validationSchema}
        >
            <FormSection
                layout={FormSectionLayoutType.Horizontal}
                numberOfRowFields={2}
            >
                <FormField name="name" label="Name">
                    <Input />
                </FormField>
                <FormField name="parentSkillId" label="Parent Skill">
                    <SkillPicker />
                </FormField>
            </FormSection>
        </BaseCrudForm>
    );
};
