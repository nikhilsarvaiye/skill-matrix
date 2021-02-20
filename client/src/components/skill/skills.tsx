import {
    BaseCrudTable,
    IBaseCrudTableProps,
} from '@components/base/components';
import { faBook } from '@fortawesome/free-solid-svg-icons';

export interface ISKillsProps extends IBaseCrudTableProps {}

export const Skills = ({
    loading,
    data,
    onNew,
    onEdit,
    pagination,
    onChange,
    onDelete,
}: ISKillsProps) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
        },
        {
            title: 'Parent Skill',
            dataIndex: 'parentSkillName',
            key: 'parentSkillName',
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
            onDelete={onDelete}
            headerTitleIcon={faBook}
        />
    );
};
