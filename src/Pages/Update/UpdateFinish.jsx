import React, { useState, useEffect } from 'react'
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
import { translations } from '../JoinUs/translations';
import { useLanguage } from '../../Components/Languages/LanguageContext';
import FormField from '../../Components/Forms/FormField';
import PhoneNumber from '../../Components/Forms/PhoneNumber';
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo';
import WhatsIcon from '../../assets/Icons/WhatsIcon';
import Switch from '../../Components/Forms/Switch';
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
import Loader from '../../Components/Loader/Loader';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import "../JoinUs/JoinUs.css"
import { Dropdown } from 'primereact/dropdown';
import data from "../../data/cities.json"
import { Field } from "formik";
import PhoneNumberValidation from '../../Components/Forms/PhoneNumberInput';

const UpdateFinish = () => {
    const { id } = useParams();
    const { currentLanguage } = useLanguage();
    const [isItemLoading, setIsItemLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState({ ar: "فرش", en: "furnishing" });
    const [removedImages, setRemovedImages] = useState([]);
    const [locationDetails, setLocationDetails] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [city, setCity] = useState("");

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
    ];

    const [initialValues, setInitialValues] = useState({
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
        images: [],
    });

    useEffect(() => {
        const fetchFinishing = async () => {
            try {
                setIsLoading(true);
                const response = await FinishingAPI.getFinishingById(id);
                let finishingData = response.data || response;

                console.log("Fetched Finishing Data:", finishingData);

                // Set job type
                if (finishingData.jobType) {
                    setType(finishingData.jobType);
                }

                // Set location state
                if (finishingData.location) {
                    setCity(finishingData.location.city || "");
                    setLocationDetails(finishingData.detailedAddress?.ar || "");

                    // Handle coordinates
                    const coords = finishingData.location.coordinates;
                    if (coords) {
                        if (coords.coordinates && Array.isArray(coords.coordinates)) {
                            setLatitude(coords.coordinates[1]);
                            setLongitude(coords.coordinates[0]);
                        } else if (Array.isArray(coords)) {
                            setLatitude(coords[1]);
                            setLongitude(coords[0]);
                        }
                    }
                }

                // Set initial values
                setInitialValues({
                    companyDescription: finishingData.companyDescription || { ar: "", en: "" },
                    jobType: finishingData.jobType || { ar: "", en: "" },
                    servicesOffered: finishingData.servicesOffered || [],
                    phoneNumber: finishingData.phoneNumber || "",
                    hasWhatsapp: finishingData.hasWhatsapp || false,
                    allowEmailContact: finishingData.allowEmailContact || false,
                    images: finishingData.images || [],
                });
            } catch (error) {
                console.error("Error fetching finishing service:", error);
                toast.error("Failed to load finishing service details");
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchFinishing();
        }
    }, [id]);

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

        // address and location
        formData.append("location[city]", city);
        formData.append("detailedAddress[ar]", locationDetails);
        formData.append("location[coordinates][0]", longitude);
        formData.append("location[coordinates][1]", latitude);

        // Removed images
        if (removedImages.length > 0) {
            removedImages.forEach((imgId) => {
                formData.append("removedImages[]", imgId);
            });
        }

        // images
        if (values.images && values.images.length > 0) {
            values.images.forEach((file) => {
                if (file instanceof File) {
                    formData.append("images", file);
                }
            });
        }

        setIsItemLoading(true);
        try {
            const response = await FinishingAPI.updateFinishingService(id, formData);
            console.log(response);
            setShowModal(true);
        } catch (err) {
            console.error(err);
        } finally {
            setIsItemLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <Loader />
            </div>
        );
    }

    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "تعديل خدمات التشطيب" : "Update finishing services"} />

            <FormField
                initialValues={initialValues}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue }) => (

                    <ContainerMedia>
                        <div className='form-container py-4 align-items-center'>
                            <div className='w-100'>
                                <div className='pb-4'>
                                    <BreadcrumbsPage
                                        newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                                        mainTitle={"تعديل خدمات التشطيب"}
                                        routeTitleTwoBread={false}
                                        titleTwoBread={false}
                                        secondArrow={false}
                                    />
                                </div>
                                <p className='b-1 pb-3 mb-2'>عدل على بيانات خدمات التشطيب بتاعتك</p>

                                {/* company Details */}
                                <SectionHeader text={"بيانات الشركة"} />

                                {/* full details */}
                                <div className="mb-4 flex-wrap d-flex align-items-center justify-content-between ">
                                    <label className="b-12 ">
                                        وصف الشركة   <span className='required-asterisk'>*</span>
                                    </label>
                                    <TextArea name="companyDescription.ar" maxLength="700" placeholder={"قول للناس بتقدم إيه "} />
                                </div>

                                {/* Company services */}
                                <SectionHeader text={"خدمات الشركة"} />

                                {/* finish or furnishing */}
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
                                    <Field name="phoneNumber" component={PhoneNumberValidation} />
                                </div>

                                <div className='b-15 mb-4 d-flex justify-content-between align-items-center lg-w-30'>
                                    <div className='d-flex flex-row space-1'>
                                        <WhatsIcon />
                                        يوجد واتساب علي هذا الرقم
                                    </div>
                                    <Switch name="hasWhatsapp" />
                                </div>

                                <Checkbox name="allowEmailContact" text={"تواصل معي عن طريق الايميل"} newClass={"mb-4"} />

                                {/* location description */}
                                <SectionHeader text={"العنوان بالتفصيل"} />

                                <div className="mb-4">
                                    <label className="b-12 mb-2">
                                        عنوان العقار <span className="required-asterisk"> *</span>
                                    </label>
                                    <Dropdown
                                        value={city}
                                        onChange={(e) => {
                                            setCity(e.value);
                                        }}
                                        editable
                                        options={data.map((item) => ({
                                            value: item.city_name_en,
                                            label:
                                                currentLanguage === "ar"
                                                    ? item.city_name_ar
                                                    : item.city_name_en,
                                        }))}
                                        placeholder={translations[currentLanguage].city}
                                        name="city"
                                        className="hide-scrollbar"
                                        optionValue="value"
                                        optionLabel="label"
                                    ></Dropdown>
                                </div>

                                {/* map */}
                                <div className="mb-5">
                                    <GoogleSearchBoxWithMap
                                        setLatitude={setLatitude}
                                        setLongitude={setLongitude}
                                        isItemLoading={isItemLoading}
                                        longitude={longitude}
                                        latitude={latitude}
                                        setLocationDetails={setLocationDetails}
                                        locationDetails={locationDetails}
                                    />
                                </div>

                                {/* pictures */}
                                <div className='py-3 px-2 rounded-3 mb-4' style={{ backgroundColor: "rgba(23, 55, 148, 0.1)" }}>
                                    <p className="b-10">
                                        صور من شغلك قبل كده
                                    </p>
                                </div>

                                <div className='mb-4'>
                                    <ImageUploadGrid
                                        name={"images"}
                                        onRemove={(imageName) => {
                                            setRemovedImages((prev) => [...prev, imageName]);
                                        }}
                                    />
                                </div>

                                <div className="d-flex justify-content-center mt-5 pt-3">
                                    <button type="submit" className="btn-main btn-submit b-11" disabled={isItemLoading}>
                                        {isItemLoading ? "جاري التحديث..." : "تحديث"}
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
                                        <h6>💡 تم التحديث!</h6>
                                        <p className="b-15" style={{ color: "var(--netural-700)" }}>تم تحديث بيانات خدمات التشطيب بنجاح.</p>
                                        <Link to={"/my-ads"} className="btn-main btn-submit mt-3 b-11 py-3 px-2">
                                            العودة لإعلاناتي
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