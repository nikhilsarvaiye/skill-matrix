import * as Yup from 'yup';
import { FormField, FormSection } from '@library/form';
import { Input } from '@library/input';
import { BaseCrudForm } from '@components/base/components';
import { IModel } from '@components/base/models';
import { SkillWeightage, SkillWeightagesModel } from '.';
import { Label } from '@library/label';

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
            <FormSection>
                <FormSection width={'30%'}>
                    <FormField name="name" label="Name">
                        <Input />
                    </FormField>
                </FormSection>
                <FormSection padding={'1em'}>
                    <Label title="Weightages" />
                    <FormSection padding={'1em'}>
                        <SkillWeightage
                            data={data}
                            loading={loading}
                            onExpand={onExpand}
                        />
                    </FormSection>
                </FormSection>
            </FormSection>
        </BaseCrudForm>
    );
};
