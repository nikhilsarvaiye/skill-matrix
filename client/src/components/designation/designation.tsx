import { validationSchema } from './designation.validator';
import { FormSection, FormSectionLayoutType, FormField } from '@library/form';
import { Input } from '@library/input';
import { BaseCrudForm } from '@components/base/components';
import { DesignationModel } from '.';

export const Designation = ({
    defaultValues,
    designation,
    loading,
    onSave,
    onCancel,
}: {
    defaultValues: any;
    designation: DesignationModel | null;
    loading: boolean;
    onSave: (values: DesignationModel) => void;
    onCancel: () => void;
}) => {
    return (
        <BaseCrudForm
            title={'Designation'}
            defaultValues={defaultValues}
            model={designation}
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
