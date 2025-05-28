import React from "react";
import { useField } from "formik";
import ShowPassword from "../../assets/Icons/ShowPassword";
import "./MutliSelect.css";

const PhoneNumber = ({ label, success, setInputType, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const isError = meta.touched && meta.error;
    const isSuccess = success && meta.touched && !meta.error;

    const togglePassword = () => {
        setInputType((prevType) => (prevType === "password" ? "text" : "password"));
    };

    return (
        <div className={`form-group input-field-info position-relative form-one ${isError ? "has-error" : ""}`}>
            {/* <label htmlFor={props.id || props.name} className="form-label">
                {label}
            </label> */}

            <div className="position-relative">
                {/* +02 prefix */}
                <div
                    className="phoneNumber position-absolute top-50 translate-middle-y d-flex align-items-center px-2 pe-3 text-muted  h-100 rounded-end "
                    style={{ left: "0px", zIndex: 2 }}
                >
                    +02
                </div>

                <input
                    {...field}
                    {...props}
                    value={field.value || ""}
                    onChange={(e) => {
                        helpers.setValue(e.target.value);
                    }}
                    className={`form-control ps-5 ${isError ? "is-invalid" : isSuccess ? "active-border" : ""}`}
                    required
                />
            </div>

            {(field.name === "password" || field.name === "confirmPassword") && (
                <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePassword}
                    aria-label="Toggle password visibility"
                >
                    <ShowPassword />
                </button>
            )}

            {isError && <div className="error">{meta.error}</div>}
        </div>
    );
};

export default PhoneNumber;
