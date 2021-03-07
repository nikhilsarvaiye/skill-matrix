import { Yup } from '@library/yup';
import { FormSection, FormSectionLayoutType, FormField } from '@library/form';
import { Input } from '@library/input';
import { BaseCrudForm } from '@components/base/components';
import { DesignationModel } from './designation.types';

const validationSchema = Yup.object().shape({
    name: Yup.string().nullable().required('Name is required'),
});

export const Designation = ({
    defaultValues,
    model,
    loading,
    onSave,
    onCancel,
}: {
    defaultValues: any;
    model: DesignationModel | null;
    loading: boolean;
    onSave: (values: DesignationModel) => void;
    onCancel: () => void;
}) => {
    return (
        <BaseCrudForm
            title={'Designation'}
            defaultValues={defaultValues}
            model={model}
            loading={loading}
            onSave={onSave}
            onCancel={onCancel}
            validationSchema={validationSchema}
        >
            <FormSection
                layout={FormSectionLayoutType.Horizontal}
                numberOfRowFields={2}
            >
                <FormField name="name" label="Name">
                    <Input />
                </FormField>
            </FormSection>
        </BaseCrudForm>
    );
};
