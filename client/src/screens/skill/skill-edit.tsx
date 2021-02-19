import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { Screen } from '@screens/screen';
import { Skill, SkillModel, SkillStore } from '@components/skill';
import { Routes } from './skill.router';

export const SkillEdit = () => {
    const history = useHistory();
    let { id } = useParams() as any;

    useEffect(() => {
        if (id) {
            SkillStore.get(id);
        }
    }, [id]);

    return (
        <Observer>
            {() => (
                <Screen>
                    <Skill
                        initialState={{
                            name: '',
                            skill: '',
                        }}
                        loading={SkillStore.loading}
                        skill={SkillStore.selectedItem}
                        onSave={(skill: SkillModel) => {
                            if (!skill.id) {
                                SkillStore.create(skill, () => {
                                    history.push(Routes.Skills);
                                });
                            } else {
                                SkillStore.update(skill.id, skill, () => {
                                    history.push(Routes.Skills);
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
