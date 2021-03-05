import { useEffect } from 'react';
import {
    SkillWeightage,
    skillWeightageStore,
} from '@components/skill-weightage';
import { BaseEdit } from '@screens/base';
import { SkillWeightagesRouter } from './skill-weightages.router';

export const SkillWeightageEdit = () => {
    useEffect(() => {
        // skillWeightageStore.getParentSkills();
    }, []);
    return (
        <div>
            <BaseEdit
                component={SkillWeightage as any}
                store={skillWeightageStore as any}
                router={SkillWeightagesRouter}
                onExpand={(item: any) => {
                    // skillWeightageStore.getChildSkills(item);
                }}
            />
        </div>
    );
};
