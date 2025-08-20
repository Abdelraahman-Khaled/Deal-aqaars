import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import InputFiled from '../../Forms/InputField';
import FormField from '../../Forms/FormField';
import PhoneNumber from '../../Forms/PhoneNumber';
import WhatsIcon from '../../../assets/Icons/WhatsIcon';
import Switch from '../../Forms/Switch';
import * as Yup from 'yup';
import './PersonJoin.css';
import { useLanguage } from '../../Languages/LanguageContext';
import Select from "react-select";
import ImageDropZone from '../../ImageDropZone/ImageDropZone';

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

export const CompanyJoin = ({ setShowCompany, setShowProgress }) => {
    const [selected, setSelected] = useState("");
    const { currentLanguage } = useLanguage();
    const initialValues = {
        name: '',
        nationalId: '',
        address: '',
        mobile: '',
        hasWhatsApp: false,
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('الاسم مطلوب'),
        nationalId: Yup.string().required('رقم البطاقة مطلوب'),
        address: Yup.string().required('العنوان مطلوب'),
        mobile: Yup.string().required('رقم الموبايل مطلوب'),
    });

    const handleSubmit = (values) => {
        console.log('Form submitted:', values);
    };

    const handleInputChange = (name, file) => {
        console.log(`${name} updated:`, file);
    };

    const options = [
        { value: "compunds", label: "مطور عقاري (كمبوند) - Developer (Compounds)" },
        { value: "buldings", label: "مطور عقاري (عمارات) - Developer (Buldings)" },
        { value: "broker", label: "تسويق عقاري - Broker/Agent" },
        { value: "owner", label: "مالك العقار - Private Owner" },
    ];

    const customStyles = {
        control: (base) => ({
            ...base,
            borderRadius: "8px",
            padding: "2px",
        }),
        menu: (base) => ({
            ...base,
            borderRadius: "8px",
            marginTop: "4px",
            zIndex: 100,
        }),
        option: (base, state) => ({
            ...base,
            padding: "10px 15px",
            backgroundColor: state.isFocused ? "#e9ecef" : "white",
            color: "#212529",
            cursor: "pointer",
        }),
    };
    return (
        <div className='person-join'>
            <FormField
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {/* Name */}
                <div className="mb-4 ">
                    <label className="b-15 mb-2">
                        اسم المستخدم  <span>*</span>
                    </label>
                    <InputFiled name="name" placeholder="مثال: masaproperties" />
                </div>

                {/* National ID */}
                <div className="mb-4 ">
                    <label className="b-15 mb-2">
                        اسم الشركة  <span>*</span>
                    </label>
                    <InputFiled name="nationalId" placeholder=" مثال: الماسة للتطوير العقاري" />
                </div>

                {/* Address */}
                <div className="mb-4 ">
                    <label className="b-15 mb-2">
                        العنوان بالتفصيل <span>*</span>
                    </label>
                    <InputFiled name="address" placeholder="العنوان" />
                </div>

                {/* commercial register */}
                <div className="mb-4 ">
                    <label className="b-15 mb-2">
                        رقم السجل التجاري  <span>*</span>
                    </label>
                    <InputFiled name="address" placeholder="ادخل السجل التجاري" />
                </div>

                {/* website */}
                <div className="mb-4 ">
                    <label className="b-15 mb-2">
                        رابط الموقع الخاص بالشركة (اختياري)  <span>*</span>
                    </label>
                    <InputFiled name="address" placeholder="ادخل  الموقع" />
                </div>

                {/* company type */}
                <div className="mb-4 ">
                    <label className="b-15 mb-2">
                        نوع الشركة  <span>*</span>
                    </label>
                    <Select
                        options={options}
                        styles={customStyles}
                        placeholder="ادخل نوع الشركة"
                    />
                </div>


                {/* Mobile */}
                <div className="mb-4 ">
                    <label className="b-15 mb-2 w-100">
                        رقم الموبايل <span>*</span>
                    </label>
                    <PhoneNumber name="mobile" placeholder="اكتب رقمك" />
                </div>

                {/* WhatsApp Switch */}
                <div className="b-15 mb-4 d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-row space-1 b-15">
                        <WhatsIcon />
                        يوجد واتساب علي هذا الرقم
                    </div>
                    <Switch
                        value={initialValues.hasWhatsApp}
                        onChange={(val) => setFieldValue('hasWhatsApp', val)}
                    />
                </div>

                {/* logo */}
                <div className="mb-4 ">
                    <label className="b-15 mb-2 w-100">
                        شعار الشركة  <span>*</span>
                    </label>
                    <ImageDropZone handleInputChange={handleInputChange} />
                </div>

                <div className="d-flex space-3">
                    <button
                        onClick={() => { setShowProgress(true); setShowCompany(false) }}
                        className="btn-main w-50" type="submit">
                        ابعت الطلب
                    </button>
                    <button
                        onClick={() => { setShowCompany(false) }}
                        className="btn-main w-50 btn-cancel" type="reset">
                        إلغاء
                    </button>
                </div>
            </FormField>


        </div>
    );
};
