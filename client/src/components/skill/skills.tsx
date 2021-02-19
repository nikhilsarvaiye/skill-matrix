import {
    BaseCrudTable,
    IBaseCrudTableProps,
} from '@components/shared/components';

export interface ISKillsProps extends IBaseCrudTableProps {}

export const Skills = ({
    loading,
    data,
    onNew,
    onEdit,
    pagination,
    onChange,
}: ISKillsProps) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
        },
        {
            title: 'Skill',
            dataIndex: 'skill',
            key: 'skill',
            sorter: true,
        },
    ];

    return (
        <BaseCrudTable
            title="Skills"
            columns={columns}
            loading={loading}
            data={data}
            onNew={onNew}
            onEdit={onEdit}
            pagination={pagination}
            onChange={onChange}
        />
    );
};
