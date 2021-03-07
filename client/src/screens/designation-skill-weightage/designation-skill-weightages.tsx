import {
    DesignationSkillWeightages,
    designationSkillWeightagesStore,
    designationSkillWeightagesSearchStore,
    DesignationSkillWeightagesSearch,
} from '@components/designation-skill-weightage';
import { BaseListScreen } from '@screens/base';
import { DesignationSkillWeightageRouter } from './designation-skill-weightage.router';

export const DesignationSkillWeightagesScreen = () => {
    return (
        <BaseListScreen
            listComponent={DesignationSkillWeightages}
            searchComponent={DesignationSkillWeightagesSearch as any}
            store={designationSkillWeightagesStore as any}
            searchStore={designationSkillWeightagesSearchStore as any}
            router={DesignationSkillWeightageRouter}
        />
    );
};
