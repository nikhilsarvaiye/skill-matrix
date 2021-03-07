import {
    BaseCrudTable,
    IBaseCrudTableProps,
} from '@components/base/components';
import { faBook } from '@fortawesome/free-solid-svg-icons';

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
            title: 'Designation',
            dataIndex: 'designationName',
            key: 'designationName',
        },
        {
            title: 'Skill Weightage',
            dataIndex: 'skillWeightagesName',
            key: 'skillWeightagesName',
        },
    ];

    return (
        <BaseCrudTable
            title="Designation Skill Weightages"
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
