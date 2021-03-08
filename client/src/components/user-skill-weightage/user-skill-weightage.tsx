import { Yup } from '@library/yup';
import { FormSection, IForm } from '@library/form';
import { BaseCrudForm } from '@components/base/components';
import { IModel } from '@components/base/models';
import { SkillWeightageFormControl } from '@components/skill-weightage';
import { UserSkillWeightagesModel } from './user-skill-weightage.types';
import { Label } from '@library/label';

const validationSchema = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string().required(),
    weightage: Yup.number(),
    skills: Yup.array()
        .min(1)
        .hasPercentageWeightage('Skills', 'actualWeightage'),
});

export const UserSkillWeightage = ({
    defaultValues,
    model,
    loading,
    onSave,
    onCancel,
    onExpand,
}: {
    defaultValues: any;
    model: UserSkillWeightagesModel | null;
    loading: boolean;
    onSave: (values: IModel) => void;
    onCancel: () => void;
    onExpand: (item: any) => void;
}) => {
    return (
        <BaseCrudForm
            title={'User Skill Weightage'}
            defaultValues={defaultValues}
            model={model}
            loading={loading}
            onSave={onSave}
            onCancel={onCancel}
            validationSchema={validationSchema}
        >
            {({ form }: { form: IForm }) => {
                return (
                    <FormSection>
                        <FormSection style={{ padding: '1.2em' }}>
                            <Label title="Weightages" />
                            <FormSection>
                                <SkillWeightageFormControl
                                    loading={loading}
                                    model={model}
                                    onExpand={onExpand}
                                    renderActualWeightage={true}
                                />
                            </FormSection>
                        </FormSection>
                    </FormSection>
                );
            }}
        </BaseCrudForm>
    );
};
