import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { Screen } from '@screens/screen';
import { Skills, SkillModel, skillStore } from '@components/skill';
import { SkillRouter } from './skill.router';

export const SkillsScreen = () => {
    const history = useHistory();
    useEffect(() => {
        skillStore.paginate();
    }, []);
    return (
        <Observer>
            {() => (
                <Screen>
                    <Skills
                        data={skillStore.items.items}
                        loading={skillStore.loading}
                        onChange={skillStore.change}
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
                            current: skillStore.criteria.page,
                            pageSize: skillStore.criteria.pageSize,
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
