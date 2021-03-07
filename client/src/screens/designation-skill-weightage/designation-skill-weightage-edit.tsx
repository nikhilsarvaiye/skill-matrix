import {
    DesignationSkillWeightage,
    designationSkillWeightagesStore,
} from '@components/designation-skill-weightage';
import { BaseEdit } from '@screens/base';
import { DesignationSkillWeightageRouter } from './designation-skill-weightage.router';

export const DesignationSkillWeightageEdit = () => {
    return (
        <BaseEdit
            component={DesignationSkillWeightage as any}
            store={designationSkillWeightagesStore as any}
            router={DesignationSkillWeightageRouter}
        />
    );
};
