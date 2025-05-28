
import { ErrorMessage, Field, useFormikContext } from "formik";

const SelectField = ({ name, options, valueSelected, ...rest }) => {
    const { errors, touched } = useFormikContext(); // Access Formik context

    const hasError = errors[name] && touched[name]; // Check if field has an error and has been touched
    const success = touched[name] && !errors[name]; // Check if field has been touched and has no errors

    return (
        <div className="select-wrapper">
            <Field
                as="select"
                name={name}
                className={`form-select ${hasError ? "select-error" : ""} ${success ? "select-success" : ""
                    }`}
                {...rest}
            >
                <option selected>{valueSelected}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Field>
            {hasError && (
                <ErrorMessage name={name} component="div" className="error" />
            )}{" "}
        </div>
    );
};

export default SelectField;
