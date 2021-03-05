import {
    Designations,
    designationStore,
    designationSearchStore,
    DesignationSearch,
} from '@components/designation';
import { BaseListScreen } from '@screens/base';
import { DesignationRouter } from './designation.router';

export const DesignationsScreen = () => {
    return (
        <BaseListScreen
            listComponent={Designations}
            searchComponent={DesignationSearch as any}
            store={designationStore}
            searchStore={designationSearchStore as any}
            router={DesignationRouter}
        />
    );
};
