import { Yup } from '@library/yup';
import { FormSection, FormField } from '@library/form';
import { Input } from '@library/input';
import { BaseCrudTableSearch } from '@components/base/components';
import { DesignationPicker } from '@components/designation';
import { SkillWeightagePicker } from '@components/skill-weightage';

const validationSchema = Yup.object().shape({
    name: Yup.string().nullable(),
});

export const UserSearch = ({
    defaultValues,
    criteria,
    loading,
    onSearch,
    onReset,
    onHide,
}: {
    defaultValues: any;
    criteria: any;
    loading: boolean;
    onSearch: (values: any) => void;
    onReset: (values: any) => void;
    onHide: () => void;
}) => {
    return (
        <BaseCrudTableSearch
            defaultValues={defaultValues}
            criteria={criteria}
            loading={loading}
            onSearch={onSearch}
            onReset={onReset}
            validationSchema={validationSchema}
            onHide={onHide}
        >
            <FormSection>
                <FormField name="userId" label="User Id">
                    <Input />
                </FormField>
                <FormField name="firstName" label="First Name">
                    <Input />
                </FormField>
                <FormField name="lastName" label="Last Name">
                    <Input />
                </FormField>
                <FormField name="email" label="Email">
                    <Input />
                </FormField>
                <FormField name="designationId" label="Designation">
                    <DesignationPicker />
                </FormField>
                <FormField name="skillWeightagesId" label="Skill Weightage">
                    <SkillWeightagePicker />
                </FormField>
            </FormSection>
        </BaseCrudTableSearch>
    );
};
