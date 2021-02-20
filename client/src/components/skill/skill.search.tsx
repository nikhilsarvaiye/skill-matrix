import { FormSection, FormSectionLayoutType, FormField } from '@library/form';
import { Input } from '@library/input';
import { BaseCrudTableSearch } from '@components/base/components';
import { SkillPicker } from './skill.picker';
import { validationSchema } from './skill.search.validator';

export const SkillSearch = ({
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
            <FormSection
                layout={FormSectionLayoutType.Horizontal}
                numberOfRowFields={2}
            >
                <FormField name="name" label="Name">
                    <Input />
                </FormField>
                <FormField name="skillId" label="Parent Skill">
                    <SkillPicker />
                </FormField>
            </FormSection>
        </BaseCrudTableSearch>
    );
};
