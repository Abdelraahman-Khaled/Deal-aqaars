import React, { useState } from 'react'
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
import { translations } from './translations';
import { useLanguage } from '../../Components/Languages/LanguageContext';
import InputFiled from '../../Components/Forms/InputField';
import FormField from '../../Components/Forms/FormField';
import PhoneNumber from '../../Components/Forms/PhoneNumber';
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo';
import WhatsIcon from '../../assets/Icons/WhatsIcon';
import Switch from '../../Components/Forms/Switch';
import Map from '../../Components/Ui/Map/Map';
import CustomModal from '../../Components/CustomModal/CustomModal';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import TabsContent from '../../Components/Ui/TabsContent/TabsContent';
import MenuArrow from '../../assets/Icons/MenuArrow';
import BreadcrumbsPage from '../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage';
import SectionHeader from '../../Components/SectionHeader/SectionHeader';
import Select from "react-select";
import TextArea from '../../Components/Forms/TextArea';
import NestedDropdownAccordion from '../../Components/NestedDropdownAccordion/NestedDropdownAccordion';
import { nestedLocationData } from '../../Components/NestedDropdownAccordion/nestedLocationData';
import Checkbox from '../../Components/Forms/Checkbox';
import BudgetDropdown from '../../Components/Ui/SearchComponents/BudgetDropdown';
import ImageUploadGrid from '../../Components/ImageUploadGrid/ImageUploadGrid';

const Compound1 = ({ formData, setFormData }) => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const [rotateBudget, setRotateBudget] = useState(false);
    const [budget, setBudget] = useState([1000000, 50000000]);


    const [showModal, setShowModal] = useState(false);
    const [selectCompany, setSelectCompany] = useState(translations[currentLanguage].company);


    const checkboxs = [
        "أمن 24 ساعة",
        "كاميرات مراقبة",
        "جراج خاص",
        "ملاعب رياضية",
        "حدائق",
        "مناطق تجارية",
        "مناطق ترفيهية",
        "مناطق خدمية",
        "مناطق خضراء",
        "مناطق للأطفال",
        "مناطق رياضية",
        "مناطق للياقة البدنية",
        "مناطق للشواء",
        "مناطق للمشي",
        "حمامات سباحة",
    ]
    const details = [
        'شقة غرفة واحدة',
        'شقة غرفتين',
        'شقة ثلاث غرف',
        'شقة أربع غرف',
        "استوديو",
        'فيلا',
        'تاون هاوس',
        'بنتهاوس',
        'دوبلكس',
        'شقة دوبلكس',
        'شقة ثلاثية',
        'مكتب تجاري',
        'محل تجاري',
        'مخزن',
    ]
    const options = [
        { value: "compunds", label: "سكني" },
        { value: "buldings", label: "تجاري" },
    ];

    const paymentOptions = [
        { value: "cash", label: "كاش" },
        { value: "installments", label: "قسط" },
        { value: "mortgage", label: "كاش و قسط" },
    ]

    const typeOfPropertyOptions = [
        { value: "residential", label: "من المطزر (اول سكن)" },
        { value: "commercial", label: "من مالك العقار" },
    ]
    const projectStatusOptions = [
        { value: "under_construction", label: "تحت الانشاء" },
        { value: "completed", label: "متاح" },
        { value: "upcoming", label: "اتسلم خلاص" },
    ]
    const yearOfDeliveryOptions = [
        { value: "2023", label: "2023" },
        { value: "2024", label: "2024" },
        { value: "2025", label: "2025" },
        { value: "2026", label: "2026" },
        { value: "2027", label: "2027" },
    ]
    const finishingTypeOptions = [
        { value: "extra", label: "  اكسترا سوبر لوكس" },
        { value: "fully_furnished", label: "سوبر لوكس" },
        { value: "semi_furnished", label: "لوكس" },
        { value: "shell_and_core", label: " نص تشطيب" },
        { value: "no_finishing", label: "من غير تشطيب" },
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
        <>

            <FormField initialValues={formData}>

                <div className='w-100 finishing p-0'>

                    {/* options */}
                    <SectionHeader text={"الخدمات والمرافق"} />
                    {/* checkbox */}
                    <div className='d-flex flex-wrap space-6 align-items-center mb-4'>
                        {
                            checkboxs.map((checkbox, index) => (
                                <Checkbox key={index} text={checkbox} />
                            ))
                        }
                    </div>

                    {/* details */}
                    <SectionHeader text={"بيانات الوحدات المتاحة"} />

                    {/* Name */}
                    <div className="mb-4 ">
                        <label className="b-12 mb-3">
                            أنواع الوحدات داخل المشروع <span>*</span>
                        </label>
                        <div className='d-flex flex-wrap space-6 align-items-center mb-4'>
                            {
                                details.map((checkbox, index) => (
                                    <Checkbox key={index} text={checkbox} />
                                ))
                            }
                        </div>
                    </div>

                    {/* price and space */}
                    <div className="row mb-4">
                        {/* space */}
                        <div className="w-50 pe-2">
                            <label className="b-12 mb-2">
                                المساحات<span>*</span>
                            </label>
                            <div onClick={() => setRotateBudget(!rotateBudget)}>
                                <BudgetDropdown
                                    rotate={rotateBudget}
                                    budget={budget}
                                    setBudget={setBudget}
                                    buttons={false}
                                    title={"م2"}
                                />
                            </div>
                        </div>
                        {/* price */}
                        <div className="w-50 ps-2">
                            <label className="b-12 mb-2">
                                الاسعار <span>*</span>
                            </label>
                            <div onClick={() => setRotateBudget(!rotateBudget)}>
                                <BudgetDropdown
                                    rotate={rotateBudget}
                                    budget={budget}
                                    setBudget={setBudget}
                                    buttons={false}
                                    title={"السعر"}
                                />
                            </div>
                        </div>
                    </div>


                    <div className='d-flex flex-wrap space-6 align-items-center mb-4'>
                        {/* type of project */}
                        <div>
                            <label className="b-12 mb-2">
                                طريقة الدفع <span>*</span>
                            </label>
                            <Select
                                options={paymentOptions}
                                styles={customStyles}
                                placeholder="اختار طريقة الدفع"
                            />
                        </div>
                        {/* type of project */}
                        <div>
                            <label className="b-12 mb-2">
                                نوع العقار ف السوق  <span>*</span>
                            </label>
                            <Select
                                options={typeOfPropertyOptions}
                                styles={customStyles}
                                placeholder="اختار نوع العقار ف السوق "
                            />
                        </div>
                        {/* type of project */}
                        <div>
                            <label className="b-12 mb-2">
                                حالة المشروع <span>*</span>
                            </label>
                            <Select
                                options={projectStatusOptions}
                                styles={customStyles}
                                placeholder="اختار حالة المشروع"
                            />
                        </div>
                        {/* type of project */}
                        <div>
                            <label className="b-12 mb-2">
                                سنة التسليم <span>*</span>
                            </label>
                            <Select
                                options={yearOfDeliveryOptions}
                                styles={customStyles}
                                placeholder="حدد سنة التسليم"
                            />
                        </div>
                        {/* type of project */}
                        <div>
                            <label className="b-12 mb-2">
                                نوع التطشيب <span>*</span>
                            </label>
                            <Select
                                options={finishingTypeOptions}
                                styles={customStyles}
                                placeholder="التشطيب عامل إزاي"
                            />
                        </div>
                    </div>

                    <SectionHeader text={"بيانات التواصل"} />

                    <div className="mb-4 lg-w-30">
                        <label className="b-12 mb-2" style={{ minWidth: "150px" }}>
                            رقم الموبايل
                            <span>*</span></label>
                        <PhoneNumber name="mobile" type="text" placeholder={"اكتب رقمك"} />
                    </div>

                    <div className='b-15 mb-4 d-flex justify-content-between align-items-center lg-w-30'>
                        <div className='d-flex flex-row space-1'>
                            <WhatsIcon />
                            يوجد واتساب علي هذا الرقم
                        </div>
                        <Switch />
                    </div>
                    <Checkbox text={"تواصل معي عن طريق الايميل"} newClass={"mb-4"} />


                    <SectionHeader text={"صور المشروع"} />

                    <div className='mb-4'>
                        <ImageUploadGrid />
                    </div>

                </div>
            </FormField>

        </>
    )
}

export default Compound1