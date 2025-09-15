
import React from "react";
import { useField } from "formik";
import ShowPassword from "../../assets/Icons/ShowPassword";

const InputFiled = ({ label, success, setInputType, showPasswordToggle = false, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const isError = meta.touched && meta.error;
    const isSuccess = success && meta.touched && !meta.error;

    const togglePassword = () => {
        setInputType((prevType) => (prevType === "password" ? "text" : "password"));
    };

    return (
        <div
            className={`form-group  input-field-info d-flex flex-column  position-relative form-one ${meta.touched && meta.error ? "has-error" : ""
                }`}
        >
            {label && (
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 pb-2">
                    {label}
                </label>
            )}
            <input
                {...field}
                {...props}
                value={field.value || ""}
                placeholder={field.value || props.placeholder || ""}
                onChange={(e) => {
                    helpers.setValue(e.target.value);
                }}
                className={`input-field form-control relative ${meta.touched && meta.error
                    ? "is-invalid"
                    : isSuccess
                        ? "active-border"
                        : ""
                    }`}
            />
            {(showPasswordToggle || (props.type === "password" && (field.name === "password" || field.name === "currentPassword" || field.name === "confirmNewPassword" || field.name === "newPassword"))) &&
                <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePassword}
                    aria-label="Toggle password visibility"
                >
                    <ShowPassword />
                </button>
            }
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default InputFiled;
