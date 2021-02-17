import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEraser } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { ScrollBar } from '@library/scrollbar';
import {
    Form,
    FormSection,
    FormSectionHeader,
    FormSectionHeaderTitle,
    FormSectionBody,
    FormSectionFooter,
    FormSectionTheme,
    FormSectionAlignment,
    FormSectionLayoutType,
    FormAction,
    FormField,
} from '@library/form';
import { validationSchema } from './form.demo.validator';
import { Input } from '@library/input';
import { Dropdown } from '@library/dropdown';
import { DatePicker } from '@library/date-picker';
import { Button, ButtonHTMLType, ButtonType } from '@library/button';

export const DemoForm = () => {
    const initialState = {
        clientId: null,
        firstName: '',
        middleName: '',
        lastName: '',
        accountNumber: '',
        gender: null,
        dob: null,
        dos: null,
        ssn: '',
        insuranceId: '',
        includeTerminatedClients: false,
        exactSearch: true,
        page: 1,
        pageSize: 25,
    };
    // const { register, handleSubmit, watch, errors } = useForm();
    // const onSubmit = (data: any[]) => console.log(data);

    // console.log(watch('example')); // watch input value by passing the name of it

    const handleSubmit = (
        values: any,
        { setSubmitting }: { setSubmitting: any },
    ) => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
    };

    const handleSearch = (form: any) => {
        form.setValues({
            // do not set all the values again
            // it will reset the value to previous
            // ...form.values,
            page: 1,
        });
        form.submitForm();
    };

    const handleClear = (form: any) => {
        form.resetForm();
    };

    return (
        <div className="patient-search">
            <Form
                initialValues={initialState}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ form }: any) => {
                    return (
                        <FormSection theme={FormSectionTheme.White}>
                            <FormSectionHeader>
                                <FormSection align={FormSectionAlignment.Left}>
                                    <FormSectionHeaderTitle
                                        startIcon={
                                            <FontAwesomeIcon
                                                icon={faSearch}
                                            ></FontAwesomeIcon>
                                        }
                                    >
                                        Search
                                    </FormSectionHeaderTitle>
                                </FormSection>
                            </FormSectionHeader>
                            <FormSectionBody>
                                {JSON.stringify(form.values, null, 2)}
                                <ScrollBar
                                    autoHeightMax={'200px'}
                                    // autoHeightMax={'calc(100vh - 150px)'}
                                >
                                    <FormSection
                                        layout={FormSectionLayoutType.Vertical}
                                        numberOfRowFields={1}
                                    >
                                        <FormField
                                            name="middleName"
                                            label="Middle Name"
                                            key="7"
                                        >
                                            <Input />
                                        </FormField>
                                        <FormField name="dob" label="DOB">
                                            <DatePicker />
                                        </FormField>
                                        <FormField name="gender" label="Gender">
                                            <Dropdown
                                                data={[
                                                    {
                                                        id: 1,
                                                        title: 'Male',
                                                    },
                                                    {
                                                        id: 2,
                                                        title: 'Female',
                                                    },
                                                ]}
                                                textField="title"
                                                valueField="id"
                                            />
                                        </FormField>
                                    </FormSection>
                                </ScrollBar>
                            </FormSectionBody>
                            <FormSectionFooter>
                                <FormSection
                                    layout={FormSectionLayoutType.Horizontal}
                                    align={FormSectionAlignment.Center}
                                    autoSpacing={true}
                                    cssClasses="patient-search-footer"
                                >
                                    {/* Button for default enter */}
                                    <input
                                        type="submit"
                                        style={{ display: 'none' }}
                                    />
                                    <FormAction>
                                        <Button
                                            startIcon={
                                                <FontAwesomeIcon
                                                    icon={faSearch}
                                                ></FontAwesomeIcon>
                                            }
                                            // htmlType={ButtonHTMLType.Submit}
                                            type={ButtonType.Primary}
                                            onClick={() => {
                                                handleSearch(form);
                                            }}
                                        >
                                            Search
                                        </Button>
                                    </FormAction>
                                    <FormAction>
                                        <Button
                                            startIcon={
                                                <FontAwesomeIcon
                                                    icon={faEraser}
                                                ></FontAwesomeIcon>
                                            }
                                            type={ButtonType.Secondary}
                                            onClick={() => {
                                                handleClear(form);
                                            }}
                                        >
                                            Clear
                                        </Button>
                                    </FormAction>
                                </FormSection>
                            </FormSectionFooter>
                        </FormSection>
                    );
                }}
            </Form>
        </div>
        // <form onSubmit={handleSubmit(onSubmit)}>
        //     {/* register your input into the hook by invoking the "register" function */}
        //     <input name="example" defaultValue="test" ref={register} />

        //     {/* include validation with required or other standard HTML validation rules */}
        //     <input name="exampleRequired" ref={register({ required: true })} />
        //     {/* errors will return when field validation fails  */}
        //     {errors.exampleRequired && <span>This field is required</span>}

        //     <input type="submit" />
        // </form>
    );
};
