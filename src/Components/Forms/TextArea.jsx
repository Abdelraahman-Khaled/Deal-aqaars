
import { useField } from "formik";

const TextArea = ({ label, success, ...props }) => {
    const [field, meta] = useField(props);
    const isError = meta.touched && meta.error;
    const isSuccess = success && meta.touched && !meta.error;

    // Add a comment to explain the custom styles
    const inputStyles = {
        borderColor: isError ? "#dc3545" : isSuccess ? "green" : "",
        minHeight: "105px",
        // Add other styles as needed
    };

    return (
        <div
            className={`w-100 input-field-info d-flex flex-column gap-1 mt-3 form-one align-items-end  ${meta.touched &&
                meta.error ? "is-invalid" : ""}`}
        >
            {/* <label htmlFor={props.id || props.name} className="form-label">
                {label}
            </label> */}
            <textarea
                {...field}
                {...props}
                style={inputStyles}
                className={`input-field form-control ${meta.touched && meta.error
                    ? "is-invalid"
                    : ""}`}

            />

            {meta.touched && meta.error && (
                <div className="error">
                    {meta.error}
                </div>
            )}
        </div>
    );
};



export default TextArea;
