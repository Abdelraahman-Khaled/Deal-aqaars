import { useState } from "react";
import * as Yup from "yup";
import FormField from "../../Forms/FormField";
import InputFiled from "../../Forms/InputField";
import { useLanguage } from "../../Languages/LanguageContext";
import { Link, Navigate, useNavigate } from "react-router-dom"
import "./Register.css"
import Google from "../../../assets/Icons/Google";
import Facebook from "../../../assets/Icons/Facebook";
import Apple from "../../../assets/Icons/Apple";
import HelmetInfo from "../../Helmetinfo/HelmetInfo";
import AuthAPI from "../../../api/authApi";
import { useDispatch } from "react-redux";
import { login } from "../../../store/authSlice";
import { Password } from "primereact/password";

const content = {
    title: {
        ar: "تسجيل الدخول",
        en: "Login",
    },
    email: {
        ar: "البريد الإلكتروني ",
        en: "Email ",
    },
    emailPlaceholder: {
        ar: "أدخل البريد الإلكتروني ",
        en: "Enter your email ",
    },
    passwordLabel: {
        ar: "الرقم السري",
        en: "Password",
    },
    noAccount: {
        ar: "معندكش حساب؟",
        en: "Don't have an account?",
    },
    registerNow: {
        ar: "سجل دلوقتي",
        en: "Register Now",
    },
    forgetPassword: {
        ar: "نسيت الرقم السري ؟",
        en: "Forget Password ?",
    },
    login: {
        ar: "ادخل لحسابك",
        en: "Login",
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
        emailRequired: {
            ar: "ادخل البريد الإلكتروني",
            en: "Enter your email ",
        },
        emailInvalid: {
            ar: "بريد إلكتروني غير صحيح",
            en: "Invalid email ",
        },
        phoneInvalid: {
            ar: "رقم الهاتف غير صحيح",
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
    },
};

const LoginForm = ({ setFormType }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState('');

    const navigate = useNavigate()
    const { currentLanguage } = useLanguage()
    // yup validation 
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required(content.validation.emailRequired[currentLanguage])
            .test("email-or-phone", content.validation.emailInvalid[currentLanguage], function (value) {
                if (!value) return false;

                const isEmail = Yup.string().email().isValidSync(value);
                const isPhone = /^[0-9]{10,14}$/.test(value);

                if (!isEmail && !isPhone) {
                    return this.createError({
                        message: content.validation.emailInvalid[currentLanguage],
                    });
                }
                return true;
            }),
        password: Yup.string()
            .min(8, content.validation.passwordMinLength[currentLanguage])
            .required(content.validation.passwordRequired[currentLanguage]),
    });


    const initialValues = {
        email: "",
        password: "",
    };

    const dispatch = useDispatch();


    const handleSubmit = async (values, { resetForm }) => {
        setIsLoading(true);
        try {
            const response = await AuthAPI.login(values);
            if (response.token) {
                dispatch(login({ user: response.user, token: response.token }));
            }
            window.dispatchEvent(new Event("storage")); // Trigger the storage event
            resetForm();
            navigate("/"); // Redirect to home page after successful login
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <div className="form-container my-3">

            <HelmetInfo titlePage={currentLanguage === "ar" ? "تسجيل الدخول" : "Login"} />

            <div className="d-flex gap-4 flex-column">
                <h3>{content.title[currentLanguage]}</h3>
                <p className="b-12">{content.noAccount[currentLanguage]}
                    <Link className="b-11 text-decoration-underline px-2" onClick={() => setFormType("register")}>{content.registerNow[currentLanguage]}</Link>
                </p>
            </div>
            <FormField
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <>
                        <div className="space-4 d-flex flex-column">
                            {/* input email */}
                            <div>
                                <p className="b-11 pb-2">{content.email[currentLanguage]} <span className="required-asterisk">*</span></p>
                                <InputFiled
                                    name="email"
                                    type="text"
                                    placeholder={"example@gmail.com"}
                                    success
                                />
                            </div>
                            {/* input password */}
                            <div>
                                <p className="b-11 pb-2">{content.passwordLabel[currentLanguage]} <span className="required-asterisk">*</span></p>

                                <Password name="password" value={value} className="d-block" feedback={false}
                                    onChange={(e) => {
                                        setValue(e.target.value);
                                        setFieldValue("password", e.target.value);
                                    }}
                                    toggleMask />
                                <Link className="d-flex py-3 b-15" onClick={() => setFormType("forgotPassword")}>{content.forgetPassword[currentLanguage]}</Link>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn-main btn-submit w-100 b-11 p-3 d-flex justify-content-center align-items-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2 text-white" role="status" />
                                    {currentLanguage === "ar" ? "جاري تسجيل الدخول..." : "Loging in..."}
                                </>
                            ) : (
                                content.login[currentLanguage]
                            )}
                        </button>
                    </>
                )}
            </FormField>
            <div className="register-social">
                <div className="separator">
                    <p className="b-12">{content.or[currentLanguage]}</p>
                </div>
                <button className="btn-main bg-transparent btn-submit w-100 mt-3  ">
                    <Google />
                    <p>
                        {content.google[currentLanguage]}
                    </p>
                </button>
                <button className="btn-main bg-transparent btn-submit w-100 mt-3  ">
                    <Facebook />
                    <p>
                        {content.facebook[currentLanguage]}
                    </p>
                </button>
                <button className="btn-main bg-transparent  btn-submit w-100 mt-3  ">
                    <Apple />
                    <p>
                        {content.apple[currentLanguage]}
                    </p>
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
