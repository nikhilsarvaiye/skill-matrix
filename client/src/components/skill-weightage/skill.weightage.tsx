import { useEffect } from 'react';
import { reaction } from 'mobx';
import { useFormContext } from 'react-hook-form';
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
import { FormFieldError } from '@library/form/field/form-field-error';

Yup.addMethod(Yup.array, 'isPercentageWeightage', function (fieldName) {
    return this.test({
        name: 'name',
        message: `${fieldName} total weightage should be 100`,
        test: (value) => {
            return isPercentageWeightage(value as any);
        },
    });
});

const isPercentageWeightage = (skillWeightages: SkillWeightageModel[]) => {
    let isMatch = false;
    skillWeightages = skillWeightages || [];
    const sum = skillWeightages
        .map((x) => x.weightage || 0)
        .reduce((a, b) => a + b, 0);
    if (sum === 100) {
        isMatch = true;
    }
    if (!isMatch) {
        return isMatch;
    }
    skillWeightages.every((skillWeightage) => {
        if (skillWeightage.skills.length) {
            isMatch = isPercentageWeightage(skillWeightage.skills);
            if (!isMatch) {
                return false;
            }
        }
        return true;
    });
    return isMatch;
};

const validationSchema = Yup.object().shape({
    id: Yup.string().required(),
    name: Yup.string().required(),
    weightage: Yup.number(),
    skills: (Yup as any).array().min(1).isPercentageWeightage('Skills'),
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
                        <SkillWeightageWrapper
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

const SkillWeightageWrapper = ({
    model,
    loading,
    onExpand,
}: {
    model: SkillWeightagesModel | null;
    loading: boolean;
    onExpand: (item: any) => void;
}) => {
    const skillFieldName = 'skills';
    const formContext = useFormContext();
    useEffect(() => {
        const dispose = reaction(
            () => {
                return [skillWeightageStore.selectedItem.skills];
            },
            () => {
                formContext.setValue(
                    skillFieldName,
                    skillWeightageStore.selectedItem.skills,
                    {
                        shouldValidate: true,
                    },
                );
            },
        );
        return () => {
            dispose();
        };
    }, []);
    return (
        <div>
            <FormFieldError
                key={skillFieldName}
                name={skillFieldName}
                error={formContext.errors[skillFieldName]}
            />
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
        </div>
    );
};
