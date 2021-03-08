import { Yup } from '@library/yup';
import {
    FormSection,
    FormSectionLayoutType,
    FormField,
    IForm,
} from '@library/form';
import { Input } from '@library/input';
import { BaseCrudForm } from '@components/base/components';
import { User } from './user.types';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().nullable().required('First Name is required'),
    email: Yup.string().nullable().required('Email is required'),
    userId: Yup.string().nullable().required('User Id is required'),
});

export const UserEdit = ({
    defaultValues,
    model,
    loading,
    onSave,
    onCancel,
}: {
    defaultValues: any;
    model: User | null;
    loading: boolean;
    onSave: (values: User) => void;
    onCancel: () => void;
}) => {
    return (
        <BaseCrudForm
            title={'User'}
            defaultValues={defaultValues}
            model={model}
            loading={loading}
            onSave={onSave as any}
            onCancel={onCancel}
            validationSchema={validationSchema}
        >
            {({ form }: { form: IForm }) => {
                return (
                    <FormSection
                        layout={FormSectionLayoutType.Horizontal}
                        numberOfRowFields={2}
                    >
                        <FormField name="userId" label="User Id">
                            <Input disabled={model?.id as any} />
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
                    </FormSection>
                );
            }}
        </BaseCrudForm>
    );
};
