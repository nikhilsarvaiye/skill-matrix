import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { Screen } from '@screens/screen';
import { Skills, SkillModel, SkillStore } from '@components/skill';
import { Routes } from './skill.router';

export const SkillsScreen = () => {
    const history = useHistory();
    useEffect(() => {
        SkillStore.getAll();
    }, []);
    return (
        <Observer>
            {() => (
                <Screen>
                    <Skills
                        data={SkillStore.items}
                        loading={SkillStore.loading}
                        onChange={SkillStore.change}
                        onNew={() => {
                            history.push(Routes.RouteToSkill(undefined));
                        }}
                        onEdit={(skill: SkillModel) => {
                            history.push(Routes.RouteToSkill(skill.id));
                        }}
                        pagination={{
                            current: SkillStore.criteria.page,
                            pageSize: SkillStore.criteria.pageSize,
                            total: SkillStore.items.length,
                        }}
                    />
                </Screen>
            )}
        </Observer>
    );
};
