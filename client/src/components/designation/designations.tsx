import {
    BaseCrudTable,
    IBaseCrudTableProps,
} from '@components/base/components';
import { faBook } from '@fortawesome/free-solid-svg-icons';

export interface IDesignationsProps extends IBaseCrudTableProps {}

export const Designations = ({
    loading,
    data,
    onNew,
    onEdit,
    pagination,
    onChange,
    onDelete,
}: IDesignationsProps) => {
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
            title="Designations"
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
