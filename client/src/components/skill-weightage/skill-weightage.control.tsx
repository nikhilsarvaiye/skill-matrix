import { Fragment, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Table } from '@library/table';
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
    const formContext = useFormContext();
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
                return (
                    <NumberInput
                        value={item.weightage}
                        onChange={(event: any) => {
                            item.weightage = event.target.value;
                            // trigger validations
                            formContext.trigger();
                        }}
                    />
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
                        if (onSelection) {
                            onSelection(event.target.item, skillWeightages);
                        }
                        // TODO [NS]: master stroke to always clear values
                        // still need to find better way
                        setSkill(skill == null ? ('' as any) : null);
                    }}
                    onBlur={(event: any) => {}}
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