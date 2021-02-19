import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { Screen } from '@screens/screen';
import { Skill, SkillModel } from '@components/skill';
import { skillStore } from '@components/ioc';
import { Routes } from './skill.router';

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
                        initialState={{
                            name: '',
                            skill: '',
                        }}
                        loading={skillStore.loading}
                        skill={skillStore.selectedItem}
                        onSave={(skill: SkillModel) => {
                            if (!skill.id) {
                                skillStore.create(skill, () => {
                                    history.push(Routes.Skills);
                                });
                            } else {
                                skillStore.update(skill.id, skill, () => {
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
