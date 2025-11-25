import React, { useState, useEffect } from "react";
import ContainerMedia from "../../Components/ContainerMedia/ContainerMedia";
import { useLanguage } from "../../Components/Languages/LanguageContext";
import InputFiled from "../../Components/Forms/InputField";
import FormField from "../../Components/Forms/FormField";
import HelmetInfo from "../../Components/Helmetinfo/HelmetInfo";
import WhatsIcon from "../../assets/Icons/WhatsIcon";
import Switch from "../../Components/Forms/Switch";
import CustomModal from "../../Components/CustomModal/CustomModal";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link, useParams } from "react-router-dom";
import TextArea from "../../Components/Forms/TextArea";
import ImageUploadGrid from "../../Components/ImageUploadGrid/ImageUploadGrid";
import BreadcrumbsPage from "../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import SwapAPI from "../../api/swapApi";
import "../JoinUs/JoinUs.css";
import GoogleSearchBoxWithMap from "../../Components/GoogleMap/GoogleSearchBoxWithMap";
import { Field } from "formik";
import PhoneNumberValidation from "../../Components/Forms/PhoneNumberInput";
import { Dropdown } from "primereact/dropdown";
import { translations } from "../JoinUs/translations";
import data from "../../data/cities.json";
import Loader from "../../Components/Loader/Loader";
import { toast } from "react-toastify";

const UpdateSwap = () => {
    const { id } = useParams();
    const { currentLanguage } = useLanguage();
    const [showModal, setShowModal] = useState(false);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [locationDetails, setLocationDetails] = useState("");
    const [isItemLoading, setIsItemLoading] = useState(false);
    const [city, setCity] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [removedImages, setRemovedImages] = useState([]);
    const [initialValues, setInitialValues] = useState({
        havePropertyType: "",
        haveDescription: "",
        wantDescription: "",
        phoneNumber: "",
        hasWhatsapp: false,
        locationLabel: "",
        images: [],
    });

    useEffect(() => {
        const fetchSwap = async () => {
            try {
                setIsLoading(true);
                const response = await SwapAPI.getSwapById(id);
                let swapData = response.data || response;

                // Handle case where data is in swap object
                if (swapData.swap) {
                    swapData = swapData.swap;
                }

                console.log("Processed Swap Data:", swapData);

                const newInitialValues = {
                    havePropertyType: swapData.whatIHave?.propertyType || "",
                    haveDescription: swapData.whatIHave?.description || "",
                    wantPropertyType: swapData.whatIWant?.propertyType || "",
                    wantDescription: swapData.whatIWant?.description || "",
                    phoneNumber: swapData.contact?.phoneNumber || "",
                    hasWhatsapp: swapData.contact?.hasWhatsapp || false,
                    locationLabel: swapData.location?.detailedLocation || "",
                    images: swapData.images || [],
                };
                console.log("Setting Initial Values:", newInitialValues);
                setInitialValues(newInitialValues);

                setCity(swapData.location?.city || "");
                setLocationDetails(swapData.location?.detailedLocation || "");

                // Handle coordinates safely
                const coords = swapData.location?.coordinates;
                if (coords) {
                    // Check if it's GeoJSON object or array
                    if (coords.coordinates && Array.isArray(coords.coordinates)) {
                        setLatitude(coords.coordinates[1]);
                        setLongitude(coords.coordinates[0]);
                    } else if (Array.isArray(coords)) {
                        setLatitude(coords[1]);
                        setLongitude(coords[0]);
                    }
                }

            } catch (error) {
                console.error("Error fetching swap:", error);
                toast.error("Failed to load swap details");
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchSwap();
        }
    }, [id]);

    const handleUpdateSwap = async (values, { resetForm }) => {
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

        // lat long
        formData.append("location[city]", city);
        formData.append("location[detailedLocation]", locationDetails);
        formData.append("location[coordinates][0]", longitude);
        formData.append("location[coordinates][1]", latitude);

        // Removed images
        if (removedImages.length > 0) {
            removedImages.forEach((imgId) => {
                formData.append("removedImages[]", imgId);
            });
        }

        // New images
        if (values.images && values.images.length > 0) {
            values.images.forEach((file) => {
                if (file instanceof File) {
                    formData.append("images", file);
                }
            });
        }

        setIsItemLoading(true);
        try {
            setIsSubmitting(true);

            const response = await SwapAPI.updateSwap(id, formData);
            console.log("✅ Success:", response);
            setShowModal(true);
        } catch (error) {
            console.error("❌ Error updating swap:", error);
            toast.error("Failed to update swap");
        } finally {
            setIsSubmitting(false);
            setIsItemLoading(false);
        }
    };

    if (isLoading) {
        return <div className='d-flex justify-content-center align-items-center min-vh-100'>
            <Loader />
        </div>
    }

    return (
        <>
            <HelmetInfo
                titlePage={currentLanguage === "ar" ? "تعديل التبديل" : "Update Swap"}
            />

            <FormField
                initialValues={initialValues}
                validationSchema={""}
                onSubmit={handleUpdateSwap}
                enableReinitialize={true}
            >
                <ContainerMedia>
                    <div className="form-container finishing align-items-center px-0">
                        <div className="w-100">
                            <div className="pb-4">
                                <BreadcrumbsPage
                                    newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                                    mainTitle={"تعديل إعلاناتي"}
                                    routeTitleTwoBread={false}
                                    titleTwoBread={false}
                                    secondArrow={false}
                                />
                            </div>
                            <p className="b-1 mb-2 pb-3">تعديل بيانات التبديل</p>

                            {/* whatIHave */}
                            <SectionHeader text={"عايز تبدل ايه"} />

                            <div className="mb-4 ">
                                <label className="b-12 mb-2">
                                    نوع الحاجة اللي معاك{" "}
                                    <span className="required-asterisk">*</span>
                                </label>
                                <InputFiled
                                    name="havePropertyType"
                                    placeholder="مثلاً: شقة، عربية، موبايل..."
                                />
                            </div>

                            <div className="mb-4">
                                <label className="b-12">
                                    الوصف الكامل <span className="required-asterisk">*</span>
                                </label>
                                <TextArea
                                    name="haveDescription"
                                    maxLength="700"
                                    placeholder="مواصفات الحاجة اللي معاك"
                                />
                            </div>

                            {/* whatIWant */}
                            <SectionHeader text={"محتاج ايه"} />

                            <div className="mb-4 ">
                                <label className="b-12 mb-2">
                                    إيه الحاجة اللي بتدور عليها{" "}
                                    <span className="required-asterisk">*</span>
                                </label>
                                <InputFiled
                                    name="wantPropertyType"
                                    placeholder="مثلاً: فيلا، عربية..."
                                />
                            </div>

                            <div className="mb-4">
                                <label className="b-12">
                                    الوصف الكامل <span className="required-asterisk">*</span>
                                </label>
                                <TextArea
                                    name="wantDescription"
                                    maxLength="700"
                                    placeholder="مواصفات الحاجة اللي بتدور عليها"
                                />
                            </div>

                            {/* contact */}
                            <SectionHeader text={"بيانات التواصل"} />

                            <div className="mb-4 lg-w-30">
                                <label className="b-12 mb-2" style={{ minWidth: "150px" }}>
                                    رقم الموبايل
                                    <span className="required-asterisk">*</span>
                                </label>
                                <Field name="phoneNumber" component={PhoneNumberValidation} />
                            </div>

                            <div className="b-15 mb-4 d-flex justify-content-between align-items-center lg-w-30">
                                <div className="d-flex flex-row space-1">
                                    <WhatsIcon /> يوجد واتساب علي هذا الرقم
                                </div>
                                <Switch name="hasWhatsapp" />
                            </div>

                            {/* location */}
                            <SectionHeader text={"العنوان بالتفصيل"} />

                            <div className="mb-4">
                                <label className="b-12 mb-2">
                                    أختر المدينة <span className="required-asterisk"> *</span>
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

                            <div className="mb-5">
                                <label className="b-12 mb-2">
                                    العنوان بالخريطة <span className="required-asterisk">*</span>
                                </label>

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

                            {/* images */}
                            <SectionHeader text={"صور الحاجة اللي عايز تبدلها"} />
                            <div className="mb-4">
                                <ImageUploadGrid
                                    name="images"
                                    onRemove={(imageName) => {
                                        setRemovedImages((prev) => [...prev, imageName]);
                                    }}
                                />
                            </div>

                            {/* submit */}
                            <div className="d-flex justify-content-center mt-5 pt-3">
                                <button
                                    type="submit"
                                    className="btn-main btn-submit b-11"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "جاري التحديث..." : "تحديث الطلب"}
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
                                            src="/animation/successpapers.lottie"
                                            loop
                                            autoplay
                                        />
                                    </div>
                                    <h6>💡 تم التحديث!</h6>
                                    <p className="b-15" style={{ color: "var(--netural-700)" }}>
                                        تم تحديث بيانات التبديل بنجاح.
                                    </p>
                                    <Link
                                        to={"/my-ads"}
                                        className="btn-main btn-submit mt-3 b-11 py-3 px-2"
                                    >
                                        العودة لإعلاناتي
                                    </Link>
                                </div>
                            </CustomModal>
                        </div>
                    </div>
                </ContainerMedia>
            </FormField >
        </>
    );
};

export default UpdateSwap;
