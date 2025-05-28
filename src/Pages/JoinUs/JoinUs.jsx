import React, { useState } from "react";
import * as Yup from "yup";
import { useLanguage } from "../../Components/Languages/LanguageContext";
import FormField from "../../Components/Forms/FormField";
import InputFiled from "../../Components/Forms/InputField";
import TextArea from "../../Components/Forms/TextArea";
import UploadImages from "../../Components/Forms/UploadImages";
import NormalMultiSelect from "../../Components/Forms/NormalMultiSelect";
import PhoneNumber from "../../Components/Forms/PhoneNumber";
import "./JoinUs.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import CustomModal from "../../Components/CustomModal/CustomModal";
import { Link } from "react-router-dom";
import HelmetInfo from "../../Components/Helmetinfo/HelmetInfo";

const content = {
    title: {
        ar: "انضم لينا واعلن عن خدمات التشطيب بتاعتك!",
        en: "Join us and advertise your finishing services!",
    },
    companyName: {
        ar: "اسم الشركة",
        en: "Company Name",
    },
    companyNameHolder: {
        ar: " اكتب اسم شركتك هنا",
        en: "Write your company name here",
    },
    description: {
        ar: "وصف الشركة",
        en: "Company Description",
    },
    descriptionHolder: {
        ar: "قول للناس بتقدم إيه",
        en: "Tell people what you offer",
    },
    workType: {
        ar: "اختر نوع شغلك",
        en: "Choose Your Work Type",
    },
    services: {
        ar: "الخدمات المقدمة",
        en: "Offered Services",
    },
    mobile: {
        ar: "رقم الموبايل ",
        en: "Phone Number",
    },
    mobileHolder: {
        ar: "اكتب رقمك",
        en: "Write Number ",
    },
    whatsapp: {
        ar: "رقم الواتساب (اختياري)",
        en: "WhatsApp Number (optional)",
    },
    whatsappHolder: {
        ar: "ضيف واتسابك لو حابب تتواصل عليه",
        en: "Add your WhatsApp (if you want)",
    },
    location: {
        ar: "اللوكيشن",
        en: "Location",
    },
    locationHolder: {
        ar: " اكتب عنوانك أو حدد موقعك عالخريطة",
        en: "Type your address or locate it on the map.",
    },
    upload: {
        ar: "ارفع صور الشغل",
        en: "Upload Work Images",
    },
    submit: {
        ar: "ابعت للموافقة",
        en: "Submit for Approval",
    },
    backHome: {
        ar: "ارجع للرئيسية",
        en: "Back to Home",
    },
    validation: {
        required: {
            ar: "هذا الحقل مطلوب",
            en: "This field is required",
        },
    },
};

const JoinUs = () => {
    const { currentLanguage } = useLanguage();
    const [work, setWork] = useState("");
    const [selectedValues, setSelectedValues] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const initialValues = {
        companyName: "",
        description: "",
        workType: "",
        services: "",
        mobile: "",
        whatsapp: "",
        location: "",
        images: [],
    };

    const validationSchema = Yup.object({
        companyName: Yup.string().required(content.validation.required[currentLanguage]),
        description: Yup.string().required(content.validation.required[currentLanguage]),
        workType: Yup.string().required(content.validation.required[currentLanguage]),
        services: Yup.string().required(content.validation.required[currentLanguage]),
        mobile: Yup.string().required(content.validation.required[currentLanguage]),
        location: Yup.string().required(content.validation.required[currentLanguage]),
    });

    const handleSubmit = (values) => {
        console.log("Join Us form values:", values);
    };

    const multiOptions = [
        { value: "1", text: "Option 1", selected: false },
        { value: "2", text: "Option 2", selected: false },
        { value: "3", text: "Option 3", selected: false },
        { value: "4", text: "Option 4", selected: false },
        { value: "5", text: "Option 5", selected: false },
    ];

    return (
        <div className="join-us form-container gap-0">
            <HelmetInfo titlePage={currentLanguage === "ar" ? "الانضمام" : "Join Us"} />

            <h6 className="text-right mb-4 ">{content.title[currentLanguage]}</h6>

            <FormField initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <div className="form-border">

                    <div className="mb-4 flex-wrap d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <label className="b-9 me-3" style={{ minWidth: "150px" }}>
                            {content.companyName[currentLanguage]} <span>*</span>
                        </label>
                        <InputFiled name="companyName" placeholder={content.companyNameHolder[currentLanguage]} />
                    </div>


                    <div className="mb-4 flex-wrap d-flex align-items-center justify-content-between ">
                        <label className="b-9 me-3" style={{ minWidth: "150px" }}>
                            {content.description[currentLanguage]} <span>*</span></label>
                        <TextArea name="description" maxLength="500" placeholder={content.descriptionHolder[currentLanguage]} />
                    </div>

                    <div className="mb-4 flex-wrap d-flex align-items-center space-7 advanced-search p-0">
                        <label className="b-9 me-3" style={{ minWidth: "150px" }}>
                            {content.workType[currentLanguage]} <span>*</span></label>
                        <div className="d-flex gap-3">
                            <p className={`pick bg-light-gray ${work === "furnishing" && "picked"}`} onClick={() => setWork("furnishing")}>فرش</p>
                            <p className={`pick bg-light-gray ${work === "finishing" && "picked"}`} onClick={() => setWork("finishing")}>تشطيب</p>
                        </div>
                    </div>

                    <div className="mb-4  d-flex flex-wrap align-items-center justify-content-between space-7">
                        <label className="b-9 me-3" style={{ minWidth: "150px" }}>
                            {content.services[currentLanguage]} <span>*</span></label>
                        <NormalMultiSelect
                            options={multiOptions}
                            defaultSelected={[]}
                            onChange={(values) => setSelectedValues(values)}
                            placeholder={content.services[currentLanguage]}
                            size="sm"
                        />
                    </div>


                    <hr />

                    <div className="mb-4  d-flex flex-wrap align-items-center justify-content-between">
                        <label className="b-9 me-3 mb-3" style={{ minWidth: "150px" }}>
                            {content.mobile[currentLanguage]} <span>*</span></label>
                        <PhoneNumber name="mobile" type="text" placeholder={content.mobileHolder[currentLanguage]} />
                    </div>

                    <div className="mb-4  d-flex flex-wrap align-items-center justify-content-between">
                        <label className="b-9 me-3 mb-3" style={{ minWidth: "150px" }}>
                            {content.whatsapp[currentLanguage]}</label>
                        <PhoneNumber name="whatsapp" type="text" placeholder={content.whatsappHolder[currentLanguage]} />
                    </div>

                    <div className="mb-4 flex-wrap d-flex align-items-center justify-content-between">
                        <label className="b-9 me-3 mb-3" style={{ minWidth: "150px" }}>
                            {content.location[currentLanguage]} <span>*</span></label>
                        <InputFiled name="location" placeholder={content.locationHolder[currentLanguage]} />
                    </div>

                    <hr />

                    <div className="mb-4 flex-row flex-wrap d-flex align-items-center justify-content-between space-7 ">
                        <label className="b-9 me-3" style={{ minWidth: "150px" }}>
                            {content.upload[currentLanguage]} <span>*</span></label>
                        <UploadImages name="images" label={content.upload[currentLanguage]} />
                    </div>

                </div>
                <div className="d-flex justify-content-end ">
                    <button type="submit" className="btn-main btn-submit mt-4 b-11" onClick={() => setShowModal(true)}>
                        {content.submit[currentLanguage]}
                    </button>
                </div>
            </FormField>

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
                        {content.backHome[currentLanguage]}
                    </Link>
                </div>

            </CustomModal>
        </div>
    );
};

export default JoinUs;
