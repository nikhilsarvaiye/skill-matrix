import {
    BaseCrudTable,
    IBaseCrudTableProps,
} from '@components/base/components';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

export interface IUserSkillWeightagesProps extends IBaseCrudTableProps {}

export const UserSkillWeightages = ({
    loading,
    data,
    onNew,
    onEdit,
    pagination,
    onChange,
    onDelete,
}: IUserSkillWeightagesProps) => {
    return (
        <BaseCrudTable
            title="User Skill Weightages"
            columns={[]}
            loading={loading}
            data={data}
            onNew={onNew}
            onEdit={onEdit}
            pagination={pagination}
            onChange={onChange}
            onDelete={onDelete}
            headerTitleIcon={faTasks}
        />
    );
};
