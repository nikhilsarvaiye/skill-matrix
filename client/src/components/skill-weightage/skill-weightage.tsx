import { Input } from '@library/input';
import { Table } from '@library/table';
import { FormField } from '@library/form';
import { SkillWeightageModel } from '.';
import React from 'react';
import { NumberInput } from '@library/number-input';

export const SkillWeightage = ({
    loading,
    data,
    onExpand,
}: {
    loading: boolean;
    data: SkillWeightageModel[];
    onExpand: (item: any) => void;
}) => {
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
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey="id"
            expandable={{
                expandedRowRender: (item: any) => {
                    return item.skills && item.skills.length ? (
                        <SkillWeightage
                            data={item.skills || []}
                            loading={item.loading}
                            onExpand={onExpand}
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
    );
};
