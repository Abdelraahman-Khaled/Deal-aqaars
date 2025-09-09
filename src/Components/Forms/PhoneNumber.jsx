import React from "react";
import { useField } from "formik";
import ShowPassword from "../../assets/Icons/ShowPassword";
import { useLanguage } from '../Languages/LanguageContext';
import "./MutliSelect.css";

const PhoneNumber = ({ label, success, setInputType, ...props }) => {
    const { currentLanguage } = useLanguage();
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
                    className={`phoneNumber position-absolute top-50 translate-middle-y d-flex align-items-center px-2 text-muted h-100 ${
                        currentLanguage === 'ar' ? 'rounded-start' : 'rounded-end'
                    }`}
                    style={{
                        [currentLanguage === 'ar' ? 'right' : 'left']: "0px",
                        zIndex: 2,
                        borderLeft: currentLanguage === 'ar' ? '1px solid var(--netural-200)' : 'none',
                        borderRight: currentLanguage === 'en' ? '1px solid var(--netural-200)' : 'none'
                    }}
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
                    className={`form-control ${currentLanguage === 'ar' ? 'pe-5' : 'ps-5'} ${isError ? "is-invalid" : isSuccess ? "active-border" : ""}`}
                    style={{
                        direction: currentLanguage === 'ar' ? 'rtl' : 'ltr',
                        textAlign: currentLanguage === 'ar' ? 'right' : 'left'
                    }}
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
