import * as Yup from 'yup';
import { FormField, FormSection } from '@library/form';
import { Input } from '@library/input';
import { BaseCrudForm } from '@components/base/components';
import { IModel } from '@components/base/models';
import { SkillWeightageControl } from './skill-weightage.control';
import {
    SkillWeightageModel,
    SkillWeightagesModel,
} from './skill-weightage.types';
import { Label } from '@library/label';
import { skillWeightageStore } from './skill-weightage.instances';
import { SkillModel } from '@components/skill/skill.types';

export const SkillWeightage = ({
    defaultValues,
    model,
    loading,
    onSave,
    onCancel,
    data,
    onExpand,
}: {
    defaultValues: any;
    model: SkillWeightagesModel | null;
    loading: boolean;
    onSave: (values: IModel) => void;
    onCancel: () => void;
    data: any[];
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
            validationSchema={Yup.object()}
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
                        <SkillWeightageControl
                            skillWeightages={model as any}
                            loading={loading}
                            onExpand={onExpand}
                            onSelection={(
                                skill: SkillModel,
                                skillWeightages: SkillWeightagesModel,
                            ) => {
                                skillWeightageStore.onSkillSelection(
                                    skill,
                                    skillWeightages,
                                );
                            }}
                            onDelete={(
                                skillWeightage: SkillWeightageModel,
                                skillWeightages: SkillWeightagesModel,
                            ) => {
                                skillWeightageStore.deleteSkillWeightage(
                                    skillWeightage,
                                    skillWeightages,
                                );
                            }}
                        />
                    </FormSection>
                </FormSection>
            </FormSection>
        </BaseCrudForm>
    );
};
