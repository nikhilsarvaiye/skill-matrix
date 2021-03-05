import { Designation, designationStore } from '@components/designation';
import { BaseEdit } from '@screens/base';
import { DesignationRouter } from './designation.router';

export const DesignationEdit = () => {
    return (
        <BaseEdit
            component={Designation as any}
            store={designationStore}
            router={DesignationRouter}
        />
    );
};
