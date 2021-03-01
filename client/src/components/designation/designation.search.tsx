import { FormSection, FormSectionLayoutType, FormField } from '@library/form';
import { Input } from '@library/input';
import { BaseCrudTableSearch } from '@components/base/components';
import { validationSchema } from './designation.search.validator';

export const DesignationSearch = ({
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
            </FormSection>
        </BaseCrudTableSearch>
    );
};
