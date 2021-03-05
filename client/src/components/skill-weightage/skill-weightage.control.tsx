import { Fragment, useState } from 'react';
import { Table } from '@library/table';
import { FormField } from '@library/form';
import { SkillPicker } from '@components/skill';
import {
    SkillWeightageModel,
    SkillWeightagesModel,
} from './skill-weightage.types';
import { NumberInput } from '@library/number-input';
import { SkillModel } from '@components/skill';
import { Button, ButtonType } from '@library/button';

export const SkillWeightageControl = ({
    loading,
    skillWeightages,
    onExpand,
    onSelection,
    onDelete,
}: {
    loading: boolean;
    skillWeightages: SkillWeightagesModel;
    onExpand: (item: any) => void;
    onSelection: (
        skill: SkillModel,
        skillWeightages: SkillWeightagesModel,
    ) => void;
    onDelete: (
        skillWeightage: SkillWeightageModel,
        skillWeightages: SkillWeightagesModel,
    ) => void;
}) => {
    const [skill, setSkill] = useState<SkillModel | null>();

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Weightage',
            dataIndex: 'weightage',
            key: 'weightage',
            render: (text: string, item: any) => {
                const weightageName = `${item.key}.weightage`;
                return (
                    <FormField name={weightageName}>
                        <NumberInput />
                    </FormField>
                );
            },
            width: '20em',
        },
        {
            title: 'Delete',
            key: 'delete',
            width: '10em',
            render: (text: string, item: any) => (
                <Fragment>
                    <Button
                        type={ButtonType.Quaternary}
                        onClick={() => {
                            if (onDelete) {
                                onDelete(item, skillWeightages);
                            }
                        }}
                        danger
                    >
                        Delete
                    </Button>
                </Fragment>
            ),
        },
    ];

    return (
        <div
            style={{
                padding: '1rem',
                backgroundColor: '#fafafa',
                border: '1px solid #d2d2d2',
            }}
        >
            <div style={{ paddingBottom: '1rem' }}>
                <SkillPicker
                    placeholder={'Type to Add Skill'}
                    value={skill}
                    onChange={(event: any) => {
                        setSkill(event.target.value);
                        if (onSelection) {
                            onSelection(event.target.item, skillWeightages);
                        }
                    }}
                    onBlur={(event: any) => {
                        setSkill(null);
                    }}
                    parentSkillId={skillWeightages.id}
                />
            </div>
            <Table
                bordered
                columns={columns}
                dataSource={skillWeightages ? skillWeightages.skills || [] : []}
                loading={loading}
                rowKey="id"
                expandable={{
                    expandedRowRender: (item: any) => {
                        return item.skills ? (
                            <SkillWeightageControl
                                skillWeightages={item}
                                loading={item.loading}
                                onExpand={onExpand}
                                onSelection={onSelection}
                                onDelete={onDelete}
                            />
                        ) : null;
                    },
                    onExpand: (expanded: boolean, item: any) => {
                        if (expanded && onExpand) {
                            onExpand(item);
                        }
                    },
                }}
            />
        </div>
    );
};
