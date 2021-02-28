import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { Screen } from '@screens/screen';
import { Designation, DesignationModel, designationStore } from '@components/designation';
import { DesignationRouter } from './designation.router';

export const DesignationEdit = () => {
    const history = useHistory();
    let { id } = useParams() as any;

    useEffect(() => {
        designationStore.clearSelectedItem();
        if (id) {
            designationStore.get(id);
        }
    }, [id]);

    return (
        <Observer>
            {() => (
                <Screen>
                    <Designation
                        defaultValues={designationStore.defaultValues}
                        loading={designationStore.loading}
                        designation={designationStore.selectedItem}
                        onSave={(designation: DesignationModel) => {
                            if (!designation.id) {
                                designationStore.create(designation, () => {
                                    designationStore.clearSelectedItem();
                                    history.push(
                                        DesignationRouter.getRoutes().root.path,
                                    );
                                });
                            } else {
                                designationStore.update(designation.id, designation, () => {
                                    designationStore.clearSelectedItem();
                                    history.push(
                                        DesignationRouter.getRoutes().root.path,
                                    );
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
