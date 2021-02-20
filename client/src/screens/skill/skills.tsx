import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { Screen } from '@screens/screen';
import {
    Skills,
    SkillModel,
    skillStore,
    skillSearchStore,
    SkillSearch,
} from '@components/skill';
import { SkillRouter } from './skill.router';
import {
    FormSection,
    FormSectionAlignment,
    FormSectionLayoutType,
} from '@library/form';
import { Spliter, SpliterContainer } from '@library/splitter';

export const SkillsScreen = () => {
    const history = useHistory();
    useEffect(() => {
        skillSearchStore.search(skillSearchStore.criteria);
    }, []);
    return (
        <Observer>
            {() => (
                <Screen>
                    <Spliter>
                        <SpliterContainer width={'25%'}>
                            <SkillSearch
                                defaultValues={skillSearchStore.defaultValues}
                                criteria={skillSearchStore.criteria}
                                loading={skillSearchStore.loading}
                                onSearch={(criteria: any) => {
                                    skillSearchStore.search(criteria);
                                }}
                                onReset={(criteria: any) => {
                                    skillSearchStore.search(criteria);
                                }}
                            />
                        </SpliterContainer>
                        <SpliterContainer
                            width={'73.8%'}
                            style={{ marginLeft: '1.5em' }}
                        >
                            <Skills
                                data={skillStore.items.items}
                                loading={skillStore.loading}
                                onChange={skillSearchStore.change}
                                onNew={() => {
                                    skillStore.clearSelectedItem();
                                    history.push(
                                        SkillRouter.getRoutes().edit.build(
                                            undefined,
                                        ),
                                    );
                                }}
                                onEdit={(skill: SkillModel) => {
                                    skillStore.clearSelectedItem();
                                    history.push(
                                        SkillRouter.getRoutes().edit.build({
                                            id: skill.id,
                                        }),
                                    );
                                }}
                                pagination={{
                                    current: skillSearchStore.criteria.page,
                                    pageSize:
                                        skillSearchStore.criteria.pageSize,
                                    total: skillStore.items.count,
                                }}
                                onDelete={(id: string) => {
                                    skillStore.confirmDelete(id);
                                }}
                            />
                        </SpliterContainer>
                    </Spliter>
                </Screen>
            )}
        </Observer>
    );
};
