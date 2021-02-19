import { validationSchema } from './skill.validator';
import { FormSection, FormSectionLayoutType, FormField } from '@library/form';
import { Input } from '@library/input';
import { BaseCrudForm } from '@components/shared/components';
import { SkillPicker } from './skill.picker';
import { SkillModel } from './skill.model';

export const Skill = ({
    initialState,
    skill,
    loading,
    onSave,
    onCancel,
}: {
    initialState: any;
    skill: SkillModel | null;
    loading: boolean;
    onSave: (values: SkillModel) => void;
    onCancel: () => void;
}) => {
    return (
        <BaseCrudForm
            initialState={initialState}
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
                <FormField name="skillId" label="Skill">
                    <Input />
                </FormField>
                <FormField name="skillId" label="Skill">
                    <SkillPicker />
                </FormField>
            </FormSection>
        </BaseCrudForm>
    );
};
