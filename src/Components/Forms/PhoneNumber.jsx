import React from "react";
import { useField } from "formik";
import ShowPassword from "../../assets/Icons/ShowPassword";
import { useLanguage } from '../Languages/LanguageContext';
import "./PhoneNumber.css";

const PhoneNumber = ({ label, success, setInputType, ...props }) => {
    const { currentLanguage } = useLanguage();
    const [field, meta, helpers] = useField(props);
    const isError = meta.touched && meta.error;
    const isSuccess = success && meta.touched && !meta.error;

    const togglePassword = () => {
        setInputType((prevType) => (prevType === "password" ? "text" : "password"));
    };

    return (
        <div className="phone-number-container">
            <div className="position-relative">
                <div
                    className={`phone-number-prefix ${currentLanguage === 'ar' ? 'prefix-rtl' : 'prefix-ltr'}`}
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
                    className={`phone-number-input ${isError ? "is-invalid" : isSuccess ? "is-valid" : ""}`}
                    style={{
                        direction: currentLanguage === 'ar' ? 'rtl' : 'ltr',
                        paddingRight: currentLanguage === 'ar' ? '3.5rem' : '0.75rem',
                        paddingLeft: currentLanguage === 'ar' ? '0.75rem' : '3.5rem'
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

            {isError && <div className="phone-number-error">{meta.error}</div>}
        </div>
    );
};

export default PhoneNumber;
