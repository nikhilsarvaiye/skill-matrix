import {
    BaseCrudTable,
    IBaseCrudTableProps,
} from '@components/base/components';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { SkillWeightageType } from './designation-skill-weightage.types';

export interface IDesignationSkillWeightages extends IBaseCrudTableProps {}

export const DesignationSkillWeightages = ({
    loading,
    data,
    onNew,
    onEdit,
    pagination,
    onChange,
    onDelete,
}: IDesignationSkillWeightages) => {
    const columns = [
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (text: string, item: any) => {
                return (
                    <span>
                        {(text as any) == SkillWeightageType.User
                            ? 'User'
                            : 'Designation'}
                    </span>
                );
            },
        },
        {
            title: 'Designation',
            dataIndex: 'designationName',
            key: 'designationName',
        },
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Skill Weightage',
            dataIndex: 'skillWeightagesName',
            key: 'skillWeightagesName',
        },
    ];

    return (
        <BaseCrudTable
            title="User/Designation Skill Weightages"
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
