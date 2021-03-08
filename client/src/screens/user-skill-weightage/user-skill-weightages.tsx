import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { reaction } from 'mobx';
import { Spin } from '@library/spin';
import { Screen } from '@screens/screen';
import { userSkillWeightageStore } from '@components/user-skill-weightage';
import { UserSkillWeightageRouter } from './user-skill-weightage.router';

export const UserSkillWeightagesScreen = () => {
    const history = useHistory();
    useEffect(() => {}, [userSkillWeightageStore.items]);

    useEffect(() => {
        const dispose = reaction(
            () => {
                return [userSkillWeightageStore.items];
            },
            () => {
                if (userSkillWeightageStore.items.count) {
                    const item = userSkillWeightageStore.items.items[0];
                    history.push(
                        UserSkillWeightageRouter.getRoutes().edit.redirect({
                            id: item.id,
                        }),
                    );
                }
            },
        );
        return () => {
            dispose();
        };
    }, []);

    useEffect(() => {
        userSkillWeightageStore.getCurrentUserDefault();
    }, []);
    return <Screen><Spin spinning={true} /></Screen>;
};
