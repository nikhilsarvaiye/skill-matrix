import { Yup } from '@library/yup';
import { FormSection, FormField } from '@library/form';
import { Input } from '@library/input';
import { BaseCrudTableSearch } from '@components/base/components';

const validationSchema = Yup.object().shape({
    name: Yup.string().nullable(),
});

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
