import {
    BaseCrudTable,
    IBaseCrudTableProps,
} from '@components/base/components';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export interface IUsersProps extends IBaseCrudTableProps {}

export const Users = ({
    loading,
    data,
    onNew,
    onEdit,
    pagination,
    onChange,
    onDelete,
}: IUsersProps) => {
    const columns = [
        {
            title: 'User Id',
            dataIndex: 'userId',
            key: 'userId',
            sorter: true,
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            sorter: true,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            sorter: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: true,
        },
    ];

    return (
        <BaseCrudTable
            title="Users"
            columns={columns}
            loading={loading}
            data={data}
            onNew={onNew}
            onEdit={onEdit}
            pagination={pagination}
            onChange={onChange}
            onDelete={onDelete}
            headerTitleIcon={faUser}
        />
    );
};
