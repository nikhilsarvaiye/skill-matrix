import { useEffect } from 'react';
import { reaction } from 'mobx';
import { useFormContext } from 'react-hook-form';
import { SkillWeightageControl } from './skill-weightage.control';
import {
    SkillWeightageModel,
    SkillWeightagesModel,
} from './skill-weightage.types';
import { skillWeightageStore } from './skill-weightage.instances';
import { SkillModel } from '@components/skill/skill.types';
import { FormFieldError } from '@library/form/field/form-field-error';

export const SkillWeightageFormControl = ({
    model,
    loading,
    onExpand,
    renderActualWeightage,
}: {
    model: SkillWeightagesModel | null;
    loading: boolean;
    onExpand: (item: any) => void;
    renderActualWeightage: boolean;
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
                renderActualWeightage={renderActualWeightage}
                topRender={true}
            />
        </div>
    );
};
