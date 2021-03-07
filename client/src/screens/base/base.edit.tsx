import { useEffect } from 'react';
import _ from 'lodash';
import { useParams, useHistory } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { Screen } from '@screens/screen';
import { IModel } from '@components/base/models';
import { IBaseCrudForm } from '@components/base/components';
import { BaseStore } from '@components/base/stores';
import { BaseRouter, Routes } from './base.router';

export const BaseEdit = ({
    store,
    router,
    component,
    ...props
}: {
    store: BaseStore<IModel>;
    router: BaseRouter<Routes>;
    component: React.FC<IBaseCrudForm>;
    [key: string]: any;
}) => {
    const history = useHistory();
    let { id } = useParams() as any;
    const Component = component as any;

    useEffect(() => {
        store.clearSelectedItem();
        if (id && id != 'new') {
            store.get(id);
        }
    }, [id]);

    return (
        <Screen>
            <Observer>
                {() => (
                    <div>
                        <div style={{ height: 0, overflow: 'hidden' }}>
                            {JSON.stringify(store.selectedItem, null, 2)}
                        </div>
                        <Component
                            defaultValues={store.defaultValues}
                            loading={store.loading}
                            model={store.selectedItem}
                            onSave={(model: IModel) => {
                                if (!model.id) {
                                    store.create(model, () => {
                                        store.clearSelectedItem();
                                        history.push(
                                            router.getRoutes().root.path,
                                        );
                                    });
                                } else {
                                    store.update(model.id, model, () => {
                                        store.clearSelectedItem();
                                        history.push(
                                            router.getRoutes().root.path,
                                        );
                                    });
                                }
                            }}
                            onCancel={() => {
                                history.goBack();
                            }}
                            {...props}
                        />
                    </div>
                )}
            </Observer>
        </Screen>
    );
};
