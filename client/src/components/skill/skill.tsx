import { validationSchema } from './skill.validator';
import { FormSection, FormSectionLayoutType, FormField } from '@library/form';
import { Input } from '@library/input';
import { BaseCrudForm } from '@components/base/components';
import { SkillPicker } from './skill.picker';
import { SkillModel } from './skill.model';

export const Skill = ({
    defaultValues,
    skill,
    loading,
    onSave,
    onCancel,
}: {
    defaultValues: any;
    skill: SkillModel | null;
    loading: boolean;
    onSave: (values: SkillModel) => void;
    onCancel: () => void;
}) => {
    return (
        <BaseCrudForm
            defaultValues={defaultValues}
            model={skill}
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
