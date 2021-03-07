import { Yup } from '@library/yup';
import { FormField, FormSection } from '@library/form';
import { Input } from '@library/input';
import { BaseCrudForm } from '@components/base/components';
import { IModel } from '@components/base/models';
import { SkillWeightageFormControl } from './skill-weightage-form.control';
import { SkillWeightagesModel } from './skill-weightage.types';
import { Label } from '@library/label';

const validationSchema = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string().required(),
    weightage: Yup.number(),
    skills: Yup.array().min(1).hasPercentageWeightage('Skills'),
});

export const SkillWeightage = ({
    defaultValues,
    model,
    loading,
    onSave,
    onCancel,
    onExpand,
}: {
    defaultValues: any;
    model: SkillWeightagesModel | null;
    loading: boolean;
    onSave: (values: IModel) => void;
    onCancel: () => void;
    onExpand: (item: any) => void;
}) => {
    return (
        <BaseCrudForm
            title={'Skill Weightage'}
            defaultValues={defaultValues}
            model={model}
            loading={loading}
            onSave={onSave}
            onCancel={onCancel}
            validationSchema={validationSchema}
        >
            <FormSection>
                <FormSection width={'30%'}>
                    <FormField name="name" label="Name">
                        <Input />
                    </FormField>
                </FormSection>
                <FormSection style={{ padding: '1.2em' }}>
                    <Label title="Weightages" />
                    <FormSection>
                        <SkillWeightageFormControl
                            loading={loading}
                            model={model}
                            onExpand={onExpand}
                        />
                    </FormSection>
                </FormSection>
            </FormSection>
        </BaseCrudForm>
    );
};
