import { Yup } from '@library/yup';
import { FormSection, FormSectionLayoutType, FormField } from '@library/form';
import { BaseCrudForm } from '@components/base/components';
import { DesignationPicker } from '@components/designation';
import { SkillWeightagePicker } from '@components/skill-weightage';
import { DesignationSkillWeightagesModel } from './designation-skill-weightage.types';

const validationSchema = Yup.object().shape({
    designationId: Yup.string().nullable().required('Designation is required'),
    skillWeightagesId: Yup.string()
        .nullable()
        .required('Skill Weightage is required'),
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
            title={'Designation Skill Weightage'}
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
