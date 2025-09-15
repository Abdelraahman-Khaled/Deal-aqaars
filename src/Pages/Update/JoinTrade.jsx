import React, { useState } from 'react'
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
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
import SwapAPI from '../../api/swapApi';
import "./JoinUs.css"

const JoinTrade = () => {
    const { currentLanguage } = useLanguage();
    const [showModal, setShowModal] = useState(false);

    // initial values for the form
    const initialValues = {
        havePropertyType: "",
        haveDescription: "",
        wantPropertyType: "",
        wantDescription: "",
        phoneNumber: "",
        hasWhatsapp: false,
        longitude: "",
        latitude: "",
        locationLabel: "",
        images: [],
    };

    const handleCreateTrade = async (values, { resetForm }) => {
        const formData = new FormData();

        // whatIHave
        formData.append("whatIHave[propertyType]", values.havePropertyType);
        formData.append("whatIHave[description]", values.haveDescription);

        // whatIWant
        formData.append("whatIWant[propertyType]", values.wantPropertyType);
        formData.append("whatIWant[description]", values.wantDescription);

        // contact
        formData.append("contact[phoneNumber]", values.phoneNumber);
        formData.append("contact[hasWhatsapp]", values.hasWhatsapp);

        // location
        formData.append("location[type]", "Point");

        // Use dynamic coordinates if available, otherwise use Cairo as default
        const longitude = values.longitude
        const latitude = values.latitude

        formData.append("location[coordinates][]", longitude);
        formData.append("location[coordinates][]", latitude);

        // locationLabel
        formData.append("locationLabel", values.locationLabel);

        // images
        if (values.images && values.images.length > 0) {
            values.images.forEach((file) => {
                formData.append("images", file);
            });
            console.log("Images being sent:", values.images.length, "files");
        } else {
            console.log("No images to send");
        }

        try {
            const response = await SwapAPI.createSwap(formData)
            console.log("✅ Success:", response);
            setShowModal(true);
            resetForm()
        } catch (error) {
            console.error("❌ Error creating swap:", error);
        }
    };

    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "التبديل" : "Trading"} />

            <FormField
                initialValues={initialValues}
                validationSchema={""}
                onSubmit={handleCreateTrade}
            >
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

                            {/* whatIHave */}
                            <SectionHeader text={"عايز تبدل ايه"} />

                            <div className="mb-4 ">
                                <label className="b-12 mb-2">نوع الحاجة اللي معاك <span>*</span></label>
                                <InputFiled name="havePropertyType" placeholder="مثلاً: شقة، عربية، موبايل..." />
                            </div>

                            <div className="mb-4">
                                <label className="b-12">الوصف الكامل <span>*</span></label>
                                <TextArea name="haveDescription" maxLength="700" placeholder="مواصفات الحاجة اللي معاك" />
                            </div>

                            {/* whatIWant */}
                            <SectionHeader text={"محتاج ايه"} />

                            <div className="mb-4 ">
                                <label className="b-12 mb-2">إيه الحاجة اللي بتدور عليها <span>*</span></label>
                                <InputFiled name="wantPropertyType" placeholder="مثلاً: فيلا، عربية..." />
                            </div>

                            <div className="mb-4">
                                <label className="b-12">الوصف الكامل <span>*</span></label>
                                <TextArea name="wantDescription" maxLength="700" placeholder="مواصفات الحاجة اللي بتدور عليها" />
                            </div>

                            {/* contact */}
                            <SectionHeader text={"بيانات التواصل"} />

                            <div className="mb-4 lg-w-30">
                                <label className="b-12 mb-2">رقم الموبايل<span>*</span></label>
                                <PhoneNumber name="phoneNumber" placeholder="اكتب رقمك" />
                            </div>

                            <div className='b-15 mb-4 d-flex justify-content-between align-items-center lg-w-30'>
                                <div className='d-flex flex-row space-1'>
                                    <WhatsIcon /> يوجد واتساب علي هذا الرقم
                                </div>
                                <Switch name="hasWhatsapp" />
                            </div>

                            {/* location */}
                            <SectionHeader text={"العنوان بالتفصيل"} />

                            <div className="mb-4 ">
                                <label className="b-12 mb-2">العنوان بالتفصيل <span>*</span></label>
                                <InputFiled name="locationLabel" placeholder="اكتب عنوانك بالتفصيل" />
                            </div>


                            <div className="mb-5">
                                {/* <MapPick /> */}
                            </div>

                            {/* images */}
                            <SectionHeader text={"صور الحاجة اللي عايز تبدلها"} />
                            <div className='mb-4'>
                                <ImageUploadGrid name="images" />
                            </div>

                            {/* submit */}
                            <div className="d-flex justify-content-center mt-5 pt-3">
                                <button type="submit" className="btn-main btn-submit b-11">
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
                                        <DotLottieReact src="/animation/success.lottie" loop autoplay />
                                    </div>
                                    <div className="position-absolute top-1000">
                                        <DotLottieReact src="./animation/successpapers.lottie" loop autoplay />
                                    </div>
                                    <h6>💡 طلبك وصل!</h6>
                                    <p className="b-15" style={{ color: "var(--netural-700)" }}>
                                        تمام، تسجيلك كتاجر في التشطيبات وصل بنجاح! ✨ هنراجع بياناتك وهنكلمك قريب عشان نكمل باقي الخطوات.
                                    </p>
                                    <Link to={"/"} className="btn-main btn-submit mt-3 b-11 py-3 px-2">
                                        ارجع للرئيسية
                                    </Link>
                                </div>
                            </CustomModal>
                        </div>
                    </div>
                </ContainerMedia>
            </FormField>
        </>
    )
}

export default JoinTrade
