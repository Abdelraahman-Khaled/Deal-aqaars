import { useState } from "react";
import "./Register.css"
import * as Yup from "yup";
import FormField from "../../Forms/FormField";
import InputFiled from "../../Forms/InputField";
import { useLanguage } from "../../Languages/LanguageContext";
import { Link, useNavigate } from "react-router-dom"
import Google from "../../../assets/Icons/Google";
import Facebook from "../../../assets/Icons/Facebook";
import Apple from "../../../assets/Icons/Apple";
import PhoneNumber from "../../Forms/PhoneNumber";
import HelmetInfo from "../../Helmetinfo/HelmetInfo";
import AuthAPI from "../../../api/authApi";
import { useDispatch } from "react-redux";
import { login } from "../../../store/authSlice";
import { Password } from "primereact/password";

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
            ar: "ادخل اسمك بالكامل",
            en: "Enter your name",
        },
        emailRequired: {
            ar: "ادخل البريد الإلكتروني",
            en: "Enter your email",
        },
        emailInvalid: {
            ar: "بريد إلكتروني غير صحيح",
            en: "Invalid email",
        },
        phoneRequired: {
            ar: "رقم الموبايل مطلوب",
            en: "Phone number is required",
        },
        phoneInvalid: {
            ar: "رقم الموبايل غير صحيح",
            en: "Invalid phone number",
        },
        passwordMinLength: {
            ar: "كلمة المرور يجب أن تكون على الأقل 8 أحرف",
            en: "Password must be at least 8 characters",
        },
        passwordRequired: {
            ar: "كلمة المرور مطلوبة",
            en: "Password is required",
        },
        confirmPasswordRequired: {
            ar: "تأكيد كلمة المرور مطلوب",
            en: "Confirm password is required",
        },
        confirmPasswordMatch: {
            ar: "كلمة المرور غير متطابقة",
            en: "Passwords must match",
        },
    }
    ,
    passwordLabel: {
        ar: "الرقم السري", en: "Password"
    },
    passwordConfirmLabel: {
        ar: " تاكيد الرقم السري", en: "Confrim Password"
    },
}


const RegisterForm = ({ setFormType }) => {
    const { currentLanguage } = useLanguage()
    const [value, setValue] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [createWay, setCreateWay] = useState("email")
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // validation
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required(content.validation.nameRequired[currentLanguage]),

        email: Yup.string()
            .email(content.validation.emailInvalid[currentLanguage])
            .required(content.validation.emailRequired[currentLanguage]),

        mobile: Yup.string()
            .matches(/^[0-9+\s]{10,15}$/, content.validation.phoneInvalid[currentLanguage])
            .required(content.validation.phoneRequired[currentLanguage]),

        password: Yup.string()
            .min(8, content.validation.passwordMinLength[currentLanguage])
            .required(content.validation.passwordRequired[currentLanguage]),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], content.validation.confirmPasswordMatch[currentLanguage])
            .required(content.validation.confirmPasswordRequired[currentLanguage]),
    });



    const initialValues = {
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        role: "user"
    };

    const handleRegisterSubmit = async (values, { resetForm }) => {
        setIsLoading(true);
        try {
            const response = await AuthAPI.register(values);
            resetForm();
            navigate("/");
            dispatch(login({ user: response.user, token: response.token }));
        } catch (error) {
            console.error("Error register:", error);
        } finally {
            setIsLoading(false);
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
                        <Link className="b-11 text-decoration-underline px-2 b-11" onClick={() => setFormType("login")}>{content.joinNow[currentLanguage]}</Link>
                    </p>
                </div>
                <FormField
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegisterSubmit}
                >
                    {({ values, setFieldValue }) => (
                        <>
                            <div className="space-4 d-flex flex-column mb-5">
                                {
                                    createWay === "email" ?
                                        (
                                            <>
                                                {/* input email */}
                                                <div className="row g-3">
                                                    <div className="col-12 col-md-6">
                                                        <p className="b-11 pb-2">{content.emailLabel[currentLanguage]} <span>*</span></p>
                                                        <InputFiled
                                                            name="name"
                                                            type="text"
                                                            placeholder={content.emailPlaceHolder[currentLanguage]}
                                                            success
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <p className="b-11 pb-2">{content.phone[currentLanguage]} <span>*</span></p>
                                                        <InputFiled
                                                            name="mobile"
                                                            type="text"
                                                            placeholder={content.phone[currentLanguage]}
                                                            success
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="b-11 pb-2">{content.email[currentLanguage]} <span>*</span></p>
                                                    <InputFiled
                                                        name="email"
                                                        type="text"
                                                        placeholder={"example@gmail.com"}
                                                        success
                                                    />
                                                </div>

                                                {/* <Link to={"#"} className="b-14 text-decoration-underline" onClick={() => setCreateWay("phone")}>
                                            استخدم رقم موبايلك بدل الايميل
                                        </Link> */}


                                                {/* input password */}
                                                <div>
                                                    <div className="row g-3">
                                                        <div className="col-12 col-md-6">
                                                            <p className="b-11 pb-2">{content.passwordLabel[currentLanguage]} <span>*</span></p>

                                                            <Password name="password" value={value}
                                                                onChange={(e) => {
                                                                    setValue(e.target.value);
                                                                    setFieldValue("password", e.target.value);
                                                                }}
                                                                toggleMask />

                                                        </div>
                                                        <div className="col-12 col-md-6">
                                                            <p className="b-11 pb-2">{content.passwordConfirmLabel[currentLanguage]} <span>*</span></p>

                                                            <Password name="confirmPassword" value={confirmPassword}
                                                                onChange={(e) => {
                                                                    setConfirmPassword(e.target.value)
                                                                    setFieldValue("confirmPassword", e.target.value)
                                                                }}
                                                                toggleMask />

                                                        </div>
                                                    </div>
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
                            {/* <button type="submit" onClick={() => createWay === "email" ? setFormType("verifyAccount") : setFormType("otp")} className="btn-main btn-submit w-100  b-11 p-3"> */}
                            <button
                                type="submit"
                                className="btn-main btn-submit w-100 b-11 p-3 d-flex justify-content-center align-items-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2 text-white" role="status" />
                                        {currentLanguage === "ar" ? "جاري انشاء مستخدم..." : "Creating New acc..."}
                                    </>
                                ) : (
                                    content.startNow[currentLanguage]
                                )}
                            </button>
                        </>
                    )}

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
