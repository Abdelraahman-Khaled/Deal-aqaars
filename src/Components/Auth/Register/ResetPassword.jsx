import { useState } from 'react'
import reset from "../../../assets/images/RegisterSwpier/resetPassword.png"
import { useLanguage } from "../../Languages/LanguageContext";
import * as Yup from "yup";
import FormField from "../../Forms/FormField";
import InputFiled from "../../Forms/InputField";
import "./Register.css"
import HelmetInfo from '../../Helmetinfo/HelmetInfo';

const content = {
    title: {
        ar: "كلمة سر جديدة",
        en: "New password",
    },
    subTitle: {
        ar: "اكتب كلمة سر جديدة وخليك فاكرها عشان تقدر تدخل بسهولة",
        en: "Type a new password and remember it so you can log in easily.",
    },
    newPassword: {
        ar: "الرقم السري الجديد",
        en: "New Password",
    },
    confirmNewPassword: {
        ar: "أكد الرقم السري الجديد",
        en: "Confirm New Password",
    },
    submitButton: {
        ar: "احفظ التغيير",
        en: "Submit",
    },
    validation: {
        passwordMinLength: {
            ar: "كلمة المرور يجب أن تكون على الأقل 8 أحرف",
            en: "Password must be at least 8 characters",
        },
        passwordRequired: {
            ar: "كلمة المرور مطلوبة",
            en: "Password is required",
        },
        passwordConfirmRequired: {
            ar: "تأكيد كلمة المرور مطلوبة",
            en: "Confrim Password is required",
        },
        passwordMismatch: {
            ar: "كلمة المرور غير متطابقة",
            en: "Passwords do not match",
        },
    },
};

const ResetPassword = () => {
    const { currentLanguage } = useLanguage()
    const [inputType, setInputType] = useState("text")

    // validation
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(8, content.validation.passwordMinLength[currentLanguage])
            .required(content.validation.passwordRequired[currentLanguage]),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], content.validation.passwordMismatch[currentLanguage])
            .required(content.validation.passwordConfirmRequired[currentLanguage]),
    });


    const initialValues = {
        password: "",
        confirmPassword: ""
    };

    const handleResetSubmit = async (values, { resetForm }) => {
        try {
            await AuthAPI.sendOtp(values.email); // Send OTP
            onResetSubmit(values.email); // Pass email/phone to parent
            resetForm();
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    }

    return (
        <div className=' form-container d-flex flex-column justify-content-center align-items-right space-7'>

            <HelmetInfo titlePage={currentLanguage === "ar" ? "اعادة تعيين  كلمة السر" : "Reset Password"} />


            <div className='d-flex justify-content-center'>
                <img loading="lazy" src={reset} alt="resetImg" />
            </div>
            <h3>
                {content.title[currentLanguage]}
            </h3>
            <p className='b-12'>
                {content.subTitle[currentLanguage]}
            </p>
            <FormField
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleResetSubmit}
            >
                <div className="space-4 d-flex flex-column">
                    <div>
                        <p className="b-11">{content.newPassword[currentLanguage]} <span className="required-asterisk">*</span></p>
                        <InputFiled
                            name="password"
                            type={inputType}
                            placeholder={" • • • • • • • •"}
                            success
                            setInputType={setInputType}
                        />
                    </div>
                    <div>
                        <p className="b-11">{content.confirmNewPassword[currentLanguage]} <span className="required-asterisk">*</span></p>
                        <InputFiled
                            name="confirmPassword"
                            type={inputType}
                            placeholder={" • • • • • • • •"}
                            success
                            setInputType={setInputType}
                        />
                    </div>
                </div>
            </FormField>
            <button type="submit" className="btn-main btn-submit p-3">
                {content.submitButton[currentLanguage]}
            </button>
        </div>
    )
};
export default ResetPassword