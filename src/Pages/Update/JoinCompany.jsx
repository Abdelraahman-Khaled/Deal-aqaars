import React, { useState } from 'react'
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
import { useLanguage } from '../../Components/Languages/LanguageContext';
import FormField from '../../Components/Forms/FormField';
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo';
import BreadcrumbsPage from '../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage';
import Compound1 from './Compound1';
import Compound2 from './Compound2';
import Compound3 from './Compound3';
import CustomModal from '../../Components/CustomModal/CustomModal';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';
import "./JoinUs.css"

const JoinCompany = () => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const [step, setStep] = useState(1);
    const [showModal, setShowModal] = useState(false);


    const [formData, setFormData] = useState({
        name: '',
        projectType: '',
        location: '',
        locationDetails: '',
        locationEn: '',
        locationDetailsEn: '',
        companyAddress: '',
        nestedLocation: null, // لو هتاخد من NestedDropdownAccordion
        // وأي حاجات تانية من Compound2 وCompound3
    });


    const handleNext = () => {
        let isValid = true;
        // if (step === 1) {
        //     isValid = validateStep1(); // function you will define
        // } else if (step === 2) {
        //     isValid = validateStep2();
        // } else if (step === 3) {
        //     isValid = validateStep3();
        // }

        if (isValid) setStep(prev => prev + 1);
    };

    const handlePrev = () => setStep(prev => prev - 1);





    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "اعلن عن  مشروع عقاري" : "Advertise your company's properties"} />

            <FormField initialValues={formData}>

                <ContainerMedia>
                    <div className='form-container  py-4 align-items-center '>
                        <div className='w-100'>
                            <div className='pb-4'>
                                <BreadcrumbsPage
                                    newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                                    mainTitle={"اعلن عن مشروع عقاري"}
                                    routeTitleTwoBread={false}
                                    titleTwoBread={false}
                                    secondArrow={false}
                                />
                            </div>
                            <p className='b-1 mb-2 pb-3'>اعلن عن  مشروع عقاري</p>
                            <div className='d-flex justify-content-between align-items-center mb-4'>
                                <p className={`step-border ${step === 1 && "active"}`}></p>
                                <p className={`step-border ${step === 2 && "active"}`}></p>
                                <p className={`step-border ${step === 3 && "active"}`}></p>
                            </div>

                            {step === 1 && <Compound1 formData={formData} setFormData={setFormData} />}
                            {step === 2 && <Compound2 formData={formData} setFormData={setFormData} />}
                            {step === 3 && <Compound3 formData={formData} setFormData={setFormData} />}

                            <div className={`d-flex justify-content-between mt-5 pt-3 ${step > 1 && "flex-row-reverse"}`}>
                                {step > 1 && (
                                    <button type="button" onClick={handlePrev} className="btn-main btn-submit b-11 px-4 btn-second border">
                                        السابق
                                    </button>
                                )}
                                {step < 3 ? (
                                    <button type="button" onClick={handleNext} className="btn-main btn-submit b-11">
                                        اللي بعده
                                    </button>
                                ) : (
                                    <button type="submit" className="btn-main btn-submit b-11" onClick={() => setShowModal(true)}>
                                        ابعت للموافقة
                                    </button>
                                )}
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
                                            src="/animation/success.lottie"
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

export default JoinCompany