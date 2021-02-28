import * as Yup from 'yup';
import { BaseCrudForm } from '@components/base/components';
import { IModel } from '@components/base/models';
import { SkillWeightage, SkillWeightagesModel } from '.';

export const SkillWeightages = ({
    defaultValues,
    skillWeightages,
    loading,
    onSave,
    onCancel,
    data,
    onExpand,
}: {
    defaultValues: any;
    skillWeightages: SkillWeightagesModel | null;
    loading: boolean;
    onSave: (values: IModel) => void;
    onCancel: () => void;
    data: any[];
    onExpand: (item: any) => void;
}) => {
    return (
        <BaseCrudForm
            title={'Skill Weightage'}
            defaultValues={defaultValues}
            model={skillWeightages}
            loading={loading}
            onSave={onSave}
            onCancel={onCancel}
            validationSchema={Yup.object()}
        >
            <SkillWeightage data={data} loading={loading} onExpand={onExpand} />
        </BaseCrudForm>
    );
};
