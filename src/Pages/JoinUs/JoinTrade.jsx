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

const JoinTrade = () => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const [showModal, setShowModal] = useState(false);



    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "التبديل" : "Trading"} />

            <FormField>

                <ContainerMedia>
                    <div className='form-container finishing align-items-center px-0'>
                        <div className='w-100'>
                            <div className='pb-4'>
                                <BreadcrumbsPage
                                    newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                                    mainTitle={"إعلاناتي"}
                                    routeTitleTwoBread={false}
                                    titleTwoBread={false}
                                    secondArrow={false}
                                />
                            </div>
                            <p className='b-1 mb-2 pb-3'>اعلن عن اي حاجه عايز تبدلها</p>

                            {/* trade Details */}
                            <SectionHeader text={" عايز تبدل ايه"} />

                            {/* kind */}
                            <div className="mb-4 ">
                                <label className="b-12 mb-2">
                                    نوع الحاجه اللى معاك  <span>*</span>
                                </label>
                                <InputFiled name="name" placeholder={"مثلاً: شقة، عربية، موبايل، جهاز كهربائي..."} />
                            </div>

                            {/* full details */}
                            <div className="mb-4 flex-wrap d-flex align-items-center justify-content-between ">
                                <label className="b-12 ">
                                    الوصف الكامل   <span>*</span>
                                </label>
                                <TextArea name="description" maxLength="700" placeholder={"مواصفات الحاجه "} />
                            </div>


                            {/* what u need */}
                            <SectionHeader text={" محتاج ايه"} />

                            {/* kind */}
                            <div className="mb-4 ">
                                <label className="b-12 mb-2">
                                    إيه الحاجة اللي بتدور عليها <span>*</span>
                                </label>
                                <InputFiled name="name" placeholder={"مثلاً: شقة، عربية، موبايل، جهاز كهربائي..."} />
                            </div>

                            {/* full details */}
                            <div className="mb-4 flex-wrap d-flex align-items-center justify-content-between ">
                                <label className="b-12 ">
                                    الوصف الكامل   <span>*</span>
                                </label>
                                <TextArea name="description" maxLength="700" placeholder={"مواصفات الحاجه "} />
                            </div>


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


                            <div className='mb-4 b-15 d-flex align-items-center space-2'>
                                <input className={`form-check-input  ${currentLanguage === "en" && "mx-0"}`} type="checkbox" value="" id="flexCheckChecked" style={{ width: "20px", height: "20px" }} checked="true" />
                                تواصل معي عن طريق الايميل
                            </div>



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
                            <SectionHeader text={"صور الحاجه اللي عايز تبدلها"} />

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
            </FormField>

        </>
    )
}

export default JoinTrade