import {
    Skills,
    skillStore,
    skillSearchStore,
    SkillSearch,
} from '@components/skill';
import { BaseListScreen } from '@screens/base';
import { SkillRouter } from './skill.router';

export const SkillsScreen = () => {
    return (
        <BaseListScreen
            listComponent={Skills}
            searchComponent={SkillSearch}
            store={skillStore}
            searchStore={skillSearchStore as any}
            router={SkillRouter}
        />
    );
};
