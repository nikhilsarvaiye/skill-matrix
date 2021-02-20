import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { Screen } from '@screens/screen';
import { Skill, SkillModel, skillStore } from '@components/skill';
import { SkillRouter } from './skill.router';

export const SkillEdit = () => {
    const history = useHistory();
    let { id } = useParams() as any;

    useEffect(() => {
        skillStore.clearSelectedItem();
        if (id) {
            skillStore.get(id);
        }
    }, [id]);

    return (
        <Observer>
            {() => (
                <Screen>
                    <Skill
                        defaultValues={skillStore.defaultValues}
                        loading={skillStore.loading}
                        skill={skillStore.selectedItem}
                        onSave={(skill: SkillModel) => {
                            if (!skill.id) {
                                skillStore.create(skill, () => {
                                    skillStore.clearSelectedItem();
                                    history.push(
                                        SkillRouter.getRoutes().root.path,
                                    );
                                });
                            } else {
                                skillStore.update(skill.id, skill, () => {
                                    skillStore.clearSelectedItem();
                                    history.push(
                                        SkillRouter.getRoutes().root.path,
                                    );
                                });
                            }
                        }}
                        onCancel={() => {
                            history.goBack();
                        }}
                    />
                </Screen>
            )}
        </Observer>
    );
};
