import React, { useState } from 'react'
import { translations } from './translations';
import { useLanguage } from '../../Components/Languages/LanguageContext';
import InputFiled from '../../Components/Forms/InputField';
import FormField from '../../Components/Forms/FormField';
import Map from '../../Components/Ui/Map/Map';
import SectionHeader from '../../Components/SectionHeader/SectionHeader';
import Select from "react-select";
import TextArea from '../../Components/Forms/TextArea';
import NestedDropdownAccordion from '../../Components/NestedDropdownAccordion/NestedDropdownAccordion';
import { nestedLocationData } from '../../Components/NestedDropdownAccordion/nestedLocationData';

const Compound1 = ({ formData, setFormData }) => {
    const { currentLanguage } = useLanguage(); // Get the current language


    const [showModal, setShowModal] = useState(false);
    const [selectCompany, setSelectCompany] = useState(translations[currentLanguage].company);



    const options = [
        { value: "compunds", label: "سكني" },
        { value: "buldings", label: "تجاري" },
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
        <>

            <FormField initialValues={formData}>

                <div className='w-100'>

                    {/* company Details */}
                    <SectionHeader text={"بيانات المشروع"} />


                    {/* Name */}
                    <div className="mb-4 ">
                        <label className="b-12 mb-2">
                            اسم الكمباوند  <span>*</span>
                        </label>
                        <InputFiled name="name" placeholder={"مثال: كمباوند الماسة – العاصمة الإدارية"}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    {/* type of project */}
                    <div className='mb-4 '>
                        <label className="b-12 mb-2">
                            نوع المشروع <span>*</span>
                        </label>
                        <Select
                            options={options}
                            styles={customStyles}
                            placeholder="اختار نوع المشروع"
                        />
                    </div>

                    <SectionHeader text={"تفاصيل المشروع"} />



                    {/* location */}
                    <div className="mb-4 ">
                        <label className="b-12 mb-2">
                            عنوان الاعلان  <span>*</span>
                        </label>
                        <InputFiled name="location" placeholder={"عنوان الاعلان"} />
                    </div>

                    {/* Company */}
                    <div className="mb-4 ">
                        <label className="b-12 ">
                            تفاصيل الاعلان <span>*</span>
                        </label>
                        <TextArea name="location-details" placeholder={"عنوان الاعلان"} />
                    </div>

                    {/* location english  */}
                    <div className="mb-4 ">
                        <label className="b-12 mb-2">
                            عنوان الاعلان بالانجليزي <span>*</span>
                        </label>
                        <InputFiled name="location-en" placeholder={"عنوان الاعلان بالانجليزي"} />
                    </div>

                    {/* Company */}
                    <div className="mb-4 ">
                        <label className="b-12 ">
                            تفاصيل الاعلان بالانجليزي<span>*</span>
                        </label>
                        <TextArea name="location-details-en" placeholder={"عنوان الاعلان بالانجليزي"} />
                    </div>


                    <SectionHeader text={"الموقع"} />

                    <NestedDropdownAccordion data={nestedLocationData} title="عنوان المشروع"
                        placeholder="اختر المكان" />


                    {/* Aqar description */}
                    <SectionHeader text={" عنوان الشركة"} />

                    {/* Company location */}
                    <div className="mb-4 ">
                        <label className="b-12 mb-2">
                            عنوان تفصيلي <span>*</span>
                        </label>
                        <InputFiled name="company" placeholder={"اكتب العنوان او حدده من الخريطة"} />
                    </div>






                    {/* map */}
                    <div className="mb-5">
                        <Map showOverlay={false} />
                    </div>


                </div>
            </FormField>

        </>
    )
}

export default Compound1