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

const OldJoinCompany = () => {
    const { currentLanguage } = useLanguage(); // Get the current language


    const [showModal, setShowModal] = useState(false);
    const [selectCompany, setSelectCompany] = useState(translations[currentLanguage].company);
    const [rotate, setRotate] = useState(false);



    const tabsCompany = [
        {
            eventKey: "tab1",
            title: <></>,
            content: (
                <div className="d-flex flex-column space-6">
                    <div className="d-flex space-4 flex-column justify-content-center">
                        {
                            translations[currentLanguage].companyDetails.map((item, index) => (
                                <p key={index} className={`b-12 pick rounded-3 bg-light-gray d-flex space-2`}
                                    onClick={() => setHome(item)}>
                                    {selectCompany === item}
                                    {item}
                                </p>
                            ))
                        }
                    </div>
                </div>
            )
        },
    ];



    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "اعلن عن عقارات شركتك" : "Advertise your company's properties"} />

            <FormField>

                <ContainerMedia>
                    <div className='form-container finishing align-items-center '>
                        <div className='lg-w-75'>

                            <p className='b-1 mb-2 pb-3'>اعلن عن عقارات شركتك</p>

                            {/* company Details */}
                            <div className='py-3 px-2 rounded-3 mb-4' style={{ backgroundColor: "rgba(23, 55, 148, 0.1)" }}>
                                <p className="b-10">
                                    تفاصيل الشركة
                                </p>
                            </div>


                            {/* Name */}
                            <div className="mb-4 ">
                                <label className="b-8 mb-2">
                                    الاسم  <span>*</span>
                                </label>
                                <InputFiled name="name" placeholder={"الاسم بالكامل"} />
                            </div>

                            {/* Company */}
                            <div className="mb-4 ">
                                <label className="b-8 mb-2">
                                    الشركة  <span>*</span>
                                </label>
                                <InputFiled name="company" placeholder={"اسم الشركة"} />
                            </div>

                            {/* Company */}
                            <div className="mb-4 ">
                                <label className="b-8 mb-2">
                                    نوع الشركة  <span>*</span>
                                </label>
                                <div onClick={() => setRotate(!rotate)}>
                                    <Dropdown className="d-flex w-100">
                                        <Dropdown.Toggle variant="light" className="w-100 text-end">
                                            {selectCompany}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <TabsContent
                                                tabsData={tabsCompany}
                                                newClassTabsContent="tabs-home rooms"
                                            />
                                        </Dropdown.Menu>
                                        <MenuArrow rotate={rotate} />
                                    </Dropdown>
                                </div>
                            </div>



                            <div className='py-3 px-2 rounded-3 mb-4' style={{ backgroundColor: "rgba(23, 55, 148, 0.1)" }}>
                                <p className="b-10">
                                    بيانات التواصل
                                </p>
                            </div>




                            {/* mobile */}

                            <div className="mb-4 lg-w-30">
                                <label className="b-8 mb-2" style={{ minWidth: "150px" }}>
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


                            <div className='mb-4 b-15 d-flex align-items-center space-2'>
                                <input className={`form-check-input  ${currentLanguage === "en" && "mx-0"}`} type="checkbox" value="" id="flexCheckChecked" style={{ width: "20px", height: "20px" }} checked="true" />
                                تواصل معي عن طريق الايميل
                            </div>



                            {/* Aqar description */}

                            <div className='py-3 px-2 rounded-3 mb-4' style={{ backgroundColor: "rgba(23, 55, 148, 0.1)" }}>
                                <p className="b-10">
                                    عنوان الشركة
                                </p>
                            </div>


                            {/* Company location */}
                            <div className="mb-4 ">
                                <label className="b-8 mb-2">
                                    عنوان  الشركة  <span>*</span>
                                </label>
                                <InputFiled name="company" placeholder={"عنوان الشركة"} />
                            </div>



                            {/* map */}
                            <div className="mb-5">
                                <Map showOverlay={false} />
                            </div>


                            <div className="d-flex justify-content-center mt-5 pt-3">
                                <button type="submit" className="btn-main btn-submit b-11" onClick={() => setShowModal(true)}>
                                    ابعت الطلب
                                </button>
                            </div>

                            <CustomModal
                                showModal={showModal}
                                onHide={() => setShowModal(false)}
                                setShowModal={setShowModal}
                                newClass={"success-modal images-modal join"}
                            >
                                <div className="d-flex text-center flex-column align-items-center justify-content-center w-100 space-4 p-5">
                                    <div className="position-relative">
                                        <DotLottieReact
                                            src="./animation/success.lottie"
                                            loop
                                            autoplay
                                        />
                                    </div>
                                    <div className="position-absolute top-1000">
                                        <DotLottieReact
                                            src="./animation/successpapers.lottie"
                                            loop
                                            autoplay
                                        />
                                    </div>
                                    <h6>💡 طلبك وصل!</h6>
                                    <p className="b-15" style={{ color: "var(--netural-700)" }}>تمام، تسجيلك كتاجر في التشطيبات وصل بنجاح! ✨ هنراجع بياناتك وهنكلمك قريب عشان نكمل باقي الخطوات. خليك متابع تنبيهاتك لأي جديد! 🚀</p>
                                    <Link to={"/"} className="btn-main btn-submit mt-3 b-11 py-3 px-2">
                                        ارجع للرئيسية
                                    </Link>
                                </div>

                            </CustomModal>
                        </div>
                    </div >
                </ContainerMedia >
            </FormField>

        </>
    )
}

export default OldJoinCompany