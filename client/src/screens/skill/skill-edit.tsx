import { Skill, skillStore } from '@components/skill';
import { BaseEdit } from '@screens/base';
import { SkillRouter } from './skill.router';

export const SkillEdit = () => {
    return (
        <BaseEdit
            component={Skill as any}
            store={skillStore}
            router={SkillRouter}
        />
    );
};
