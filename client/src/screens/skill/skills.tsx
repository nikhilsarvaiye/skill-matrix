import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { Screen } from '@screens/screen';
import {
    Skills,
    SkillModel,
    skillStore,
    skillSearchStore,
    SkillSearch,
} from '@components/skill';
import { SkillRouter } from './skill.router';

export const SkillsScreen = () => {
    const history = useHistory();
    useEffect(() => {
        skillSearchStore.search(skillSearchStore.criteria);
    }, []);
    return (
        <Observer>
            {() => (
                <Screen>
                    {JSON.stringify(skillSearchStore.criteria)}

                    <SkillSearch
                        defaultValues={skillSearchStore.defaultValues}
                        criteria={skillSearchStore.criteria}
                        loading={skillStore.loading}
                        onSearch={(criteria: any) => {
                            skillSearchStore.search(criteria);
                        }}
                        onReset={(criteria: any) => {
                            skillSearchStore.search(criteria);
                        }}
                    />
                    <Skills
                        data={skillStore.items.items}
                        loading={skillStore.loading}
                        onChange={skillSearchStore.change}
                        onNew={() => {
                            history.push(
                                SkillRouter.getRoutes().edit.build(undefined),
                            );
                        }}
                        onEdit={(skill: SkillModel) => {
                            history.push(
                                SkillRouter.getRoutes().edit.build({
                                    id: skill.id,
                                }),
                            );
                        }}
                        pagination={{
                            current: skillSearchStore.criteria.page,
                            pageSize: skillSearchStore.criteria.pageSize,
                            total: skillStore.items.count,
                        }}
                        onDelete={(id: string) => {
                            skillStore.confirmDelete(id);
                        }}
                    />
                </Screen>
            )}
        </Observer>
    );
};
