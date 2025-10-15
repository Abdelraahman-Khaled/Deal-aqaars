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
import { Link, useParams } from 'react-router-dom';
import TextArea from '../../Components/Forms/TextArea';
import ImageUploadGrid from '../../Components/ImageUploadGrid/ImageUploadGrid';
import BreadcrumbsPage from '../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage';
import SectionHeader from '../../Components/SectionHeader/SectionHeader';
import Checkbox from '../../Components/Forms/Checkbox';
import FinishingAPI from '../../api/finishingApi';
import GoogleSearchBoxWithMap from '../../Components/GoogleMap/GoogleSearchBoxWithMap';
import * as Yup from 'yup';
import "./JoinUs.css"

const UpdateFinish = () => {
    const { id } = useParams();
    const { currentLanguage } = useLanguage(); // Get the current language
    const [isItemLoading, setIsItemLoading] = useState(false)

    const [showModal, setShowModal] = useState(false);
    const [selectCompany, setSelectCompany] = useState(translations[currentLanguage].company);
    const [type, setType] = useState({ ar: "فرش", en: "furnishing" });



    const checkboxs = [
        { ar: "حديقة", en: "Garden" },
        { ar: "اكسسورارات حمام", en: "Bathroom accessories" },
        { ar: "مطبخ", en: "Kitchen" },
        { ar: "اوض معيشة", en: "Living rooms" },
        { ar: "اوض نوم", en: "Bedrooms" },
        { ar: "اوض ملابس", en: "Dressing rooms" },
        { ar: "اوض ضيوف", en: "Guest rooms" },
        { ar: "اوض ألعاب", en: "Game rooms" },
        { ar: "شرفة", en: "Balcony" },
    ]
    const initialValues = {
        companyDescription: {
            ar: "",
            en: "",
        },
        jobType: {
            ar: "",
            en: "",
        },
        servicesOffered: [],
        phoneNumber: "",
        hasWhatsapp: false,
        allowEmailContact: false,
        detailedAddress: {
            ar: "",
            en: "",
        },
        location: {
            type: "Point",
            coordinates: [],
        },
    };

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();

        // description
        formData.append("companyDescription[ar]", values.companyDescription.ar);
        formData.append("companyDescription[en]", values.companyDescription.en);

        // jobtype
        formData.append("jobType[ar]", type.ar);
        formData.append("jobType[en]", type.en);

        // servicesOffered
        values.servicesOffered.forEach((service, index) => {
            formData.append(`servicesOffered[${index}][ar]`, service.ar);
            formData.append(`servicesOffered[${index}][en]`, service.en);
        });

        // phoneNumber
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("hasWhatsapp", values.hasWhatsapp);
        formData.append("allowEmailContact", values.allowEmailContact);

        // address
        formData.append("detailedAddress[ar]", values.detailedAddress.ar);
        formData.append("detailedAddress[en]", values.detailedAddress.en);


        // lat long
        formData.append("location[type]", values.location.type);
        formData.append("location[coordinates][]", values.location.coordinates[1]);
        formData.append("location[coordinates][]", values.location.coordinates[0]);



        // images
        if (values.images && values.images.length > 0) {
            values.images.forEach((file) => {
                formData.append("images", file);
            });
            console.log("Images being sent:", values.images.length, "files");
        } else {
            console.log("No images to send");
        }

        setIsItemLoading(true)
        try {
            const response = await FinishingAPI.updateFinishingService(id, formData);
            console.log(response);
            setShowModal(true);
            resetForm();
        } catch (err) {
            console.error(err);
        } finally {
            setIsItemLoading(false);
        }
    };

    const validationSchema = Yup.object().shape({
        detailedAddress: Yup.object().shape({
            en: Yup.string().required("Detailed address in English is required"),
            ar: Yup.string().required("Detailed address in Arabic is required"),
        }),
        jobType: Yup.object().shape({
            ar: Yup.string().required("Job type (Arabic) is required"),
            en: Yup.string().required("Job type (English) is required"),
        }),
        phoneNumber: Yup.string()
            .required("Phone number is required")
            .matches(/^[0-9]+$/, "Phone number must be a string of digits"),
        servicesOffered: Yup.array()
            .min(1, "At least one service must be provided")
            .required("At least one service must be provided"),
    });

    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "اعلن عن  خدمات التشطيب" : "Announce finishing services"} />

            <FormField
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (

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



                                {/* full details */}
                                <div className="mb-4 flex-wrap d-flex align-items-center justify-content-between ">
                                    <label className="b-12 ">
                                        وصف الشركة   <span className='required-asterisk'>*</span>
                                    </label>
                                    <TextArea name="companyDescription.ar" maxLength="700" placeholder={"قول للناس بتقدم إيه "} />
                                </div>

                                <div className="mb-4 flex-wrap d-flex align-items-center justify-content-between ">
                                    <label className="b-12 ">
                                        وصف الشركة بالانجليزي   <span className='required-asterisk'>*</span>
                                    </label>
                                    <TextArea name="companyDescription.en" maxLength="700" placeholder={"قول للناس بتقدم إيه "} />
                                </div>


                                {/* Company services */}
                                <SectionHeader text={"خدمات الشركة"} />


                                {/* finish or furnihsing */}
                                <label className="b-12 mb-2">
                                    اختار نوع شغلك   <span className='required-asterisk'>*</span>
                                </label>
                                <div className="mb-4 d-flex flex-wrap gap-3 custom-responsive-buttons">

                                    <div
                                        className="py-2 px-2 border rounded-pill text-center option-finish-btn"
                                        style={{
                                            backgroundColor: type.en === "furnishing" ? "rgba(23, 55, 148, 0.1)" : "",
                                            color: type.en === "furnishing" ? "var(--primary)" : "",
                                        }}
                                        onClick={() => setType({ ar: "فرش", en: "furnishing" })}
                                    >
                                        فرش
                                    </div>
                                    <div
                                        className="py-2 px-2 border rounded-pill text-center option-finish-btn"
                                        style={{
                                            backgroundColor: type.en === "finishing" ? "rgba(23, 55, 148, 0.1)" : "",
                                            color: type.en === "finishing" ? "var(--primary)" : "",
                                        }}
                                        onClick={() => setType({ ar: "تشطيب", en: "finishing" })}
                                    >
                                        تشطيب
                                    </div>
                                </div>


                                {/* offers */}
                                <div className="mb-4 ">
                                    <label className="b-12 mb-2">
                                        الخدمات اللي بتقدمها <span className='required-asterisk'>*</span>
                                    </label>

                                    <div className='d-flex flex-wrap space-6 align-items-center mb-4'>
                                        {
                                            checkboxs.map((checkbox, index) => (
                                                <Checkbox
                                                    key={index}
                                                    text={checkbox[currentLanguage]}
                                                    onChange={(isChecked) => {
                                                        if (isChecked) {
                                                            setFieldValue("servicesOffered", [...values.servicesOffered, checkbox]);
                                                        } else {
                                                            setFieldValue(
                                                                "servicesOffered",
                                                                values.servicesOffered.filter((item) => item.ar !== checkbox.ar)
                                                            );
                                                        }
                                                    }}
                                                    isChecked={values.servicesOffered.some(item => item.ar === checkbox.ar)}
                                                />
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
                                        <span className='required-asterisk'>*</span></label>
                                    <PhoneNumber name="phoneNumber" type="text" placeholder={"اكتب رقمك"} />
                                </div>


                                <div className='b-15 mb-4 d-flex justify-content-between align-items-center lg-w-30'>
                                    <div className='d-flex flex-row space-1'>
                                        <WhatsIcon />
                                        يوجد واتساب علي هذا الرقم
                                    </div>
                                    <Switch name="hasWhatsapp" />
                                </div>


                                <Checkbox text={"تواصل معي عن طريق الايميل"} newClass={"mb-4"} />



                                {/* location description */}
                                <SectionHeader text={"العنوان بالتفصيل"} />


                                {/*  location Details */}
                                <div className="mb-4 ">
                                    <label className="b-12 mb-2">
                                        العنوان بالتفصيل <span className='required-asterisk'>*</span>
                                    </label>
                                    <InputFiled name="detailedAddress.ar" placeholder={"اكتب عنوانك بالتفصيل "} />
                                </div>

                                <div className="mb-4 ">
                                    <label className="b-12 mb-2">
                                        العنوان بالتفصيل بالانجليزي <span className='required-asterisk'>*</span>
                                    </label>
                                    <InputFiled name="detailedAddress.en" placeholder={"اكتب عنوانك بالتفصيل بالانجليزي"} />
                                </div>



                                {/* map */}
                                <div className="mb-5">
                                    <label className="b-12 mb-2">
                                        العنوان علي الخريطة<span className='required-asterisk'>*</span>
                                    </label>
                                    <GoogleSearchBoxWithMap
                                        setLatitude={(lat) => setFieldValue("location.coordinates[1]", lat)}
                                        setLongitude={(lng) => setFieldValue("location.coordinates[0]", lng)}
                                        isItemLoading={isItemLoading}
                                        longitude={values.location.coordinates[0]}
                                        latitude={values.location.coordinates[1]}
                                    />
                                </div>


                                {/* pictures */}

                                <div className='py-3 px-2 rounded-3 mb-4' style={{ backgroundColor: "rgba(23, 55, 148, 0.1)" }}>
                                    <p className="b-10">
                                        صور من شغلك قبل كده
                                    </p>
                                </div>


                                <div className='mb-4'>
                                    <ImageUploadGrid name={"images"} />
                                </div>


                                <div className="d-flex justify-content-center mt-5 pt-3">
                                    <button type="submit" className="btn-main btn-submit b-11" disabled={isItemLoading}>
                                        {isItemLoading ? "جاري الارسال..." : "ابعت الطلب"}
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

                            </div >
                        </div >
                    </ContainerMedia >
                )}
            </FormField >
        </>
    )
}

export default UpdateFinish