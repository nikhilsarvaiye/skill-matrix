import { Yup } from '@library/yup';
import { FormSection, FormField } from '@library/form';
import { BaseCrudTableSearch } from '@components/base/components';
import { DesignationPicker } from '@components/designation';
import { SkillWeightagePicker } from '@components/skill-weightage';

const validationSchema = Yup.object().shape({
    name: Yup.string().nullable(),
});

export const DesignationSkillWeightagesSearch = ({
    defaultValues,
    criteria,
    loading,
    onSearch,
    onReset,
}: {
    defaultValues: any;
    criteria: any;
    loading: boolean;
    onSearch: (values: any) => void;
    onReset: (values: any) => void;
}) => {
    return (
        <BaseCrudTableSearch
            defaultValues={defaultValues}
            criteria={criteria}
            loading={loading}
            onSearch={onSearch}
            onReset={onReset}
            validationSchema={validationSchema}
        >
            <FormSection>
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
