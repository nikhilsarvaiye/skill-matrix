import { useEffect } from 'react';
import { Observer } from 'mobx-react';
import { Skill, SkillModel, SkillStore } from '@components/skill';
import { error } from '@library/modal/modal';
import { success } from '@library/modal';

export const SkillScreen = () => {
    useEffect(() => {
        SkillStore.getAll();
    }, []);
    return (
        <Observer>
            {() => (
                <Skill
                    data={SkillStore.skills}
                    loading={SkillStore.loading}
                    onChange={SkillStore.change}
                    onNew={() => {
                        error({
                            content: 'Need to implement',
                            onOk: () => {},
                        });
                    }}
                    onEdit={(skill: SkillModel) => {
                        success({
                            content: 'Edit ' + skill.name,
                            onOk: () => {},
                        });
                    }}
                    pagination={{
                        current: SkillStore.criteria.page,
                        pageSize: SkillStore.criteria.pageSize,
                        total: SkillStore.skills.length,
                    }}
                />
            )}
        </Observer>
    );
};
