import React from "react";
import forget from "../../../assets/images/RegisterSwpier/forgetPassword.png"
import { useLanguage } from "../../Languages/LanguageContext";
import * as Yup from "yup";
import FormField from "../../Forms/FormField";
import InputFiled from "../../Forms/InputField";
import "./Register.css"
import HelmetInfo from "../../Helmetinfo/HelmetInfo";

const content = {
    title: {
        ar: "نسيت كلمة السر؟",
        en: "Forgot your password?",
    },
    subTitle: {
        ar: "دخل الإيميل المرتبط بحسابك، وهنبعتلك رسالة فيها خطوات تغير كلمة السر!",
        en: "Enter the email associated with your account, and we will send you a message with the steps to change your password!"
    },
    email: {
        ar: "البريد الإلكتروني ",
        en: "Email or Phone Number",
    },
    submitButton: {
        ar: "ابعتلي الرابط",
        en: "Send Link",
    },
    alreadyHaveAccount: {
        ar: "لديك حساب بالفعل؟",
        en: "Already have an account?",
    },
    loginLink: {
        ar: "تسجيل الدخول",
        en: "Log In",
    },
    validation: {
        emailRequired: {
            ar: "ادخل البريد الإلكتروني ",
            en: "Enter your email ",
        },
        emailInvalid: {
            ar: " بريد إلكتروني غير صحيح",
            en: "Invalid email",
        },
    },
};


const ForgotPasswordForm = () => {
    const { currentLanguage } = useLanguage()

    // validation
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required(content.validation.emailRequired[currentLanguage])
            .test(
                "email",
                content.validation.emailInvalid[currentLanguage],
                function (value) {
                    return (
                        Yup.string().email().isValidSync(value) ||
                        Yup.string()
                            .matches(/^[0-9]{10,14}$/, {
                                message: content.validation.phoneInvalid[currentLanguage],
                                excludeEmptyString: true,
                            })
                            .isValidSync(value)
                    );
                }
            ),
    });

    const initialValues = {
        email: "",
    };

    const handleForgetSubmit = async (values, { resetForm }) => {
        try {
            await AuthAPI.sendOtp(values.email); // Send OTP
            onForgetSubmit(values.email); // Pass email/phone to parent
            resetForm();
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };

    return (
        <div className=' form-container d-flex flex-column justify-content-center align-items-right space-7'>

            <HelmetInfo titlePage={currentLanguage === "ar" ? "نسيت كلمة السر" : "Forgot Password"} />

            <div className='d-flex justify-content-center'>
                <img src={forget} alt="forgetImg" />
            </div>
            <h3>
                {content.title[currentLanguage]}
            </h3>
            <p className='b-12 text-gray'>
                {content.subTitle[currentLanguage]}
            </p>
            <FormField
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleForgetSubmit}
            >
                <p className="b-11 pb-2">{content.email[currentLanguage]} <span className="required-asterisk">*</span></p>
                <InputFiled
                    name="email"
                    type="text"
                    placeholder={"example@gmail.com"}
                    success
                />
            </FormField>
            <button type="submit" className="btn-main btn-submit p-3">
                {content.submitButton[currentLanguage]}
            </button>
        </div>
    );
};

export default ForgotPasswordForm;
