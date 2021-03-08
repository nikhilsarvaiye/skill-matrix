import { UserSkillWeightage, userSkillWeightageStore } from '@components/user-skill-weightage';
import { BaseEdit } from '@screens/base';
import { UserSkillWeightageRouter } from './user-skill-weightage.router';

export const UserSkillWeightageEdit = () => {
    return (
        <BaseEdit
            component={UserSkillWeightage as any}
            store={userSkillWeightageStore as any}
            router={UserSkillWeightageRouter}
        />
    );
};
