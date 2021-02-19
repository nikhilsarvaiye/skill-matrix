import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { Screen } from '@screens/screen';
import { Skills, SkillModel } from '@components/skill';
import { skillStore } from '@components/ioc';
import { Routes } from './skill.router';

export const SkillsScreen = () => {
    const history = useHistory();
    useEffect(() => {
        skillStore.getAll();
    }, []);
    return (
        <Observer>
            {() => (
                <Screen>
                    <Skills
                        data={skillStore.items}
                        loading={skillStore.loading}
                        onChange={skillStore.change}
                        onNew={() => {
                            history.push(Routes.RouteToSkill(undefined));
                        }}
                        onEdit={(skill: SkillModel) => {
                            history.push(Routes.RouteToSkill(skill.id));
                        }}
                        pagination={{
                            current: skillStore.criteria.page,
                            pageSize: skillStore.criteria.pageSize,
                            total: skillStore.items.length,
                        }}
                    />
                </Screen>
            )}
        </Observer>
    );
};
