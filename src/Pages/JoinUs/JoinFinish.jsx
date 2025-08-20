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
import TextArea from '../../Components/Forms/TextArea';
import ImageUploadGrid from '../../Components/ImageUploadGrid/ImageUploadGrid';
import BreadcrumbsPage from '../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage';
import SectionHeader from '../../Components/SectionHeader/SectionHeader';
import Checkbox from '../../Components/Forms/Checkbox';

const JoinFinish = () => {
    const { currentLanguage } = useLanguage(); // Get the current language


    const [showModal, setShowModal] = useState(false);
    const [selectCompany, setSelectCompany] = useState(translations[currentLanguage].company);
    const [rotate, setRotate] = useState(false);
    const [type, setType] = useState("furnishing");


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

    const checkboxs = [
        "حديقة",
        "اكسسورارات حمام",
        "مطبخ",
        "اوض معيشة",
        "اوض نوم",
        "اوض ملابس",
        "اوض ضيوف",
        "اوض ألعاب",
        "شرفة",
    ]

    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "اعلن عن  خدمات التشطيب" : "Announce finishing services"} />

            <FormField>

                <ContainerMedia>
                    <div className='form-container py-4 align-items-center'>
                        <div className='w-100'>
                            <div className='pb-4'>
                                <BreadcrumbsPage
                                    newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                                    mainTitle={"اعلن عن التشطيب"}
                                    routeTitleTwoBread={false}
                                    titleTwoBread={false}
                                    secondArrow={false}
                                />
                            </div>
                            <p className='b-1 pb-3 mb-2'>انضم لينا واعلن عن خدمات التشطيب بتاعتك!</p>

                            {/* company Details */}

                            <SectionHeader text={"بيانات الشركة"} />

                            {/* name company */}
                            <div className="mb-4 ">
                                <label className="b-12 mb-2">
                                    اسم الشركة  <span>*</span>
                                </label>
                                <InputFiled name="name" placeholder={" اكتب اسم شركتك هنا"} />
                            </div>

                            {/* full details */}
                            <div className="mb-4 flex-wrap d-flex align-items-center justify-content-between ">
                                <label className="b-12 ">
                                    وصف الشركة   <span>*</span>
                                </label>
                                <TextArea name="description" maxLength="700" placeholder={"قول للناس بتقدم إيه "} />
                            </div>


                            {/* Company services */}
                            <SectionHeader text={"خدمات الشركة"} />


                            {/* finish or furnihsing */}
                            <label className="b-12 mb-2">
                                اختار نوع شغلك   <span>*</span>
                            </label>
                            <div className="mb-4 d-flex flex-wrap gap-3 custom-responsive-buttons">

                                <div
                                    className="py-2 px-2 border rounded-pill text-center option-finish-btn"
                                    style={{
                                        backgroundColor: type === "furnishing" ? "rgba(23, 55, 148, 0.1)" : "",
                                        color: type === "furnishing" ? "var(--primary)" : "",
                                    }}
                                    onClick={() => setType("furnishing")}
                                >
                                    فرش
                                </div>
                                <div
                                    className="py-2 px-2 border rounded-pill text-center option-finish-btn"
                                    style={{
                                        backgroundColor: type === "finishing" ? "rgba(23, 55, 148, 0.1)" : "",
                                        color: type === "finishing" ? "var(--primary)" : "",
                                    }}
                                    onClick={() => setType("finishing")}
                                >
                                    تشطيب
                                </div>
                            </div>


                            {/* offers */}
                            <div className="mb-4 ">
                                <label className="b-12 mb-2">
                                    الخدمات اللي بتقدمها <span>*</span>
                                </label>

                                <div className='d-flex flex-wrap space-6 align-items-center mb-4'>
                                    {
                                        checkboxs.map((checkbox, index) => (
                                            <Checkbox key={index} text={checkbox} />
                                        ))
                                    }
                                </div>
                            </div>

                            {/* call */}
                            <SectionHeader text={"بيانات التواصل"} />




                            {/* mobile */}

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



                            {/* location description */}
                            <SectionHeader text={"العنوان بالتفصيل"} />


                            {/*  location Details */}
                            <div className="mb-4 ">
                                <label className="b-12 mb-2">
                                    العنوان بالتفصيل <span>*</span>
                                </label>
                                <InputFiled name="company" placeholder={"اكتب عنوانك بالتفصيل "} />
                            </div>



                            {/* map */}
                            <div className="mb-5">
                                <Map showOverlay={false} />
                            </div>


                            {/* pictures */}

                            <div className='py-3 px-2 rounded-3 mb-4' style={{ backgroundColor: "rgba(23, 55, 148, 0.1)" }}>
                                <p className="b-10">
                                    صور من شغلك قبل كده
                                </p>
                            </div>


                            <div className='mb-4'>
                                <ImageUploadGrid />
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

                        </div >
                    </div >
                </ContainerMedia >
            </FormField >

        </>
    )
}

export default JoinFinish