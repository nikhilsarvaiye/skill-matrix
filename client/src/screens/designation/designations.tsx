import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { Screen } from '@screens/screen';
import { Spliter, SpliterContainer } from '@library/splitter';
import {
    Designations,
    DesignationModel,
    designationStore,
    designationSearchStore,
    DesignationSearch,
} from '@components/designation';
import { DesignationRouter } from './designation.router';
import { SideFloater } from '@components/base/components/side-floater';

export const DesignationsScreen = () => {
    const history = useHistory();
    useEffect(() => {
        designationSearchStore.search(designationSearchStore.criteria);
    }, []);
    return (
        <Observer>
            {() => (
                <Screen>
                    <Spliter>
                        {!designationSearchStore.visible && (
                            <SpliterContainer width={'1.5%'}>
                                <SideFloater
                                    title="Search"
                                    onClick={designationSearchStore.toggle}
                                />
                            </SpliterContainer>
                        )}
                        {designationSearchStore.visible && (
                            <SpliterContainer width={'20%'}>
                                <DesignationSearch
                                    defaultValues={
                                        designationSearchStore.defaultValues
                                    }
                                    criteria={designationSearchStore.criteria}
                                    loading={designationSearchStore.loading}
                                    onSearch={(criteria: any) => {
                                        designationSearchStore.search(criteria);
                                    }}
                                    onReset={(criteria: any) => {
                                        designationSearchStore.search(criteria);
                                    }}
                                    onHide={designationSearchStore.toggle}
                                />
                            </SpliterContainer>
                        )}
                        <SpliterContainer
                            width={
                                designationSearchStore.visible
                                    ? '78.8%'
                                    : '96.5%'
                            }
                            style={{ marginLeft: '1.5em' }}
                        >
                            <Designations
                                data={designationStore.items.items}
                                loading={designationStore.loading}
                                onChange={designationSearchStore.change}
                                onNew={() => {
                                    designationStore.clearSelectedItem();
                                    history.push(
                                        DesignationRouter.getRoutes().edit.build(
                                            undefined,
                                        ),
                                    );
                                }}
                                onEdit={(designation: DesignationModel) => {
                                    designationStore.clearSelectedItem();
                                    history.push(
                                        DesignationRouter.getRoutes().edit.build(
                                            {
                                                id: designation.id,
                                            },
                                        ),
                                    );
                                }}
                                pagination={{
                                    current:
                                        designationSearchStore.criteria.page,
                                    pageSize:
                                        designationSearchStore.criteria
                                            .pageSize,
                                    total: designationStore.items.count,
                                }}
                                onDelete={(id: string) => {
                                    designationStore.confirmDelete(id);
                                }}
                            />
                        </SpliterContainer>
                    </Spliter>
                </Screen>
            )}
        </Observer>
    );
};
