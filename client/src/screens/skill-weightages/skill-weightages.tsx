import {
    SkillWeightages,
    skillWeightageStore,
    skillWeightageSearchStore,
    SkillWeightageSearch,
} from '@components/skill-weightage';
import { BaseListScreen } from '@screens/base';
import { SkillWeightagesRouter } from './skill-weightages.router';

export const SkillWeightagesScreen = () => {
    return (
        <BaseListScreen
            listComponent={SkillWeightages}
            searchComponent={SkillWeightageSearch}
            store={skillWeightageStore as any}
            searchStore={skillWeightageSearchStore as any}
            router={SkillWeightagesRouter}
        />
    );
};
