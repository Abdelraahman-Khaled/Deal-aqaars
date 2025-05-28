import React, { useRef, useState } from "react";
import forget from "../../../assets/images/RegisterSwpier/otp.png";
import { useLanguage } from "../../Languages/LanguageContext";
import * as Yup from "yup";
import FormField from "../../Forms/FormField";
import { Link } from "react-router-dom";
import "./OtpForm.css";
import HelmetInfo from "../../Helmetinfo/HelmetInfo";

const content = {
    title: {
        ar: "اكتب الكود اللي جالك",
        en: "Write the code we sent to you",
    },
    subTitle: {
        ar: "بعتنالك كود على تليفونك",
        en: "We sent you a code on your phone",
    },
    submitButton: {
        ar: " تأكيد الكود ",
        en: "Submit ",
    },
    revice: {
        ar: "موصلكش الكود",
        en: "Didn't receive the code?",
    },
    resend: {
        ar: "نبعته تاني",
        en: "Send again",
    },
    confirmOtp: {
        ar: "تأكيد رمز الأمان",
        en: "Confirm OTP",
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
    fullOtp: {
        ar: "من فضلك أدخل جميع الأرقام",
        en: "Please enter all OTP digits",
    },
    wrongOtp: {
        ar: "رمز التحقق غير صحيح",
        en: "Invalid verification code",
    },
};

const OtpPage = ({ setFormType }) => {
    const { currentLanguage } = useLanguage();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);

    const handleInputChange = (index, e) => {
        const value = e.target.value;

        if (/^\d$/.test(value) || value === "") {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to next input if filled
            if (value !== "" && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            if (otp[index] === "" && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").slice(0, 6).split("");
        const newOtp = [...otp];

        pasted.forEach((char, i) => {
            if (/^\d$/.test(char)) {
                newOtp[i] = char;
                if (inputRefs.current[i]) {
                    inputRefs.current[i].value = char;
                }
            }
        });

        setOtp(newOtp);
        inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    };

    const handleVerifyOtp = async () => {
        return setFormType("login")
        const otpCode = otp.join("");
        if (otpCode.length !== 6) {
            toast.error(content.fullOtp[currentLanguage]);
            return;
        }

        try {
            const response = await AuthAPI.verifyOtp(emailOrPhone, otpCode);
            if (response.success === true) {
                successSendButton();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(content.wrongOtp[currentLanguage]);
        }
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required(content.validation.emailRequired[currentLanguage])
            .test("email", content.validation.emailInvalid[currentLanguage], function (value) {
                return (
                    Yup.string().email().isValidSync(value) ||
                    Yup.string()
                        .matches(/^[0-9]{10,14}$/, {
                            message: content.validation.emailInvalid[currentLanguage],
                            excludeEmptyString: true,
                        })
                        .isValidSync(value)
                );
            }),
    });

    const initialValues = {
        email: "",
    };

    const handleForgetSubmit = async (values, { resetForm }) => {
        try {
            await AuthAPI.sendOtp(values.email);
            onForgetSubmit(values.email);
            resetForm();
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };

    return (
        <div className="form-container d-flex flex-column justify-content-center align-items-right space-7">

            <HelmetInfo titlePage={currentLanguage === "ar" ? "رمز الامان" : "OTP"} />


            <div className="d-flex justify-content-center">
                <img src={forget} alt="forgetImg" />
            </div>
            <h6>{content.title[currentLanguage]}</h6>
            <p className="b-12 text-gray">
                {content.subTitle[currentLanguage]}
                <strong className="b-12 px-2">35*******010</strong>
            </p>
            <FormField
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleForgetSubmit}
            >
                <div className="otp-form">
                    <div className="all-input-otp d-flex align-items-center space-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder="-"
                                maxLength={1}
                                className="form-control text-center"
                                onChange={(e) => handleInputChange(index, e)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                ref={(el) => (inputRefs.current[index] = el)}
                                value={digit}
                            />
                        ))}
                    </div>
                </div>
            </FormField>
            <button type="button" onClick={handleVerifyOtp} className="btn-main btn-submit p-3">
                {content.submitButton[currentLanguage]}
            </button>
            <p className="b-12">
                {content.revice[currentLanguage]}
                <Link className="px-1 text-decoration-underline b-11" to="#">
                    {content.resend[currentLanguage]}
                </Link>
            </p>
        </div>
    );
};

export default OtpPage;
