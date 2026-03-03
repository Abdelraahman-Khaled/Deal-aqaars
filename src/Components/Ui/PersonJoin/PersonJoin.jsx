import React, { useState } from 'react';
import InputFiled from '../../Forms/InputField';
import FormField from '../../Forms/FormField';
import PhoneNumber from '../../Forms/PhoneNumber';
import WhatsIcon from '../../../assets/Icons/WhatsIcon';
import Switch from '../../Forms/Switch';
import * as Yup from 'yup';
import './PersonJoin.css';
import { useLanguage } from '../../Languages/LanguageContext';
import CompanyAPI from '../../../api/companyApi';
import { toast } from 'react-toastify';

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
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        role: "vendor",
        fullName: '',
        // nationalId: '',
        // detailedLocation: '',
        phoneNumber: '',
        hasWhatsApp: false,
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required('الاسم مطلوب'),
        // nationalId: Yup.string().required('رقم البطاقة مطلوب'),
        // detailedLocation: Yup.string().required('العنوان مطلوب'),
        phoneNumber: Yup.string().required('رقم الموبايل مطلوب'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            setIsLoading(true);
            const response = await CompanyAPI.beingVendor(values);

            // Show success and proceed to next step
            setShowProgress(true);
            setShowPerson(false);
            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
            if (error.response && error.response.data) {
                const data = error.response.data;
                if (data.errors) {
                    // Show each validation error message
                    Object.values(data.errors).forEach(errMessage => {
                        toast.error(errMessage);
                    });
                } else if (data.message) {
                    toast.error(data.message);
                } else {
                    toast.error(currentLanguage === 'ar' ? 'حدث خطأ أثناء إرسال الطلب' : 'An error occurred while submitting');
                }
            } else {
                toast.error(currentLanguage === 'ar' ? 'حدث خطأ غير متوقع' : 'An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
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
                    <InputFiled name="fullName" placeholder="الاسم بالكامل" />
                </div>

                {/* National ID */}
                {/* <div className="mb-4 ">
                    <label className="b-15 mb-2">
                        رقم البطاقة <span className="required-asterisk">*</span>
                    </label>
                    <InputFiled name="nationalId" placeholder="الرقم القومي" />
                </div> */}

                {/* Address */}
                {/* <div className="mb-4 ">
                    <label className="b-15 mb-2">
                        العنوان بالتفصيل <span className="required-asterisk">*</span>
                    </label>
                    <InputFiled name="detailedLocation" placeholder="العنوان" />
                </div> */}

                {/* Mobile */}
                <div className="mb-4 ">
                    <label className="b-15 mb-2 w-100">
                        رقم الموبايل <span className="required-asterisk">*</span>
                    </label>
                    <PhoneNumber name="phoneNumber" placeholder="اكتب رقمك" />
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

                <div className="d-flex flex-column flex-md-row gap-3 mt-4">
                    <button
                        className="btn-main w-100 d-flex justify-content-center align-items-center gap-2"
                        type="submit"
                        disabled={isLoading}>
                        {isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        {isLoading ? (currentLanguage === 'ar' ? 'جاري الإرسال...' : 'Sending...') : (currentLanguage === 'ar' ? 'ابعت الطلب' : 'Send Request')}
                    </button>
                    <button
                        onClick={() => { setShowPerson(false) }}
                        className="btn-main w-100 btn-cancel"
                        type="reset"
                        disabled={isLoading}>
                        {currentLanguage === 'ar' ? 'إلغاء' : 'Cancel'}
                    </button>
                </div>
            </FormField>


        </div>
    );
};
