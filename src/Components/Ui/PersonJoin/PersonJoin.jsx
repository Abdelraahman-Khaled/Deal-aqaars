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
import CustomModal from '../../CustomModal/CustomModal';
import RequestProgress from './RequestProgress';

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

export const PersonJoin = ({ setShowPerson, setShowProgress }) => {

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
                        الاسم <span className="required-asterisk">*</span>
                    </label>
                    <InputFiled name="name" placeholder="الاسم بالكامل" />
                </div>

                {/* National ID */}
                <div className="mb-4 ">
                    <label className="b-15 mb-2">
                        رقم البطاقة <span className="required-asterisk">*</span>
                    </label>
                    <InputFiled name="nationalId" placeholder="الرقم القومي" />
                </div>

                {/* Address */}
                <div className="mb-4 ">
                    <label className="b-15 mb-2">
                        العنوان بالتفصيل <span className="required-asterisk">*</span>
                    </label>
                    <InputFiled name="address" placeholder="العنوان" />
                </div>

                {/* Mobile */}
                <div className="mb-4 ">
                    <label className="b-15 mb-2 w-100">
                        رقم الموبايل <span className="required-asterisk">*</span>
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
                        name="hasWhatsApp"
                    />
                </div>

                <div className="d-flex space-3">
                    <button
                        onClick={() => { setShowProgress(true); setShowPerson(false) }}
                        className="btn-main w-50" type="submit">
                        ابعت الطلب
                    </button>
                    <button
                        onClick={() => { setShowPerson(false) }}
                        className="btn-main w-50 btn-cancel" type="reset">
                        إلغاء
                    </button>
                </div>
            </FormField>


        </div>
    );
};
