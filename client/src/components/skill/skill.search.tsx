import { Yup } from '@library/yup';
import { FormSection, FormField } from '@library/form';
import { Input } from '@library/input';
import { BaseCrudTableSearch } from '@components/base/components';
import { SkillPicker } from './skill.picker';

const validationSchema = Yup.object().shape({
    name: Yup.string().nullable(),
    parentSkillId: Yup.string().nullable(),
});

export const SkillSearch = ({
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
                <FormField name="name" label="Name">
                    <Input />
                </FormField>
                <FormField name="parentSkillId" label="Parent Skill">
                    <SkillPicker />
                </FormField>
            </FormSection>
        </BaseCrudTableSearch>
    );
};
