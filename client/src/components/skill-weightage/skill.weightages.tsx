import {
    BaseCrudTable,
    IBaseCrudTableProps,
} from '@components/base/components';
import { faBook } from '@fortawesome/free-solid-svg-icons';

export interface ISkillWeightagesProps extends IBaseCrudTableProps {}

export const SkillWeightages = ({
    loading,
    data,
    onNew,
    onEdit,
    pagination,
    onChange,
    onDelete,
}: ISkillWeightagesProps) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
        },
    ];

    return (
        <BaseCrudTable
            title="Skill Weightages"
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
