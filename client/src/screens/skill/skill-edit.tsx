import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Screen } from '@screens/screen';
import { Skill, SkillModel, SkillStore } from '@components/skill';

export const SkillEdit = () => {
    debugger;
    let { id } = useParams() as any;

    useEffect(() => {
        if (id) {
            SkillStore.get(id);
        }
    }, [id]);

    return (
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
                        SkillStore.create(skill);
                    } else {
                        SkillStore.update(skill.id, skill);
                    }
                }}
            />
        </Screen>
    );
};
