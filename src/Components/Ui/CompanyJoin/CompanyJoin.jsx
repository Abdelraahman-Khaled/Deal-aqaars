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

export const CompanyJoin = ({ setShowCompany, setShowProgress }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [companyType, setCompanyType] = useState(null);
    const [logo, setLogo] = useState(null);
    const { currentLanguage } = useLanguage();

    const initialValues = {
        username: '',
        companyName: '',
        address: '',
        registrationNumber: '',
        website: '',
        phoneNumber: '',
        hasWhatsapp: false,
        logo: [],
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('اسم المستخدم مطلوب'),
        companyName: Yup.string().required('اسم الشركة مطلوب'),
        address: Yup.string().required('العنوان مطلوب'),
        registrationNumber: Yup.string().required('رقم السجل التجاري مطلوب'),
        phoneNumber: Yup.string().required('رقم الموبايل مطلوب'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            setIsLoading(true);

            if (!companyType) {
                toast.error(currentLanguage === 'ar' ? 'يرجى اختيار نوع الشركة' : 'Please select company type');
                return;
            }

            const companyData = {
                ...values,
                companyType: companyType.value,
                logo: logo
            };

            console.log('Form data to submit:', companyData);

            const response = await CompanyAPI.createCompany(companyData);
            console.log('API Response:', response);

            // Show success and proceed to next step
            setShowProgress(true);
            setShowCompany(false);
            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    const handleInputChange = (name, file) => {
        console.log(`${name} updated:`, file);
        setLogo(file);
    };

    const options = [
        { value: "developer_compound", label: "مطور عقاري (كمبوند) - Developer (Compounds)" },
        { value: "developer_buldings", label: "مطور عقاري (عمارات) - Developer (Buldings)" },
        { value: "broker", label: "تسويق عقاري - Broker/Agent" },
        { value: "owner", label: "مالك العقار - Private Owner" },
    ]

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
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form>
                        {/* Username */}
                        <div className="mb-4 ">
                            <label className="b-15 mb-2">
                                اسم المستخدم  <span>*</span>
                            </label>
                            <InputFiled name="username" placeholder="مثال: masaproperties" />
                        </div>

                        {/* Company Name */}
                        <div className="mb-4 ">
                            <label className="b-15 mb-2">
                                اسم الشركة  <span>*</span>
                            </label>
                            <InputFiled name="companyName" placeholder=" مثال: الماسة للتطوير العقاري" />
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
                            <InputFiled name="registrationNumber" placeholder="ادخل السجل التجاري" />
                        </div>

                        {/* website */}
                        <div className="mb-4 ">
                            <label className="b-15 mb-2">
                                رابط الموقع الخاص بالشركة (اختياري)
                            </label>
                            <InputFiled name="website" placeholder="ادخل  الموقع" />
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
                                onChange={setCompanyType}
                                value={companyType}
                            />
                        </div>


                        {/* Mobile */}
                        <div className="mb-4 ">
                            <label className="b-15 mb-2 w-100">
                                رقم الموبايل <span>*</span>
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
                                name="hasWhatsapp"
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
                                className="btn-main w-50"
                                type="submit"
                                disabled={isLoading}>
                                {isLoading ? (currentLanguage === 'ar' ? 'جاري الإرسال...' : 'Sending...') : (currentLanguage === 'ar' ? 'ابعت الطلب' : 'Send Request')}
                            </button>
                            <button
                                onClick={() => { setShowCompany(false) }}
                                className="btn-main w-50 btn-cancel"
                                type="reset"
                                disabled={isLoading}>
                                {currentLanguage === 'ar' ? 'إلغاء' : 'Cancel'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
