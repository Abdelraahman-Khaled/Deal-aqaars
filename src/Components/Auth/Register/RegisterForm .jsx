import { useState } from "react";
import "./Register.css"
import * as Yup from "yup";
import FormField from "../../Forms/FormField";
import InputFiled from "../../Forms/InputField";
import { useLanguage } from "../../Languages/LanguageContext";
import { Link } from "react-router-dom"
import Google from "../../../assets/Icons/Google";
import Facebook from "../../../assets/Icons/Facebook";
import Apple from "../../../assets/Icons/Apple";
import PhoneNumber from "../../Forms/PhoneNumber";
import HelmetInfo from "../../Helmetinfo/HelmetInfo";

const content = {
    title: {
        ar: "اعمل حساب جديد",
        en: "Create a New Account",
    },
    email: {
        ar: "البريد الإلكتروني ",
        en: "Email",
    },
    emailLabel: {
        ar: "الاسم بالكامل",
        en: "Full Name",
    },
    emailPlaceHolder: {
        ar: "اسمك بالكامل",
        en: "Your Full Name",
    },
    phoneLabel: {
        ar: "رقم الموبايل ",
        en: "Phone Number",
    },
    phone: {
        ar: " اكتب رقمك",
        en: "Your Phone Number",
    },
    haveAcc: {
        ar: " عندك حساب؟",
        en: "Have Account ?",
    },
    submitButton: {
        ar: "إرسال رمز الامان",
        en: "Send OTP",
    },
    joinNow: {
        ar: "ادخل دلوقتي",
        en: "Login",
    },
    alreadyHaveAccount: {
        ar: "لديك حساب بالفعل؟",
        en: "Already have an account?",
    },
    loginLink: {
        ar: "تسجيل الدخول",
        en: "Log In",
    },
    agree: {
        ar: "موافق علي",
        en: "I agree to"
    },
    terms: {
        ar: "الشروط والاحكام",
        en: "Terms and Conditions"
    },
    startNow: {
        ar: "ابدأ دلوقتي",
        en: "Start Now"
    },
    or: {
        ar: "أو", en: "OR"
    },
    google: {
        ar: "تسجيل بجوجل",
        en: "Login with Google"
    },
    facebook: {
        ar: "تسجيل بفيسبوك",
        en: "Login with Facebook"
    },
    apple: {
        ar: "تسجيل بابل",
        en: "Login with Apple"
    },

    validation: {
        nameRequired: {
            ar: " ادخل اسمك بالكامل",
            en: "Enter your name",
        },
        emailRequired: {
            ar: "ادخل البريد الإلكتروني ",
            en: "Enter your email or phone number",
        },
        emailInvalid: {
            ar: " بريد إلكتروني غير صحيح",
            en: "Invalid email or phone number",
        },
        passwordMinLength: {
            ar: "كلمة المرور يجب أن تكون على الأقل 8 أحرف",
            en: "Password must be at least 8 characters",
        },
        passwordRequired: {
            ar: "كلمة المرور مطلوبة",
            en: "Password is required",
        },
    },
    passwordLabel: {
        ar: "الرقم السري", en: "Password"
    },
}


const RegisterForm = ({ setFormType }) => {
    const { currentLanguage } = useLanguage()
    const [inputType, setInputType] = useState("password")
    const [createWay, setCreateWay] = useState("email")

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
        name: Yup.string()
            .required(content.validation.nameRequired[currentLanguage]),
        password: Yup.string()
            .min(8, content.validation.passwordMinLength[currentLanguage])
            .required(content.validation.passwordRequired[currentLanguage]),
    });

    const initialValues = {
        name: "",
        email: "",
        password: ""
    };

    const handleRegisterSubmit = async (values, { resetForm }) => {
        try {
            await AuthAPI.sendOtp(values.emailRegOrPhoneNumber); // Send OTP
            onRegisterSubmit(values.emailRegOrPhoneNumber); // Pass email/phone to parent
            resetForm();
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };

    return (
        <>

            <HelmetInfo titlePage={currentLanguage === "ar" ? "انشاء حساب" : "Create a New Account"} />

            <div className="form-container">
                <div className="d-flex gap-4 flex-column">
                    <h3>{content.title[currentLanguage]}</h3>
                    <p className="b-12">
                        {content.haveAcc[currentLanguage]}
                        <Link className="b-11 text-decoration-underline px-2" onClick={() => setFormType("login")}>{content.joinNow[currentLanguage]}</Link>
                    </p>
                </div>
                <FormField
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegisterSubmit}
                >
                    <div className="space-4 d-flex flex-column mb-5">
                        {
                            createWay === "email" ?
                                (
                                    <>
                                        <div>
                                            <p className="b-11 pb-2">{content.email[currentLanguage]} <span>*</span></p>
                                            <InputFiled
                                                name="email"
                                                type="text"
                                                placeholder={"example@gmail.com"}
                                                success
                                            />
                                        </div>
                                        <Link to={"#"} className="b-14 text-decoration-underline" onClick={() => setCreateWay("phone")}>
                                            استخدم رقم موبايلك بدل الايميل
                                        </Link>
                                        {/* input email */}
                                        <div>
                                            <p className="b-11 pb-2">{content.emailLabel[currentLanguage]} <span>*</span></p>
                                            <InputFiled
                                                name="name"
                                                type="text"
                                                placeholder={content.emailPlaceHolder[currentLanguage]}
                                                success
                                            />
                                        </div>

                                        {/* input password */}
                                        <div>
                                            <p className="b-11 pb-2">{content.passwordLabel[currentLanguage]} <span>*</span></p>
                                            <InputFiled
                                                name="password"
                                                type={inputType}
                                                placeholder={" • • • • • • • •"}
                                                success
                                                setInputType={setInputType}
                                            />
                                            <div className="form-check d-flex gap-2 my-2 box-shadow b-12" >
                                                <input className={`form-check-input  ${currentLanguage === "en" && "mx-0"}`} type="checkbox" value="" id="flexCheckChecked" />
                                                <label className="form-check-label" for="flexCheckChecked">
                                                    {content.agree[currentLanguage]}
                                                </label>
                                                <Link className="b-11" to={"#"} >{content.terms[currentLanguage]}</Link>
                                            </div>
                                        </div>
                                    </>
                                ) :
                                (
                                    createWay === "phone" &&
                                    <>
                                        <div>
                                            <p className="b-11 pb-2">{content.phoneLabel[currentLanguage]} <span>*</span></p>
                                            <PhoneNumber
                                                name="phone"
                                                type="text"
                                                placeholder={content.phone[currentLanguage]}
                                                success
                                            />
                                        </div>
                                        <Link to={"#"} className="b-14 text-decoration-underline" onClick={() => setCreateWay("email")}>
                                            استخدم الايميل بدل رقم الموبايل
                                        </Link>
                                    </>
                                )
                        }

                    </div>
                    <button type="submit" onClick={() => createWay === "email" ? setFormType("verifyAccount") : setFormType("otp")} className="btn-main btn-submit w-100  b-11 p-3">
                        {content.startNow[currentLanguage]}
                    </button>
                </FormField>
                <div className="register-social">
                    <div className="separator">
                        <p className="b-12">{content.or[currentLanguage]}</p>
                    </div>
                    <button className="btn-main bg-transparent btn-submit w-100 mt-3 b-11 ">
                        <Google />
                        <p>
                            {content.google[currentLanguage]}
                        </p>
                    </button>
                    <button className="btn-main bg-transparent btn-submit w-100 mt-3 b-11 ">
                        <Facebook />
                        <p>
                            {content.facebook[currentLanguage]}
                        </p>
                    </button>
                    <button className="btn-main bg-transparent  btn-submit w-100 mt-3 b-11 ">
                        <Apple />
                        <p>
                            {content.apple[currentLanguage]}
                        </p>
                    </button>
                </div>
            </div>
        </>
    );
};

export default RegisterForm;
