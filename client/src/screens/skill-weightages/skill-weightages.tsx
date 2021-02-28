import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { Screen } from '@screens/screen';
import {
    skillWeightageStore,
    SkillWeightages,
} from '@components/skill-weightage';
import { SkillWeightagesRouter } from '.';

export const SkillWeightagesScreen = () => {
    const history = useHistory();
    useEffect(() => {
        skillWeightageStore.getParentSkills();
    }, []);
    return (
        <Screen>
            <Observer>
                {() => (
                    <div>
                        {JSON.stringify(skillWeightageStore.skillWeightages)}
                        <SkillWeightages
                            data={skillWeightageStore.skillWeightages.skills}
                            loading={skillWeightageStore.loading}
                            onExpand={(item: any) => {
                                skillWeightageStore.getChildSkills(item);
                            }}
                            defaultValues={skillWeightageStore.skillWeightages}
                            onCancel={() => {}}
                            onSave={(values: any) => {
                                debugger;
                            }}
                            skillWeightages={
                                skillWeightageStore.skillWeightages
                            }
                        />
                    </div>
                )}
            </Observer>
        </Screen>
    );
};
