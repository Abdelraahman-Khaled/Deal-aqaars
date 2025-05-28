import { Formik, Form } from "formik";

const FormField = ({ initialValues, validationSchema, onSubmit, children }) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                {children}
            </Form>
        </Formik>
    );
};

export default FormField;
