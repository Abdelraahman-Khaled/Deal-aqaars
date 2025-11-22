import { useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import { useLanguage } from '../Languages/LanguageContext';
import ContainerMedia from '../ContainerMedia/ContainerMedia'
import FormField from '../Forms/FormField';
import InputFiled from '../Forms/InputField';
import ExclamationMark from '../../assets/Icons/ExclamationMark';
import logo from "../../assets/images/logo/logo.svg";
import googleApp from "../../assets/images/footer/googlePlay.png"
import appStore from "../../assets/images/footer/appStore.png"
import "./Footer.css"

const content = {


    submitButton: {
        ar: "ابعتلي الجديد",
        en: "Send Updates",
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
    keepTouch: { ar: "خلّيك على تواصل معانا", en: "Stay in touch with us" },
    saveEmail: { ar: "سجل ايميلك عشان توصلك كل الجديد والعروض الحصرية", en: "Register your email to receive all the latest news and exclusive offers" },
    YourEmailSave: { ar: "ايميلك في أمان معانا", en: "Your email is safe with us" },
    sale: { ar: "بيع", en: "Sale" },
    rent: { ar: "إيجار", en: "Rent" },
    finishing: { ar: "تشطيبات", en: "Finishing" },
    about: { ar: "تعرف علينا", en: "About us " },
    policy: { ar: "سياسة الخصوصية", en: "privacy policy" },
    terms: { ar: "الشروط والاحكام", en: "Terms and Conditions" },
    contact: { ar: "تواصل معنا", en: "Contact us" },
    download: { ar: "نزّل التطبيق دلوقتي", en: "Download App" },
    rights: { ar: "كل الحقوق محفوظة DEAL", en: "All rights reserved DEAL" },
    property: { ar: "عقارات", en: "Properties" },
    compounds: { ar: "كمبوندات", en: "Compounds" },
    furnishing:{ar:"فرش",en:"Furnishing"}
};

const Footer = () => {
    const { currentLanguage } = useLanguage()
    const [inputType, setInputType] = useState("text")
    const initialValues = {
        email: "",
    };

    // send updates
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
        <div className='footer'>
            <ContainerMedia>
                <div className='d-flex flex-column gap-4 pb-4'>
                    <div className='keep-touch'>
                        <div className="row">
                            {/* right */}
                            <div className='col-md-5 col-12 mb-3 mb-md-0'>
                                <h6>
                                    {content.keepTouch[currentLanguage]}
                                </h6>
                                <p className='b-12'>
                                    {content.saveEmail[currentLanguage]}
                                </p>
                            </div>
                            {/* left form */}
                            <div className="col-md-7 col-12 d-flex flex-column gap-2">
                                <FormField
                                    initialValues={initialValues}
                                    onSubmit={handleResetSubmit}
                                >
                                    <InputFiled
                                        name="email"
                                        type={inputType}
                                        placeholder={"example@gmail.com"}
                                        success
                                        setInputType={setInputType}
                                    />
                                    <button type="submit" className="btn-main btn-submit ">
                                        {content.submitButton[currentLanguage]}
                                    </button>
                                </FormField>
                                <p className='w-100'>
                                    <ExclamationMark />
                                    {content.YourEmailSave[currentLanguage]}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="row links flex-row align-items-center">
                        {/* right */}
                        <div className="col-md-10 col-12 mb-4 mb-md-0 d-flex flex-column gap-3">
                            <Link to="/" className="image-logo">
                                <img src={logo} alt="logo" />
                            </Link>
                            <div className='d-flex flex-wrap' style={{ gap: "32px" }}>
                                {/* sale */}
                                <NavLink className="nav-link b-11" to="/realestate">
                                    {content.property[currentLanguage]}
                                </NavLink>
                                {/* rent */}
                                <NavLink className="nav-link b-11" to="/compounds">
                                    {content.compounds[currentLanguage]}
                                </NavLink>
                                {/* finishing */}
                                <NavLink className="nav-link b-11" to="/finish">
                                    {content.furnishing[currentLanguage]}
                                </NavLink>
                                {/* finishing */}
                                <NavLink className="nav-link b-11" to="/finish?division=finishing">
                                    {content.finishing[currentLanguage]}
                                </NavLink>
                                {/* about */}
                                <NavLink className="nav-link b-11" to="/rent">
                                    {content.about[currentLanguage]}
                                </NavLink>
                                {/* policy */}
                                <NavLink className="nav-link b-11" to="/rent">
                                    {content.policy[currentLanguage]}
                                </NavLink>
                                {/* terms */}
                                <NavLink className="nav-link b-11" to="/rent">
                                    {content.terms[currentLanguage]}
                                </NavLink>
                                {/* contact */}
                                <NavLink className="nav-link b-11" to="/rent">
                                    {content.contact[currentLanguage]}
                                </NavLink>
                            </div>
                        </div>
                        {/* left */}
                        <div className="col-md-2 col-12 d-flex flex-column align-items-md-end align-items-start gap-3">
                            <p className='b-7'>
                                {content.download[currentLanguage]}
                            </p>
                            <Link to="#">
                                <img src={googleApp} alt="googleApp" />
                            </Link>
                            <Link to="#">
                                <img src={appStore} alt="appStore" />
                            </Link>
                        </div>
                    </div>

                    {/* theRights */}
                    <p className='text-center b-12'>
                        {content.rights[currentLanguage]}
                        &copy;
                    </p>
                </div>
            </ContainerMedia >
        </div >
    )
}

export default Footer